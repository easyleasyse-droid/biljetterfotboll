// lib/awinFeed.ts

export interface AwinTicket {
  merchantName: string;
  productName: string;
  priceSEK: number;
  url: string;
  currency: string;
}

// Dagsaktuella och realistiska växelkurser till SEK
const CURRENCY_RATES: Record<string, number> = {
  SEK: 1.0,
  EUR: 11.28,
  USD: 9.83,
  GBP: 13.15,
};

const normalizeStr = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\bfc\b|\bac\b|\bafc\b|\bsv\b|\bbcf\b|\brcd\b|\bbud\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getTeamKeywords = (teamName: string): string[] => {
  const clean = normalizeStr(teamName);
  const keywords = [clean];

  if (clean.includes("manchester city") || clean.includes("man city")) {
    keywords.push("man city", "manchester city");
  } else if (clean.includes("manchester united") || clean.includes("man utd")) {
    keywords.push("man utd", "manchester united");
  } else if (clean.includes("tottenham") || clean.includes("spurs")) {
    keywords.push("tottenham", "spurs");
  } else if (clean.includes("inter")) {
    keywords.push("inter", "internazionale");
  } else if (clean.includes("bayern")) {
    keywords.push("bayern");
  } else if (clean.includes("liverpool")) {
    keywords.push("liverpool");
  }

  return Array.from(new Set(keywords));
};

// Enkel och snabb CSV-parser för Awin-feeden
function parseCsv(csvText: string): any[] {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const firstLine = lines[0];
  let delimiter = ",";
  if (firstLine.includes("\t")) delimiter = "\t";
  else if (firstLine.includes("|")) delimiter = "|";
  else if (firstLine.includes(";")) delimiter = ";";

  const headers = firstLine
    .split(delimiter)
    .map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());

  const rows: any[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter).map((v) => v.trim().replace(/^"|"$/g, ""));
    if (values.length < headers.length) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] || "";
    });
    rows.push(rowObj);
  }
  return rows;
}

// 1. Hämta Awin CSV-feeden automatiskt från URL
export async function getAwinData(): Promise<any[]> {
  // Lägg din Awin CSV Feed-URL i .env.local som AWIN_FEED_URL eller klistra in länk-strängen här nedanför:
  const feedUrl = process.env.AWIN_FEED_URL || "";

  if (!feedUrl) {
    console.warn("AWIN_FEED_URL saknas. Lägg till länken i .env.local för att hämta Awin-biljetter.");
    return [];
  }

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 }, // Cachas i 1 timme
    });

    if (!res.ok) {
      console.error(`Kunde inte hämta Awin feed, status: ${res.status}`);
      return [];
    }

    const csvText = await res.text();
    return parseCsv(csvText);
  } catch (err) {
    console.error("Fel vid hämtning av Awin feed:", err);
    return [];
  }
}

// 2. Sök ut biljetter för en specifik match
export const findAwinTicketsForMatchSync = (
  rows: any[],
  homeTeam: string,
  awayTeam: string
): AwinTicket[] => {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const homeKeywords = getTeamKeywords(homeTeam);
  const awayKeywords = getTeamKeywords(awayTeam);

  const results: AwinTicket[] = [];

  for (const row of rows) {
    const title = normalizeStr(
      row.product_name || row.title || row.name || row.product_title || ""
    );
    if (!title) continue;

    const matchesHome = homeKeywords.some((kw) => title.includes(kw));
    const matchesAway = awayKeywords.some((kw) => title.includes(kw));

    if (matchesHome && matchesAway) {
      const rawPrice = parseFloat(
        row.search_price || row.price || row.store_price || row.product_price || "0"
      );
      const currency = (
        row.currency || row.currency_code || row.store_currency || "USD"
      ).toUpperCase();

      if (rawPrice > 0) {
        const rate = CURRENCY_RATES[currency] || 9.83;
        const priceSEK = Math.round(rawPrice * rate);

        let directUrl =
          row.awin_deep_link ||
          row.merchant_deep_link ||
          row.product_url ||
          row.link ||
          row.url;

        if (directUrl) {
          results.push({
            merchantName:
              row.merchant_name || row.advertiser_name || row.brand || "Gigsberg",
            productName: row.product_name || title,
            priceSEK: priceSEK,
            url: directUrl,
            currency: currency,
          });
        }
      }
    }
  }

  return results;
};