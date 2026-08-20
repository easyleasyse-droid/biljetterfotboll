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
    // Ta bara bort rena suffix som fc, cf, ac, ss – behåll ord som Real, Atletico, Inter, Milan
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd)\b/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
  ['ticombo-raw-feed-strict-match-v1'],
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

  const headerCols = lines[0].split(',').map(c => c.trim().toLowerCase());
  const nameIdx = headerCols.indexOf('event_name') !== -1 ? headerCols.indexOf('event_name') : 1;
  const fullNameIdx = headerCols.indexOf('event_full_name') !== -1 ? headerCols.indexOf('event_full_name') : 2;
  const linkIdx = headerCols.indexOf('deep_link') !== -1 ? headerCols.indexOf('deep_link') : 7;
  const priceIdx = headerCols.indexOf('min_final_sell_price') !== -1 
    ? headerCols.indexOf('min_final_sell_price') 
    : (headerCols.indexOf('min_sell_price') !== -1 ? headerCols.indexOf('min_sell_price') : 11);
  const currencyIdx = headerCols.indexOf('currency') !== -1 ? headerCols.indexOf('currency') : 12;

  const matches: TicomboTicket[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const lineLower = line.toLowerCase();

    // Kräv att BÅDA lagen finns på raden
    // För lag som "Real Madrid" krävs nu hela strängen "real madrid" och inte bara "real"
    if (lineLower.includes(cleanHome) && lineLower.includes(cleanAway)) {
      const cols = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());

      const directUrl = cols[linkIdx] || "";
      const priceRaw = cols[priceIdx];
      const currency = cols[currencyIdx] || "EUR";
      const price = parseFloat(priceRaw);

      if (directUrl && !isNaN(price) && price > 0) {
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

  // Sortera så att vi tar lägsta giltiga priset för exakt rätt match
  matches.sort((a, b) => a.price - b.price);
  return matches[0];
}