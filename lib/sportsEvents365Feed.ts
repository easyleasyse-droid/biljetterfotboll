// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  
  // Hämtar matcher från SE365 API v2
  const url = `https://api-v2.sportsevents365.com/v2/events?apiKey=${API_KEY}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5 sekunders timeout för att garantera snabb laddtid

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
      signal: controller.signal,
      next: { revalidate: 3600 } // Cacha i 1 timme på Vercel
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return [];
    }

    const json = await response.json();
    const events = Array.isArray(json) ? json : (json.data || json.events || []);

    return events.map((event: any) => {
      // Plocka ut lagnamn korrekt oavsett om det är en sträng eller ett objekt
      const homeName = typeof event.homeKey === 'object' ? event.homeKey?.name : (event.homeTeam || event.homeKey || '');
      const awayName = typeof event.awayKey === 'object' ? event.awayKey?.name : (event.awayTeam || event.awayKey || '');

      // Plocka ut priset korrekt ur min_price-objektet
      let priceEUR = 0;
      if (typeof event.min_price === 'object' && event.min_price !== null) {
        priceEUR = event.min_price.amount || event.min_price.price || 0;
      } else if (typeof event.min_price === 'number') {
        priceEUR = event.min_price;
      } else if (typeof event.minPrice === 'number') {
        priceEUR = event.minPrice;
      }

      // Bygg direktlänken till matchen med ditt affiliate-ID (a_aid)
      const eventId = event.id || event.eventId;
      const targetUrl = eventId
        ? `https://ticket.sportsevents365.com/event/${eventId}?a_aid=${SE365_AFFILIATE_ID}`
        : `https://ticket.sportsevents365.com/search?q=${encodeURIComponent(`${homeName}${awayName}`)}&a_aid=${SE365_AFFILIATE_ID}`;

      return {
        id: eventId ? `se365-${eventId}` : undefined,
        homeTeam: homeName,
        awayTeam: awayName,
        priceEUR: priceEUR,
        url: targetUrl,
        date: event.date_time || event.date || ''
      };
    });

  } catch (error) {
    return [];
  }
}