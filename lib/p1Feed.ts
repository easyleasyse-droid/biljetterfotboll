import { unstable_cache } from 'next/cache';

export interface P1Ticket {
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
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function parseCsvLineStrict(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

export const fetchP1FeedRows = unstable_cache(
  async (): Promise<any[]> => {
    const feedUrl =
      process.env.P1_FEED_URL ||
      "https://feeds.performancehorizon.com/biljetterfotboll/1011l6401/a1f3f49c2e6d13ca6d33d24088acc238";

    try {
      const response = await fetch(feedUrl, { next: { revalidate: 3600 } });
      if (!response.ok) return [];

      const rawCsv = await response.text();
      const lines = rawCsv.split(/\r?\n/);
      if (lines.length < 2) return [];

      const headers = parseCsvLineStrict(lines[0]).map(h => h.toLowerCase().trim());

      const nameIdx = headers.indexOf('event_name');
      const fullNameIdx = headers.indexOf('event_full_name');
      const homeIdx = headers.indexOf('home_team');
      const awayIdx = headers.indexOf('away_team');
      const linkIdx = headers.indexOf('deep_link');
      const priceIdx = headers.indexOf('min_final_sell_price') !== -1 
        ? headers.indexOf('min_final_sell_price') 
        : headers.indexOf('min_sell_price');
      const currencyIdx = headers.indexOf('currency');
      const dateIdx = headers.indexOf('event_start_date');

      const rows: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line || line.trim().length === 0) continue;

        const cols = parseCsvLineStrict(line);

        const eventName = nameIdx !== -1 && nameIdx < cols.length ? cols[nameIdx] : "";
        const eventFullName = fullNameIdx !== -1 && fullNameIdx < cols.length ? cols[fullNameIdx] : "";
        const homeTeamCol = homeIdx !== -1 && homeIdx < cols.length ? cols[homeIdx] : "";
        const awayTeamCol = awayIdx !== -1 && awayIdx < cols.length ? cols[awayIdx] : "";
        
        const rawUrl = linkIdx < cols.length ? cols[linkIdx] : "";
        const priceRaw = priceIdx < cols.length ? cols[priceIdx] : "";

        if (!rawUrl || !priceRaw) continue;

        const combinedText = `${eventName} ${eventFullName} ${homeTeamCol} ${awayTeamCol} ${rawUrl}`;

        rows.push({
          cleanCombined: cleanTeamName(combinedText),
          date: dateIdx !== -1 && dateIdx < cols.length ? cols[dateIdx] : "",
          price: parseFloat(priceRaw),
          currency: (currencyIdx !== -1 && currencyIdx < cols.length && cols[currencyIdx]) ? cols[currencyIdx] : "EUR",
          url: rawUrl.replace(/^"|"$/g, '')
        });
      }

      return rows;
    } catch (error) {
      console.error("Fel vid laddning av P1 Travel:", error);
      return [];
    }
  },
  ['p1-parsed-rows-v4'],
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
  if (!cleanHome || !cleanAway) return null;

  // Extrahera sökord (t.ex. "liverpool" och "manchester" eller "city")
  const homeKeywords = cleanHome.split(' ').filter(w => w.length > 2);
  const awayKeywords = cleanAway.split(' ').filter(w => w.length > 2);

  const targetDateStr = matchDate ? matchDate.split('T')[0] : null;

  const matches = rows.filter(row => {
    // Säkerställ att minst ett viktigt ord från hemmalaget och bortalaget finns i raden/länken
    const homeFound = homeKeywords.some(w => row.cleanCombined.includes(w));
    const awayFound = awayKeywords.some(w => row.cleanCombined.includes(w));

    if (!homeFound || !awayFound) return false;

    // Datumkontroll
    if (targetDateStr && row.date) {
      const rowDateStr = row.date.split('T')[0];
      if (rowDateStr && rowDateStr !== targetDateStr) {
        const tTime = new Date(targetDateStr).getTime();
        const rTime = new Date(rowDateStr).getTime();
        if (!isNaN(tTime) && !isNaN(rTime)) {
          const diffDays = Math.abs((tTime - rTime) / (1000 * 3600 * 24));
          if (diffDays > 2) return false;
        }
      }
    }

    return !isNaN(row.price) && row.price > 0 && row.url.startsWith("http");
  });

  if (matches.length === 0) return null;

  matches.sort((a, b) => a.price - b.price);
  const best = matches[0]; // Nu med hakparentes!

  return {
    title: `${homeTeam} vs ${awayTeam}`,
    price: best.price,
    currency: best.currency,
    directUrl: best.url
  };
}