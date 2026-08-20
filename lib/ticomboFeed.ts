import { unstable_cache } from 'next/cache';

export interface TicomboTicket {
  title: string;
  price: number;
  currency: string;
  directUrl: string;
}

function cleanTeamName(name: string): string {
  if (!name) return "";
  
  let cleaned = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (cleaned.includes("inter") && !cleaned.includes("miami") && !cleaned.includes("turku")) {
    return "inter";
  }

  return cleaned
    .replace(/\b(18\d\d|19\d\d|20\d\d)\b/g, "")
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd|atletico de)\b/g, "")
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(feedUrl, { 
        next: { revalidate: 3600 },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) return "";
      return await response.text();
    } catch (error) {
      return "";
    }
  },
  ['ticombo-raw-feed-v1'],
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

  const homeWords = cleanHome.split(' ').filter(w => w.length > 2);
  const awayWords = cleanAway.split(' ').filter(w => w.length > 2);

  if (homeWords.length === 0 || awayWords.length === 0) return null;

  const lines = rawCsv.split(/\r?\n/);
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const lineLower = line.toLowerCase();

    const hasHome = homeWords.every(w => lineLower.includes(w));
    const hasAway = awayWords.every(w => lineLower.includes(w));

    if (hasHome && hasAway) {
      const urlMatch = line.match(/https?:\/\/[^\s",]+/);
      const priceMatch = line.match(/"(\d+(\.\d+)?)"/g) || line.match(/\b\d+(\.\d+)?\b/g);

      if (urlMatch) {
        return {
          title: `${homeTeam} vs ${awayTeam}`,
          price: priceMatch ? parseFloat(priceMatch[0].replace(/"/g, '')) : 0,
          currency: 'EUR',
          directUrl: urlMatch[0]
        };
      }
    }
  }

  return null;
}