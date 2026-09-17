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
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // Cachar i 12 timmar i minnet

export async function getAwinData(): Promise<AwinTicketRow[]> {
  const now = Date.now();
  if (cachedAwinRows && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedAwinRows;
  }

  const feedUrl =
    process.env.AWIN_PRODUCT_FEED_URL ||
    "https://productdata.awin.com/datafeed/download/apikey/396ea86764d24ee68e956ee4e37658a4/language/en/cid/271,592/fid/107817,113393,117212/rid/0,1/hasEnhancedFeeds/0/columns/aw_deep_link,product_name,aw_product_id,merchant_product_id,merchant_image_url,description,merchant_category,search_price,merchant_name,merchant_id,category_name,category_id,aw_image_url,currency,store_price,delivery_cost,merchant_deep_link,language,last_updated,display_price,data_feed_id/format/csv/delimiter/%2C/compression/gzip/adultcontent/1/";

  try {
    console.log("Hämtar Awin-feed...");
    const res = await fetch(feedUrl, { cache: 'no-store' });
    if (!res.ok) {
      console.error("Misslyckades att hämta Awin feed:", res.statusText);
      return cachedAwinRows || [];
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    console.log("Packar upp Gzip Awin-feed...");
    const unzipped = await gunzip(buffer);
    const csvText = unzipped.toString('utf-8');

    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    const idxDeepLink = headers.indexOf('aw_deep_link');
    const idxProductName = headers.indexOf('product_name');
    const idxPrice = headers.indexOf('search_price');
    const idxMerchant = headers.indexOf('merchant_name');

    const rows: AwinTicketRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));

      const productName = cols[idxProductName];
      const priceStr = cols[idxPrice];
      const merchantName = cols[idxMerchant] || 'Awin Partner';
      const deepLink = cols[idxDeepLink] || '#';

      if (!productName || !priceStr) continue;

      const price = parseFloat(priceStr);
      if (!isNaN(price) && price > 0) {
        rows.push({
          merchantName,
          productName,
          priceSEK: price,
          url: deepLink,
        });
      }
    }

    console.log(`Awin-feed klar! Laddade in ${rows.length} produkter.`);
    cachedAwinRows = rows;
    lastFetchTime = now;
    return rows;
  } catch (error) {
    console.error("Fel vid hämtning/uppackning av Awin-feed:", error);
    return cachedAwinRows || [];
  }
}

// Kompatibilitetsfunktion ifall route.ts anropar fetchAwinOffers
export async function fetchAwinOffers() {
  return getAwinData();
}

export function findAwinTicketsForMatchSync(
  rows: AwinTicketRow[],
  cleanHome: string,
  cleanAway: string
): AwinTicketRow[] {
  if (!rows || rows.length === 0) return [];

  return rows.filter((row) => {
    const title = row.productName.toLowerCase();
    return title.includes(cleanHome) && title.includes(cleanAway);
  });
}