import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Ändra om din miljövariabel heter något annat i Vercel
  const feedUrl = process.env.TICOMBO_FEED_URL || process.env.NEXT_PUBLIC_TICOMBO_FEED_URL || "";

  if (!feedUrl) {
    return NextResponse.json({
      error: "TICOMBO_FEED_URL saknas helt i miljövariablerna (ENV) i Vercel.",
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
      preview: rawText.substring(0, 1500), // Visar de första 1500 tecknen
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || "Kunde inte nå Ticombo URL",
    }, { status: 500 });
  }
}