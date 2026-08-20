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
  ['ticombo-raw-feed-fast-v3'],
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

  const headerLine = lines[0].toLowerCase();
  const headers = headerLine.split(',').map(h => h.replace(/^"|"$/g, '').trim());

  const linkIdx = headers.indexOf('deep_link');
  const priceIdx = headers.indexOf('min_final_sell_price') !== -1 
    ? headers.indexOf('min_final_sell_price') 
    : headers.indexOf('min_sell_price');
  const currencyIdx = headers.indexOf('currency');

  if (linkIdx === -1 || priceIdx === -1) return null;

  const matches: TicomboTicket[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const lineLower = line.toLowerCase();

    // Snabb-sökning: Finns båda lagen på raden overhuvudtaget?
    if (lineLower.includes(cleanHome) && lineLower.includes(cleanAway)) {
      // Dela upp raden på ett säkert sätt utan tunga loopar
      const cols = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());

      const rawUrl = cols[linkIdx] || "";
      const priceRaw = cols[priceIdx];
      const currency = cols[currencyIdx] || "EUR";
      const price = parseFloat(priceRaw);

      if (rawUrl.startsWith("http") && !isNaN(price) && price > 0) {
        matches.push({
          title: `${homeTeam} vs ${awayTeam}`,
          price: price,
          currency: currency,
          directUrl: rawUrl
        });
      }
    }
  }

  if (matches.length === 0) return null;

  matches.sort((a, b) => a.price - b.price);
  return matches[0];
}