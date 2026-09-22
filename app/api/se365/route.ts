import { NextResponse } from 'next/server';
import { fetchSportsEvents365Matches } from '@/lib/sportsEvents365Feed';

export async function GET() {
  const result = await fetchSportsEvents365Matches();

  return NextResponse.json(result);
}