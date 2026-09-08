export async function fetchGigsbergTickets() {
  const feedUrl = process.env.GIGSBERG_FEED_URL;
  if (!feedUrl) {
    throw new Error("GIGSBERG_FEED_URL saknas i miljövariablerna");
  }

  try {
    // Använder native fetch med revalidate (1 timme) för att slippa unstable_cache 2MB-gränsen
    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
    });

    if (!response.ok) {
      throw new Error(`Gigsberg HTTP error! status: ${response.status}`);
    }

    const rawData = await response.text();
    const lines = rawData.split('\n');
    if (lines.length === 0) return [];

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
    return results;

  } catch (err) {
    console.error("Fel vid hämtning/parsing av Gigsberg-feed:", err);
    return [];
  }
}