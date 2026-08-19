import { unstable_cache } from 'next/cache';

export interface P1Ticket {
  title: string;
  price: number;
  currency: string;
  directUrl: string;
}

function cleanTeamName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(18\d\d|19\d\d|20\d\d)\b/g, "")
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio)\b/g, "")
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

export const fetchP1FeedRows = unstable_cache(
  async (): Promise<any[]> => {
    const feedUrl = process.env.P1_TRAVEL_FEED_URL;
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

        // Filipera bort allt som inte är fotboll direkt vid inläsning
        const categories = (row['categories'] || row['subcategories'] || '').toLowerCase();
        if (categories.includes('motorsports') || categories.includes('formula')) continue;

        rows.push(row);
      }
      return rows;
    } catch (error) {
      console.error("Fel vid hämtning av P1 Feed:", error);
      return [];
    }
  },
  ['p1-feed-parsed-rows-v2'],
  { revalidate: 3600 }
);

export function findP1TicketInRows(rows: any[], homeTeam: string, awayTeam: string): P1Ticket | null {
  if (!rows || rows.length === 0) return null;

  const cleanHome = cleanTeamName(homeTeam);
  const cleanAway = cleanTeamName(awayTeam);

  const matchedRow = rows.find((row) => {
    const p1Home = cleanTeamName(row['home_team_name'] || '');
    const p1Away = cleanTeamName(row['away_team_name'] || '');
    const name = cleanTeamName(row['name'] || '');

    // 1. Exakt matchning på home_team_name & away_team_name
    if (p1Home && p1Away) {
      const homeMatch = p1Home.includes(cleanHome) || cleanHome.includes(p1Home);
      const awayMatch = p1Away.includes(cleanAway) || cleanAway.includes(p1Away);
      if (homeMatch && awayMatch) return true;
    }

    // 2. Reservsökning i namn-fältet
    return name.includes(cleanHome) && name.includes(cleanAway);
  });

  if (!matchedRow) return null;

  const priceNum = parseFloat(matchedRow['price'] || '0');
  const directUrl = matchedRow['producturl'] || matchedRow['product_url'] || '';

  if (priceNum > 0 && directUrl) {
    return {
      title: matchedRow['name'] || `${homeTeam} vs ${awayTeam}`,
      price: priceNum,
      currency: 'EUR',
      directUrl: directUrl
    };
  }

  return null;
}