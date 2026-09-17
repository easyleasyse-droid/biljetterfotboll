import zlib from 'zlib';
import { promisify } from 'util';

const gunzip = promisify(zlib.gunzip);

export interface AwinTicketRow {
  merchantName: string;
  merchantId: string;
  productName: string;
  priceSEK: number;
  rawPrice: number;
  currency: string;
  url: string;
}

let cachedAwinRows: AwinTicketRow[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 timmes cache

const FEED_URLS = [
  // Gigsberg
  "https://productdata.awin.com/datafeed/download/apikey/396ea86764d24ee68e956ee4e37658a4/language/en/cid/592/fid/117212/rid/0,1/hasEnhancedFeeds/0/columns/aw_deep_link,product_name,aw_product_id,merchant_product_id,merchant_image_url,description,merchant_category,search_price,merchant_name,merchant_id,category_name,category_id,aw_image_url,currency,store_price,delivery_cost,merchant_deep_link,language,last_updated,display_price,data_feed_id/format/csv/delimiter/%2C/compression/gzip/adultcontent/1/",
  // Football Ticket Net
  "https://productdata.awin.com/datafeed/download/apikey/396ea86764d24ee68e956ee4e37658a4/language/en/fid/113393/rid/0,1/hasEnhancedFeeds/0/columns/aw_deep_link,product_name,aw_product_id,merchant_product_id,merchant_image_url,description,merchant_category,search_price,merchant_name,merchant_id,category_name,category_id,aw_image_url,currency,store_price,delivery_cost,merchant_deep_link,language,last_updated,display_price,data_feed_id/format/csv/delimiter/%2C/compression/gzip/adultcontent/1/"
];

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

async function fetchSingleFeed(url: string): Promise<AwinTicketRow[]> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
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
    const idxSearchPrice = headers.indexOf('search_price');
    const idxDisplayPrice = headers.indexOf('display_price');
    const idxStorePrice = headers.indexOf('store_price');
    const idxMerchant = headers.indexOf('merchant_name');
    const idxMerchantId = headers.indexOf('merchant_id');
    const idxCurrency = headers.indexOf('currency');

    const rows: AwinTicketRow[] = [];

    // Uppdaterade växelkurser mot SEK
    const RATES: Record<string, number> = {
      GBP: 13.15,
      EUR: 11.25,
      USD: 9.80,
      SEK: 1.0,
    };

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = parseCSVLine(line);

      const productName = cols[idxProductName] || '';
      const merchantName = cols[idxMerchant] || 'Awin Partner';
      const merchantId = cols[idxMerchantId] || '';
      const deepLink = cols[idxDeepLink] || cols[idxMerchantDeep] || '#';
      let currency = (cols[idxCurrency] || '').toUpperCase();

      // Filtrera bort skräpprodukter (barnbiljetter, parkering, turer, medlemskap)
      const lowerName = productName.toLowerCase();
      if (
        lowerName.includes('child') ||
        lowerName.includes('junior') ||
        lowerName.includes('parking') ||
        lowerName.includes('tour') ||
        lowerName.includes('membership') ||
        lowerName.includes('hospitality only')
      ) {
        continue;
      }

      const searchP = parseFloat((cols[idxSearchPrice] || '').replace(',', '.'));
      const displayP = parseFloat((cols[idxDisplayPrice] || '').replace(',', '.'));
      const storeP = parseFloat((cols[idxStorePrice] || '').replace(',', '.'));

      let price = 0;
      if (!isNaN(searchP) && searchP > 0) price = searchP;
      else if (!isNaN(displayP) && displayP > 0) price = displayP;
      else if (!isNaN(storeP) && storeP > 0) price = storeP;

      if (!productName || price <= 0) continue;

      // Om valuta saknas i feeden, sätt standard baserat på vanliga normer (eller GBP för engelsk fotboll)
      if (!currency || !RATES[currency]) {
        currency = 'GBP'; 
      }

      const rate = RATES[currency] || RATES.GBP;
      const priceSEK = Math.round(price * rate);

      rows.push({
        merchantName,
        merchantId,
        productName,
        priceSEK,
        rawPrice: price,
        currency,
        url: deepLink,
      });
    }

    return rows;
  } catch (error) {
    return [];
  }
}

export async function getAwinData(): Promise<AwinTicketRow[]> {
  const now = Date.now();
  if (cachedAwinRows && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedAwinRows;
  }

  const results = await Promise.all(FEED_URLS.map(url => fetchSingleFeed(url)));
  const allRows = results.flat();

  if (allRows.length > 0) {
    cachedAwinRows = allRows;
    lastFetchTime = now;
  }

  return cachedAwinRows || [];
}

export async function fetchAwinOffers() {
  return getAwinData();
}

const getTeamKeywords = (teamName: string): string[] => {
  if (!teamName) return [];

  const normalized = teamName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const cleaned = normalized
    .replace(/\b(fc|ac|cf|afc|sc|sv|fk|vfb|vfl|rb|cd|ud|rcd|sporting|club|de|d'|del|tickets|ticket)\b/g, " ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const keywords: string[] = [];
  if (cleaned.length > 0) {
    keywords.push(cleaned);
  }

  // Vanliga synonymer och smeknamn som kan skilja sig mellan partners
  if (normalized.includes("manchester city") || normalized.includes("man city")) {
    keywords.push("man city", "manchester city");
  } else if (normalized.includes("manchester united") || normalized.includes("man utd")) {
    keywords.push("man utd", "manchester united");
  } else if (normalized.includes("tottenham") || normalized.includes("spurs")) {
    keywords.push("tottenham", "spurs");
  } else if (normalized.includes("barcelona") || normalized.includes("barca")) {
    keywords.push("barcelona", "barca");
  } else if (normalized.includes("atletico madrid") || normalized.includes("atl. madrid")) {
    keywords.push("atletico", "atletico madrid");
  } else if (normalized.includes("real madrid")) {
    keywords.push("real madrid");
  } else if (normalized.includes("paris saint germain") || normalized.includes("psg")) {
    keywords.push("psg", "paris", "paris sg");
  } else if (normalized.includes("inter") || normalized.includes("internazionale")) {
    keywords.push("inter", "internazionale");
  } else if (normalized.includes("milan") && !normalized.includes("inter")) {
    keywords.push("ac milan", "milan");
  } else if (normalized.includes("bayern")) {
    keywords.push("bayern", "bayern munich", "bayern munchen");
  } else if (normalized.includes("dortmund") || normalized.includes("bvb")) {
    keywords.push("dortmund", "bvb");
  } else if (normalized.includes("juventus") || normalized.includes("juve")) {
    keywords.push("juventus", "juve");
  } else if (normalized.includes("betis")) {
    keywords.push("betis", "real betis");
  }

  return Array.from(new Set(keywords.filter((kw) => kw.length > 1)));
};

export function findAwinTicketsForMatchSync(
  rows: AwinTicketRow[],
  homeTeam: string,
  awayTeam: string
): AwinTicketRow[] {
  if (!rows || rows.length === 0) return [];

  const cleanTitle = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const homeKeywords = getTeamKeywords(homeTeam);
  const awayKeywords = getTeamKeywords(awayTeam);

  if (homeKeywords.length === 0 || awayKeywords.length === 0) return [];

  return rows.filter((row) => {
    const title = cleanTitle(row.productName);

    let homePos = -1;
    for (const kw of homeKeywords) {
      const pos = title.indexOf(kw);
      if (pos !== -1) {
        homePos = pos;
        break;
      }
    }

    let awayPos = -1;
    for (const kw of awayKeywords) {
      const pos = title.indexOf(kw);
      if (pos !== -1) {
        awayPos = pos;
        break;
      }
    }

    // Hemmalaget måste komma före bortalaget i titeln för att undvika felskuggningar
    return homePos !== -1 && awayPos !== -1 && homePos < awayPos;
  });
}