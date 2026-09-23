// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || 'ef0704884bb49a77a39e981ba7be5fb0';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

// Hjälpfunktion för att bygga affiliate-länk
function buildSportsEvents365Url(targetUrl: string): string {
  if (!targetUrl) return '';
  const separator = targetUrl.includes('?') ? '&' : '?';
  return `${targetUrl}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

// Hjälpfunktion för att konvertera MM/DD/YYYY till YYYY-MM-DD
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
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    const rawEvents = json.data || [];

    const mappedMatches = rawEvents.map((event: any) => {
      const formattedDate = parseSe365Date(event.dateOfEvent);
      
      return {
        id: `se365-${event.id}`,
        merchant: 'SportsEvents365',
        eventName: event.name,
        homeTeam: event.homeTeam?.name || '',
        awayTeam: event.awayTeam?.name || '',
        tournament: event.tournament?.name || '',
        venue: event.venue?.name || '',
        city: event.city?.name || '',
        date: formattedDate,
        time: event.timeOfEvent || '',
        minPrice: event.minTicketPrice?.price || null,
        currency: event.minTicketPrice?.currency || 'SEK',
        availableTickets: event.availableCategoriesQuantity || 0,
        url: buildSportsEvents365Url(event.eventUrl),
      };
    });

    return {
      success: true,
      count: mappedMatches.length,
      matches: mappedMatches,
    };
  } catch (err: any) {
    console.error('Error fetching SportsEvents365:', err.message);
    return { success: false, error: err.message, matches: [] };
  }
}