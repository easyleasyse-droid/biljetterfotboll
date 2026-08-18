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
    .replace(/\b(fc|cf|afc|sc|club|cd|as|ac|ss|rc|sd|ud|us)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsvLine(text: string, delimiter: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === delimiter && !inQuotes) {
      result.push(cur.trim().replace(/^"|"$/g, ''));
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim().replace(/^"|"$/g, ''));
  return result;
}

export async function fetchP1FeedRows(): Promise<any[]> {
  const feedUrl = process.env.P1_TRAVEL_FEED_URL;

  if (!feedUrl) {
    console.warn("P1_TRAVEL_FEED_URL saknas.");
    return [];
  }

  try {
    const response = await fetch(feedUrl, { cache: 'no-store' });
    if (!response.ok) return [];

    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return [];

    const delimiter = lines[0].includes(';') ? ';' : ',';
    const headers = parseCsvLine(lines[0], delimiter).map(h => h.toLowerCase());

    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvLine(lines[i], delimiter);
      if (values.length < 2) continue;

      const row: Record<string, string> = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx] || '';
      });
      rows.push(row);
    }

    return rows;
  } catch (error) {
    console.error("Fel vid hämtning av P1 Feed:", error);
    return [];
  }
}

export function findP1TicketInRows(rows: any[], homeTeam: string, awayTeam: string): P1Ticket | null {
  if (!rows || rows.length === 0) return null;

  // Hämta enbart ord med fler än 2 tecken för flexibel matchning
  const homeClean = cleanTeamName(homeTeam);
  const awayClean = cleanTeamName(awayTeam);

  // Sök efter rad där titeln/texten innehåller något av orden
  const matchedRow = rows.find((row) => {
    const fullRowText = Object.values(row).join(' ').toLowerCase();
    
    // Testa om båda lagnamnen (eller delar av dem) finns med
    const hasHome = fullRowText.includes(homeClean) || (homeClean.includes("inter") && fullRowText.includes("inter"));
    const hasAway = fullRowText.includes(awayClean) || (awayClean.includes("monza") && fullRowText.includes("monza"));

    return hasHome && hasAway;
  });

  if (!matchedRow) {
    // LOGGA VARFÖR DET MISSLYCKAS (Skriver ut de första 3 titlarna i feeden i Vercel Logs)
    const sampleTitles = rows.slice(0, 3).map(r => r.title || r.product_name || r.name || Object.values(r)[0]);
    console.log(`[P1 SEARCH FAIL] Sökte efter: "${homeTeam}" vs "${awayTeam}". Feeden har ${rows.length} rader. Exempel på titlar i feeden:`, sampleTitles);
    return null;
  }

  const rawPrice = 
    matchedRow['price'] || 
    matchedRow['price_eur'] || 
    matchedRow['price_sek'] || 
    matchedRow['buy_price'] || 
    matchedRow['search_price'] ||
    Object.values(matchedRow).find((v: any) => !isNaN(parseFloat(v)) && parseFloat(v) > 10) || 
    '0';

  const url = 
    matchedRow['destination_url'] || 
    matchedRow['destination url'] || 
    matchedRow['deeplink'] || 
    matchedRow['deep_link'] || 
    matchedRow['link'] || 
    matchedRow['url'] || 
    matchedRow['tracking_url'] || 
    '';

  const title = matchedRow['title'] || matchedRow['product_name'] || matchedRow['name'] || `${homeTeam} vs ${awayTeam}`;
  const priceNum = parseFloat(rawPrice as string);

  if (priceNum > 0 && url) {
    return {
      title,
      price: priceNum,
      currency: 'EUR',
      directUrl: url as string
    };
  }

  return null;
}