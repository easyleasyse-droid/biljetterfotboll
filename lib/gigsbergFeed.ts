import https from 'https';
import zlib from 'zlib';

let cachedTickets: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 3600 * 1000;

export async function fetchGigsbergTickets(): Promise<any[]> {
  try {
    const feedUrl = process.env.GIGSBERG_FEED_URL;
    if (!feedUrl) return cachedTickets || [];

    const now = Date.now();
    if (cachedTickets && now - lastFetchTime < CACHE_TTL) {
      return cachedTickets;
    }

    return await new Promise((resolve) => {
      const req = https.get(feedUrl, (response) => {
        if (response.statusCode !== 200) return resolve(cachedTickets || []);

        const isGzip = response.headers['content-encoding'] === 'gzip' || feedUrl.endsWith('.gz');
        const stream = isGzip ? response.pipe(zlib.createGunzip()) : response;

        let rawData = '';
        stream.on('data', (chunk) => { rawData += chunk.toString('utf-8'); });

        stream.on('end', () => {
          try {
            const lines = rawData.split('\n');
            if (lines.length < 2) return resolve(cachedTickets || []);

            // Läs in rubrikraden för att hitta exakta kolumner
            const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
            
            const titleIndex = headers.findIndex(h => h.includes('product_name') || h.includes('name') || h.includes('title'));
            const priceIndex = headers.findIndex(h => h.includes('search_price') || h.includes('price'));
            const linkIndex = headers.findIndex(h => h.includes('aw_deep_link') || h.includes('link') || h.includes('url'));

            const results: any[] = [];

            for (let i = 1; i < lines.length; i++) {
              const line = lines[i].trim();
              if (!line) continue;

              const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
              if (columns.length < 2) continue;

              const title = columns[titleIndex >= 0 ? titleIndex : 0]?.replace(/^"|"$/g, '').trim();
              const rawPrice = columns[priceIndex >= 0 ? priceIndex : 1]?.replace(/^"|"$/g, '').trim();
              const url = columns[linkIndex >= 0 ? linkIndex : columns.length - 1]?.replace(/^"|"$/g, '').trim();

              if (title) {
                results.push({
                  id: url || title,
                  title: title,
                  priceUSD: parseFloat(rawPrice) || 50,
                  currency: 'USD',
                  url: url,
                  merchant: 'Gigsberg',
                });
              }
            }

            cachedTickets = results;
            lastFetchTime = Date.now();
            resolve(results);
          } catch {
            resolve(cachedTickets || []);
          }
        });

        stream.on('error', () => resolve(cachedTickets || []));
      });

      req.on('error', () => resolve(cachedTickets || []));
      req.setTimeout(12000, () => {
        req.destroy();
        resolve(cachedTickets || []);
      });
    });
  } catch {
    return cachedTickets || [];
  }
}