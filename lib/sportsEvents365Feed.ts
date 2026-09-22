// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

// Byt till https://api-v2.sportsevents365.com när de aktiverat skarpt API för er
const BASE_URL = process.env.SE365_BASE_URL || 'https://api-v2.sandbox365.com';

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

export function buildSportsEvents365Url(targetUrl: string, isEnglish: boolean = false): string {
  let url = targetUrl || 'https://www.sportsevents365.com';
  if (isEnglish && url.includes('sportsevents365.com')) {
    url = url.replace(/www\.sportsevents365\.com/, 'ticket.sportsevents365.com');
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

  const allMatches: any[] = [];

  // Hämta matcher parallellt för alla valda turneringar
  const tournamentRequests = POPULAR_TOURNAMENTS.map(async (tournament) => {
    const url = `${BASE_URL}/events/tournament/${tournament.id}?apiKey=${API_KEY}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }, // Cacha i 1 timme på Vercel
      });

      if (!response.ok) return [];

      const json = await response.json();
      const rawEvents = json.data || [];

      return rawEvents.map((event: any) => {
        const rawUrl = event.url || event.link || 'https://www.sportsevents365.com';
        return {
          id: `se365-${event.id}`,
          merchant: 'SportsEvents365',
          homeTeam: event.homeTeam || event.name?.split(' vs ')[0] || event.name,
          awayTeam: event.awayTeam || event.name?.split(' vs ')[1] || '',
          tournament: tournament.name,
          tournamentId: tournament.id,
          venue: event.venue?.name || '',
          city: event.city?.name || '',
          country: event.country?.name || '',
          date: event.date || event.startDate,
          minPrice: event.minPrice || event.price || 0,
          currency: event.currency || 'EUR',
          url: buildSportsEvents365Url(rawUrl),
        };
      });
    } catch (err) {
      console.error(`Fel vid hämtning av turnering ${tournament.name}:`, err);
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