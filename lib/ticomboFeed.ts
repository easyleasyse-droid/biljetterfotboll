import { unstable_cache } from 'next/cache';

export interface TicomboTicket {
  title: string;
  price: number;
  currency: string;
  directUrl: string;
}

function cleanTeamName(name: string): string {
  if (!name) return "";
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "") // Rensar punkter så "A.C. Milan" blir "ac milan" innan "ac" skalas av
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd|de)\b/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsvLine(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

export const fetchTicomboRawFeed = unstable_cache(
  async (): Promise<string> => {
    const feedUrl =
      process.env.TICOMBO_FEED_URL ||
      "https://feeds.performancehorizon.com/biljetterfotboll/1011l6399/a1f3f49c2e6d13ca6d33d24088acc238";

    try {
      const response = await fetch(feedUrl, { 
        next: { revalidate: 3600 }
      });

      if (!response.ok) return "";
      return await response.text();
    } catch {
      return "";
    }
  },
  ['ticombo-raw-feed-verified-v2'], // Ny cache-nyckel för att säkerställa omstart
  { revalidate: 3600 }
);

export function findTicomboTicketInRaw(
  rawCsv: string,
  homeTeam: string, 
  awayTeam: string, 
  matchDate?: string
): TicomboTicket | null {
  if (!rawCsv) return null;

  const cleanHome = cleanTeamName(homeTeam);
  const cleanAway = cleanTeamName(awayTeam);

  if (!cleanHome || !cleanAway) return null;

  const lines = rawCsv.split(/\r?\n/);
  if (lines.length < 2) return null;

  const headerCols = parseCsvLine(lines[0]).map(c => c.toLowerCase());
  
  const nameIdx = headerCols.indexOf('event_name');
  const fullNameIdx = headerCols.indexOf('event_full_name');
  const linkIdx = headerCols.indexOf('deep_link');
  const priceIdx = headerCols.indexOf('min_final_sell_price') !== -1 
    ? headerCols.indexOf('min_final_sell_price') 
    : headerCols.indexOf('min_sell_price');
  const currencyIdx = headerCols.indexOf('currency');

  if (linkIdx === -1 || priceIdx === -1) return null;

  const matches: TicomboTicket[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const cols = parseCsvLine(line);

    // Säkra upp att vi inte läser utanför index
    const eventName = nameIdx !== -1 && nameIdx < cols.length ? cols[nameIdx] : "";
    const eventFullName = fullNameIdx !== -1 && fullNameIdx < cols.length ? cols[fullNameIdx] : "";
    const rawTitle = `${eventName} ${eventFullName}`;
    const cleanTitle = cleanTeamName(rawTitle);

    // Kräver att BÅDA lagen finns med i själva matchtiteln
    if (cleanTitle.includes(cleanHome) && cleanTitle.includes(cleanAway)) {
      const rawUrl = linkIdx < cols.length ? cols[linkIdx] : "";
      const priceRaw = priceIdx < cols.length ? cols[priceIdx] : "";
      const currency = (currencyIdx !== -1 && currencyIdx < cols.length && cols[currencyIdx]) ? cols[currencyIdx] : "EUR";
      const price = parseFloat(priceRaw);

      const directUrl = rawUrl.replace(/^"|"$/g, '');

      if (directUrl.startsWith("http") && !isNaN(price) && price > 0) {
        matches.push({
          title: `${homeTeam} vs ${awayTeam}`,
          price: price,
          currency: currency,
          directUrl: directUrl
        });
      }
    }
  }

  if (matches.length === 0) return null;

  // Sorterar och väljer det lägsta priset för den specifika matchen
  matches.sort((a, b) => a.price - b.price);
  return matches[0];
}