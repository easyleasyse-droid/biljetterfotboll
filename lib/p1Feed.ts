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

export async function fetchP1FeedRows(): Promise<any[]> {
  const feedUrl = process.env.P1_TRAVEL_FEED_URL;

  if (!feedUrl) {
    console.warn("P1_TRAVEL_FEED_URL saknas.");
    return [];
  }

  try {
    const response = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!response.ok) return [];

    const csvText = await response.text();
    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const delimiter = lines[0].includes(';') ? ';' : ',';
    const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());

    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      const values = line.split(delimiter);
      const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());

      const row: Record<string, string> = {};
      headers.forEach((header, idx) => {
        row[header] = cleanValues[idx] || '';
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

  const getTeamTokens = (teamName: string): string[] => {
    const clean = cleanTeamName(teamName);

    if (clean.includes("inter") && !clean.includes("miami") && !clean.includes("turku")) {
      return ["inter", "internazionale"];
    }
    if (clean.includes("monza")) {
      return ["monza"];
    }
    if (clean.includes("milan") && !clean.includes("inter")) {
      return ["milan"];
    }

    return clean.split(' ').filter(w => w.length > 2);
  };

  const homeTokens = getTeamTokens(homeTeam);
  const awayTokens = getTeamTokens(awayTeam);

  const matchedRow = rows.find((row) => {
    // Sök ENBART i titel-/produktfälten så vi inte råkar träffa fel rad
    const titleText = (
      row.title || 
      row.product_name || 
      row['product title'] || 
      row['product_name'] || 
      row.name || 
      row.event_title || 
      ''
    ).toLowerCase();

    const hasHome = homeTokens.some(token => titleText.includes(token));
    const hasAway = awayTokens.some(token => titleText.includes(token));

    return hasHome && hasAway;
  });

  if (matchedRow) {
    const rawPrice = matchedRow['price'] || matchedRow['price_eur'] || matchedRow['price_sek'] || matchedRow['buy_price'] || '0';
    const url = matchedRow['destination_url'] || matchedRow['destination url'] || matchedRow['deeplink'] || matchedRow['deep_link'] || matchedRow['link'] || matchedRow['url'] || matchedRow['tracking_url'] || '';
    const title = matchedRow['title'] || matchedRow['product_name'] || `${homeTeam} vs ${awayTeam}`;

    const priceNum = parseFloat(rawPrice as string);

    if (priceNum > 0 && url) {
      return {
        title,
        price: priceNum,
        currency: 'EUR',
        directUrl: url as string
      };
    }
  }

  return null;
}