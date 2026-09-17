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
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 timmar

// Hjälpfunktion som hanterar kommatecken inuti citattecken i CSV-filer
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
      console.error("Kunde inte hämta Awin-feed:", res.statusText);
      return cachedAwinRows || [];
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const unzipped = await gunzip(buffer);
    const csvText = unzipped.toString('utf-8');

    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const idxDeepLink = headers.indexOf('aw_deep_link');
    const idxProductName = headers.indexOf('product_name');
    const idxPrice = headers.indexOf('search_price');
    const idxMerchant = headers.indexOf('merchant_name');
    const idxCurrency = headers.indexOf('currency');

    const rows: AwinTicketRow[] = [];
    const EUR_TO_SEK = 11.28;
    const GBP_TO_SEK = 13.50;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = parseCSVLine(line);
      if (cols.length <= Math.max(idxDeepLink, idxProductName, idxPrice, idxMerchant)) continue;

      const productName = cols[idxProductName];
      const priceStr = cols[idxPrice];
      const merchantName = cols[idxMerchant] || 'Awin Partner';
      const deepLink = cols[idxDeepLink] || '#';
      const currency = (cols[idxCurrency] || 'EUR').toUpperCase();

      if (!productName || !priceStr) continue;

      let price = parseFloat(priceStr.replace(',', '.'));
      if (isNaN(price) || price <= 0) continue;

      // Valutaomräkning
      if (currency === 'EUR') {
        price *= EUR_TO_SEK;
      } else if (currency === 'GBP') {
        price *= GBP_TO_SEK;
      }

      rows.push({
        merchantName,
        productName,
        priceSEK: Math.round(price),
        url: deepLink,
      });
    }

    cachedAwinRows = rows;
    lastFetchTime = now;
    console.log(`Laddade in ${rows.length} giltiga produkter från Awin-feeden.`);
    return rows;
  } catch (error) {
    console.error("Fel vid parsning av Awin-feed:", error);
    return cachedAwinRows || [];
  }
}

export async function fetchAwinOffers() {
  return getAwinData();
}

export function findAwinTicketsForMatchSync(
  rows: AwinTicketRow[],
  homeTeam: string,
  awayTeam: string
): AwinTicketRow[] {
  if (!rows || rows.length === 0) return [];

  const clean = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\bfc\b|\bac\b|\bafc\b|\bsc\b|\bsv\b/g, "")
      .replace(/[^a-z0-9]/g, "");

  const hTeam = clean(homeTeam);
  const aTeam = clean(awayTeam);

  return rows.filter((row) => {
    const title = clean(row.productName);
    // Kräver att både hemmalag och bortalag finns med i produktnamnet
    return title.includes(hTeam) && title.includes(aTeam);
  });
}