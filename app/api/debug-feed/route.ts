import { NextResponse } from 'next/server';
import { fetchAwinOffers } from '@/lib/awinFeed';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const offers = await fetchAwinOffers();
    
    // Filtrera fram några exempel från Gigsberg eller TicketNetwork direkt
    const gigsbergOffers = offers.filter(o => o.merchantName.toLowerCase().includes('gigsberg')).slice(0, 10);
    const totalCount = offers.length;

    return NextResponse.json({
      totalOffersLoaded: totalCount,
      sampleGigsbergOffers: gigsbergOffers,
      allMerchants: Array.from(new Set(offers.map(o => o.merchantName)))
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}