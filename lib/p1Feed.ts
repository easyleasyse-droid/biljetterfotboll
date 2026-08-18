export interface P1Ticket {
  title: string;
  price: number;
  currency: string;
  directUrl: string;
}

// Rensar lag-namn från FC, CF, citattecken och gör allt till små bokstäver
function cleanTeamName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Tar bort á, é, ö etc.
    .toLowerCase()
    .replace(/\b(fc|cf|afc|sc|club|cd)\b/g, "") // Tar bort FC, CF osv.
    .trim();
}

function parseCSV(text: string) {
  const lines = text.split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const results: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());

    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = cleanValues[index] || '';
    });
    results.push(row);
  }

  return results;
}

export async function getP1TicketForMatch(homeTeam: string, awayTeam: string): Promise<P1Ticket | null> {
  const feedUrl = process.env.P1_TRAVEL_FEED_URL;

  if (!feedUrl) {
    console.warn("P1_TRAVEL_FEED_URL saknas i miljövariablerna.");
    return null;
  }

  try {
    const response = await fetch(feedUrl, { cache: 'no-store' });
    if (!response.ok) return null;

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    const homeClean = cleanTeamName(homeTeam);
    const awayClean = cleanTeamName(awayTeam);

    // Jämför de städade lagnamnen mot titeln i CSV-filen
    const matchedRow = rows.find((row: any) => {
      const titleClean = cleanTeamName(row.title || row.product_name || '');
      return titleClean.includes(homeClean) && titleClean.includes(awayClean);
    });

    if (matchedRow) {
      return {
        title: matchedRow.title || matchedRow.product_name,
        price: parseFloat(matchedRow.price) || 0,
        currency: matchedRow.currency || 'EUR',
        directUrl: matchedRow.destination_url || matchedRow.link || matchedRow.url || ''
      };
    }

    return null;
  } catch (error) {
    console.error("Fel vid hämtning av P1 Feed:", error);
    return null;
  }
}