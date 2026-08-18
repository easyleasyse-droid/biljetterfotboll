// --- SPORTS EVENTS 365 ---
const AFFILIATE_ID = '5jutr9xaq8h3j';

export const getAffiliateUrl = (destinationUrl: string): string => {
  const separator = destinationUrl.includes('?') ? '&' : '?';
  return `${destinationUrl}${separator}a_aid=${AFFILIATE_ID}`;
};


// --- TICOMBO (PARTNERIZE) ---
const TICOMBO_CAMREF = '1100l5Rouq';

export const getTicomboSearchUrl = (homeTeam: string, awayTeam: string, league?: string): string => {
  let targetUrl = 'https://www.ticombo.com/en/discover/sports/football';

  // Anpassa destinationen efter liga om det finns
  if (league) {
    const l = league.toLowerCase();
    if (l.includes('premier league')) {
      targetUrl = 'https://www.ticombo.com/en/discover/sports/football/premier-league';
    } else if (l.includes('la liga')) {
      targetUrl = 'https://www.ticombo.com/en/discover/sports/football/la-liga';
    } else if (l.includes('champions league')) {
      targetUrl = 'https://www.ticombo.com/en/discover/sports/football/uefa-champions-league';
    } else if (l.includes('serie a')) {
      targetUrl = 'https://www.ticombo.com/en/discover/sports/football/serie-a';
    }
  }

  const trackingBase = `https://ticombo.prf.hn/click/camref:${TICOMBO_CAMREF}`;
  return `${trackingBase}/destination:${encodeURIComponent(targetUrl)}`;
};