import { NextResponse } from "next/server";
import { TEAMS_SEO_DATA } from "../../data/teams";

// Här lägger du enkelt till eller ändrar matcher.
// Använd samma nycklar som finns i din teams.ts (t.ex. "inter", "milan", "arsenal").
const MY_MATCHES = [
  { homeKey: "arsenal", awayKey: "chelsea", date: "2026-08-25", time: "21:00" },
  { homeKey: "real-madrid", awayKey: "barcelona", date: "2026-08-29", time: "21:00" },
  { homeKey: "inter", awayKey: "milan", date: "2026-08-30", time: "20:45" },
  { homeKey: "liverpool", awayKey: "manchester-united", date: "2026-09-02", time: "16:30" },
  { homeKey: "psg", awayKey: "marseille", date: "2026-09-06", time: "21:00" },
  { homeKey: "bayern-munchen", awayKey: "dortmund", date: "2026-09-12", time: "18:30" },
  { homeKey: "malmo-ff", awayKey: "tottenham", date: "2026-09-17", time: "19:00" }
];

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
      
      // Hämta exakt lagdata direkt från TEAMS_SEO_DATA baserat på nyckeln
      const homeInfo = TEAMS_SEO_DATA[m.homeKey];
      const awayInfo = TEAMS_SEO_DATA[m.awayKey];

      const homeName = homeInfo?.name || m.homeKey;
      const awayName = awayInfo?.name || m.awayKey;

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
          url: getSearchUrl("Sports Events 365", homeName, awayName),
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
          url: getSearchUrl("StubHub", homeName, awayName),
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