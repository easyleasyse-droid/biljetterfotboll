import https from 'https';
import zlib from 'zlib';

export async function fetchGigsbergTickets() {
  const feedUrl = process.env.GIGSBERG_FEED_URL;
  if (!feedUrl) {
    throw new Error("GIGSBERG_FEED_URL saknas i miljövariablerna");
  }

  return new Promise((resolve, reject) => {
    https.get(feedUrl, (response) => {
      const gunzip = zlib.createGunzip();
      let rawData = '';

      response.pipe(gunzip);

      gunzip.on('data', (chunk) => {
        rawData += chunk.toString('utf-8');
      });

      gunzip.on('end', () => {
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

            // 2. Inkluderingsfilter för fotboll (Kollar om kategorin eller titeln innehåller fotbollsindikatorer)
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
          resolve(results);
        } catch (err) {
          reject(err);
        }
      });

      gunzip.on('error', (err) => reject(err));
    }).on('error', (err) => reject(err));
  });
}