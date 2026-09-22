// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll'; //
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x'; //
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f'; //
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j'; //[cite: 2]

// Hjälpfunktion för att bygga korrekt affiliate-länk för SportsEvents365[cite: 1]
export function buildSportsEvents365Url(targetUrl: string, isEnglish: boolean = false): string {
  let url = targetUrl;

  // Dirigera engelsk trafik till ticket.sportsevents365.com enligt riktlinjer[cite: 1]
  if (isEnglish && url.includes('sportsevents365.com')) {
    url = url.replace(/www\.sportsevents365\.com/, 'ticket.sportsevents365.com'); //[cite: 1]
  }

  // Lägg på affiliate ID (a_aid)[cite: 1]
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`; //[cite: 1, 2]
}

// Funktion för att hämta matcher från SportsEvents365 API[cite: 1]
export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

  try {
    // OBS: Byt ut URL:en nedan mot den endpoint ni vill hämta ifrån enligt https://api-v2-docs.sportsevents365.com/[cite: 1]
    const response = await fetch('https://api-v2-docs.sportsevents365.com/v2/events', {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'x-api-key': API_KEY, //[cite: 1]
        'Accept': 'application/json',
      },
      // Cacha i 1 timme (3600 sekunder) så att ni inte slår emot rate limits på Vercel
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      throw new Error(`SportsEvents365 API fel: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Fel vid hämtning från SportsEvents365:', error.message);
    return null;
  }
}