// --- SPORTS EVENTS 365 ---
const AFFILIATE_ID = '5jutr9xaq8h3j';

export const getAffiliateUrl = (destinationUrl: string): string => {
  const separator = destinationUrl.includes('?') ? '&' : '?';
  return `${destinationUrl}${separator}a_aid=${AFFILIATE_ID}`;
};


// --- TICOMBO (PARTNERIZE) ---
const TICOMBO_CAMREF = '1100l5Rouq';

export const getTicomboSearchUrl = (homeTeam: string, awayTeam: string): string => {
  // 1. Skapa sökfras baserat på lagen
  const query = `${homeTeam} vs ${awayTeam}`;
  
  // 2. Mål-URL för sökningen på Ticombo
  const searchUrl = `https://www.ticombo.com/en/discover?q=${encodeURIComponent(query)}`;
  
  // 3. Partnerize spårningslänk
  const trackingBase = `https://ticombo.prf.hn/click/camref:${TICOMBO_CAMREF}`;
  
  return `${trackingBase}/destination:${encodeURIComponent(searchUrl)}`;
};