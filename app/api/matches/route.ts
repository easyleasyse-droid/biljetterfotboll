import { NextResponse } from "next/server";
import { TEAMS_SEO_DATA } from "@/data/teams";

const MY_MATCHES = [
  { home: "Arsenal FC", away: "Chelsea FC", date: "2026-08-25", time: "21:00" },
  { home: "Real Madrid", away: "FC Barcelona", date: "2026-08-29", time: "21:00" },
  { home: "Inter", away: "Milan", date: "2026-08-30", time: "20:45" },
  { home: "Liverpool FC", away: "Manchester United", date: "2026-09-02", time: "16:30" },
  { home: "Paris Saint-Germain", away: "Marseille", date: "2026-09-06", time: "21:00" },
  { home: "Bayern München", away: "Dortmund", date: "2026-09-12", time: "18:30" },
  { home: "Malmö FF", away: "Tottenham Hotspur", date: "2026-09-17", time: "19:00" }
];

// Hjälpfunktion för att slå upp lag i TEAMS_SEO_DATA
function getTeamData(teamName: string) {
  const normalized = teamName.toLowerCase().trim();
  
  const foundKey = Object.keys(TEAMS_SEO_DATA).find(key => {
    const t = TEAMS_SEO_DATA[key];
    return key.toLowerCase() === normalized || 
           t.name?.toLowerCase() === normalized || 
           t.name?.toLowerCase().includes(normalized) ||
           normalized.includes(key.toLowerCase());
  });

  if (foundKey && TEAMS_SEO_DATA[foundKey]) {
    return TEAMS_SEO_DATA[foundKey];
  }

  return null;
}

const getSearchUrl = (merchantName: string, homeTeam: string, awayTeam: string): string => {
  const query = encodeURIComponent(`${homeTeam} ${awayTeam}`);
  const domainMap: Record<string, string> = {
    "Viagogo": `https://www.viagogo.se/Search?q=${query}`,
    "StubHub": `https://www.stubhub.se/search?q=${query}`,
    "Ticombo": `https://www.ticombo.com/sv/search?q=${query}`,
    "Sports Events 365": `https://www.sportsevents365.se/search?q=${query}&a_aid=5jutr9xaq8h3j`
  };
  return domainMap[merchantName] || `https://www.google.com/search?q=${query}`;
};

export async function GET() {
  try {
    const matches = MY_MATCHES.map((m, index) => {
      const matchId = `m-${index + 1}`;
      
      const homeInfo = getTeamData(m.home);
      const awayInfo = getTeamData(m.away);

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
          url: getSearchUrl("Sports Events 365", m.home, m.away),
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
          url: getSearchUrl("StubHub", m.home, m.away),
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
          url: getSearchUrl("Viagogo", m.home, m.away),
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
          url: getSearchUrl("Ticombo", m.home, m.away),
          type: "ticket"
        }
      ];

      return {
        id: matchId,
        homeTeam: { 
          name: homeInfo?.name || m.home, 
          shortName: m.home.substring(0, 3).toUpperCase(), 
          logo: homeInfo?.logo || `/logos/${m.home.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`,
          primaryColor: "#111827", 
          secondaryColor: "#FFFFFF", 
          emoji: "⚽" 
        },
        awayTeam: { 
          name: awayInfo?.name || m.away, 
          shortName: m.away.substring(0, 3).toUpperCase(), 
          logo: awayInfo?.logo || `/logos/${m.away.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`,
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