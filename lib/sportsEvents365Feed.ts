// lib/sportsEvents365Feed.ts

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

function buildSportsEvents365Url(targetUrl: string, homeTeam?: string, awayTeam?: string): string {
  let url = targetUrl;
  if (!url || url === 'https://www.sportsevents365.com' || url === 'https://www.sportsevents365.com/') {
    if (homeTeam && awayTeam) {
      url = `https://www.sportsevents365.com/search?q=${encodeURIComponent(`${homeTeam} vs${awayTeam}`)}`;
    } else {
      url = 'https://www.sportsevents365.com';
    }
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

function parseSe365Date(dateStr: string): string {
  if (!dateStr) return '';
  if (dateStr.includes('-')) return dateStr.split('T')[0]; // Redan ISO (YYYY-MM-DD)
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return dateStr;
}

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  const allMatches: any[] = [];

  const tournamentRequests = TOURNAMENT_IDS.map(async (tournamentId) => {
    const url = `${BASE_URL}/events/tournament/${tournamentId}?apiKey=${API_KEY}`;
    
    // Hård timeout på 2.5 sekunder för att förhindra seghet på sajten
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache i 1 timme
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (!response.ok) return [];

      const json = await response.json();
      const rawEvents = json.data || json.events || json || [];
      if (!Array.isArray(rawEvents)) return [];

      return rawEvents.map((event: any) => {
        const homeName = event.homeTeam?.name || event.home_team || '';
        const awayName = event.awayTeam?.name || event.away_team || '';
        const formattedDate = parseSe365Date(event.dateOfEvent || event.date || '');

        const rawPrice = event.minTicketPrice?.price ?? event.minPrice ?? 0;
        const currency = event.minTicketPrice?.currency || event.currency || 'EUR';
        const parsedPrice = typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice) || 0;

        const rawUrl = event.eventUrl || event.url || '';

        return {
          id: `se365-${event.id}`,
          merchant: 'SportsEvents365',
          homeTeam: homeName,
          awayTeam: awayName,
          tournament: event.tournament?.name || '',
          venue: event.venue?.name || '',
          city: event.city?.name || '',
          date: formattedDate,
          minPrice: parsedPrice,
          currency: currency,
          url: buildSportsEvents365Url(rawUrl, homeName, awayName),
        };
      });
    } catch (err) {
      clearTimeout(timeoutId);
      return []; // Vid timeout eller fel returneras tom lista snyggt utan krasch
    }
  });

  const results = await Promise.all(tournamentRequests);
  results.forEach(matches => allMatches.push(...matches));

  return {
    success: true,
    count: allMatches.length,
    matches: allMatches,
  };
}