// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';[cite: 1]
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';[cite: 1]
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f';[cite: 1]
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';[cite: 2]

// Sandbox Base URL från dokumentationen
const BASE_URL = 'https://api-v2.sandbox365.com';[cite: 9]

export function buildSportsEvents365Url(targetUrl: string, isEnglish: boolean = false): string {
  let url = targetUrl;
  if (isEnglish && url.includes('sportsevents365.com')) {
    url = url.replace(/www\.sportsevents365\.com/, 'ticket.sportsevents365.com');[cite: 1]
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`;[cite: 1, 2]
}

export async function fetchSportsEvents365Matches() {
  // Skapa Basic Auth header[cite: 7, 8]
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');[cite: 8]

  // Vi hämtar populära fotbollsturneringar via deras Sandbox API[cite: 9, 14]
  const endpointUrl = `${BASE_URL}/tournaments/top/football?apiKey=${API_KEY}`;[cite: 9, 14]

  try {
    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,[cite: 7, 8]
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