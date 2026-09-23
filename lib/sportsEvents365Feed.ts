// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';
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

  const tournamentRequests = POPULAR_TOURNAMENTS.map(async (tournament) => {
    const url = `${BASE_URL}/events/tournament/${tournament.id}?apiKey=${API_KEY}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) return [];

      const json = await response.json();
      const rawEvents = json.data || json.events || json || [];

      return rawEvents.map((event: any) => {
        // HÄR ÄR HÄMTNINGEN FRÅN homeKey OCH awayKey (Rad 45-48)
        const homeName = typeof event.homeKey === 'object' 
          ? (event.homeKey?.name || event.homeKey?.title || '') 
          : (event.homeKey || event.homeTeam || event.home_team || '');

        const awayName = typeof event.awayKey === 'object' 
          ? (event.awayKey?.name || event.awayKey?.title || '') 
          : (event.awayKey || event.awayTeam || event.away_team || '');

        // Datumhantering
        const matchDate = event.date_time || event.dateTime || event.event_date || event.date || '';

        // Prishantering
        let price = 0;
        if (typeof event.min_price === 'object' && event.min_price !== null) {
          price = event.min_price.amount || event.min_price.price || event.min_price.value || 0;
        } else if (typeof event.min_price === 'number') {
          price = event.min_price;
        } else if (typeof event.minPrice === 'number') {
          price = event.minPrice;
        }

        // Valuta
        const currency = event.min_price?.currency || event.currency || 'EUR';

        // URL / Länk
        const rawUrl = event.url || event.event_url || event.link || `https://www.sportsevents365.com`;
        const finalUrl = buildSportsEvents365Url(rawUrl);

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
          minPrice: price,
          currency: currency,
          url: finalUrl,
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