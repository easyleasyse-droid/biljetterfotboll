import { NextResponse } from "next/server";

// 1. Här listar vi bara de absoluta topplagen vi vill ska rotera på sajten!
const TOP_TEAMS = [
  { name: "Arsenal FC", short: "ARS", color1: "#EF0107", color2: "#FFFFFF", emoji: "🇬🇧", league: "Premier League", stadium: "Emirates Stadium", city: "London" },
  { name: "Chelsea FC", short: "CHE", color1: "#034694", color2: "#FFFFFF", emoji: "🔵", league: "Premier League", stadium: "Stamford Bridge", city: "London" },
  { name: "Manchester United", short: "MUN", color1: "#DA291C", color2: "#000000", emoji: "🇬🇧", league: "Premier League", stadium: "Old Trafford", city: "Manchester" },
  { name: "Liverpool FC", short: "LIV", color1: "#C8102E", color2: "#F6EB61", emoji: "🔴", league: "Premier League", stadium: "Anfield", city: "Liverpool" },
  { name: "Manchester City", short: "MCI", color1: "#6CABDD", color2: "#1C2C5B", emoji: "🇬🇧", league: "Premier League", stadium: "Etihad Stadium", city: "Manchester" },
  { name: "Real Madrid", short: "RMA", color1: "#FFFFFF", color2: "#FEBE10", emoji: "🇪🇸", league: "La Liga", stadium: "Santiago Bernabéu", city: "Madrid" },
  { name: "FC Barcelona", short: "BAR", color1: "#004D98", color2: "#A50044", emoji: "🇪🇸", league: "La Liga", stadium: "Camp Nou", city: "Barcelona" },
  { name: "Atlético Madrid", short: "ATM", color1: "#CB3524", color2: "#FFFFFF", emoji: "🔴", league: "La Liga", stadium: "Metropolitano", city: "Madrid" },
  { name: "AC Milan", short: "MIL", color1: "#E32119", color2: "#000000", emoji: "🇮🇹", league: "San Siro", city: "Milano" },
  { name: "Inter Milan", short: "INT", color1: "#0053A0", color2: "#000000", emoji: "🔵", league: "San Siro", city: "Milano" },
  { name: "Bayern München", short: "FCB", color1: "#DC052D", color2: "#0066B2", emoji: "🇩🇪", league: "Champions League", stadium: "Allianz Arena", city: "München" },
  { name: "Paris Saint-Germain", short: "PSG", color1: "#004170", color2: "#E30613", emoji: "🇫🇷", league: "Champions League", stadium: "Parc des Princes", city: "Paris" }
];

const getSearchUrl = (merchantName: string, homeTeam: string, awayTeam: string): string => {
  const query = encodeURIComponent(`${homeTeam} ${awayTeam}`);
  const domainMap: Record<string, string> = {
    "Viagogo": `https://www.viagogo.se/Search?q=${query}`,
    "StubHub": `https://www.stubhub.se/search?q=${query}`,
    "Ticombo": `https://www.ticombo.com/sv/search?q=${query}`,
    "Sports Events 365": `https://www.sportsevents365.se/search?q=${query}`,
    "FootballTicketNet": `https://www.footballticketnet.com/search?q=${query}`
  };
  return domainMap[merchantName] || `https://www.google.com/search?q=${encodeURIComponent(merchantName + " " + homeTeam + " " + awayTeam)}`;
};

// Hjälpfunktion för att generera framtida datum dynamiskt
const getFutureDateString = (daysAhead: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split("T")[0];
};

export async function GET() {
  try {
    const generatedMatches = [];
    
    // 2. Vi skapar 8 fasta spännande möten baserat på vår lista över topplag
    const pairings = [
      { homeIdx: 0, awayIdx: 1, daysAhead: 14, time: "16:00", price: 1250 }, // Arsenal vs Chelsea
      { homeIdx: 5, awayIdx: 7, daysAhead: 18, time: "21:00", price: 1450 }, // Real Madrid vs Atletico
      { homeIdx: 2, awayIdx: 3, daysAhead: 25, time: "13:30", price: 1850 }, // Man U vs Liverpool
      { homeIdx: 8, awayIdx: 9, daysAhead: 28, time: "20:45", price: 950 },  // Milan vs Inter
      { homeIdx: 6, awayIdx: 10, daysAhead: 32, time: "21:00", price: 1600 }, // Barcelona vs Bayern
      { homeIdx: 3, awayIdx: 4, daysAhead: 38, time: "16:00", price: 1390 },  // Liverpool vs Man City
      { homeIdx: 5, awayIdx: 6, daysAhead: 45, time: "21:00", price: 2200 },  // El Clásico
      { homeIdx: 11, awayIdx: 0, daysAhead: 52, time: "21:00", price: 1500 }  // PSG vs Arsenal
    ];

    for (let i = 0; i < pairings.length; i++) {
      const p = pairings[i];
      const home = TOP_TEAMS[p.homeIdx];
      const away = TOP_TEAMS[p.awayIdx];
      
      const matchId = `dynamic-m-${i}`;
      
      const mockOffers = [
        {
          id: `o-${matchId}-1`,
          merchantName: "StubHub",
          rating: 4.8,
          reviewsCount: 3102,
          section: "Långsida Premium",
          category: "Långsida",
          priceSEK: Math.round(p.price * 1.2),
          availableQuantity: 4,
          deliveryType: "E-biljett (Direkt)",
          isVerified: true,
          url: getSearchUrl("StubHub", home.name, away.name),
          type: "ticket" // Nu har StubHub en fast typ!
        },
        {
          id: `o-${matchId}-2`,
          merchantName: "Viagogo",
          rating: 4.4,
          reviewsCount: 1980,
          section: "Kortsida Standard",
          category: "Kortsida",
          priceSEK: p.price,
          availableQuantity: 2,
          deliveryType: "Mobilbiljett",
          isVerified: true,
          url: getSearchUrl("Viagogo", home.name, away.name),
          type: "ticket" // Nu har Viagogo en fast typ!
        },
        {
          id: `o-${matchId}-3`,
          merchantName: "Olka Express",
          rating: 4.7,
          reviewsCount: 845,
          section: "Långsida Kategori 2 + Hotell",
          category: "Långsida",
          priceSEK: Math.round(p.price * 2.4), // Paket kostar lite mer då hotell ingår
          availableQuantity: 6,
          deliveryType: "Resepaket (Brev/E-post)",
          isVerified: true,
          url: `https://www.google.com/search?q=${encodeURIComponent("Olka Express " + home.name)}`,
          type: "hotel" // Demo-objekt för att testa Hotell-fliken!
        }
      ];

      generatedMatches.push({
        id: matchId,
        homeTeam: {
          name: home.name,
          shortName: home.short,
          primaryColor: home.color1,
          secondaryColor: home.color2,
          emoji: home.emoji
        },
        awayTeam: {
          name: away.name,
          shortName: away.short,
          primaryColor: away.color1,
          secondaryColor: away.color2,
          emoji: away.emoji
        },
        league: home.league === "Champions League" ? "Champions League" : home.league,
        date: getFutureDateString(p.daysAhead),
        time: p.time,
        stadium: home.stadium,
        city: home.city,
        priceFrom: p.price,
        totalTicketsCount: Math.floor(Math.random() * 200) + 50,
        offers: mockOffers
      });
    }

    return NextResponse.json(generatedMatches);
  } catch (error: any) {
    return NextResponse.json({ error: "Kunde inte generera matcher" }, { status: 500 });
  }
}