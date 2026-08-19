import { NextResponse } from "next/server";

export async function GET() {
  const feedUrl = process.env.P1_TRAVEL_FEED_URL;

  if (!feedUrl) {
    return NextResponse.json({ error: "P1_TRAVEL_FEED_URL saknas" });
  }

  try {
    const res = await fetch(feedUrl, { cache: 'no-store' });
    const text = await res.text();
    const lines = text.split(/\r?\n/).slice(0, 10); // Hämta rubriker + de första 9 raderna

    return NextResponse.json({
      totalLength: text.length,
      sampleLines: lines
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}