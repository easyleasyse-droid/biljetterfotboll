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
  ['ticombo-feed-parsed-rows-v6'], // Ny cache-nyckel
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
  
  let rawUrl = cheapestRow['deep_link'] || '';
  let finalAffiliateUrl = rawUrl;

  // Bygg en ren och korrekt Partnerize-länk direkt till eventet
  if (rawUrl) {
    try {
      let dest = rawUrl;

      // Avkoda URL:en om den innehåller destination-parametern
      if (rawUrl.includes('destination:')) {
        dest = decodeURIComponent(rawUrl.split('destination:')[1]);
      } else if (rawUrl.includes('destination=')) {
        dest = decodeURIComponent(rawUrl.split('destination=')[1]);
      }

      // Säkerställ att vi pekar på den specifika event-sidan
      if (dest.includes('/discover/event/')) {
        const eventSlug = dest.split('/discover/event/')[1].split('?')[0];
        const cleanEventUrl = `https://www.ticombo.com/en/discover/event/${eventSlug}`;
        
        // Återuppbygg Partnerize-prefixet med ren URL-kodning
        const partnerizePrefix = "https://ticombo.prf.hn/click/camref:1100l5Rouq/creativeref:1011l158184/destination:";
        finalAffiliateUrl = partnerizePrefix + encodeURIComponent(cleanEventUrl);
      }
    } catch (e) {
      finalAffiliateUrl = rawUrl;
    }
  }

  if (priceNum > 0 && finalAffiliateUrl) {
    return {
      title: cheapestRow['event_name'] || `${homeTeam} vs ${awayTeam}`,
      price: priceNum,
      currency: cheapestRow['currency'] || 'EUR',
      directUrl: finalAffiliateUrl
    };
  }

  return null;
}