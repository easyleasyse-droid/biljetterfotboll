import { unstable_cache } from 'next/cache';

export interface P1Ticket {
  title: string;
  price: number;
  currency: string;
  directUrl: string;
}

// Förbättrad namntvätt som INTE raderar lagnamn som Atletico eller Real
function cleanTeamName(name: string): string {
  if (!name) return "";
  
  let cleaned = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const synonyms: Record<string, string> = {
    'psg': 'paris saint germain',
    'paris sg': 'paris saint germain',
    'bayern munchen': 'bayern munich',
    'bayern': 'bayern munich',
    'inter milan': 'inter',
    'internazionale': 'inter',
    'ath bilbao': 'athletic bilbao',
    'atletico de madrid': 'atletico madrid',
    'atletico madrid': 'atletico madrid',
  };

  if (synonyms[cleaned.trim()]) {
    cleaned = synonyms[cleaned.trim()];
  }

  return cleaned
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Bättre CSV-splitter som hanterar fnuttar och komman i fält
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

// Robust datumomvandlare
function parseDateToIso(dateStr: string): string {
  if (!dateStr) return '';
  const clean = dateStr.trim().split(' ')[0].split('T')[0];
  if (clean.includes('/')) {
    const parts = clean.split('/');
    if (parts.length === 3) {
      if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  }
  return clean;
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
  ['p1-feed-parsed-rows-v6'],
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

  const targetIso = matchDate ? parseDateToIso(matchDate) : '';

  const matchingRows = rows.filter((row) => {
    // Sök bland alla tänkbara kolumnnamn för hemmalag/bortalag i P1:s CSV
    const p1HomeRaw = row['home_team_name'] || row['home_team'] || row['hometeam'] || '';
    const p1AwayRaw = row['away_team_name'] || row['away_team'] || row['awayteam'] || '';
    
    const p1Home = cleanTeamName(p1HomeRaw);
    const p1Away = cleanTeamName(p1AwayRaw);

    const p1DateRaw = row['date_start'] || row['event_date'] || row['date'] || '';
    const p1Iso = parseDateToIso(p1DateRaw);

    // Om båda har giltiga datum, tillåt upp till 5 dagars diff (spelscheman flyttas ofta)
    if (targetIso && p1Iso) {
      const tTime = new Date(targetIso).getTime();
      const pTime = new Date(p1Iso).getTime();
      if (!isNaN(tTime) && !isNaN(pTime)) {
        const diffDays = Math.abs((tTime - pTime) / (1000 * 3600 * 24));
        if (diffDays > 5) return false;
      }
    }

    if (p1Home && p1Away) {
      const isHomeMatch = p1Home === cleanHome || p1Home.includes(cleanHome) || cleanHome.includes(p1Home);
      const isAwayMatch = p1Away === cleanAway || p1Away.includes(cleanAway) || cleanAway.includes(p1Away);
      return isHomeMatch && isAwayMatch;
    }

    return false;
  });

  if (matchingRows.length === 0) return null;

  matchingRows.sort((a, b) => {
    const priceA = parseFloat(a['price'] || a['min_price'] || '99999');
    const priceB = parseFloat(b['price'] || b['min_price'] || '99999');
    return priceA - priceB;
  });

  const cheapestRow = matchingRows[0];
  const priceNum = parseFloat(cheapestRow['price'] || cheapestRow['min_price'] || '0');
  const directUrl = cheapestRow['producturl'] || cheapestRow['product_url'] || cheapestRow['url'] || '';

  if (priceNum > 0 && directUrl) {
    return {
      title: cheapestRow['name'] || cheapestRow['title'] || `${homeTeam} vs ${awayTeam}`,
      price: priceNum,
      currency: 'EUR',
      directUrl: directUrl
    };
  }

  return null;
}