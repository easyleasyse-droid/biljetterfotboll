// lib/sportsEvents365Feed.ts

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || 'ef0704884bb49a77a39e981ba7be5fb0';
export const SE365_AFFILIATE_ID = '5jutr9xaq8h3j';

export async function fetchSportsEvents365Matches() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  const url = `https://api-v2.sportsevents365.com/events/tournament/9?apiKey=${API_KEY}`;

  try {
    const response = await fetch(url, {
      headers: { 
        'Authorization': authHeader, 
        'Accept': 'application/json' 
      },
      cache: 'no-store',
    });
    
    const json = await response.json();
    return { success: true, data: json };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}