// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll'; //
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x'; //[cite: 1]
const API_KEY = process.env.SE365_API_KEY || '46b081b444d286c18c0cf08cb88b369f'; //[cite: 1]
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j'; //[cite: 2]

export function buildSportsEvents365Url(targetUrl: string, isEnglish: boolean = false): string {
  let url = targetUrl;
  if (isEnglish && url.includes('sportsevents365.com')) {
    url = url.replace(/www\.sportsevents365\.com/, 'ticket.sportsevents365.com'); //[cite: 1]
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}a_aid=${SE365_AFFILIATE_ID}`; //[cite: 1, 2]
}

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

  // Vi testar tre vanliga endpoints i API v2
  const targetUrls = [
    'https://api-v2.sportsevents365.com/events',
    'https://api-v2.sportsevents365.com/v2/events',
    'https://api-v2-docs.sportsevents365.com/events'
  ];

  let lastError = null;

  for (const url of targetUrls) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'x-api-key': API_KEY, //[cite: 1]
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      const text = await response.text();
      let parsedData;
      try {
        parsedData = JSON.parse(text);
      } catch {
        parsedData = text;
      }

      if (response.ok) {
        return { success: true, workingUrl: url, data: parsedData };
      }

      lastError = {
        attemptedUrl: url,
        status: response.status,
        statusText: response.statusText,
        body: parsedData,
      };
    } catch (err: any) {
      lastError = { attemptedUrl: url, error: err.message };
    }
  }

  return { success: false, debugInfo: lastError };
}