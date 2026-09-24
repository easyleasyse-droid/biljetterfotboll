import zlib from 'zlib';
import { promisify } from 'util';
import { unstable_cache } from 'next/cache';

const gunzip = promisify(zlib.gunzip);

export interface AwinTicketRow {
  merchantName: string;
  merchantId: string;
  productName: string;
  eventDate: string | null; // ISO-datum, om vi lyckades tolka ett ur produktnamn/beskrivning
  priceSEK: number;
  rawPrice: number;
  currency: string;
  url: string;
}

// Rad innan valutakonvertering skett - används internt för att kunna hämta
// alla feeds och växelkurser PARALLELLT istället för i sekvens.
type RawAwinRow = Omit<AwinTicketRow, 'priceSEK'>;

interface FeedConfig {
  label: string;
  url: string;
  // Om raden saknar/har en okänd valutakod används denna som sista utväg.
  // Sätt detta till den valuta affiliaten faktiskt fakturerar i (inte en gissning på "GBP för allt").
  defaultCurrency: string;
}

// Lägg till fler feeds här (t.ex. TicketNetwork) genom att bara lägga till ett objekt till.
const FEED_CONFIGS: FeedConfig[] = [
  {
    label: 'Gigsberg',
    defaultCurrency: 'EUR',
    url: "https://productdata.awin.com/datafeed/download/apikey/396ea86764d24ee68e956ee4e37658a4/language/en/cid/592/fid/117212/rid/0,1/hasEnhancedFeeds/0/columns/aw_deep_link,product_name,aw_product_id,merchant_product_id,merchant_image_url,description,merchant_category,search_price,merchant_name,merchant_id,category_name,category_id,aw_image_url,currency,store_price,delivery_cost,merchant_deep_link,language,last_updated,display_price,data_feed_id/format/csv/delimiter/%2C/compression/gzip/adultcontent/1/",
  },
  {
    label: 'FootballTicketNet',
    defaultCurrency: 'GBP',
    url: "https://productdata.awin.com/datafeed/download/apikey/396ea86764d24ee68e956ee4e37658a4/language/en/fid/113393/rid/0,1/hasEnhancedFeeds/0/columns/aw_deep_link,product_name,aw_product_id,merchant_product_id,merchant_image_url,description,merchant_category,search_price,merchant_name,merchant_id,category_name,category_id,aw_image_url,currency,store_price,delivery_cost,merchant_deep_link,language,last_updated,display_price,data_feed_id/format/csv/delimiter/%2C/compression/gzip/adultcontent/1/",
  },
];

// ---------------------------------------------------------------------------
// CSV-parsning
// ---------------------------------------------------------------------------

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let startValue = 0;
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') {
      inQuotes = !inQuotes;
    } else if (line[i] === ',' && !inQuotes) {
      let val = line.substring(startValue, i).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      result.push(val);
      startValue = i + 1;
    }
  }

  let val = line.substring(startValue).trim();
  if (val.startsWith('"') && val.endsWith('"')) {
    val = val.substring(1, val.length - 1).replace(/""/g, '"');
  }
  result.push(val);

  return result;
}

// ---------------------------------------------------------------------------
// Prisparsning
// ---------------------------------------------------------------------------
// Awin-feeds levererar priser i blandade format: "129.99", "129,99",
// "1,299.00" (US-tusentalsavgränsare) och "1.299,00" (EU-tusentalsavgränsare).
// Ett naivt replace(',', '.') förstör US-formatet ("1,299.00" -> "1.299.00").
// Denna funktion avgör vilken separator som är decimaltecknet genom att titta
// på den SISTA förekommande separatorn: om den följs av 1-2 siffror är det
// decimaltecknet, annars är den en tusentalsavgränsare.
function parsePrice(raw: string | undefined | null): number {
  if (!raw) return NaN;

  // Rensa bort valutasymboler, mellanslag, NBSP etc. Behåll siffror, . , och -
  let s = raw.replace(/[^\d.,-]/g, '').trim();
  if (!s) return NaN;

  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  const lastSepIndex = Math.max(lastComma, lastDot);

  if (lastSepIndex === -1) {
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : NaN;
  }

  const decimalDigits = s.length - lastSepIndex - 1;
  const isDecimalSeparator = decimalDigits > 0 && decimalDigits <= 2;

  let normalized: string;
  if (isDecimalSeparator) {
    const intPart = s.slice(0, lastSepIndex).replace(/[.,]/g, '');
    const decPart = s.slice(lastSepIndex + 1);
    normalized = `${intPart}.${decPart}`;
  } else {
    // Ingen riktig decimaldel i slutet -> alla separatorer är tusentalsavgränsare
    normalized = s.replace(/[.,]/g, '');
  }

  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : NaN;
}

// ---------------------------------------------------------------------------
// Växelkurser (SEK som bas), med liveuppdatering + fallback
// ---------------------------------------------------------------------------
// FALLBACK_RATES_PER_SEK = hur många enheter av valutan man får för 1 SEK.
// Används bara om den externa kurs-API:n inte går att nå (nätverksfel, timeout etc.)
const FALLBACK_RATES_PER_SEK: Record<string, number> = {
  SEK: 1,
  GBP: 1 / 13.15,
  EUR: 1 / 11.25,
  USD: 1 / 9.80,
};

interface RatesCache {
  ratesPerSEK: Record<string, number>;
  fetchedAt: number;
}

let ratesCache: RatesCache | null = null;
const RATES_CACHE_DURATION_MS = 60 * 60 * 1000; // 1 timme

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { cache: 'no-store', signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function getRatesPerSEK(): Promise<Record<string, number>> {
  const now = Date.now();
  if (ratesCache && now - ratesCache.fetchedAt < RATES_CACHE_DURATION_MS) {
    return ratesCache.ratesPerSEK;
  }

  try {
    // Gratis, nyckelfritt API. Ger "hur mycket av valuta X man får för 1 SEK".
    const res = await fetchWithTimeout('https://open.er-api.com/v6/latest/SEK', 5000);
    if (res.ok) {
      const data = await res.json();
      if (data && data.result === 'success' && data.rates) {
        const ratesPerSEK: Record<string, number> = { SEK: 1, ...data.rates };
        ratesCache = { ratesPerSEK, fetchedAt: now };
        return ratesPerSEK;
      }
    }
  } catch {
    // Nätverksfel/timeout -> fall igenom till fallback nedan
  }

  // Om vi har en gammal (utgången) cache är den fortfarande bättre än en
  // statisk konstant som kan vara flera år gammal, så återanvänd den.
  if (ratesCache) return ratesCache.ratesPerSEK;

  return FALLBACK_RATES_PER_SEK;
}

function convertToSEK(amount: number, currency: string, ratesPerSEK: Record<string, number>): number | null {
  const rate = ratesPerSEK[currency];
  if (!rate || rate <= 0 || !Number.isFinite(amount)) return null;
  return Math.round(amount / rate);
}

// ---------------------------------------------------------------------------
// Feed-hämtning
// ---------------------------------------------------------------------------

const KNOWN_CURRENCIES = new Set(['SEK', 'GBP', 'EUR', 'USD']);

const JUNK_PRODUCT_KEYWORDS = [
  'child',
  'junior',
  'infant',
  'parking',
  'car park',
  'tour',
  'membership',
  'hospitality only',
];

async function fetchSingleFeed(feed: FeedConfig): Promise<RawAwinRow[]> {
  try {
    const res = await fetchWithTimeout(feed.url, 20000);
    if (!res.ok) return [];

    const buffer = Buffer.from(await res.arrayBuffer());
    const unzipped = await gunzip(buffer);
    const csvText = unzipped.toString('utf-8');

    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const idxDeepLink = headers.indexOf('aw_deep_link');
    const idxMerchantDeep = headers.indexOf('merchant_deep_link');
    const idxProductName = headers.indexOf('product_name');
    const idxDescription = headers.indexOf('description');
    const idxSearchPrice = headers.indexOf('search_price');
    const idxDisplayPrice = headers.indexOf('display_price');
    const idxStorePrice = headers.indexOf('store_price');
    const idxMerchant = headers.indexOf('merchant_name');
    const idxMerchantId = headers.indexOf('merchant_id');
    const idxCurrency = headers.indexOf('currency');

    const rows: RawAwinRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = parseCSVLine(line);

      const productName = cols[idxProductName] || '';
      if (!productName) continue;

      const lowerName = productName.toLowerCase();
      if (JUNK_PRODUCT_KEYWORDS.some((kw) => lowerName.includes(kw))) continue;

      const merchantName = cols[idxMerchant] || feed.label;
      const merchantId = cols[idxMerchantId] || '';
      const deepLink = cols[idxDeepLink] || cols[idxMerchantDeep] || '#';
      const description = cols[idxDescription] || '';

      // Prisprioritet: search_price (aktuellt/kampanjpris) > display_price
      // (visningspris, kan innehålla frakt) > store_price (ofta ORDINARIE
      // pris innan rabatt - används bara om inget annat finns).
      const searchP = parsePrice(cols[idxSearchPrice]);
      const displayP = parsePrice(cols[idxDisplayPrice]);
      const storeP = parsePrice(cols[idxStorePrice]);

      let price = NaN;
      if (Number.isFinite(searchP) && searchP > 0) price = searchP;
      else if (Number.isFinite(displayP) && displayP > 0) price = displayP;
      else if (Number.isFinite(storeP) && storeP > 0) price = storeP;

      if (!Number.isFinite(price) || price <= 0) continue;

      // Valuta: använd feedens angivna värde om det är en valuta vi känner
      // igen, annars fall tillbaka på feedens KÄNDA standardvaluta (inte en
      // global gissning på GBP för alla affiliates).
      let currency = (cols[idxCurrency] || '').trim().toUpperCase();
      if (!KNOWN_CURRENCIES.has(currency)) {
        currency = feed.defaultCurrency;
      }

      // Tolka datum EN gång här och spara bara resultatet (ISO-sträng eller
      // null) - vi behöver aldrig spara/cacha den fulla beskrivningstexten,
      // vilket håller nere cachestorleken rejält.
      const parsedDate = extractDateFromText(`${productName} ${description}`);
      const eventDate = parsedDate ? parsedDate.toISOString() : null;

      rows.push({
        merchantName,
        merchantId,
        productName,
        eventDate,
        rawPrice: price,
        currency,
        url: deepLink,
      });
    }

    return rows;
  } catch {
    return [];
  }
}

// Den faktiska, dyra hämtningen (nätverk + gunzip + parsning + live
// växelkurs). Detta är vad vi vill cacha i Vercels DELADE Data Cache, så att
// en kall serverless-instans slipper göra om allt jobb - bara en av alla
// instanser/regioner behöver betala kostnaden var 15:e minut.
async function fetchAwinRowsUncached(): Promise<AwinTicketRow[]> {
  const [ratesPerSEK, feedResults] = await Promise.all([
    getRatesPerSEK(),
    Promise.all(FEED_CONFIGS.map((feed) => fetchSingleFeed(feed))),
  ]);

  const allRawRows = feedResults.flat();

  const rows: AwinTicketRow[] = [];
  for (const raw of allRawRows) {
    const priceSEK = convertToSEK(raw.rawPrice, raw.currency, ratesPerSEK);
    if (priceSEK === null) continue; // kunde inte räkna om priset säkert - hoppa hellre än att visa fel pris
    rows.push({ ...raw, priceSEK });
  }

  return rows;
}

// Delad, beständig cache (överlever kallstarter och delas mellan
// serverless-instanser) - till skillnad från den enkla in-memory-cachen
// nedan, som bara hjälper upprepade anrop inom SAMMA varma instans.
const getAwinRowsFromSharedCache = unstable_cache(
  fetchAwinRowsUncached,
  ['awin-feed-rows-v1'],
  { revalidate: 900 } // 15 min - biljettpriser rör sig, så vi vill inte cacha för länge
);

let cachedAwinRows: AwinTicketRow[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 60 * 1000; // kort in-memory-cache - bara för att undvika dubbelarbete inom samma instans/request-våg

export async function getAwinData(): Promise<AwinTicketRow[]> {
  const now = Date.now();
  if (cachedAwinRows && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedAwinRows;
  }

  const rows = await getAwinRowsFromSharedCache();

  if (rows.length > 0) {
    cachedAwinRows = rows;
    lastFetchTime = now;
  }

  return cachedAwinRows || [];
}

export async function fetchAwinOffers() {
  return getAwinData();
}

// ---------------------------------------------------------------------------
// Lagmatchning
// ---------------------------------------------------------------------------

// Generiska klubbsuffix/prefix som INTE är del av lagets identitet och som
// tryggt kan strippas bort. OBS: "united"/"city" ingår MEDVETET INTE här
// eftersom de är en del av själva lagnamnet för t.ex. Manchester United/City.
const CLUB_SUFFIX_WORDS = new Set([
  'fc', 'afc', 'cf', 'sc', 'sv', 'fk', 'vfb', 'vfl', 'rb', 'cd', 'ud', 'rcd', 'ac',
  'calcio', 'club', 'futbol', 'football', 'soccer', 'sporting', 'de', 'del',
  'tickets', 'ticket',
]);

// Kända alias-grupper. Om ett lags namn matchar NÅGOT alias i en grupp så
// blir HELA gruppen sökbara nyckelord för det laget. Detta löser t.ex.
// "Man City" i en feed vs "Manchester City" som användaren skickar in.
const TEAM_ALIAS_GROUPS: string[][] = [
  ['manchester city', 'man city'],
  ['manchester united', 'man utd', 'man united'],
  ['tottenham hotspur', 'tottenham', 'spurs'],
  ['barcelona', 'barca', 'fc barcelona'],
  ['atletico madrid', 'atletico de madrid', 'atl madrid', 'atletico'],
  ['real madrid'],
  ['real betis', 'betis'],
  ['paris saint germain', 'paris sg', 'psg'],
  ['internazionale', 'inter milan', 'inter'],
  ['ac milan', 'milan'],
  ['bayern munich', 'bayern munchen', 'bayern'],
  ['borussia dortmund', 'dortmund', 'bvb'],
  ['juventus', 'juve'],
];

function normalizeTeamString(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // ta bort diakritiska tecken (é, ñ, ü ...)
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripClubSuffixes(normalized: string): string {
  const tokens = normalized.split(' ').filter(Boolean);
  const filtered = tokens.filter((t) => !CLUB_SUFFIX_WORDS.has(t));
  return filtered.join(' ').trim();
}

// Returnerar en lista av sökbara nyckelord för laget, sorterade LÄNGST FÖRST
// så att t.ex. "ac milan" testas innan "milan" (undviker felmatchning mot
// Inter Milan-produkter och liknande).
function getTeamKeywords(teamName: string): string[] {
  if (!teamName) return [];

  const normalized = normalizeTeamString(teamName);
  const cleaned = stripClubSuffixes(normalized);

  const keywords = new Set<string>();
  if (cleaned) keywords.add(cleaned);
  if (normalized && normalized !== cleaned) keywords.add(normalized);

  for (const group of TEAM_ALIAS_GROUPS) {
    if (group.some((alias) => normalized.includes(alias) || cleaned.includes(alias))) {
      group.forEach((alias) => keywords.add(alias));
    }
  }

  return Array.from(keywords)
    .filter((k) => k.length > 1)
    .sort((a, b) => b.length - a.length);
}

interface KeywordMatch {
  index: number;
  end: number;
}

// ---------------------------------------------------------------------------
// Datumextrahering
// ---------------------------------------------------------------------------
// Awins standardkolumner innehåller inget separat "event_date"-fält, men
// säljare skriver ofta in matchdatumet i product_name och/eller description
// (t.ex. "Liverpool vs Manchester City - Sat Oct 10, 2026" eller
// "10 October 2026"). Vi försöker tolka detta i fritext så att vi kan
// filtrera bort inaktuella/gamla listningar (t.ex. en kvarliggande post för
// samma lagpar från en tidigare säsongsmatch).
const MONTHS: Record<string, number> = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11,
};

function extractDateFromText(text: string): Date | null {
  if (!text) return null;

  // ISO-format: 2026-10-10
  const iso = text.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (iso) {
    const date = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    if (!isNaN(date.getTime())) return date;
  }

  // "10 October 2026" / "10th Oct 2026"
  const dayMonthYear = text.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]{3,9})\.?\s+(\d{4})\b/);
  if (dayMonthYear) {
    const monthKey = dayMonthYear[2].toLowerCase();
    if (monthKey in MONTHS) {
      const date = new Date(Number(dayMonthYear[3]), MONTHS[monthKey], Number(dayMonthYear[1]));
      if (!isNaN(date.getTime())) return date;
    }
  }

  // "October 10, 2026" / "Oct 10 2026"
  const monthDayYear = text.match(/\b([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})\b/);
  if (monthDayYear) {
    const monthKey = monthDayYear[1].toLowerCase();
    if (monthKey in MONTHS) {
      const date = new Date(Number(monthDayYear[3]), MONTHS[monthKey], Number(monthDayYear[2]));
      if (!isNaN(date.getTime())) return date;
    }
  }

  return null;
}

// Hittar det FÖRSTA (längsta, mest specifika) nyckelordet som förekommer i
// titeln som ett HELT ORD (ord-gräns), inte som en delsträng inuti ett annat
// ord. Detta stoppar t.ex. att "inter" råkar matcha inuti "international".
function findKeywordMatch(title: string, keywords: string[]): KeywordMatch | null {
  for (const kw of keywords) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i');
    const match = re.exec(title);
    if (match) {
      const start = match.index + match[1].length;
      return { index: start, end: start + kw.length };
    }
  }
  return null;
}

export interface FindMatchOptions {
  // Skicka in den KÄNDA kickoff-tiden för matchen (från er egen fixtur-data).
  // Detta är mycket pålitligare än att förlita sig på att kunna tolka datum
  // ur säljarens fritext, och gör att gamla/felaktiga listningar för samma
  // lagpar (t.ex. en kvarliggande post från en tidigare säsongsmöte) filtreras bort.
  targetDate?: Date;
  // Hur många dagars avvikelse från targetDate som tolereras. Default 3 dagar
  // (täcker in tidszonsskillnader och att vissa säljare anger fel klockslag).
  dateToleranceDays?: number;
}

export function findAwinTicketsForMatchSync(
  rows: AwinTicketRow[],
  homeTeam: string,
  awayTeam: string,
  options?: FindMatchOptions
): AwinTicketRow[] {
  if (!rows || rows.length === 0) return [];

  const homeKeywords = getTeamKeywords(homeTeam);
  const awayKeywords = getTeamKeywords(awayTeam);

  if (homeKeywords.length === 0 || awayKeywords.length === 0) return [];

  const candidates = rows.filter((row) => {
    const title = normalizeTeamString(row.productName);

    const homeMatch = findKeywordMatch(title, homeKeywords);
    const awayMatch = findKeywordMatch(title, awayKeywords);

    if (!homeMatch || !awayMatch) return false;

    // Träffarna får inte överlappa (kan hända om lagnamnen delar ord)
    if (homeMatch.index < awayMatch.end && awayMatch.index < homeMatch.end) return false;

    // Awins struktur är nästan alltid "Hemmalag vs Bortalag" - kräv den ordningen.
    return homeMatch.index < awayMatch.index;
  });

  const targetDate = options?.targetDate;
  if (!targetDate) return candidates;

  const toleranceMs = (options?.dateToleranceDays ?? 3) * 24 * 60 * 60 * 1000;

  const withParsedDate = candidates.map((row) => ({
    row,
    date: row.eventDate ? new Date(row.eventDate) : null,
  }));

  return withParsedDate
    // Behåll rader vars datum ligger inom toleransen ELLER där vi inte
    // kunde tolka ett datum alls (hellre visa en osäker rad än att tappa
    // en giltig biljett bara för att vår regex missade formatet).
    .filter(({ date }) => !date || Math.abs(date.getTime() - targetDate.getTime()) <= toleranceMs)
    // Sortera så att rader med känt datum närmast targetDate hamnar först,
    // och rader utan tolkningsbart datum hamnar sist.
    .sort((a, b) => {
      if (a.date && b.date) {
        return Math.abs(a.date.getTime() - targetDate.getTime()) - Math.abs(b.date.getTime() - targetDate.getTime());
      }
      if (a.date && !b.date) return -1;
      if (!a.date && b.date) return 1;
      return 0;
    })
    .map(({ row }) => row);
}