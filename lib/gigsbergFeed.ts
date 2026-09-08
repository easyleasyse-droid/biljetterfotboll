import https from 'https';
import zlib from 'zlib';

let cachedTickets: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 3600 * 1000; // 1 timmes minnescache

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

            const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
            
            const titleIndex = headers.findIndex(h => h.includes('product_name') || h.includes('name') || h.includes('title'));
            const priceIndex = headers.findIndex(h => h.includes('search_price') || h.includes('price'));
            const linkIndex = headers.findIndex(h => h.includes('aw_deep_link') || h.includes('link') || h.includes('url'));
            const dateIndex = headers.findIndex(h => h.includes('date') || h.includes('time') || h.includes('valid_to'));

            const results: any[] = [];

            for (let i = 1; i < lines.length; i++) {
              const line = lines[i].trim();
              if (!line) continue;

              const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
              if (columns.length < 2) continue;

              const title = columns[titleIndex >= 0 ? titleIndex : 0]?.replace(/^"|"$/g, '').trim() || '';
              const rawPrice = columns[priceIndex >= 0 ? priceIndex : 1]?.replace(/^"|"$/g, '').trim();
              const url = columns[linkIndex >= 0 ? linkIndex : columns.length - 1]?.replace(/^"|"$/g, '').trim();
              const dateStr = dateIndex >= 0 ? columns[dateIndex]?.replace(/^"|"$/g, '').trim() : '';

              if (title) {
                results.push({
                  title: title.toLowerCase(),
                  originalTitle: title,
                  priceUSD: parseFloat(rawPrice) || 50,
                  currency: 'USD',
                  url: url,
                  date: dateStr,
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

// Sökfunktion som matchar Gigsberg-biljetter mot matchens lag och datum (precis som P1 och Ticombo)
export function findGigsbergTicketInRows(rows: any[], homeTeam: string, awayTeam: string, matchDate: string) {
  if (!rows || rows.length === 0) return null;

  const hClean = homeTeam.toLowerCase();
  const aClean = awayTeam.toLowerCase();

  const found = rows.find(row => {
    const t = row.title;
    const matchesTeams = (t.includes(hClean) && t.includes(aClean));
    // Om datum finns i raden kan vi matcha det, annars räcker lagmatchningen
    const matchesDate = row.date ? row.date.includes(matchDate) : true;
    return matchesTeams && matchesDate;
  });

  if (!found) return null;

  return {
    price: found.priceUSD,
    currency: found.currency,
    url: found.url,
    merchant: 'Gigsberg'
  };
}