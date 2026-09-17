// lib/awinFeed.ts

const TEAM_ALIASES: Record<string, string[]> = {
  "barcelona": ["barcelona", "barca", "fc barcelona", "fcb"],
  "real madrid": ["real madrid", "realmadrid", "r. madrid"],
  "atletico madrid": ["atletico madrid", "atletico", "atm", "atl. madrid", "atlético"],
  "manchester city": ["manchester city", "man city", "mancity", "man. city"],
  "manchester united": ["manchester united", "man united", "man utd", "manutd"],
  "arsenal": ["arsenal"],
  "chelsea": ["chelsea"],
  "liverpool": ["liverpool"],
  "tottenham": ["tottenham", "tottenham hotspur", "spurs"],
  "bayern munich": ["bayern munich", "bayern munchen", "bayern münchen", "bayern"],
  "borussia dortmund": ["borussia dortmund", "dortmund", "bvb"],
  "inter": ["inter milan", "inter", "internazionale"],
  "milan": ["ac milan", "milan"],
  "juventus": ["juventus", "juve"],
  "paris saint germain": ["paris saint germain", "paris sg", "psg", "paris saint-germain"],
  "marseille": ["marseille", "om"],
  "roma": ["as roma", "roma"],
  "lazio": ["sslazio", "lazio"],
  "napoli": ["napoli"],
  "benfica": ["benfica", "sl benfica"],
  "sporting": ["sporting cp", "sporting lisbon", "sporting"],
  "porto": ["fc porto", "porto"],
};

const CURRENCY_RATES: Record<string, number> = {
  EUR: 11.28,
  GBP: 13.45,
  USD: 10.30,
  SEK: 1.0,
};

function cleanStr(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesTeam(productNameClean: string, teamName: string): boolean {
  const teamClean = cleanStr(teamName);
  if (!teamClean) return false;

  if (productNameClean.includes(teamClean)) return true;

  for (const [key, aliases] of Object.entries(TEAM_ALIASES)) {
    if (teamClean.includes(key) || key.includes(teamClean)) {
      for (const alias of aliases) {
        if (productNameClean.includes(cleanStr(alias))) return true;
      }
    }
  }

  const words = teamClean
    .split(" ")
    .filter(w => !["fc", "ac", "afc", "sc", "cf", "real", "club", "cd"].includes(w) && w.length > 2);
  
  if (words.length > 0 && words.every(w => productNameClean.includes(w))) {
    return true;
  }

  return false;
}

function parseCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function detectDelimiter(firstLine: string): string {
  if (firstLine.includes('\t')) return '\t';
  if (firstLine.includes(';') && !firstLine.includes(',')) return ';';
  if (firstLine.includes('|')) return '|';
  return ',';
}

function getColValue(row: Record<string, string>, possibleKeys: string[]): string {
  const rowKeys = Object.keys(row);
  for (const pKey of possibleKeys) {
    const cleanP = cleanStr(pKey);
    for (const rKey of rowKeys) {
      if (cleanStr(rKey) === cleanP) {
        return row[rKey] || "";
      }
    }
  }
  return "";
}

export async function getAwinData(): Promise<any[]> {
  const feedUrl = process.env.AWIN_PRODUCT_FEED_URL || process.env.AWIN_FEED_URL;
  if (!feedUrl) {
    console.warn("Ingen Awin feed URL angiven i miljövariabler");
    return [];
  }

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (BiljetterFotboll/1.0)' }
    });

    if (!res.ok) {
      console.error(`Gick inte att hämta Awin feed. Status: ${res.status}`);
      return [];
    }

    const text = await res.text();
    if (!text || text.trim().length === 0) return [];

    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return [];

    const delimiter = detectDelimiter(lines[0]);
    const headers = parseCSVLine(lines[0], delimiter).map(h => h.replace(/^"|"$/g, ''));

    const rows: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i], delimiter).map(c => c.replace(/^"|"$/g, ''));
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = cols[idx] || "";
      });
      rows.push(row);
    }

    return rows;
  } catch (err) {
    console.error("Fel vid hämtning/parsing av Awin feed:", err);
    return [];
  }
}

export function findAwinTicketsForMatchSync(
  awinRows: any[],
  homeTeam: string,
  awayTeam: string
): Array<{ merchantName: string; merchantId: string; priceSEK: number; url: string }> {
  if (!Array.isArray(awinRows) || awinRows.length === 0) return [];

  const results: Array<{ merchantName: string; merchantId: string; priceSEK: number; url: string }> = [];

  for (const row of awinRows) {
    const productName = getColValue(row, [
      'product_name', 'productname', 'title', 'product_title', 'name', 'deal_title', 'description'
    ]);
    const merchantName = getColValue(row, [
      'merchant_name', 'merchantname', 'advertiser_name', 'advertiser', 'merchant', 'brand_name', 'brand'
    ]) || "Awin Partner";
    const merchantId = getColValue(row, [
      'merchant_id', 'merchantid', 'advertiser_id', 'aw_merchant_id'
    ]);
    const rawPrice = getColValue(row, [
      'search_price', 'searchprice', 'price', 'display_price', 'displayprice', 'store_price', 'storeprice', 'rrp_price'
    ]);
    const currency = (getColValue(row, ['currency', 'currency_code']) || "EUR").toUpperCase();
    const url = getColValue(row, [
      'aw_deep_link', 'awdeeplink', 'merchant_deep_link', 'deeplink', 'url', 'link', 'product_url'
    ]);

    const cleanProduct = cleanStr(productName);
    if (!cleanProduct) continue;

    const hasHome = matchesTeam(cleanProduct, homeTeam);
    const hasAway = matchesTeam(cleanProduct, awayTeam);

    if (hasHome && hasAway) {
      const numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
      if (isNaN(numericPrice) || numericPrice <= 0) continue;

      const rate = CURRENCY_RATES[currency] || 11.28;
      const priceSEK = Math.round(numericPrice * rate);

      if (url) {
        results.push({
          merchantName,
          merchantId,
          priceSEK,
          url
        });
      }
    }
  }

  return results;
}