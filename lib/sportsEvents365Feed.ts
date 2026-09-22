// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

const BASE_URL = 'https://api-v2.sandbox365.com';

// De mest populära fotbollsturneringarna från SportsEvents365
const POPULAR_TOURNAMENTS = [
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
  let url = targetUrl;
  if (isEnglish && url.includes('sportsevents365.com')) {
    url = url.replace(/www\.sportsevents365\.com/, 'ticket.sportsevents365.com');
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`;
}

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

  // Vi testar strukturer för att hämta matcher för Premier League (id 9)
  const tournamentId = 9; 
  const endpointsToTest = [
    `${BASE_URL}/events/tournament/${tournamentId}?apiKey=${API_KEY}`,
    `${BASE_URL}/events?tournamentId=${tournamentId}&apiKey=${API_KEY}`,
    `${BASE_URL}/tickets?tournamentId=${tournamentId}&apiKey=${API_KEY}`
  ];

  let lastResult = null;

  for (const url of endpointsToTest) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        return {
          success: true,
          workingEndpoint: url,
          tournamentsIncluded: POPULAR_TOURNAMENTS,
          data: data,
        };
      }

      lastResult = { url, status: response.status, data };
    } catch (err: any) {
      lastResult = { url, error: err.message };
    }
  }

  return {
    success: false,
    message: 'Kunde inte hämta matcher per turnering',
    lastTried: lastResult,
  };
}