import https from 'https';
import zlib from 'zlib';

// Cacha i minnet i 1 timme (3600000 ms) för att undvika 2MB unstable_cache-krascher
let cachedTickets: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 3600 * 1000;

export async function fetchGigsbergTickets() {
  const feedUrl = process.env.GIGSBERG_FEED_URL;
  if (!feedUrl) {
    throw new Error("GIGSBERG_FEED_URL saknas i miljövariablerna");
  }

  // Returnera cachad data om den är nyare än 1 timme
  const now = Date.now();
  if (cachedTickets && now - lastFetchTime < CACHE_TTL) {
    return cachedTickets;
  }

  return new Promise((resolve, reject) => {
    https.get(feedUrl, (response) => {
      // Hantera om feeden är gzip-komprimerad eller inte
      const isGzip = response.headers['content-encoding'] === 'gzip' || feedUrl.endsWith('.gz');
      const stream = isGzip ? response.pipe(zlib.createGunzip()) : response;

      let rawData = '';

      stream.on('data', (chunk) => {
        rawData += chunk.toString('utf-8');
      });

      stream.on('end', () => {
        try {
          const lines = rawData.split('\n');
          if (lines.length === 0) return resolve([]);

          const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
          
          const productNameIndex = headers.indexOf('product_name');
          const priceIndex = headers.indexOf('search_price');
          const currencyIndex = headers.indexOf('currency');
          const deepLinkIndex = headers.indexOf('aw_deep_link');
          const categoryIndex = headers.indexOf('category_name');

          const results: any[] = [];

          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/^"|"$/g, ''));

            const category = (columns[categoryIndex] || '').toLowerCase();
            const productName = columns[productNameIndex] || '';
            const productNameLower = productName.toLowerCase();

            // 1. Snabbkoll för exkludering (Icke-sport)
            if (
              category.includes('concert') || 
              category.includes('theater') || 
              category.includes('comedy') ||
              category.includes('festival')
            ) {
              continue;
            }

            // 2. Inkluderingsfilter för fotboll
            const isFootball = 
              category.includes('football') || 
              category.includes('soccer') ||
              productNameLower.includes(' vs ') ||
              productNameLower.includes(' v ') ||
              productNameLower.includes('fc') ||
              productNameLower.includes('united') ||
              productNameLower.includes('city') ||
              productNameLower.includes('real madrid') ||
              productNameLower.includes('barcelona');

            if (isFootball && productName) {
              results.push({
                id: columns[deepLinkIndex] || '',
                title: productName,
                priceUSD: parseFloat(columns[priceIndex]) || 0,
                currency: columns[currencyIndex] || 'USD',
                url: columns[deepLinkIndex] || '',
                merchant: 'Gigsberg',
              });
            }
          }

          console.log(`Hämtade ${results.length} fotbollsbiljetter från Gigsberg.`);
          cachedTickets = results;
          lastFetchTime = Date.now();
          resolve(results);
        } catch (err) {
          reject(err);
        }
      });

      stream.on('error', (err) => reject(err));
    }).on('error', (err) => reject(err));
  });
}