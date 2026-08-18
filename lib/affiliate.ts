// --- SPORTS EVENTS 365 ---
const AFFILIATE_ID = '5jutr9xaq8h3j';

export const getAffiliateUrl = (destinationUrl: string): string => {
  const separator = destinationUrl.includes('?') ? '&' : '?';
  return `${destinationUrl}${separator}a_aid=${AFFILIATE_ID}`;
};


// --- TICOMBO (PARTNERIZE) ---
const TICOMBO_CAMREF = '1100l5Rouq';

// Hjälpfunktion för att göra om lag-namn till Ticombos URL-format
// Ex: "Atlético Madrid" -> "atletico-de-madrid"
// Ex: "FC Barcelona" -> "fc-barcelona"
const slugifyTeam = (teamName: string): string => {
  return teamName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Tar bort accenttecken (é, á, ö osv)
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "") // Tar bort specialtecken
    .trim()
    .replace(/\s+/g, "-"); // Ersätter mellanslag med bindestreck
};

export const getTicomboSearchUrl = (homeTeam: string, awayTeam?: string, league?: string): string => {
  const teamSlug = slugifyTeam(homeTeam);
  
  // Direktlänk till hemmalagets biljettsida hos Ticombo (t.ex. ticombo.com/en/sports-tickets/football/atletico-de-madrid)
  const targetUrl = `https://www.ticombo.com/en/sports-tickets/football/${teamSlug}`;

  const trackingBase = `https://ticombo.prf.hn/click/camref:${TICOMBO_CAMREF}`;
  return `${trackingBase}/destination:${encodeURIComponent(targetUrl)}`;
};