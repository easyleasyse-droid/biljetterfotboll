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
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd|real|atletico|atletico de)\b/g, "")
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
    // Direkt URL utan .env-beroende
    const feedUrl = process.env.TICOMBO_FEED_URL || "https://feeds.performancehorizon.com/biljetterfotboll/1011l6399/a1f3f49c2e6d13ca6d33d24088acc238";
    if (!feedUrl) return [];

    try {
      const response = await fetch(feedUrl, { cache: 'no-store' });
      if (!response.ok) return [];

      const csvText = await response.text();
      const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
      if (lines.length < 2) return [];

      const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase());

      const rows: any[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        if (values.length < headers.length) continue;

        const row: Record<string, string> = {};
        headers.forEach((header, idx) => {
          row[header] = values[idx] || '';
        });

        rows.push(row);
      }
      return rows;
    } catch (error) {
      console.error("Fel vid hämtning av Ticombo Feed:", error);
      return [];
    }
  },
  ['ticombo-feed-parsed-rows-v1'],
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
    const tHome = cleanTeamName(row['home_team_name'] || row['home_team'] || '');
    const tAway = cleanTeamName(row['away_team_name'] || row['away_team'] || '');
    const tDate = (row['date_start'] || row['event_date'] || row['date'] || '').split(' ')[0].split('T')[0];

    // Max 3 dagars förskjutning på datum
    if (targetDate && tDate) {
      const diffDays = Math.abs((new Date(targetDate).getTime() - new Date(tDate).getTime()) / (1000 * 3600 * 24));
      if (diffDays > 3) return false;
    }

    if (tHome && tAway) {
      const isHome = tHome === cleanHome || tHome.includes(cleanHome) || cleanHome.includes(tHome);
      const isAway = tAway === cleanAway || tAway.includes(cleanAway) || cleanAway.includes(tAway);
      return isHome && isAway;
    }

    // Fallback om enskilda lagkolumner saknas i Ticombos feed
    const fullName = cleanTeamName(row['name'] || row['title'] || '');
    return fullName.includes(cleanHome) && fullName.includes(cleanAway);
  });

  if (matchingRows.length === 0) return null;

  // Sortera för att alltid välja den BILLIGASTE biljetten
  matchingRows.sort((a, b) => {
    const priceA = parseFloat(a['price'] || a['price_amount'] || '99999');
    const priceB = parseFloat(b['price'] || b['price_amount'] || '99999');
    return priceA - priceB;
  });

  const cheapest = matchingRows[0];
  const priceNum = parseFloat(cheapest['price'] || cheapest['price_amount'] || '0');
  const directUrl = cheapest['producturl'] || cheapest['product_url'] || cheapest['deeplink'] || cheapest['link'] || '';
  const currency = (cheapest['currency'] || 'EUR').toUpperCase();

  if (priceNum > 0 && directUrl) {
    return {
      title: cheapest['name'] || cheapest['title'] || `${homeTeam} vs ${awayTeam}`,
      price: priceNum,
      currency: currency,
      directUrl: directUrl
    };
  }

  return null;
}