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
    .replace(/\b(fc|cf|afc|sc|club|cd)\b/g, "")
    .trim();
}

// Hämtar hela CSV-feeden EN gång och cachar svaret i 1 timme
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

// Blixtsnabb sökning i den redan hämtade feeden i minnet
export function findP1TicketInRows(rows: any[], homeTeam: string, awayTeam: string): P1Ticket | null {
  if (!rows || rows.length === 0) return null;

  const homeKeyword = cleanTeamName(homeTeam).split(' ')[0];
  const awayKeyword = cleanTeamName(awayTeam).split(' ')[0];

  const matchedRow = rows.find((row) => {
    const titleClean = cleanTeamName(row.title || row.product_name || row.name || '');
    return titleClean.includes(homeKeyword) && titleClean.includes(awayKeyword);
  });

  if (matchedRow) {
    const rawPrice = matchedRow['price'] || matchedRow['price_sek'] || matchedRow['buy_price'] || Object.values(matchedRow).find((v: any) => !isNaN(parseFloat(v)) && parseFloat(v) > 10) || '0';
    const url = matchedRow['destination_url'] || matchedRow['destination url'] || matchedRow['link'] || matchedRow['url'] || matchedRow['tracking_url'] || '';
    const title = matchedRow['title'] || matchedRow['product_name'] || matchedRow['name'] || `${homeTeam} vs ${awayTeam}`;

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