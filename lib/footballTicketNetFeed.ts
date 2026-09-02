export interface FootballTicketNetTicket {
  title: string;
  directUrl: string;
}

/**
 * Genererar en spårningslänk till Football Ticket Net via Awin
 */
export function findFootballTicketNetTicket(
  homeTeam: string,
  awayTeam: string
): FootballTicketNetTicket {
  const publisherId = "3043299";
  const advertiserId = "66509"; // Football Ticket Nets Merchant ID på Awin

  const searchQuery = encodeURIComponent(`${homeTeam} vs ${awayTeam}`);
  const targetUrl = encodeURIComponent(`https://www.footballticketnet.com/search?q=${searchQuery}`);

  // Awin Deeplink-struktur
  const directUrl = `https://www.awin1.com/cread.php?awinmid=${advertiserId}&awinaffid=${publisherId}&ued=${targetUrl}`;

  return {
    title: `${homeTeam} vs ${awayTeam}`,
    directUrl: directUrl
  };
}