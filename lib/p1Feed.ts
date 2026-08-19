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

  const getKeywords = (teamName: string): string[] => {
    const cleaned = cleanTeamName(teamName);

    if (cleaned.includes("inter") && !cleaned.includes("miami") && !cleaned.includes("turku")) {
      return ["inter", "internazionale"];
    }

    const words = cleaned.split(' ').filter(w => w.length > 2);
    return words.length > 0 ? words : [cleaned];
  };

  const homeKeywords = getKeywords(homeTeam);
  const awayKeywords = getKeywords(awayTeam);

  const matchedRow = rows.find((row) => {
    // Skapa en samlad titel-sträng från de vanligaste namnfälten
    const itemTitle = (
      row.title || 
      row.product_name || 
      row['product title'] || 
      row.name || 
      Object.values(row).slice(0, 3).join(' ')
    ).toLowerCase();

    // 1. Filtrera Bort Formel 1 & Övriga Icke-Fotbollsevent
    if (itemTitle.includes("gp ") || itemTitle.includes("grand prix") || itemTitle.includes("formula") || itemTitle.includes("f1 ")) {
      return false;
    }

    // 2. Kräv att HUVUDORDEN från BÅDA lagen finns i titeln
    const hasHome = homeKeywords.some(kw => itemTitle.includes(kw));
    const hasAway = awayKeywords.some(kw => itemTitle.includes(kw));

    return hasHome && hasAway;
  });

  if (!matchedRow) {
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