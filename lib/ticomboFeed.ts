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

function parseCsvLine(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim().replace(/^"|"$/g, ''));
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim().replace(/^"|"$/g, ''));
  return result;
}

export const fetchTicomboFeedRows = unstable_cache(
  async (): Promise<any[]> => {
    const feedUrl =
      process.env.TICOMBO_FEED_URL ||
      "https://feeds.performancehorizon.com/biljetterfotboll/1011l6399/a1f3f49c2e6d13ca6d33d24088acc238";

    try {
      // AbortController sätter en hård timeout på 2.5 sekunder så sidan aldrig fryser
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(feedUrl, { 
        next: { revalidate: 3600 },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) return [];

      const csvText = await response.text();
      const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
      if (lines.length < 2) return [];

      const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase());

      const rows: any[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        // Snabb-gallring innan tung parsing: ignorera rader som inte rör fotboll/sport
        const lineLower = line.toLowerCase();
        if (!lineLower.includes('sport') && !lineLower.includes('football') && !lineLower.includes('soccer')) {
          continue;
        }

        const values = parseCsvLine(line);
        if (values.length < headers.length) continue;

        const row: Record<string, string> = {};
        headers.forEach((header, idx) => {
          row[header] = values[idx] || '';
        });

        rows.push(row);
      }
      return rows;
    } catch (error) {
      // Om anropet tajmar ut eller misslyckas, returnera tom lista direkt utan att krascha
      return [];
    }
  },
  ['ticombo-feed-parsed-rows-prod'], // Stabil cache-nyckel
  { revalidate: 3600 }
);

export function findTicomboTicketInRows(
  rows: any[], 
  homeTeam: string, 
  awayTeam: string, 
  matchDate?: string
): TicomboTicket | null {
  if (!rows || rows.length === 0) return null;

  const cleanHome = cleanTeamName(homeTeam);
  const cleanAway = cleanTeamName(awayTeam);

  let targetDate = '';
  if (matchDate) {
    const d = new Date(matchDate);
    if (!isNaN(d.getTime())) {
      targetDate = d.toISOString().split('T')[0];
    }
  }

  const matchingRows = rows.filter((row) => {
    const rawEventName = row['event_name'] || row['event_full_name'] || '';
    const rawDeepLink = row['deep_link'] || '';
    
    const fullSearchText = cleanTeamName(`${rawEventName} ${rawDeepLink}`);
    const ticomboDate = (row['event_start_date'] || '').split('T')[0];

    if (targetDate && ticomboDate) {
      const diffDays = Math.abs((new Date(targetDate).getTime() - new Date(ticomboDate).getTime()) / (1000 * 3600 * 24));
      if (diffDays > 3) return false;
    }

    const homeWords = cleanHome.split(' ').filter(w => w.length > 2);
    const awayWords = cleanAway.split(' ').filter(w => w.length > 2);

    const hasHome = homeWords.length > 0 && homeWords.every(w => fullSearchText.includes(w));
    const hasAway = awayWords.length > 0 && awayWords.every(w => fullSearchText.includes(w));

    return hasHome && hasAway;
  });

  if (matchingRows.length === 0) return null;

  matchingRows.sort((a, b) => {
    const priceA = parseFloat(a['min_final_sell_price'] || a['min_sell_price'] || '99999');
    const priceB = parseFloat(b['min_final_sell_price'] || b['min_sell_price'] || '99999');
    return priceA - priceB;
  });

  const cheapestRow = matchingRows[0];
  const priceNum = parseFloat(cheapestRow['min_final_sell_price'] || cheapestRow['min_sell_price'] || '0');
  const rawUrl = cheapestRow['deep_link'] || '';

  if (priceNum > 0 && rawUrl) {
    return {
      title: cheapestRow['event_name'] || `${homeTeam} vs ${awayTeam}`,
      price: priceNum,
      currency: cheapestRow['currency'] || 'EUR',
      directUrl: rawUrl
    };
  }

  return null;
}