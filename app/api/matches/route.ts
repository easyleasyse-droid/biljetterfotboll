import { NextResponse } from "next/server";
import { TEAMS_SEO_DATA } from "../../data/teams";

const formatTeamName = (key: string) => {
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const MY_MATCHES = [  
  { homeKey: "real-madrid", awayKey: "barcelona", date: "2026-08-29", time: "21:00" },
  { homeKey: "inter", awayKey: "ac-milan", date: "2026-08-30", time: "20:45" },
  { homeKey: "liverpool", awayKey: "manchester-united", date: "2026-09-02", time: "16:30" },
  { homeKey: "psg", awayKey: "marseille", date: "2026-09-06", time: "21:00" },
  { homeKey: "bayern-munchen", awayKey: "borussia-dortmund", date: "2026-09-12", time: "18:30" },
  { homeKey: "malmo-ff", awayKey: "tottenham", date: "2026-09-17", time: "19:00" },
  { homeKey: "arsenal", awayKey: "coventry", date: "2026-08-21", time: "21:00" },
  { homeKey: "nottingham", awayKey: "leeds", date: "2026-08-22", time: "16:00" },
  { homeKey: "ipswich", awayKey: "sunderland", date: "2026-08-22", time: "16:00" },
  { homeKey: "everton", awayKey: "crytal-palace", date: "2026-08-22", time: "16:00" },
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
];

const getSearchUrl = (
  merchantName: string, 
  homeTeam: string, 
  awayTeam: string,
  customUrl?: string
): string => {
  // Om du klistrat in en direktlänk i MY_MATCHES används den!
  if (customUrl) return customUrl;

  const query = encodeURIComponent(`${homeTeam} ${awayTeam}`);

  // Fallbacks som garanterat ALDRIG ger 404 och sätter din affiliate-cookie
  const domainMap: Record<string, string> = {
    "Viagogo": `https://www.viagogo.se/Search?q=${query}`,
    "StubHub": `https://www.stubhub.se/`,
    "Ticombo": `https://www.ticombo.com/sv/search?q=${query}`,
    "Sports Events 365": `https://www.sportsevents365.com/?a_aid=5jutr9xaq8h3j`
  };

  return domainMap[merchantName] || `https://www.google.com/search?q=${query}`;
};

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const upcomingMatches = MY_MATCHES.filter((m) => m.date >= today);

    const matches = upcomingMatches.map((m, index) => {
      const matchId = `m-${index + 1}`;
      
      const homeInfo = TEAMS_SEO_DATA[m.homeKey];
      const awayInfo = TEAMS_SEO_DATA[m.awayKey];

      const homeName = homeInfo?.name || formatTeamName(m.homeKey);
      const awayName = awayInfo?.name || formatTeamName(m.awayKey);

      const basePrice = 1100 + (index * 120) % 750;

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
    });

    return NextResponse.json(matches);
  } catch (error: any) {
    return NextResponse.json({ error: "Kunde inte läsa in matcher" }, { status: 500 });
  }
}