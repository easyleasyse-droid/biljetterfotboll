import https from 'https';
import zlib from 'zlib';

let cachedTickets: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 3600 * 1000; // 1 timme

export async function fetchGigsbergTickets(): Promise<any[]> {
  try {
    const feedUrl = process.env.GIGSBERG_FEED_URL;
    if (!feedUrl) {
      console.error("GIGSBERG_FEED_URL saknas i miljövariablerna");
      return cachedTickets || [];
    }

    const now = Date.now();
    if (cachedTickets && now - lastFetchTime < CACHE_TTL) {
      return cachedTickets;
    }

    return await new Promise((resolve) => {
      const req = https.get(feedUrl, (response) => {
        if (response.statusCode !== 200) {
          console.error(`Gigsberg HTTP fel: ${response.statusCode}`);
          return resolve(cachedTickets || []);
        }

        const isGzip = response.headers['content-encoding'] === 'gzip' || feedUrl.endsWith('.gz');
        const stream = isGzip ? response.pipe(zlib.createGunzip()) : response;

        let rawData = '';

        stream.on('data', (chunk) => {
          rawData += chunk.toString('utf-8');
        });

        stream.on('end', () => {
          try {
            const lines = rawData.split('\n');
            if (lines.length === 0) return resolve(cachedTickets || []);

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

              if (
                category.includes('concert') || 
                category.includes('theater') || 
                category.includes('comedy') ||
                category.includes('festival')
              ) {
                continue;
              }

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
            console.error("Fel vid parsing av Gigsberg CSV:", err);
            resolve(cachedTickets || []);
          }
        });

        stream.on('error', (err) => {
          console.error("Stream-fel i Gigsberg:", err);
          resolve(cachedTickets || []);
        });
      });

      req.on('error', (err) => {
        console.error("HTTPS-fel vid Gigsberg-anrop:", err);
        resolve(cachedTickets || []);
      });

      // 8 sekunders timeout så att anropet aldrig låser din sida
      req.setTimeout(8000, () => {
        req.destroy();
        console.error("Gigsberg fetch timeout");
        resolve(cachedTickets || []);
      });
    });
  } catch (globalErr) {
    console.error("Kritiskt fel i fetchGigsbergTickets:", globalErr);
    return cachedTickets || [];
  }
}