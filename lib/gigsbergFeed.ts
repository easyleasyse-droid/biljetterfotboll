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

            const results: any[] = [];

            for (let i = 1; i < lines.length; i++) {
              const line = lines[i].trim();
              if (!line) continue;

              const lineLower = line.toLowerCase();
              if (lineLower.includes(' vs ') || lineLower.includes(' v ')) {
                const parts = line.split(',');

                const url = parts.find(p => p.includes('http'))?.replace(/^"|"$/g, '') || '';
                const title = parts.find(p => p.toLowerCase().includes(' vs ') || p.toLowerCase().includes(' v '))?.replace(/^"|"$/g, '') || '';
                
                // Hittar priset i CSV-raden
                const priceMatch = line.match(/\b\d+(\.\d+)?\b/g);
                const priceNum = priceMatch ? parseFloat(priceMatch.find(p => parseFloat(p) > 10) || '0') : 0;

                if (title && url) {
                  results.push({
                    id: url,
                    title: title,
                    priceUSD: priceNum || 50,
                    currency: 'USD',
                    url: url,
                    merchant: 'Gigsberg',
                  });
                }
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
      req.setTimeout(8000, () => {
        req.destroy();
        resolve(cachedTickets || []);
      });
    });
  } catch {
    return cachedTickets || [];
  }
}