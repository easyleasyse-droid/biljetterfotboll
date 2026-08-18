import { NextResponse } from "next/server";
import { TEAMS_SEO_DATA } from "../../data/teams";
import { getP1TicketForMatch } from "@/lib/p1Feed";

const formatTeamName = (key: string) => {
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const MY_MATCHES = [
  { homeKey: "arsenal", awayKey: "coventry", date: "2026-08-21", time: "21:00" },
  { homeKey: "nottingham", awayKey: "leeds", date: "2026-08-22", time: "16:00" },
  { homeKey: "ipswich", awayKey: "sunderland", date: "2026-08-22", time: "16:00" },
  { homeKey: "everton", awayKey: "crystal-palace", date: "2026-08-22", time: "16:00" },
  { homeKey: "hull-city", awayKey: "manchester-united", date: "2026-08-22", time: "13:30" },
  { homeKey: "brentford", awayKey: "tottenham", date: "2026-08-22", time: "18:30" },
  { homeKey: "manchester-city", awayKey: "bournemouth", date: "2026-08-23", time: "15:00" },
  { homeKey: "brighton", awayKey: "aston-villa", date: "2026-08-23", time: "15:00" },
  { homeKey: "newcastle", awayKey: "liverpool", date: "2026-08-23", time: "17:30" },
  { homeKey: "crystal-palace", awayKey: "manchester-city", date: "2026-08-28", time: "21:00" },
  { homeKey: "liverpool", awayKey: "nottingham", date: "2026-08-29", time: "13:30" },
  { homeKey: "coventry", awayKey: "hull-city", date: "2026-08-29", time: "16:00" },
  { homeKey: "bournemouth", awayKey: "everton", date: "2026-08-29", time: "16:00" },
  { homeKey: "tottenham", awayKey: "newcastle", date: "2026-08-29", time: "18:30" },
  { homeKey: "chelsea", awayKey: "brighton", date: "2026-08-30", time: "15:00" },
  { homeKey: "leeds", awayKey: "brentford", date: "2026-08-30", time: "15:00" },
  { homeKey: "sunderland", awayKey: "fulham", date: "2026-08-30", time: "15:00" },
  { homeKey: "manchester-united", awayKey: "ipswich", date: "2026-08-30", time: "17:30" },
  { homeKey: "aston-villa", awayKey: "arsenal", date: "2026-08-31", time: "21:00" },
  { homeKey: "ipswich", awayKey: "liverpool", date: "2026-09-04", time: "21:00" },
  { homeKey: "newcastle", awayKey: "bournemouth", date: "2026-09-05", time: "13:30" },
  { homeKey: "brentford", awayKey: "sunderland", date: "2026-09-05", time: "16:30" },
  { homeKey: "nottingham", awayKey: "tottenham", date: "2026-09-05", time: "16:00" }, 
  { homeKey: "manchester-city", awayKey: "coventry", date: "2026-09-05", time: "16:00" },
  { homeKey: "fulham", awayKey: "crystal-palace", date: "2026-09-05", time: "16:00" },
  { homeKey: "brighton", awayKey: "leeds", date: "2026-09-05", time: "16:00" },
  { homeKey: "hull-city", awayKey: "aston-villa", date: "2026-09-05", time: "18:30" },
  { homeKey: "everton", awayKey: "manchester-united", date: "2026-09-06", time: "15:00" },
  { homeKey: "arsenal", awayKey: "chelsea", date: "2026-09-06", time: "17:30" },
  { homeKey: "liverpool", awayKey: "fulham", date: "2026-09-12", time: "16:00" },
  { homeKey: "crystal-palace", awayKey: "ipswich", date: "2026-09-12", time: "16:00" },
  { homeKey: "bournemouth", awayKey: "brentford", date: "2026-09-12", time: "16:00" },
  { homeKey: "aston-villa", awayKey: "nottingham", date: "2026-09-12", time: "16:00" },
  { homeKey: "chelsea", awayKey: "hull-city", date: "2026-09-12", time: "16:00" },
  { homeKey: "tottenham", awayKey: "everton", date: "2026-09-12", time: "18:30" },
  { homeKey: "sunderland", awayKey: "arsenal", date: "2026-09-12", time: "21:00" },
  { homeKey: "coventry", awayKey: "brighton", date: "2026-09-13", time: "15:00" },
  { homeKey: "manchester-united", awayKey: "manchester-city", date: "2026-09-13", time: "17:30" },
  { homeKey: "leeds", awayKey: "newcastle", date: "2026-09-14", time: "21:00" },
  { homeKey: "racing-santander", awayKey: "villareal", date: "2026-08-16", time: "17:00" },
  { homeKey: "espanyol", awayKey: "levante", date: "2026-08-16", time: "19:00" },
  { homeKey: "deportivo", awayKey: "elche", date: "2026-08-17", time: "21:00" },
  { homeKey: "atletico-madrid", awayKey: "malaga", date: "2026-08-19", time: "21:00" },
  { homeKey: "rayo", awayKey: "alaves", date: "2026-08-20", time: "21:00" },
  { homeKey: "real-betis", awayKey: "real-sociedad", date: "2026-08-21", time: "21:00" },
  { homeKey: "athletic-bilbao", awayKey: "sevilla", date: "2026-08-22", time: "17:00" },
  { homeKey: "valencia", awayKey: "celta-vigo", date: "2026-08-22", time: "19:30" },
  { homeKey: "espanyol", awayKey: "real-madrid", date: "2026-08-22", time: "21:30" },
  { homeKey: "atletico-madrid", awayKey: "villarreal", date: "2026-08-23", time: "17:00" },
  { homeKey: "getafe", awayKey: "racing-santander", date: "2026-08-23", time: "19:30" },
  { homeKey: "elche", awayKey: "barcelona", date: "2026-08-23", time: "21:30" },
  { homeKey: "osasuna", awayKey: "levante", date: "2026-08-24", time: "19:30" },
  { homeKey: "valencia", awayKey: "real-betis", date: "2026-08-25", time: "21:00" },
  { homeKey: "real-madrid", awayKey: "real-sociedad", date: "2026-08-26", time: "21:00" },
  { homeKey: "celta-vigo", awayKey: "osasuna", date: "2026-08-27", time: "20:30" },
  { homeKey: "barcelona", awayKey: "athletic-bilbao", date: "2026-08-27", time: "21:00" },
  { homeKey: "racing-santander", awayKey: "elche", date: "2026-08-28", time: "19:00" },
  { homeKey: "alaves", awayKey: "villarreal", date: "2026-08-28", time: "21:30" },
  { homeKey: "levante", awayKey: "real-betis", date: "2026-08-29", time: "17:00" },
  { homeKey: "real-sociedad", awayKey: "espanyol", date: "2026-08-29", time: "19:00" },
  { homeKey: "sevilla", awayKey: "atletico-madrid", date: "2026-08-29", time: "21:30" },
  { homeKey: "real-madrid", awayKey: "malaga", date: "2026-08-30", time: "17:00" },
  { homeKey: "deportivo", awayKey: "valencia", date: "2026-08-30", time: "19:30" },
  { homeKey: "celta-vigo", awayKey: "athletic-bilbao", date: "2026-08-30", time: "21:30" },
  { homeKey: "osasuna", awayKey: "getafe", date: "2026-08-31", time: "19:30" },
  { homeKey: "barcelona", awayKey: "rayo", date: "2026-08-31", time: "21:30" },
  { homeKey: "real-sociedad", awayKey: "celta-vigo", date: "2026-09-03", time: "21:00" },
  { homeKey: "real-betis", awayKey: "real-madrid", date: "2026-09-04", time: "21:00" },
  { homeKey: "athletic-bilbao", awayKey: "atletico-madrid", date: "2026-09-05", time: "16:15" },
  { homeKey: "rayo", awayKey: "racing-santander", date: "2026-09-05", time: "18:30" },
  { homeKey: "villarreal", awayKey: "deportivo", date: "2026-09-05", time: "21:00" },
  { homeKey: "valencia", awayKey: "barcelona", date: "2026-09-06", time: "16:15" },
  { homeKey: "alaves", awayKey: "osasuna", date: "2026-09-06", time: "18:30" },
  { homeKey: "malaga", awayKey: "levante", date: "2026-09-06", time: "18:30" },
  { homeKey: "espanyol", awayKey: "sevilla", date: "2026-09-06", time: "21:00" },
  { homeKey: "getafe", awayKey: "celta-vigo", date: "2026-09-07", time: "19:00" },
  { homeKey: "elche", awayKey: "real-sociedad", date: "2026-09-07", time: "21:30" },
  { homeKey: "getafe", awayKey: "deportivo", date: "2026-09-13", time: "TBD" },
  { homeKey: "real-sociedad", awayKey: "atletico-madrid", date: "2026-09-13", time: "TBD" },
  { homeKey: "levante", awayKey: "barcelona", date: "2026-09-13", time: "TBD" },
  { homeKey: "athletic-bilbao", awayKey: "elche", date: "2026-09-13", time: "TBD" },
  { homeKey: "sevilla", awayKey: "valencia", date: "2026-09-13", time: "TBD" },
  { homeKey: "osasuna", awayKey: "espanyol", date: "2026-09-13", time: "TBD" },
  { homeKey: "real-madrid", awayKey: "rayo", date: "2026-09-13", time: "TBD" },
  { homeKey: "villarreal", awayKey: "real-betis", date: "2026-09-13", time: "TBD" },
  { homeKey: "celta-vigo", awayKey: "malaga", date: "2026-09-13", time: "TBD" },
  { homeKey: "racing-santander", awayKey: "alaves", date: "2026-09-13", time: "TBD" },
  { homeKey: "udinese", awayKey: "como", date: "2026-08-22", time: "18:30" },
  { homeKey: "inter", awayKey: "monza", date: "2026-08-22", time: "18:30" },
  { homeKey: "parma", awayKey: "cagliari", date: "2026-08-22", time: "20:45" },
  { homeKey: "genoa", awayKey: "napoli", date: "2026-08-22", time: "20:45" },
  { homeKey: "venezia", awayKey: "lecce", date: "2026-08-23", time: "18:30" },
  { homeKey: "frosinone", awayKey: "juventus", date: "2026-08-23", time: "18:30" },
  { homeKey: "torino", awayKey: "milan", date: "2026-08-23", time: "20:45" },
  { homeKey: "atalanta", awayKey: "sassuolo", date: "2026-08-23", time: "20:45" },
  { homeKey: "bologna", awayKey: "lazio", date: "2026-08-24", time: "18:30" },
  { homeKey: "roma", awayKey: "fiorentina", date: "2026-08-24", time: "20:45" },
  { homeKey: "milan", awayKey: "venezia", date: "2026-08-28", time: "20:45" },
  { homeKey: "sassuolo", awayKey: "torino", date: "2026-08-29", time: "18:30" },
  { homeKey: "fiorentina", awayKey: "frosinone", date: "2026-08-29", time: "18:30" },
  { homeKey: "monza", awayKey: "udinese", date: "2026-08-29", time: "18:30" },
  { homeKey: "juventus", awayKey: "parma", date: "2026-08-29", time: "20:45" },
  { homeKey: "napoli", awayKey: "como", date: "2026-08-30", time: "18:30" },
  { homeKey: "cagliari", awayKey: "inter", date: "2026-08-30", time: "20:45" },
  { homeKey: "lazio", awayKey: "genoa", date: "2026-08-30", time: "20:45" },
  { homeKey: "lecce", awayKey: "roma", date: "2026-08-31", time: "18:30" },
  { homeKey: "atalanta", awayKey: "bologna", date: "2026-08-31", time: "20:45" },
  { homeKey: "genoa", awayKey: "como", date: "2026-09-04", time: "20:45" },
  { homeKey: "fiorentina", awayKey: "torino", date: "2026-09-05", time: "15:00" },
  { homeKey: "inter", awayKey: "napoli", date: "2026-09-05", time: "18:00" },
  { homeKey: "roma", awayKey: "atalanta", date: "2026-09-05", time: "20:45" },
  { homeKey: "parma", awayKey: "monza", date: "2026-09-06", time: "15:00" },
  { homeKey: "frosinone", awayKey: "venezia", date: "2026-09-06", time: "15:00" },
  { homeKey: "bologna", awayKey: "sassuolo", date: "2026-09-06", time: "18:00" },
  { homeKey: "juventus", awayKey: "milan", date: "2026-09-06", time: "20:45" },
  { homeKey: "cagliari", awayKey: "lecce", date: "2026-09-07", time: "18:00" },
  { homeKey: "uddinese", awayKey: "lazio", date: "2026-09-07", time: "20:45" },
  { homeKey: "venezia", awayKey: "fiorentina", date: "2026-09-11", time: "20:45" },
  { homeKey: "genoa", awayKey: "frosinone", date: "2026-09-12", time: "15:00" },
  { homeKey: "sassuolo", awayKey: "juventus", date: "2026-09-12", time: "18:00" },
  { homeKey: "atalanta", awayKey: "cagliari", date: "2026-09-12", time: "20:45" },
  { homeKey: "torino", awayKey: "roma", date: "2026-09-13", time: "12:30" },
  { homeKey: "lecce", awayKey: "monza", date: "2026-09-13", time: "15:00" },
  { homeKey: "como", awayKey: "parma", date: "2026-09-13", time: "15:00" },
  { homeKey: "napoli", awayKey: "bologna", date: "2026-09-13", time: "18:00" },
  { homeKey: "lazio", awayKey: "milan", date: "2026-09-13", time: "20:45" },
  { homeKey: "inter", awayKey: "udinese", date: "2026-09-14", time: "20:45" },
  { homeKey: "marseille", awayKey: "strasbourg", date: "2026-08-21", time: "20:45" },
  { homeKey: "nice", awayKey: "lorient", date: "2026-08-22", time: "20:45" },
  { homeKey: "toulouse", awayKey: "lyon", date: "2026-08-22", time: "20:45" },
  { homeKey: "angers", awayKey: "lille", date: "2026-08-23", time: "15:00" },
  { homeKey: "psg", awayKey: "rennes", date: "2026-08-23", time: "20:45" },
  { homeKey: "lille", awayKey: "psg", date: "2026-08-28", time: "20:45" },
  { homeKey: "strasbourg", awayKey: "lens", date: "2026-08-29", time: "17:15" },
  { homeKey: "lyon", awayKey: "le-havre", date: "2026-08-29", time: "20:45" },
  { homeKey: "paris-fc", awayKey: "nice", date: "2026-08-30", time: "15:00" },
  { homeKey: "monaco", awayKey: "marseille", date: "2026-08-30", time: "20:45" },
  { homeKey: "toulouse", awayKey: "lille", date: "2026-09-03", time: "20:45" },
  { homeKey: "lyon", awayKey: "auxerre", date: "2026-09-04", time: "19:00" },
  { homeKey: "psg", awayKey: "monaco", date: "2026-09-04", time: "21:05" },
  { homeKey: "nice", awayKey: "le-mans", date: "2026-09-05", time: "20:45" },
  { homeKey: "troyes", awayKey: "strasbourg", date: "2026-09-06", time: "15:00" },
  { homeKey: "marseille", awayKey: "paris-fc", date: "2026-09-06", time: "20:45" },
  { homeKey: "rennes", awayKey: "marseille", date: "2026-09-11", time: "20:45" },
  { homeKey: "strasbourg", awayKey: "monaco", date: "2026-09-12", time: "17:15" },
  { homeKey: "auxerre", awayKey: "nice", date: "2026-09-12", time: "20:45" },
  { homeKey: "paris-fc", awayKey: "lyon", date: "2026-09-12", time: "20:45" },
  { homeKey: "lille", awayKey: "troyes", date: "2026-09-13", time: "15:00" },
  { homeKey: "brest", awayKey: "psg", date: "2026-09-13", time: "20:45" },
  { homeKey: "bayern-munchen", awayKey: "stuttgart", date: "2026-08-28", time: "20:30" },
  { homeKey: "leipzig", awayKey: "monchengladbach", date: "2026-08-29", time: "15:30" },
  { homeKey: "mainz", awayKey: "paderborn", date: "2026-08-29", time: "15:30" },
  { homeKey: "koln", awayKey: "hoffenheim", date: "2026-08-29", time: "15:30" },
  { homeKey: "union-berlin", awayKey: "eintracht-frankfurt", date: "2026-08-29", time: "15:30" },
  { homeKey: "elversberg", awayKey: "bayer-leverkusen", date: "2026-08-29", time: "15:30" },
  { homeKey: "borussia-dortmund", awayKey: "hamburg", date: "2026-08-29", time: "18:30" },
  { homeKey: "freiburg", awayKey: "werder-bremen", date: "2026-08-30", time: "15:30" },
  { homeKey: "augsburg", awayKey: "schalke", date: "2026-08-30", time: "17:30" },
  { homeKey: "stuttgart", awayKey: "koln", date: "2026-09-04", time: "20:30" },
  { homeKey: "monchengladbach", awayKey: "elversberg", date: "2026-09-05", time: "15:30" },
  { homeKey: "werder-bremen", awayKey: "leipzig", date: "2026-09-05", time: "15:30" },
  { homeKey: "hoffenheim", awayKey: "borussia-dortmund", date: "2026-09-05", time: "15:30" },
  { homeKey: "paderborn", awayKey: "freiburg", date: "2026-09-05", time: "15:30" },
  { homeKey: "bayer-leverkusen", awayKey: "union-berlin", date: "2026-09-05", time: "15:30" },
  { homeKey: "schalke", awayKey: "bayern-munchen", date: "2026-09-05", time: "18:30" },
  { homeKey: "hamburger-sv", awayKey: "mainz", date: "2026-09-06", time: "15:30" },
  { homeKey: "eintracht-frankfurt", awayKey: "augsburg", date: "2026-09-06", time: "17:30" },
  { homeKey: "union-berlin", awayKey: "schalke", date: "2026-09-11", time: "20:30" },
  { homeKey: "borussia-dortmund", awayKey: "paderborn", date: "2026-09-12", time: "15:30" },
  { homeKey: "mainz", awayKey: "eintracht-frankfurt", date: "2026-09-12", time: "15:30" },
  { homeKey: "hoffenheim", awayKey: "stuttgart", date: "2026-09-12", time: "15:30" },
  { homeKey: "freiburg", awayKey: "monchengladbach", date: "2026-09-12", time: "15:30" },
  { homeKey: "augsburg", awayKey: "bayer-leverkusen", date: "2026-09-12", time: "15:30" },
  { homeKey: "koln", awayKey: "werder-bremen", date: "2026-09-12", time: "18:30" },
  { homeKey: "leipzig", awayKey: "hamburger-sv", date: "2026-09-13", time: "15:30" },
  { homeKey: "elversberg", awayKey: "bayern-munchen", date: "2026-09-13", time: "17:30" },
  { homeKey: "bayern-munchen", awayKey: "union-berlin", date: "2026-09-18", time: "20:30" },
  { homeKey: "werder-bremen", awayKey: "augsburg", date: "2026-09-19", time: "15:30" },
  { homeKey: "monchengladbach", awayKey: "mainz", date: "2026-09-19", time: "15:30" },
  { homeKey: "hamburger-sv", awayKey: "koln", date: "2026-09-19", time: "15:30" },
  { homeKey: "eintracht-frankfurt", awayKey: "freiburg", date: "2026-09-19", time: "15:30" },
  { homeKey: "stuttgart", awayKey: "borussia-dortmund", date: "2026-09-19", time: "18:30" },
  { homeKey: "bayer-leverkusen", awayKey: "leipzig", date: "2026-09-20", time: "15:30" },
  { homeKey: "schalke", awayKey: "elversberg", date: "2026-09-20", time: "17:30" },
  { homeKey: "paderborn", awayKey: "hoffenheim", date: "2026-09-20", time: "19:30" },
  { homeKey: "psv", awayKey: "groningen", date: "2026-08-23", time: "14:30" },
  { homeKey: "cambuur", awayKey: "feyenoord", date: "2026-08-23", time: "16:45" },
  { homeKey: "utrecht", awayKey: "psv", date: "2026-08-30", time: "12:15" },
  { homeKey: "feyenoord", awayKey: "den-haag", date: "2026-08-30", time: "14:30" },
  { homeKey: "telstar", awayKey: "ajax", date: "2026-08-30", time: "16:45" },
  { homeKey: "cambuur", awayKey: "twente", date: "2026-08-30", time: "20:00" },

];

const getSearchUrl = (
  merchantName: string, 
  homeTeam: string, 
  awayTeam: string,
  customUrl?: string
): string => {
  if (customUrl) return customUrl;

  const query = encodeURIComponent(`${homeTeam} ${awayTeam}`);

  const domainMap: Record<string, string> = {
  "Viagogo": `https://www.viagogo.se/Search?q=${query}`,
  "StubHub": `https://www.stubhub.se/`,
  "Ticombo": `https://ticombo.prf.hn/click/camref:1100l5Rouq/destination:${encodeURIComponent('https://www.ticombo.com/en/sports-tickets/football')}`,
  "P1 Travel": `https://p1travel.prf.hn/click/camref:1100l5RoWA/destination:${encodeURIComponent(`https://www.p1travel.com/en/search?q=${query}`)}`,
  "Sports Events 365": `https://www.sportsevents365.com/?a_aid=5jutr9xaq8h3j`
};

  return domainMap[merchantName] || `https://www.google.com/search?q=${query}`;
};

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const upcomingMatches = MY_MATCHES.filter((m) => m.date >= today);

    const matches = await Promise.all(
      upcomingMatches.map(async (m, index) => {
        const matchId = `m-${index + 1}`;
        
        const homeInfo = TEAMS_SEO_DATA[m.homeKey];
        const awayInfo = TEAMS_SEO_DATA[m.awayKey];

        const homeName = homeInfo?.name || formatTeamName(m.homeKey);
        const awayName = awayInfo?.name || formatTeamName(m.awayKey);

        const basePrice = 1100 + (index * 120) % 750;

        // Slå upp matchen i P1 Travels CSV-feed
        const p1Data = await getP1TicketForMatch(homeName, awayName);

        // Om en direktlänk finns i feeden används den, annars söklänken
        const p1Url = p1Data?.directUrl 
          ? `https://p1travel.prf.hn/click/camref:1100l5RoWA/destination:${encodeURIComponent(p1Data.directUrl)}`
          : getSearchUrl("P1 Travel", homeName, awayName);

        // Om pris hittades i feeden (EUR), räkna om till SEK (~11.5 EUR/SEK)
        const p1PriceSEK = p1Data && p1Data.price 
          ? Math.round(p1Data.price * 11.5) 
          : Math.round(basePrice * 1.15);

        const offers = [
          {
            id: `o-${matchId}-se365`,
            merchantName: "Sports Events 365",
            rating: 4.8,
            reviewsCount: 512,
            section: "Kortsida Standard",
            category: "Kortsida",
            priceSEK: basePrice,
            availableQuantity: 4,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: getSearchUrl("Sports Events 365", homeName, awayName, (m as any).se365Url),
            type: "ticket"
          },
          {
            id: `o-${matchId}-p1travel`,
            merchantName: "P1 Travel",
            rating: 4.9,
            reviewsCount: 1840,
            section: "Officiell Långsida",
            category: "Långsida",
            priceSEK: p1PriceSEK,
            availableQuantity: p1Data ? 8 : 4,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: p1Url,
            type: "ticket"
          },
          {
            id: `o-${matchId}-stubhub`,
            merchantName: "StubHub",
            rating: 4.8,
            reviewsCount: 3102,
            section: "Långsida Sektion",
            category: "Långsida",
            priceSEK: Math.round(basePrice * 1.25),
            availableQuantity: 6,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: getSearchUrl("StubHub", homeName, awayName, (m as any).stubhubUrl),
            type: "ticket"
          },
          {
            id: `o-${matchId}-viagogo`,
            merchantName: "Viagogo",
            rating: 4.4,
            reviewsCount: 1980,
            section: "Kortsida Nedre",
            category: "Kortsida",
            priceSEK: Math.round(basePrice * 0.95),
            availableQuantity: 2,
            deliveryType: "Mobilbiljett",
            isVerified: true,
            url: getSearchUrl("Viagogo", homeName, awayName),
            type: "ticket"
          },
          {
            id: `o-${matchId}-ticombo`,
            merchantName: "Ticombo",
            rating: 4.7,
            reviewsCount: 1540,
            section: "VIP / Hospitality",
            category: "VIP",
            priceSEK: Math.round(basePrice * 2.1),
            availableQuantity: 2,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: getSearchUrl("Ticombo", homeName, awayName),
            type: "ticket"
          }
        ];

        return {
          id: matchId,
          homeTeam: { 
            name: homeName, 
            shortName: homeName.substring(0, 3).toUpperCase(), 
            logo: homeInfo?.logo || `/logos/${m.homeKey}.png`,
            primaryColor: "#111827", 
            secondaryColor: "#FFFFFF", 
            emoji: "⚽" 
          },
          awayTeam: { 
            name: awayName, 
            shortName: awayName.substring(0, 3).toUpperCase(), 
            logo: awayInfo?.logo || `/logos/${m.awayKey}.png`,
            primaryColor: "#4B5563", 
            secondaryColor: "#FFFFFF", 
            emoji: "⚽" 
          },
          league: homeInfo?.league || "Fotboll",
          date: m.date,
          time: m.time,
          stadium: homeInfo?.stadiumName || "Stadion",
          city: homeInfo?.location || "Europa",
          priceFrom: Math.min(...offers.map((o) => o.priceSEK)),
          totalTicketsCount: 45,
          offers: offers
        };
      })
    );

    return NextResponse.json(matches);
  } catch (error: any) {
    return NextResponse.json({ error: "Kunde inte läsa in matcher" }, { status: 500 });
  }
}