const API_KEY = process.env.LIVEFOOTBALLTICKETS_API_KEY || 'ODfbclUip42knt613rBHh9zzsVVWTUG2K0ullGr';
export const AFFILIATE_ID = 'biljetterfotboll';
const API_URL = 'https://c22diwgyre.execute-api.eu-west-1.amazonaws.com/prod/v1/feeds/ccafa2e3-39a7-4f29-b44e-33cb5a9dd79e?applicationId=3';

export function buildAffiliateUrl(targetUrl: string): string {
  if (!targetUrl || typeof targetUrl !== 'string' || targetUrl.trim() === '') {
    return '';
  }
  const separator = targetUrl.includes('?') ? '&' : '?';
  return `${targetUrl}${separator}affid=${AFFILIATE_ID}`;
}

export async function fetchLiveFootballTicketsMatches() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-api-key': 'ODfbclUip42knt613rBHh9zzcSVWTUG2K0ullGr',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`LiveFootballTickets API fel: ${response.status} ${response.statusText}`);
      return { success: false, matches: [] };
    }

    const json = await response.json();
    const rawEvents = json.data || json.events || json || [];

    if (!Array.isArray(rawEvents)) {
      return { success: true, totalMatches: 0, matches: [] };
    }

    const parsedMatches = rawEvents.map((event: any) => {
      const homeName = typeof event.homeTeam === 'object'
        ? (event.homeTeam?.name || '')
        : (event.homeTeam || event.home_team || '');
        
      const awayName = typeof event.awayTeam === 'object'
        ? (event.awayTeam?.name || '')
        : (event.awayTeam || event.away_team || '');

      let price = 0;
      if (typeof event.minPrice === 'number') {
        price = event.minPrice;
      } else if (typeof event.min_price === 'number') {
        price = event.min_price;
      } else if (typeof event.price === 'number') {
        price = event.price;
      }

      const rawUrl = event.url || event.link || '';
      const finalUrl = buildAffiliateUrl(rawUrl);

      return {
        id: `lft-${event.id || event.eventId || Math.random()}`,
        merchant: 'LiveFootballTickets',
        homeTeam: homeName,
        awayTeam: awayName,
        venue: event.venue?.name || event.venue || '',
        date: event.date || event.date_time || '',
        minPrice: price,
        currency: event.currency || 'EUR',
        url: finalUrl,
      };
    });

    return {
      success: true,
      totalMatches: parsedMatches.length,
      matches: parsedMatches,
    };
  } catch (err) {
    console.error("Fel vid hämtning från LiveFootballTickets:", err);
    return { success: false, matches: [] };
  }
}