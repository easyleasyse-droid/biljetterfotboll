const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || 'ef0704884bb49a77a39e981ba7be5fb0';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

const BASE_URL = 'https://api-v2.sportsevents365.com';

const TOURNAMENT_IDS = [
  9,   // Premier League
  24,  // La Liga
  36,  // Serie A
  42,  // UEFA Champions League
  46,  // UEFA Europa League
  12,  // Bundesliga
  13,  // Ligue 1
  15   // Eredivisie
];

function buildSportsEvents365Url(targetUrl: string): string {
  let url = targetUrl?.trim() || 'https://www.sportsevents365.com';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

function parseSe365Date(dateStr: string): string {
  if (!dateStr) return '';
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  return dateStr.split('T')[0];
}

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  const allMatches: any[] = [];

  const tournamentRequests = TOURNAMENT_IDS.map(async (tournamentId) => {
    let page = 1;
    let hasMorePages = true;
    const tournamentMatches: any[] = [];

    while (hasMorePages && page <= 10) {
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
          next: { revalidate: 3600 },
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