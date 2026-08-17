import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Ange en URL: /api/test-scraper?url=https://..." },
      { status: 400 }
    );
  }

  try {
    // 1. Hämta sidans innehåll via en gratis skrap-proxy (t.ex. Jina AI / Firecrawl)
    // Jina läser av alla JavaScript-sajter och returnerar ren text/markdown direkt!
    const jinaUrl = `https://r.jina.ai/${targetUrl}`;
    
    const pageResponse = await fetch(jinaUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!pageResponse.ok) {
      throw new Error("Kunde inte hämta innehåll från biljettsajten.");
    }

    const pageText = await pageResponse.text();

    // Begränsa textlängden så att vi inte skickar för mycket data till AI
    const truncatedText = pageText.substring(0, 15000);

    // 2. Skicka texten till Gemini AI för tolkning
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        error: "Saknar GEMINI_API_KEY i miljövariablerna (.env.local)",
        preview: truncatedText.substring(0, 500),
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
      Du är en expert på att hämta biljettdata. Analysera följande textinnehåll från en biljettsida.
      Identifiera alla tillgängliga biljetter eller priskategorier och returnera dem i följande JSON-format:

      {
        "match": "Hemmalag vs Bortalag (om det framgår)",
        "tickets": [
          {
            "category": "Sektion eller kategori (t.ex. Långsida, Kortsida, VIP)",
            "price": 1250,
            "currency": "SEK",
            "availability": "Finns i lager / Få kvar"
          }
        ]
      }

      Textinnehåll från sidan:
      ${truncatedText}
    `;

    const aiResult = await model.generateContent(prompt);
    const parsedData = JSON.parse(aiResult.response.text());

    return NextResponse.json({
      success: true,
      scrapedUrl: targetUrl,
      data: parsedData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}