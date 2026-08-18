// --- SPORTS EVENTS 365 ---
const AFFILIATE_ID = '5jutr9xaq8h3j';

export const getAffiliateUrl = (destinationUrl: string): string => {
  const separator = destinationUrl.includes('?') ? '&' : '?';
  return `${destinationUrl}${separator}a_aid=${AFFILIATE_ID}`;
};


// --- TICOMBO (PARTNERIZE) ---
const TICOMBO_CAMREF = '1100l5Rouq';

export const getTicomboSearchUrl = (homeTeam: string, awayTeam?: string, league?: string): string => {
  // Sök enbart på hemmalaget i ren text
  const targetUrl = `https://www.ticombo.com/en/discover?q=${encodeURIComponent(homeTeam)}`;
  const trackingBase = `https://ticombo.prf.hn/click/camref:${TICOMBO_CAMREF}`;
  
  return `${trackingBase}/destination:${encodeURIComponent(targetUrl)}`;
};