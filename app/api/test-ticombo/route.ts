import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Klistra in din Ticombo Feed-länk inom citationstecknen nedan:
const HARDCODED_TICOMBO_URL = "https://feeds.performancehorizon.com/biljetterfotboll/1011l6399/a1f3f49c2e6d13ca6d33d24088acc238"; 

export async function GET() {
  const feedUrl = HARDCODED_TICOMBO_URL || process.env.TICOMBO_FEED_URL || process.env.NEXT_PUBLIC_TICOMBO_FEED_URL || "";

  if (!feedUrl) {
    return NextResponse.json({
      error: "Ingen Ticombo URL angiven! Klistra in din länk i HARDCODED_TICOMBO_URL i koden.",
    }, { status: 500 });
  }

  try {
    const res = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      cache: "no-store",
    });

    const status = res.status;
    const rawText = await res.text();

    return NextResponse.json({
      httpStatus: status,
      contentType: res.headers.get("content-type"),
      contentLength: rawText.length,
      preview: rawText.substring(0, 1500),
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || "Kunde inte nå Ticombo URL",
    }, { status: 500 });
  }
}