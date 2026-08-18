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

    // Rensa headers från citattecken och skiftläge
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
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

  const getKeywords = (teamName: string): string[] => {
    const clean = cleanTeamName(teamName);
    
    if (clean.includes("inter") && !clean.includes("miami")) {
      return ["inter", "internazionale"];
    }
    if (clean.includes("monza")) {
      return ["monza"];
    }
    if (clean.includes("milan")) {
      return ["milan"];
    }
    if (clean.includes("atletico")) {
      return ["atletico"];
    }
    if (clean.includes("real madrid")) {
      return ["real madrid"];
    }

    const words = clean.split(' ').filter(w => w.length > 2);
    return words.length > 0 ? [words[0]] : [clean];
  };

  const homeKeywords = getKeywords(homeTeam);
  const awayKeywords = getKeywords(awayTeam);

  const matchedRow = rows.find((row) => {
    // Sök i alla tänkbara fält där titeln kan ligga
    const rawTitle = row.title || row.product_name || row['product name'] || row['product_title'] || row.name || row['event_title'] || Object.values(row).join(' ');
    const titleClean = cleanTeamName(rawTitle);

    const hasHome = homeKeywords.some(k => titleClean.includes(k));
    const hasAway = awayKeywords.some(k => titleClean.includes(k));

    return hasHome && hasAway;
  });

  if (matchedRow) {
    // Sök efter pris i alla tänkbara fält
    const rawPrice = matchedRow['price'] || matchedRow['price_eur'] || matchedRow['price_sek'] || matchedRow['buy_price'] || matchedRow['search_price'] || Object.values(matchedRow).find((v: any) => !isNaN(parseFloat(v)) && parseFloat(v) > 10) || '0';
    
    // Sök efter URL i alla tänkbara fält
    const url = matchedRow['destination_url'] || matchedRow['destination url'] || matchedRow['deeplink'] || matchedRow['deep_link'] || matchedRow['link'] || matchedRow['url'] || matchedRow['tracking_url'] || '';
    
    const title = matchedRow['title'] || matchedRow['product_name'] || `${homeTeam} vs ${awayTeam}`;
    const priceNum = parseFloat(rawPrice as string);

    if (priceNum > 0) {
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