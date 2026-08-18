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

export async function getP1TicketForMatch(homeTeam: string, awayTeam: string): Promise<P1Ticket | null> {
  const feedUrl = process.env.P1_TRAVEL_FEED_URL;

  if (!feedUrl) {
    console.warn("P1_TRAVEL_FEED_URL saknas.");
    return null;
  }

  try {
    const response = await fetch(feedUrl, { cache: 'no-store' });
    if (!response.ok) return null;

    const csvText = await response.text();
    const lines = csvText.split('\n');
    if (lines.length < 2) return null;

    // Läs in rubriker och gör dem till små bokstäver för säker matchning
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());

    const homeKeyword = cleanTeamName(homeTeam).split(' ')[0];
    const awayKeyword = cleanTeamName(awayTeam).split(' ')[0];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      const lineLower = line.toLowerCase();

      // Kolla om båda lagens nyckelord finns på raden
      if (lineLower.includes(homeKeyword) && lineLower.includes(awayKeyword)) {
        // Enkel regex för att dela upp CSV-raden och behålla citattecken-grupper
        const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
        const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());

        const row: Record<string, string> = {};
        headers.forEach((header, idx) => {
          row[header] = cleanValues[idx] || '';
        });

        // Hitta rätt fält oavsett exakt namn i CSV-filen
        const rawPrice = row['price'] || row['price_sek'] || row['buy_price'] || Object.values(row).find(v => !isNaN(parseFloat(v)) && parseFloat(v) > 10) || '0';
        const url = row['destination_url'] || row['destination url'] || row['link'] || row['url'] || row['tracking_url'] || '';
        const title = row['title'] || row['product_name'] || row['name'] || `${homeTeam} vs ${awayTeam}`;

        const priceNum = parseFloat(rawPrice);

        if (priceNum > 0) {
          return {
            title,
            price: priceNum,
            currency: 'EUR',
            directUrl: url
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Fel vid parsa av P1 Feed:", error);
    return null;
  }
}