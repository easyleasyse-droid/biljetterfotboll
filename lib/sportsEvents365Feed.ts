// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || 'ef0704884bb49a77a39e981ba7be5fb0';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

// Hjälpfunktion för att bygga affiliate-länk
export function buildSportsEvents365Url(targetUrl: string): string {
  if (!targetUrl) return '';
  const separator = targetUrl.includes('?') ? '&' : '?';
  return `${targetUrl}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

// Hjälpfunktion för att göra MM/DD/YYYY till YYYY-MM-DD
function parseSe365Date(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return dateStr;
}

export async function fetchSportsEvents365Matches(tournamentId: number = 9) {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  const url = `https://api-v2.sportsevents365.com/events/tournament/${tournamentId}?apiKey=${API_KEY}`;

  try {
    const response = await fetch(url, {
      headers: { 
        'Authorization': authHeader, 
        'Accept': 'application/json' 
      },
      next: { revalidate: 3600 }, // Cacha svaret i 1 timme
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    const rawEvents = json.data || [];

    // Mappa om till rent format för er sajt
    const mappedMatches = rawEvents.map((event: any) => {
      const formattedDate = parseSe365Date(event.dateOfEvent);
      const fullIsoDate = formattedDate && event.timeOfEvent 
        ? `${formattedDate}T${event.timeOfEvent}:00` 
        : formattedDate;

      return {
        id: `se365-${event.id}`,
        merchant: 'SportsEvents365',
        eventName: event.name,
        homeTeam: event.homeTeam?.name || event.name?.split(' - ')[0] || '',
        awayTeam: event.awayTeam?.name || event.name?.split(' - ')[1] || '',
        tournament: event.tournament?.name || '',
        venue: event.venue?.name || '',
        city: event.city?.name || '',
        country: event.country?.name || '',
        date: fullIsoDate,
        dateFormatted: formattedDate,
        time: event.timeOfEvent || '',
        minPrice: event.minTicketPrice?.price || 0,
        currency: event.minTicketPrice?.currency || 'SEK',
        availableTickets: event.availableCategoriesQuantity || 0,
        url: buildSportsEvents365Url(event.eventUrl),
      };
    });

    return {
      success: true,
      count: mappedMatches.length,
      currentPage: json.meta?.current_page || 1,
      lastPage: json.meta?.last_page || 1,
      matches: mappedMatches,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}