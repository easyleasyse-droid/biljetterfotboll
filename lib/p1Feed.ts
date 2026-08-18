export interface P1Ticket {
  title: string;
  price: number;
  currency: string;
  directUrl: string;
}

// Enkel och lättviktig CSV-parser utan externa beroenden
function parseCSV(text: string) {
  const lines = text.split('\n');
  if (lines.length === 0) return [];

  // Läs in rubrikerna på första raden
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const results: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Hanterar kommatecken inuti citattecken
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
    // Hämtar CSV-filen och cachar i 1 timme
    const response = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!response.ok) return null;

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    const homeLower = homeTeam.toLowerCase();
    const awayLower = awayTeam.toLowerCase();

    // Sök efter raden som innehåller båda lagen i titeln
    const matchedRow = rows.find((row: any) => {
      const title = (row.title || row.product_name || '').toLowerCase();
      return title.includes(homeLower) && title.includes(awayLower);
    });

    if (matchedRow) {
      return {
        title: matchedRow.title || matchedRow.product_name,
        price: parseFloat(matchedRow.price) || 0,
        currency: matchedRow.currency || 'EUR',
        directUrl: matchedRow.destination_url || matchedRow.link || ''
      };
    }

    return null;
  } catch (error) {
    console.error("Fel vid hämtning av P1 Feed:", error);
    return null;
  }
}