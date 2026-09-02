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

const P1_TRAVEL_CAMREF = '1100l5RoWA';

export const getP1TravelUrl = (homeTeam: string, league?: string): string => {
  // 1. Bygg mål-URL:en hos P1 Travel (sök enbart på hemmalaget för bäst träff)
  const targetUrl = `https://www.p1travel.com/en/search?q=${encodeURIComponent(homeTeam)}`;

  // 2. Koppla ihop med din Partnerize-länk
  return `https://p1travel.prf.hn/click/camref:${P1_TRAVEL_CAMREF}/destination:${encodeURIComponent(targetUrl)}`;
};

// --- FOOTBALL TICKET NET (AWIN) ---
const FTN_PUBLISHER_ID = '3043299';
const FTN_ADVERTISER_ID = '66509';

export const getFootballTicketNetUrl = (homeTeam: string, awayTeam: string): string => {
  const searchQuery = encodeURIComponent(`${homeTeam} vs ${awayTeam}`);
  const targetUrl = encodeURIComponent(`https://www.footballticketnet.com/search?q=${searchQuery}`);

  return `https://www.awin1.com/cread.php?awinmid=${FTN_ADVERTISER_ID}&awinaffid=${FTN_PUBLISHER_ID}&ued=${targetUrl}`;
};