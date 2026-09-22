import { NextResponse } from 'next/server';
import { fetchSportsEvents365Matches } from '@/lib/sportsEvents365Feed';

export async function GET() {
  const data = await fetchSportsEvents365Matches();

  if (!data) {
    return NextResponse.json(
      { success: false, error: 'Kunde inte hämta data från SportsEvents365' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data: data,
  });
}