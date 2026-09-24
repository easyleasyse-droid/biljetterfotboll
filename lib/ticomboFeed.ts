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
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us|cfc|calcio|rcd|de)\b/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
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

export const fetchTicomboParsedRows = unstable_cache(
  async (): Promise<any[]> => {
    const feedUrl =
      process.env.TICOMBO_FEED_URL ||
      "https://feeds.performancehorizon.com/biljetterfotboll/1011l6399/a1f3f49c2e6d13ca6d33d24088acc238";

    try {
      const response = await fetch(feedUrl, { next: { revalidate: 3600 } });
      if (!response.ok) return [];

      const rawCsv = await response.text();
      const lines = rawCsv.split(/\r?\n/);
      if (lines.length < 2) return [];

      const headers = parseCsvLineStrict(lines[0]).map(h => h.toLowerCase().trim());

      const nameIdx = headers.indexOf('event_name');
      const fullNameIdx = headers.indexOf('event_full_name');
      const categoryIdx = headers.indexOf('category');
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

        const category = categoryIdx !== -1 && categoryIdx < cols.length ? cols[categoryIdx].toLowerCase() : "";
        if (category && (category.includes("music") || category.includes("concert"))) continue;

        const eventName = nameIdx !== -1 && nameIdx < cols.length ? cols[nameIdx] : "";
        const eventFullName = fullNameIdx !== -1 && fullNameIdx < cols.length ? cols[fullNameIdx] : "";
        const rawUrl = linkIdx < cols.length ? cols[linkIdx] : "";
        const priceRaw = priceIdx < cols.length ? cols[priceIdx] : "";

        if (!rawUrl || !priceRaw) continue;

        const fullTitleStr = `${eventName} ${eventFullName}`;

        rows.push({
          title: fullTitleStr,
          cleanTitle: cleanTeamName(fullTitleStr),
          date: dateIdx !== -1 && dateIdx < cols.length ? cols[dateIdx] : "",
          price: parseFloat(priceRaw),
          currency: (currencyIdx !== -1 && currencyIdx < cols.length && cols[currencyIdx]) ? cols[currencyIdx] : "EUR",
          url: rawUrl.replace(/^"|"$/g, '')
        });
      }

      return rows;
    } catch (error) {
      console.error("Fel vid laddning av Ticombo:", error);
      return [];
    }
  },
  ['ticombo-parsed-rows-v2'],
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
  if (!cleanHome || !cleanAway) return null;

  const targetIso = matchDate ? parseDateToIso(matchDate) : '';

  const matches = rows.filter(row => {
    // 1. Titel-koll: Båda lagen måste finnas i titeln
    const title = row.cleanTitle;
    const hasHome = title.includes(cleanHome) || cleanHome.includes(title);
    const hasAway = title.includes(cleanAway) || cleanAway.includes(title);

    if (!hasHome || !hasAway) {
      return false;
    }

    // 2. Datum-koll: Tillåt upp till 5 dagars skillnad om båda har giltigt ISO-datum
    if (targetIso && row.date) {
      const rowIso = parseDateToIso(row.date);
      if (rowIso) {
        const tTime = new Date(targetIso).getTime();
        const rTime = new Date(rowIso).getTime();
        if (!isNaN(tTime) && !isNaN(rTime)) {
          const diffDays = Math.abs((tTime - rTime) / (1000 * 3600 * 24));
          if (diffDays > 5) return false;
        }
      }
    }

    return !isNaN(row.price) && row.price > 0 && row.url.startsWith("http");
  });

  if (matches.length === 0) return null;

  matches.sort((a, b) => a.price - b.price);
  const best = matches[0];

  return {
    title: `${homeTeam} vs ${awayTeam}`,
    price: best.price,
    currency: best.currency,
    directUrl: best.url
  };
}