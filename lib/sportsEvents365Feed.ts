// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

const BASE_URL = 'https://api-v2.sandbox365.com';

// Bygg utgående affiliate-länk för SportsEvents365
export function buildSportsEvents365Url(targetUrl: string, isEnglish: boolean = false): string {
  let url = targetUrl;
  if (isEnglish && url.includes('sportsevents365.com')) {
    url = url.replace(/www\.sportsevents365\.com/, 'ticket.sportsevents365.com');
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

// Hämta kommande fotbollsmatcher från SportsEvents365
export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

  // Vi söker efter biljetter för fotboll (eventTypeId 1000)
  const endpointUrl = `${BASE_URL}/events?eventTypeId=1000&apiKey=${API_KEY}`;

  try {
    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Cacha i 1 timme
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    const rawEvents = json.data || [];

    // Mappa om svaret till ett strukturerat format för er sajt
    const mappedMatches = rawEvents.map((event: any) => {
      const originalUrl = event.url || 'https://www.sportsevents365.com';
      return {
        id: `se365-${event.id}`,
        merchant: 'SportsEvents365',
        homeTeam: event.homeTeam || event.name?.split(' vs ')[0] || event.name,
        awayTeam: event.awayTeam || event.name?.split(' vs ')[1] || '',
        tournament: event.tournament?.name || '',
        venue: event.venue?.name || '',
        city: event.city?.name || '',
        country: event.country?.name || '',
        date: event.date || event.startDate,
        minPrice: event.minPrice || event.price || 0,
        currency: event.currency || 'EUR',
        url: buildSportsEvents365Url(originalUrl),
      };
    });

    return {
      success: true,
      count: mappedMatches.length,
      matches: mappedMatches,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}