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
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(feedUrl, { 
        next: { revalidate: 3600 },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) return "";
      return await response.text();
    } catch {
      return "";
    }
  },
  ['ticombo-raw-feed-v2'],
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
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const lineLower = line.toLowerCase();

    // Snabbsökning: Båda lagens namn måste finnas på raden
    if (lineLower.includes(cleanHome) && lineLower.includes(cleanAway)) {
      // Dela upp kolumnerna korrekt
      const cols = line.split('","').map(c => c.replace(/^"|"$/g, ''));

      // Ticombo-feeden brukar ha URL i en kolumn och pris i en annan (oftast pris runt kolumn 5-9)
      const directUrl = cols.find(c => c.startsWith('http://') || c.startsWith('https://')) || "";
      
      // Hitta ett rimligt pris (siffervärde under 100 000 EUR för att undvika ID-nummer)
      let price = 0;
      for (const col of cols) {
        const parsed = parseFloat(col);
        if (!isNaN(parsed) && parsed > 5 && parsed < 50000 && !col.includes('-')) {
          price = parsed;
          break;
        }
      }

      if (directUrl && price > 0) {
        return {
          title: `${homeTeam} vs ${awayTeam}`,
          price: price,
          currency: 'EUR',
          directUrl: directUrl
        };
      }
    }
  }

  return null;
}