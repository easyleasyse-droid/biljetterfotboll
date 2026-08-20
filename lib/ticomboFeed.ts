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
      const response = await fetch(feedUrl, { 
        next: { revalidate: 3600 }
      });

      if (!response.ok) return "";
      return await response.text();
    } catch {
      return "";
    }
  },
  ['ticombo-raw-feed-lowest-price'],
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
  const matchedTickets: TicomboTicket[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const lineLower = line.toLowerCase();

    const hasHome = homeWords.every(w => lineLower.includes(w));
    const hasAway = awayWords.every(w => lineLower.includes(w));

    if (hasHome && hasAway) {
      const urlMatch = line.match(/https?:\/\/[^\s",]+/);
      
      // Hämta alla siffervärden
      const allNumbers = line.match(/\b\d+(\.\d+)?\b/g);
      
      if (urlMatch && allNumbers) {
        // Filtrera fram alla rimliga priser (mellanskillnad från ID-nummer)
        const validPrices = allNumbers
          .map(n => parseFloat(n))
          .filter(n => n >= 15 && n <= 1500); // Riktiga biljettpriser ligger mellan 15 och 1500 EUR

        if (validPrices.length > 0) {
          // Välj det lägsta priset på raden
          const lowestPriceOnLine = Math.min(...validPrices);
          
          matchedTickets.push({
            title: `${homeTeam} vs ${awayTeam}`,
            price: lowestPriceOnLine,
            currency: 'EUR',
            directUrl: urlMatch[0]
          });
        }
      }
    }
  }

  if (matchedTickets.length === 0) return null;

  // Sortera alla hittade biljetter för matchen och returnera det absolut lägsta erbjudandet
  matchedTickets.sort((a, b) => a.price - b.price);
  return matchedTickets[0];
}