import zlib from 'zlib';
import { promisify } from 'util';

const gunzip = promisify(zlib.gunzip);

const AWIN_FEED_URL = "https://productdata.awin.com/datafeed/download/apikey/396ea86764d24ee68e956ee4e37658a4/language/en/fid/107817,113393,117212/rid/0,1/hasEnhancedFeeds/0/columns/aw_deep_link,product_name,aw_product_id,merchant_product_id,merchant_image_url,description,merchant_category,search_price,merchant_name,merchant_id,category_name,category_id,aw_image_url,currency,store_price,delivery_cost,merchant_deep_link,language,last_updated,display_price,data_feed_id/format/csv/delimiter/%2C/compression/gzip/adultcontent/1/";

let cachedOffers: any[] = [];
let lastFetchTime = 0;
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 timmar för att slippa ladda ner 106MB i onödan

export async function fetchAwinOffers() {
  const now = Date.now();
  if (cachedOffers.length > 0 && now - lastFetchTime < CACHE_TTL) {
    return cachedOffers;
  }

  try {
    console.log("Laddar ner gemensam Awin-feed...");
    const response = await fetch(AWIN_FEED_URL);
    if (!response.ok) throw new Error(`Failed to fetch Awin feed: ${response.statusText}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    const unzipped = await gunzip(buffer);
    const csvText = unzipped.toString('utf-8');

    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const idxDeepLink = headers.indexOf('aw_deep_link');
    const idxProductName = headers.indexOf('product_name');
    const idxPrice = headers.indexOf('search_price');
    const idxMerchant = headers.indexOf('merchant_name');

    const offers: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line || line.trim() === '') continue;

      const cols = line.split(',');
      if (cols.length <= Math.max(idxDeepLink, idxProductName, idxPrice, idxMerchant)) continue;

      const deepLink = cols[idxDeepLink]?.trim().replace(/^"|"$/g, '');
      const productName = cols[idxProductName]?.trim().replace(/^"|"$/g, '').toLowerCase();
      const priceStr = cols[idxPrice]?.trim().replace(/^"|"$/g, '');
      const merchantName = cols[idxMerchant]?.trim().replace(/^"|"$/g, '');

      if (!productName || !priceStr) continue;

      offers.push({
        merchantName: merchantName || 'Awin Partner',
        productName,
        priceSEK: parseFloat(priceStr) || 0,
        url: deepLink || '#'
      });
    }

    cachedOffers = offers;
    lastFetchTime = now;
    console.log(`Awin-feed klar! Laddade in ${offers.length} produkter.`);
    return offers;
  } catch (error) {
    console.error("Error loading Awin feed:", error);
    return cachedOffers.length > 0 ? cachedOffers : [];
  }
}

export async function findAwinTicketsForMatch(homeTeam: string, awayTeam: string) {
  const allOffers = await fetchAwinOffers();
  
  const cleanHome = homeTeam.toLowerCase();
  const cleanAway = awayTeam.toLowerCase();

  return allOffers.filter(offer => {
    const title = offer.productName;
    return title.includes(cleanHome) && title.includes(cleanAway);
  });
}