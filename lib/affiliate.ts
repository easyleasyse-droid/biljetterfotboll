// --- SPORTS EVENTS 365 ---
const AFFILIATE_ID = '5jutr9xaq8h3j';

export const getAffiliateUrl = (destinationUrl: string): string => {
  const separator = destinationUrl.includes('?') ? '&' : '?';
  return `${destinationUrl}${separator}a_aid=${AFFILIATE_ID}`;
};


// --- TICOMBO (PARTNERIZE) ---
const TICOMBO_CAMREF = '1100l5Rouq';

export const getTicomboSearchUrl = (homeTeam: string, awayTeam?: string, league?: string): string => {
  let targetUrl = 'https://www.ticombo.com/en/sports-tickets/football';

  if (league) {
    const l = league.toLowerCase();
    if (l.includes('premier league')) {
      targetUrl = 'https://www.ticombo.com/en/sports-tickets/football/premier-league';
    } else if (l.includes('la liga')) {
      targetUrl = 'https://www.ticombo.com/en/sports-tickets/football/la-liga';
    } else if (l.includes('champions league')) {
      targetUrl = 'https://www.ticombo.com/en/sports-tickets/football/uefa-champions-league';
    } else if (l.includes('serie a')) {
      targetUrl = 'https://www.ticombo.com/en/sports-tickets/football/serie-a';
    } else if (l.includes('bundesliga')) {
      targetUrl = 'https://www.ticombo.com/en/sports-tickets/football/bundesliga';
    }
  }

  const trackingBase = `https://ticombo.prf.hn/click/camref:${TICOMBO_CAMREF}`;
  return `${trackingBase}/destination:${encodeURIComponent(targetUrl)}`;
};