// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

// Valutakurs för omräkning från EUR till SEK på biljetterfotboll.se
const EUR_TO_SEK = 11.25;

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  
  // Endpoint för alla fotbollsmatcher (eventTypeId=1000)
  const url = `https://api-v2.sportsevents365.com/events?eventTypeId=1000&apiKey=${API_KEY}`;

  try {
    const controller = new AbortController();
    // 2.5 sekunders timeout för att säkerställa att din sajt aldrig hänger sig
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
      signal: controller.signal,
      // Cachar API-svaret i 1 timme på Vercel så att sidan laddar blixtsnabbt
      next: { revalidate: 3600 }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`SE365 API svarade med status: ${response.status}`);
      return [];
    }

    const json = await response.json();
    const events = Array.isArray(json) ? json : (json.data || json.events || []);

    if (!Array.isArray(events)) {
      return [];
    }

    return events.map((event: any) => {
      // Hämta lagnamn
      const homeName = typeof event.homeTeam === 'object' ? (event.homeTeam?.name || '') : (event.homeTeam || event.homeKey || event.home_team || '');
      const awayName = typeof event.awayTeam === 'object' ? (event.awayTeam?.name || '') : (event.awayTeam || event.awayKey || event.away_team || '');

      // Extrahera lägsta pris i EUR
      let priceEUR = 0;
      if (typeof event.minPrice === 'object' && event.minPrice !== null) {
        priceEUR = event.minPrice.amount || event.minPrice.price || 0;
      } else if (typeof event.min_price === 'object' && event.min_price !== null) {
        priceEUR = event.min_price.amount || event.min_price.price || 0;
      } else if (typeof event.minPrice === 'number') {
        priceEUR = event.minPrice;
      } else if (typeof event.min_price === 'number') {
        priceEUR = event.min_price;
      } else if (typeof event.startingPrice === 'number') {
        priceEUR = event.startingPrice;
      } else if (typeof event.price === 'number') {
        priceEUR = event.price;
      }

      // Konvertera till SEK för svenska sajten
      const priceSEK = Math.round(priceEUR * EUR_TO_SEK);

      const eventId = event.id || event.eventId;

      // Bygg en garanterat fungerande direktlänk med affiliate-ID
      let targetUrl = event.url || event.link || event.event_url || event.buy_url;
      
      if (!targetUrl || targetUrl === 'https://www.sportsevents365.com' || targetUrl === 'https://www.sportsevents365.com/') {
        if (eventId) {
          targetUrl = `https://www.sportsevents365.com/event/index/${eventId}`;
        } else if (homeName && awayName) {
          targetUrl = `https://www.sportsevents365.com/search?q=${encodeURIComponent(`${homeName}${awayName}`)}`;
        } else {
          targetUrl = 'https://www.sportsevents365.com';
        }
      }

      const separator = targetUrl.includes('?') ? '&' : '?';
      const finalUrl = `${targetUrl}${separator}a_aid=${SE365_AFFILIATE_ID}`;

      return {
        id: eventId ? `se365-${eventId}` : undefined,
        merchant: 'SportsEvents365',
        homeTeam: homeName,
        awayTeam: awayName,
        tournament: event.tournament?.name || event.tournamentName || 'Fotboll',
        venue: typeof event.venue === 'object' ? (event.venue?.name || '') : (event.venue || ''),
        city: typeof event.city === 'object' ? (event.city?.name || '') : (event.city || ''),
        country: typeof event.country === 'object' ? (event.country?.name || '') : (event.country || ''),
        date: event.date_time || event.date || event.startDate || '',
        priceEUR: priceEUR,
        priceSEK: priceSEK,
        minPrice: priceSEK, // För bakåtkompatibilitet med ert match-interface
        currency: 'SEK',
        url: finalUrl,
      };
    });

  } catch (error) {
    console.error('Fel vid hämtning från SportsEvents365:', error);
    return [];
  }
}