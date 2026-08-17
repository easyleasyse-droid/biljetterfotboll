import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Sökparameter 'url' saknas" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY saknas i miljövariabler" }, { status: 500 });
  }

  try {
    // 1. Hämta sidan via Jina AI
    const jinaRes = await fetch(`https://r.jina.ai/${targetUrl}`);
    if (!jinaRes.ok) {
      throw new Error(`Kunde inte hämta sidan via Jina: ${jinaRes.statusText}`);
    }
    const markdownContent = await jinaRes.text();

    // 2. Skicka till Gemini API direkt via fetch
    const prompt = `Analysera följande text från en biljettsida och returnera ENBART ett giltigt JSON-objekt med matchnamn, datum, biljetttyper/sektioner, priser och valuta.\n\nInnehåll:\n${markdownContent.slice(0, 15000)}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        }),
      }
    );

    const geminiData = await geminiRes.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      success: true,
      scrapedData: JSON.parse(rawText || "{}")
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}