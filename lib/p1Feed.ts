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
    // Inaktivera cache tillfälligt ({ cache: 'no-store' }) för att säkerställa färsk data
    const response = await fetch(feedUrl, { cache: 'no-store' });
    if (!response.ok) {
      console.error("P1 Feed Fetch Failed status:", response.status);
      return [];
    }

    const csvText = await response.text();
    const lines = csvText.split('\n');
    console.log(`P1 Feed: Mottog ${lines.length} rader från CSV.`);

    if (lines.length < 2) return [];

    // Identifiera om avgränsaren är semikolon eller komma
    const delimiter = lines[0].includes(';') ? ';' : ',';
    const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
    
    console.log("P1 Feed Kolumner:", headers);

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
  console.log(`Söker i P1 Feed efter: ${homeTeam} vs ${awayTeam} (Totalt ${rows.length} rader)`);

  if (!rows || rows.length === 0) {
    console.log("P1 Feed är tom!");
    return null;
  }

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
    const fullRowText = Object.values(row).join(' ').toLowerCase();

    const hasHome = homeTokens.some(token => fullRowText.includes(token));
    const hasAway = awayTokens.some(token => fullRowText.includes(token));

    return hasHome && hasAway;
  });

  if (matchedRow) {
    console.log("TRÄFF HITTAD I P1 FEED:", matchedRow);

    const rawPrice = matchedRow['price'] || matchedRow['price_eur'] || matchedRow['price_sek'] || matchedRow['buy_price'] || Object.values(matchedRow).find((v: any) => !isNaN(parseFloat(v)) && parseFloat(v) > 10) || '0';
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
  } else {
    console.log(`Ingen träff i P1 Feed för ${homeTeam} vs ${awayTeam}`);
  }

  return null;
}