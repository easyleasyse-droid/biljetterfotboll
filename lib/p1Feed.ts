export async function getP1TicketForMatch(homeTeam: string, awayTeam: string): Promise<P1Ticket | null> {
  const feedUrl = process.env.P1_TRAVEL_FEED_URL;

  if (!feedUrl) {
    console.warn("P1_TRAVEL_FEED_URL saknas.");
    return null;
  }

  try {
    // Sätter cache till 'no-store' för att alltid hämta senaste CSV-filen
    const response = await fetch(feedUrl, { cache: 'no-store' });
    if (!response.ok) return null;

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    const homeClean = cleanTeamName(homeTeam);
    const awayClean = cleanTeamName(awayTeam);

    // Hämta bara det första riktiga ordet för varje lag (t.ex. "atletico" och "malaga")
    const homeKeyword = homeClean.split(' ')[0];
    const awayKeyword = awayClean.split(' ')[0];

    const matchedRow = rows.find((row: any) => {
      const titleClean = cleanTeamName(row.title || row.product_name || '');
      // Kollar bara om "atletico" och "malaga" finns i P1's titel
      return titleClean.includes(homeKeyword) && titleClean.includes(awayKeyword);
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