export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  const allMatches: any[] = [];

  const tournamentRequests = TOURNAMENT_IDS.map(async (tournamentId) => {
    let page = 1;
    let hasMorePages = true;
    const tournamentMatches: any[] = [];

    // Loopa igenom alla sidor för turneringen tills inga fler matcher finns
    while (hasMorePages && page <= 10) { // Säkerhetsspärr på max 10 sidor per liga
      const url = `${BASE_URL}/events/tournament/${tournamentId}?apiKey=${API_KEY}&currency=EUR&page=${page}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': authHeader,
            'Accept': 'application/json',
          },
          next: { revalidate: 3600 }, // Snabb cache (1 timme)
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        if (!response.ok) {
          hasMorePages = false;
          break;
        }

        const json = await response.json();
        const rawEvents = json.data || json.events || (Array.isArray(json) ? json : []);
        
        if (!Array.isArray(rawEvents) || rawEvents.length === 0) {
          hasMorePages = false;
          break;
        }

        const mapped = rawEvents.map((event: any) => {
          const homeName = event.homeTeam?.name || event.home_team || '';
          const awayName = event.awayTeam?.name || event.away_team || '';
          const formattedDate = parseSe365Date(event.dateOfEvent || event.date || '');

          const rawPrice = event.minTicketPrice?.price ?? event.minPrice ?? 0;
          const currency = event.minTicketPrice?.currency || event.currency || 'EUR';
          const parsedPrice = typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice) || 0;

          const rawUrl = event.eventUrl || event.url || '';

          return {
            id: `se365-${event.id}`,
            merchant: 'Sports Events 365',
            homeTeam: homeName,
            awayTeam: awayName,
            tournament: event.tournament?.name || '',
            venue: event.venue?.name || '',
            city: event.city?.name || '',
            date: formattedDate,
            minPrice: parsedPrice,
            currency: currency,
            url: buildSportsEvents365Url(rawUrl),
          };
        });

        tournamentMatches.push(...mapped);

        // Om sidan returnerade färre än 10 matcher finns det inga fler sidor att hämta
        if (rawEvents.length < 10) {
          hasMorePages = false;
        } else {
          page++;
        }
      } catch (err) {
        clearTimeout(timeoutId);
        hasMorePages = false;
      }
    }

    return tournamentMatches;
  });

  const results = await Promise.all(tournamentRequests);
  results.forEach(matches => allMatches.push(...matches));

  return {
    success: true,
    count: allMatches.length,
    matches: allMatches,
  };
}