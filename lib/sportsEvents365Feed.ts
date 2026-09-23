// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || 'ef0704884bb49a77a39e981ba7be5fb0';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

const BASE_URL = 'https://api-v2.sportsevents365.com';

export const POPULAR_TOURNAMENTS = [
  { id: 9, name: 'Premier League' },
  { id: 24, name: 'La Liga' },
  { id: 36, name: 'Serie A' },
  { id: 42, name: 'UEFA Champions League' },
  { id: 46, name: 'UEFA Europa League' },
  { id: 12, name: 'Bundesliga' },
  { id: 13, name: 'Ligue 1' },
  { id: 15, name: 'Eredivisie' }
];

export function buildSportsEvents365Url(targetUrl: string, homeTeam?: string, awayTeam?: string): string {
  let url = targetUrl;

  if (!url || url === 'https://www.sportsevents365.com' || url === 'https://www.sportsevents365.com/') {
    if (homeTeam && awayTeam) {
      const query = encodeURIComponent(`${homeTeam} vs ${awayTeam}`);
      url = `https://www.sportsevents365.com/search?q=${query}`;
    } else {
      url = 'https://www.sportsevents365.com';
    }
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  const allMatches: any[] = [];

  const tournamentRequests = POPULAR_TOURNAMENTS.map(async (tournament) => {
    const url = `${BASE_URL}/events/tournament/${tournament.id}?apiKey=${API_KEY}`;
    
    // Hard timeout på 2 sekunder
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
        },
        // Cache på fetch-nivå (1 timme)
        next: { revalidate: 3600 },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) return [];

      const json = await response.json();
      const rawEvents = json.data || json.events || json || [];

      if (!Array.isArray(rawEvents)) return [];

      return rawEvents.map((event: any) => {
        const getTeamName = (teamField: any) => {
          if (!teamField) return '';
          if (typeof teamField === 'string') return teamField;
          if (typeof teamField === 'object' && teamField.name) return teamField.name;
          return '';
        };

        const homeName = getTeamName(event.homeTeam) || getTeamName(event.home_team) || event.name?.split(' vs ')[0] || event.title?.split(' vs ')[0] || '';
        const awayName = getTeamName(event.awayTeam) || getTeamName(event.away_team) || event.name?.split(' vs ')[1] || event.title?.split(' vs ')[1] || '';
        
        const matchDate = event.date || event.date_time || event.dateTime || event.startDate || event.start_date || '';

        const rawPrice = event.minPrice ?? event.min_price ?? event.startingPrice ?? event.starting_price ?? event.price ?? event.lowestPrice ?? 0;
        const parsedPrice = typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice) || 0;

        const rawUrl = event.url || event.link || event.event_url || event.buy_url || event.deep_link || '';

        return {
          id: `se365-${event.id}`,
          merchant: 'SportsEvents365',
          homeTeam: homeName,
          awayTeam: awayName,
          tournament: tournament.name,
          tournamentId: tournament.id,
          venue: typeof event.venue === 'object' ? (event.venue?.name || '') : (event.venue || ''),
          city: typeof event.city === 'object' ? (event.city?.name || '') : (event.city || ''),
          country: typeof event.country === 'object' ? (event.country?.name || '') : (event.country || ''),
          date: matchDate,
          minPrice: parsedPrice,
          currency: event.currency || event.currency_code || 'EUR',
          url: buildSportsEvents365Url(rawUrl, homeName, awayName),
        };
      });
    } catch (err) {
      clearTimeout(timeoutId);
      return [];
    }
  });

  const results = await Promise.all(tournamentRequests);
  results.forEach(matches => allMatches.push(...matches));

  return {
    success: true,
    totalMatches: allMatches.length,
    tournamentsCount: POPULAR_TOURNAMENTS.length,
    matches: allMatches,
  };
}