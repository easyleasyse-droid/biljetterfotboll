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
    .replace(/\./g, "")
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd|de)\b/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Robust CSV-parser som hanterar nästlade citattecken som ("Sports hall ""Arena Sofia""")
function parseCsvLineStrict(text: string): string[] {
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
  ['ticombo-raw-feed-exact-inspector-v1'],
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

  const headers = parseCsvLineStrict(lines[0]).map(h => h.toLowerCase().trim());

  // Exakta kolumn-index från er rådata
  const nameIdx = headers.indexOf('event_name');
  const fullNameIdx = headers.indexOf('event_full_name');
  const categoryIdx = headers.indexOf('category');
  const linkIdx = headers.indexOf('deep_link');
  const priceIdx = headers.indexOf('min_final_sell_price') !== -1 
    ? headers.indexOf('min_final_sell_price') 
    : headers.indexOf('min_sell_price');
  const currencyIdx = headers.indexOf('currency');
  const dateIdx = headers.indexOf('event_start_date');

  if (linkIdx === -1 || priceIdx === -1) return null;

  const matches: TicomboTicket[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const lineLower = line.toLowerCase();

    // Snabbt förfilter: Kräver att båda lagnamnen överhuvudtaget finns på raden
    if (lineLower.includes(cleanHome) && lineLower.includes(cleanAway)) {
      
      const cols = parseCsvLineStrict(line);

      // Säkra upp källkategorin om den finns (filtrera bort konserter/musik ifall de råkar ha samma namn)
      const category = categoryIdx !== -1 && categoryIdx < cols.length ? cols[categoryIdx].toLowerCase() : "";
      if (category && category.includes("music")) {
        continue;
      }

      const eventName = nameIdx !== -1 && nameIdx < cols.length ? cols[nameIdx] : "";
      const eventFullName = fullNameIdx !== -1 && fullNameIdx < cols.length ? cols[fullNameIdx] : "";
      const cleanTitle = cleanTeamName(`${eventName} ${eventFullName}`);

      // Kräver att BÅDA lagen ingår i själva eventtiteln
      if (cleanTitle.includes(cleanHome) && cleanTitle.includes(cleanAway)) {
        
        // Valfri datumkontroll om matchDate skickas med (format YYYY-MM-DD)
        if (matchDate && dateIdx !== -1 && dateIdx < cols.length) {
          const rowDate = cols[dateIdx]; // T.ex. "2026-09-29T16:00:00.000Z"
          if (rowDate && !rowDate.startsWith(matchDate)) {
            continue; // Datumet stämmer inte med denna specifika match
          }
        }

        const rawUrl = linkIdx < cols.length ? cols[linkIdx] : "";
        const priceRaw = priceIdx < cols.length ? cols[priceIdx] : "";
        const currency = (currencyIdx !== -1 && currencyIdx < cols.length && cols[currencyIdx]) ? cols[currencyIdx] : "EUR";
        const price = parseFloat(priceRaw);

        // Tvätta länken helt fri från citattecken
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
  }

  if (matches.length === 0) return null;

  // Sortera så att lägsta giltiga biljetter visas
  matches.sort((a, b) => a.price - b.price);
  return matches[0];
}