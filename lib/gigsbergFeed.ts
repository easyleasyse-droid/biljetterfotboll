import https from 'https';
import zlib from 'zlib';
import csv from 'csv-parser';

export async function fetchGigsbergTickets() {
  const feedUrl = process.env.GIGSBERG_FEED_URL;
  if (!feedUrl) {
    throw new Error("GIGSBERG_FEED_URL saknas i .env.local");
  }

  return new Promise((resolve, reject) => {
    const results: any[] = [];

    https.get(feedUrl, (response) => {
      // Dekomprimera gzip-strömmen i minnet
      const gunzip = zlib.createGunzip();

      response
        .pipe(gunzip)
        .pipe(csv())
        .on('data', (row) => {
          const category = row.category_name || '';
          const productName = row.product_name || '';

          // Filtrera bort konserter och teater
          if (category.includes('Concerts') || category.includes('Theater')) {
            return;
          }

          // Mappa till samma format som dina övriga feeds
          results.push({
            id: row.aw_deep_link,
            title: productName,
            priceUSD: parseFloat(row.search_price),
            currency: row.currency || 'USD',
            url: row.aw_deep_link,
            merchant: 'Gigsberg',
          });
        })
        .on('end', () => {
          console.log(`Hämtade ${results.length} biljetter från Gigsberg.`);
          resolve(results);
        })
        .on('error', (err) => reject(err));
    }).on('error', (err) => reject(err));
  });
}