// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || 'ef0704884bb49a77a39e981ba7be5fb0';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

// Skarp produktions-URL för SportsEvents365 v2 API
const BASE_URL = 'https://api-v2.sportsevents365.com';

// Populära fotbollsturneringar och deras ID i SportsEvents365
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

/**
 * Hjälpfunktion för att bygga utgående affiliate-länkar till SportsEvents365
 */
export function buildSportsEvents365Url(targetUrl: string, isEnglish: boolean = false): string {
  let url = targetUrl;
  if (isEnglish && url.includes('sportsevents365.com')) {
    url = url.replace(/www\.sportsevents365\.com/, 'ticket.sportsevents365.com');
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

/**
 * Hämtar matcher och biljetter från SportsEvents365 produktions-API
 */
export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

  const endpointsToTest = [
    `${BASE_URL}/tickets?apiKey=${API_KEY}`,
    `${BASE_URL}/events?apiKey=${API_KEY}`,
    `${BASE_URL}/events/search?apiKey=${API_KEY}`
  ];

  let lastError = null;

  for (const url of endpointsToTest) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'x-api-key': API_KEY,
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          endpoint: url,
          tournaments: POPULAR_TOURNAMENTS,
          data: data,
        };
      }

      const errData = await response.json().catch(() => null);
      lastError = { url, status: response.status, data: errData };
    } catch (err: any) {
      lastError = { url, error: err.message };
    }
  }

  return {
    success: false,
    message: 'Kunde inte hämta data från SportsEvents365 produktions-API.',
    lastTried: lastError,
  };
}