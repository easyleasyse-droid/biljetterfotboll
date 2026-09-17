// lib/awinFeed.ts

const sanitizeTeamName = (name: string) => {
  if (!name) return "";

  let clean = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\bfc\b|\bac\b|\bafc\b|\bsv\b|\bbcf\b|\brcd\b|\bbud\b|\bsc\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const aliasMap: Record<string, string> = {
    "inter milan": "inter",
    "internazionale": "inter",
    "bayern munich": "bayern",
    "bayern munchen": "bayern",
    "real betis": "betis",
    "real sociedad": "sociedad",
    "atletico madrid": "atletico",
    "paris saint germain": "psg",
    "ac milan": "milan",
    "sporting cp": "sporting",
  };

  for (const [key, alias] of Object.entries(aliasMap)) {
    if (clean.includes(key)) return alias;
  }

  return clean;
};

const CURRENCY_RATES: Record<string, number> = {
  EUR: 11.28,
  GBP: 13.45,
  USD: 10.30,
  SEK: 1.0,
};

export async function fetchAwinOffers(): Promise<any[]> {
  const feedUrl = process.env.AWIN_PRODUCT_FEED_URL;
  if (!feedUrl) {
    console.log("AWIN_PRODUCT_FEED_URL saknas i miljövariablerna.");
    return [];
  }

  try {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.log("Kunde inte hämta Awin-feed, status:", res.status);
      return [];
    }
    
    const text = await res.text();
    const lines = text.split("\n").filter(l => l.trim().length > 0);
    if (lines.length < 2) return [];

    // Detektera om det är komma eller semikolon som separator
    const separator = lines[0].includes(";") ? ";" : ",";
    const headers = lines[0].split(separator).map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
    
    const parsedRows = lines.slice(1).map(line => {
      const cols = line.split(separator).map(c => c.trim().replace(/^"|"$/g, ''));
      const row: Record<string, string> = {};
      headers.forEach((h, i) => {
        row[h] = cols[i] || "";
      });
      return row;
    });

    console.log(`Awin-feed inläst. Antal rader: ${parsedRows.length}`);
    return parsedRows;
  } catch (err) {
    console.error("Fel vid hämtning av Awin feed:", err);
    return [];
  }
}

export function findAwinTicketsForMatchSync(
  awinRows: any[],
  homeTeam: string,
  awayTeam: string
): Array<{ merchantName: string; priceSEK: number; url: string }> {
  if (!Array.isArray(awinRows) || awinRows.length === 0) return [];

  const cleanHome = sanitizeTeamName(homeTeam);
  const cleanAway = sanitizeTeamName(awayTeam);
  if (!cleanHome || !cleanAway) return [];

  const results: Array<{ merchantName: string; priceSEK: number; url: string }> = [];

  for (const row of awinRows) {
    // Sök igenom vanliga kolumnnamn oavsett små/stora bokstäver
    const productName = (row["product_name"] || row["title"] || row["productname"] || row["name"] || "").toLowerCase();
    const merchantName = row["merchant_name"] || row["merchantname"] || row["advertiser_name"] || row["merchant"] || "Awin Partner";
    const rawPrice = row["search_price"] || row["price"] || row["aw_price"] || "0";
    const currency = (row["currency"] || row["aw_currency"] || "EUR").toUpperCase();
    const url = row["aw_deep_link"] || row["merchant_deep_link"] || row["url"] || row["deeplink"] || "";

    if (!productName || !url) continue;

    const cleanProduct = productName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ");

    const hasHome = cleanProduct.includes(cleanHome);
    const hasAway = cleanProduct.includes(cleanAway);

    if (hasHome && hasAway) {
      // Hantera pris med både punkt och komma (t.ex. "1,200.50" eller "1200,50")
      const cleanPriceStr = rawPrice.replace(/\s/g, "").replace(",", ".");
      const numericPrice = parseFloat(cleanPriceStr.replace(/[^0-9.]/g, ""));
      
      if (isNaN(numericPrice) || numericPrice <= 0) continue;

      const rate = CURRENCY_RATES[currency] || 11.28;
      const priceSEK = Math.round(numericPrice * rate);

      results.push({
        merchantName,
        priceSEK,
        url
      });
    }
  }

  return results;
}