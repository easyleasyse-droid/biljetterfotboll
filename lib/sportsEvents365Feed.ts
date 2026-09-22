// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

// Sandbox Base URL från dokumentationen
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
  // Skapa Basic Auth header
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

  // Vi hämtar populära fotbollsturneringar via deras Sandbox API
  const endpointUrl = `${BASE_URL}/tournaments/top/football?apiKey=${API_KEY}`;

  try {
    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      endpoint: endpointUrl,
      data: data,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}