import { unstable_cache } from 'next/cache';

export interface P1Ticket {
  title: string;
  price: number;
  currency: string;
  directUrl: string;
}

// Bättre och mer skonsam rensning som inte raderar ord som "real", "atletico", "city"
function cleanTeamName(name: string): string {
  if (!name) return "";
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Ta bort accenttecken (é -> e, osv)
    .toLowerCase()
    .replace(/[-_]/g, " ")
    // Byt ut vanliga avvikelser
    .replace(/\bbayern munich\b/g, "bayern munchen")
    .replace(/\binter milan\b/g, "inter")
    .replace(/\bac milan\b/g, "milan")
    .replace(/\bathletic bilbao\b/g, "athletic club")
    // Ta bara bort rena klubbprefix/suffix som inte påverkar namnet
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd)\b/g, "")
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
  ['p1-feed-parsed-rows-fixed-v1'],
  { revalidate: 3600 }
);

export function findP1TicketInRows(
  rows: any[],
  homeTeam: string,
  awayTeam: string,
  matchDate?: string
): P1Ticket | null {
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
    const p1Home = cleanTeamName(row['home_team_name'] || row['team_home'] || row['home'] || '');
    const p1Away = cleanTeamName(row['away_team_name'] || row['team_away'] || row['away'] || '');
    const rawP1Date = row['date_start'] || row['event_date'] || '';
    const p1Date = rawP1Date ? rawP1Date.split(' ')[0].split('T')[0] : '';

    // Tillåt upp till 4 dagars diff för TV-flyttade matcher
    if (targetDate && p1Date) {
      const t1 = new Date(targetDate).getTime();
      const t2 = new Date(p1Date).getTime();
      if (!isNaN(t1) && !isNaN(t2)) {
        const diffDays = Math.abs((t1 - t2) / (1000 * 3600 * 24));
        if (diffDays > 4) return false;
      }
    }

    if (p1Home && p1Away) {
      // Flexibel matchning där båda lagens namn måste stämma överens
      const isHomeMatch = p1Home.includes(cleanHome) || cleanHome.includes(p1Home);
      const isAwayMatch = p1Away.includes(cleanAway) || cleanAway.includes(p1Away);
      return isHomeMatch && isAwayMatch;
    }

    return false;
  });

  if (matchingRows.length === 0) return null;

  // Sortera så vi väljer det billigaste priset för matchen
  matchingRows.sort((a, b) => {
    const priceA = parseFloat(a['price'] || '99999');
    const priceB = parseFloat(b['price'] || '99999');
    return priceA - priceB;
  });

  const cheapestRow = matchingRows[0];
  const priceNum = parseFloat(cheapestRow['price'] || '0');
  const directUrl = cheapestRow['producturl'] || cheapestRow['product_url'] || '';

  if (priceNum > 0 && directUrl) {
    return {
      title: cheapestRow['name'] || `${homeTeam} vs ${awayTeam}`,
      price: priceNum,
      currency: 'EUR',
      directUrl: directUrl
    };
  }

  return null;
}