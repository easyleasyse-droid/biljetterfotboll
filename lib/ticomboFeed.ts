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

  // Specialhantering för Inter
  if (cleaned.includes("inter") && !cleaned.includes("miami") && !cleaned.includes("turku")) {
    return "inter";
  }

  // OBS: Vi har tagit bort 'atletico' och 'real' från rensningen så att lag som Atletico Madrid / Real Madrid inte blir enbart 'madrid'
  return cleaned
    .replace(/\b(18\d\d|19\d\d|20\d\d)\b/g, "")
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd|atletico de)\b/g, "")
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

        // Filtrera bort allt som inte har med sport/fotboll att göra
        const category = (row['category'] || '').toLowerCase();
        if (!category.includes('sport') && !category.includes('football') && !category.includes('soccer')) {
          continue;
        }

        rows.push(row);
      }
      return rows;
    } catch (error) {
      console.error("Fel vid hämtning av Ticombo Feed:", error);
      return [];
    }
  },
  ['ticombo-feed-parsed-rows-v3'], // Ny cache-nyckel
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
    const cleanEvent = cleanTeamName(rawEventName);
    const ticomboDate = (row['event_start_date'] || '').split('T')[0];

    // Datumkontroll (max 3 dagars diff)
    if (targetDate && ticomboDate) {
      const diffDays = Math.abs((new Date(targetDate).getTime() - new Date(ticomboDate).getTime()) / (1000 * 3600 * 24));
      if (diffDays > 3) return false;
    }

    // Matchning: Både hemmalag och bortalag måste finnas med i event-namnet
    const hasHome = cleanEvent.includes(cleanHome) || cleanHome.split(' ').some(word => word.length > 3 && cleanEvent.includes(word));
    const hasAway = cleanEvent.includes(cleanAway) || cleanAway.split(' ').some(word => word.length > 3 && cleanEvent.includes(word));

    return hasHome && hasAway;
  });

  if (matchingRows.length === 0) return null;

  // Sortera ut lägsta priset
  matchingRows.sort((a, b) => {
    const priceA = parseFloat(a['min_final_sell_price'] || a['min_sell_price'] || '99999');
    const priceB = parseFloat(b['min_final_sell_price'] || b['min_sell_price'] || '99999');
    return priceA - priceB;
  });

  const cheapestRow = matchingRows[0];
  const priceNum = parseFloat(cheapestRow['min_final_sell_price'] || cheapestRow['min_sell_price'] || '0');
  
  let rawUrl = cheapestRow['deep_link'] || '';

  // KORREKT HANDSKE FÖR TICOMBO/PARTNERIZE DEEPLINKS:
  // Vi extraherar och säkerställer att destination-URL:en är rätt formaterad och kodad.
  if (rawUrl && rawUrl.includes('destination:')) {
    const parts = rawUrl.split('destination:');
    const prefix = parts[0] + 'destination:';
    let dest = decodeURIComponent(parts[1]);

    // Om länken saknar språkkod t.ex. /discover/event/, lägg till /en/
    if (dest.includes('/discover/event/') && !dest.includes('/en/discover/event/')) {
      dest = dest.replace('/discover/event/', '/en/discover/event/');
    }

    rawUrl = prefix + encodeURIComponent(dest);
  }

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