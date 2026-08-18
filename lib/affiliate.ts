// --- SPORTS EVENTS 365 ---
const AFFILIATE_ID = '5jutr9xaq8h3j';

export const getAffiliateUrl = (destinationUrl: string): string => {
  const separator = destinationUrl.includes('?') ? '&' : '?';
  return `${destinationUrl}${separator}a_aid=${AFFILIATE_ID}`;
};


// --- TICOMBO (PARTNERIZE) ---
const TICOMBO_CAMREF = '1100l5Rouq';

export const getTicomboSearchUrl = (homeTeam: string, awayTeam: string): string => {
  // Sök enbart på hemmalaget (t.ex. "Atlético Madrid") för att garantera sökträffar
  const query = homeTeam;
  
  const searchUrl = `https://www.ticombo.com/en/discover?q=${encodeURIComponent(query)}`;
  const trackingBase = `https://ticombo.prf.hn/click/camref:${TICOMBO_CAMREF}`;
  
  return `${trackingBase}/destination:${encodeURIComponent(searchUrl)}`;
};