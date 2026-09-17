import zlib from 'zlib';
import { promisify } from 'util';

const gunzip = promisify(zlib.gunzip);

export interface AwinTicketRow {
  merchantName: string;
  productName: string;
  priceSEK: number;
  url: string;
}

let cachedAwinRows: AwinTicketRow[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12 timmar

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let startValue = 0;
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') {
      inQuotes = !inQuotes;
    } else if (line[i] === ',' && !inQuotes) {
      let val = line.substring(startValue, i).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      result.push(val);
      startValue = i + 1;
    }
  }

  let val = line.substring(startValue).trim();
  if (val.startsWith('"') && val.endsWith('"')) {
    val = val.substring(1, val.length - 1).replace(/""/g, '"');
  }
  result.push(val);

  return result;
}

export async function getAwinData(): Promise<AwinTicketRow[]> {
  const now = Date.now();
  if (cachedAwinRows && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedAwinRows;
  }

  const feedUrl =
    process.env.AWIN_PRODUCT_FEED_URL ||
    "https://productdata.awin.com/datafeed/download/apikey/396ea86764d24ee68e956ee4e37658a4/language/en/cid/271,592/fid/107817,113393,117212/rid/0,1/hasEnhancedFeeds/0/columns/aw_deep_link,product_name,aw_product_id,merchant_product_id,merchant_image_url,description,merchant_category,search_price,merchant_name,merchant_id,category_name,category_id,aw_image_url,currency,store_price,delivery_cost,merchant_deep_link,language,last_updated,display_price,data_feed_id/format/csv/delimiter/%2C/compression/gzip/adultcontent/1/";

  try {
    const res = await fetch(feedUrl, { cache: 'no-store' });
    if (!res.ok) {
      return cachedAwinRows || [];
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const unzipped = await gunzip(buffer);
    const csvText = unzipped.toString('utf-8');

    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const idxDeepLink = headers.indexOf('aw_deep_link');
    const idxMerchantDeep = headers.indexOf('merchant_deep_link');
    const idxProductName = headers.indexOf('product_name');
    const idxSearchPrice = headers.indexOf('search_price');
    const idxDisplayPrice = headers.indexOf('display_price');
    const idxStorePrice = headers.indexOf('store_price');
    const idxMerchant = headers.indexOf('merchant_name');
    const idxCurrency = headers.indexOf('currency');

    const rows: AwinTicketRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = parseCSVLine(line);

      const productName = cols[idxProductName];
      const merchantName = cols[idxMerchant] || 'Awin Partner';
      const deepLink = cols[idxDeepLink] || cols[idxMerchantDeep] || '#';
      const currency = (cols[idxCurrency] || 'USD').toUpperCase();

      if (!productName) continue;

      // Filter: Exkludera barn, parkering, turer och medlemskap (VIP BEHÅLLS!)
      const isNonStandardTicket = /\b(child|junior|u16|youth|parking|car park|tour|stadium tour|museum|membership)\b/i.test(productName);
      if (isNonStandardTicket) continue;

      // Prioritera search_price i första hand för att få enskilt grundpris
      const rawPriceStr = cols[idxSearchPrice] || cols[idxDisplayPrice] || cols[idxStorePrice] || "0";
      if (!rawPriceStr) continue;

      const cleanPriceStr = rawPriceStr.replace(/\s/g, '').replace(',', '.');
      let price = parseFloat(cleanPriceStr);

      if (isNaN(price) || price <= 0) continue;

      let rate = 10.35; // USD
      if (currency === 'EUR') rate = 11.35;
      else if (currency === 'GBP') rate = 13.50;
      else if (currency === 'SEK') rate = 1.0;

      const priceSEK = Math.round(price * rate);

      rows.push({
        merchantName,
        productName,
        priceSEK,
        url: deepLink,
      });
    }

    cachedAwinRows = rows;
    lastFetchTime = now;
    return rows;
  } catch (error) {
    return cachedAwinRows || [];
  }
}

export async function fetchAwinOffers() {
  return getAwinData();
}

// Smartare synonym- och matchningsfunktion
const getTeamKeywords = (teamName: string): string[] => {
  const clean = teamName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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
  } else if (clean.includes("real betis") || clean.includes("betis")) {
    keywords.push("betis", "real betis");
  } else if (clean.includes("getafe")) {
    keywords.push("getafe");
  }

  return Array.from(new Set(keywords));
};

export function findAwinTicketsForMatchSync(
  rows: AwinTicketRow[],
  homeTeam: string,
  awayTeam: string,
  matchDate?: string // Valfritt datum t.ex. "2026-09-17" eller "2026-10-10"
): AwinTicketRow[] {
  if (!rows || rows.length === 0) return [];

  const cleanTitle = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const homeKeywords = getTeamKeywords(homeTeam);
  const awayKeywords = getTeamKeywords(awayTeam);

  return rows.filter((row) => {
    const title = cleanTitle(row.productName);

    // Kräver att minst ett nyckelord för hemmalaget OCH bortalaget finns i titeln
    const matchesHome = homeKeywords.some((kw) => title.includes(kw));
    const matchesAway = awayKeywords.some((kw) => title.includes(kw));

    if (!matchesHome || !matchesAway) return false;

    // Om matchen spelas under 2026, sortera bort gamla matcher (t.ex. februari 2026 eller 2025)
    if (matchDate) {
      const year = matchDate.split('-')[0]; // t.ex. "2026"
      // Om produktlänken/namnet explicit pekar på ett gammalt event/datum kan vi validera det
    }

    return true;
  });
}