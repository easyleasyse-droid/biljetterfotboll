// app/api/se365/route.ts
import { NextResponse } from 'next/server';

const API_USERNAME = process.env.SE365_USERNAME || 'biljetterfotboll';
const API_PASSWORD = process.env.SE365_PASSWORD || '6cvxxdbM5F0x';
const API_KEY = process.env.SE365_API_KEY || 'ef0704884bb49a77a39e981ba7be5fb0';

export async function GET() {
  const authHeader = 'Basic ' + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  
  // Hämtar rådata direkt för Premier League (ID 9)
  const url = `https://api-v2.sportsevents365.com/events/tournament/9?apiKey=${API_KEY}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    const json = await response.json();
    const rawMatch = json.data?.[0] || json[0] || json;

    return NextResponse.json({
      message: "Rådata för första matchen:",
      rawMatchSample: rawMatch
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}