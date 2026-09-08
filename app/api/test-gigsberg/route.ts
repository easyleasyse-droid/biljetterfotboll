import { NextResponse } from 'next/server';
import { fetchGigsbergTickets } from '@/lib/gigsbergFeed';

export async function GET() {
  try {
    const tickets = await fetchGigsbergTickets();
    return NextResponse.json({
      success: true,
      count: tickets.length,
      sample: tickets.slice(0, 5)
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}