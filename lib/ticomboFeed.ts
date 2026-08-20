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
  ['ticombo-raw-feed-exact-csv-v1'],
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
  if (lines.length < 2) return null;

  // Läs rubrikraden för att hitta exakta kolumnindex
  const headerCols = lines[0].split(',').map(c => c.trim().toLowerCase());
  const nameIdx = headerCols.indexOf('event_name');
  const fullNameIdx = headerCols.indexOf('event_full_name');
  const linkIdx = headerCols.indexOf('deep_link');
  const priceIdx = headerCols.indexOf('min_final_sell_price') !== -1 
    ? headerCols.indexOf('min_final_sell_price') 
    : headerCols.indexOf('min_sell_price');
  const currencyIdx = headerCols.indexOf('currency');

  // Om vi av någon anledning inte hittar kolumnerna via rubriken, falla tillbaka på fasta index
  const finalNameIdx = nameIdx !== -1 ? nameIdx : 1;
  const finalFullNameIdx = fullNameIdx !== -1 ? fullNameIdx : 2;
  const finalLinkIdx = linkIdx !== -1 ? linkIdx : 7;
  const finalPriceIdx = priceIdx !== -1 ? priceIdx : 11;
  const finalCurrencyIdx = currencyIdx !== -1 ? currencyIdx : 12;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const lineLower = line.toLowerCase();

    // Kolla om båda lagen finns med på raden
    const hasHome = homeWords.some(w => lineLower.includes(w));
    const hasAway = awayWords.every(w => lineLower.includes(w)) || awayWords.some(w => lineLower.includes(w));

    if (hasHome && hasAway) {
      // Dela raden på kommatecken
      const cols = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());

      const directUrl = cols[finalLinkIdx] || "";
      const priceRaw = cols[finalPriceIdx];
      const currency = cols[finalCurrencyIdx] || "EUR";

      const price = parseFloat(priceRaw);

      if (directUrl && !isNaN(price) && price > 0) {
        return {
          title: `${homeTeam} vs ${awayTeam}`,
          price: price,
          currency: currency,
          directUrl: directUrl
        };
      }
    }
  }

  return null;
}