import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const url = "https://c22diwgyre.execute-api.eu-west-1.amazonaws.com/prod/v1/feeds/ccafa2e3-39a7-4f29-b44e-33cb5a9dd79e?applicationId=3";
  const apiKey = "ODfbclUip42knt613rBHh9zzcSVWTUG2K0ullGr";

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      cache: "no-store",
    });

    const status = res.status;
    const rawText = await res.text();

    let json = null;
    try {
      json = JSON.parse(rawText);
    } catch (e) {
      // Om svar inte är JSON
    }

    return NextResponse.json({
      httpStatus: status,
      ok: res.ok,
      data: json || rawText,
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err.message || "Ett oväntat fel uppstod",
    }, { status: 500 });
  }
}