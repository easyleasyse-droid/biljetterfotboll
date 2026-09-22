// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

const BASE_URL = 'https://api-v2.sandbox365.com';

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

  // Endpoints att testa under Search API
  const endpointsToTest = [
    `/events/search?eventTypeId=1000&apiKey=${API_KEY}`,
    `/tickets?eventTypeId=1000&apiKey=${API_KEY}`,
    `/events/top?eventTypeId=1000&apiKey=${API_KEY}`,
    `/events/upcoming?eventTypeId=1000&apiKey=${API_KEY}`
  ];

  let lastResult = null;

  for (const path of endpointsToTest) {
    const url = `${BASE_URL}${path}`;
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
          workingEndpoint: path,
          data: data,
        };
      }

      lastResult = { path, status: response.status, data };
    } catch (err: any) {
      lastResult = { path, error: err.message };
    }
  }

  return {
    success: false,
    message: 'Ingen av sök-endpointarna gav 200 OK',
    lastTried: lastResult,
  };
}