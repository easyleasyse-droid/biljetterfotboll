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

// Valutakurser till SEK
const CURRENCY_RATES: Record<string, number> = {
  EUR: 11.28,
  GBP: 13.45,
  USD: 10.30,
  SEK: 1.0,
};

export async function getAwinData(): Promise<any[]> {
  const feedUrl = process.env.AWIN_PRODUCT_FEED_URL;
  if (!feedUrl) return [];

  try {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    
    const text = await res.text();
    // Enkel CSV/TSV rad-parsing
    const lines = text.split("\n");
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ''));
    
    return lines.slice(1).map(line => {
      const cols = line.split(",").map(c => c.trim().replace(/^"|"$/g, ''));
      const row: Record<string, string> = {};
      headers.forEach((h, i) => {
        row[h] = cols[i] || "";
      });
      return row;
    });
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

  const results: Array<{ merchantName: string; priceSEK: number; url: string }> = [];

  for (const row of awinRows) {
    const productName = (row["product_name"] || row["title"] || row["ProductName"] || "").toLowerCase();
    const merchantName = row["merchant_name"] || row["MerchantName"] || row["advertiser_name"] || "Awin Partner";
    const rawPrice = row["search_price"] || row["price"] || row["Price"] || "0";
    const currency = (row["currency"] || row["Currency"] || "EUR").toUpperCase();
    const url = row["aw_deep_link"] || row["merchant_deep_link"] || row["URL"] || "";

    const cleanProduct = productName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ");

    // Kontrollera om BÅDE hemmalag och bortalag finns i produktnamnet
    const hasHome = cleanProduct.includes(cleanHome);
    const hasAway = cleanProduct.includes(cleanAway);

    if (hasHome && hasAway) {
      // Rensa priset från skräptecken (€, £, citattecken etc.)
      const numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
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