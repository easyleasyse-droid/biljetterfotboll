import { NextResponse } from "next/server";

// =========================================================================
// 1. DINA MATCHER (Enkelt format: Lägg bara till lag, datum & tid!)
// =========================================================================
const MY_MATCHES = [
  { home: "Arsenal FC", away: "Chelsea FC", date: "2026-08-25", time: "21:00" },
  { home: "Real Madrid", away: "FC Barcelona", date: "2026-08-29", time: "21:00" },
  { home: "Inter", away: "Milan", date: "2026-08-30", time: "20:45" },
  { home: "Liverpool FC", away: "Manchester United", date: "2026-09-02", time: "16:30" },
  { home: "Paris Saint-Germain", away: "Marseille", date: "2026-09-06", time: "21:00" },
  { home: "Bayern München", away: "Dortmund", date: "2026-09-12", time: "18:30" },
  { home: "Malmö FF", away: "Tottenham Hotspur", date: "2026-09-17", time: "19:00" }
];

// =========================================================================
// 2. TEAM_DATA - ALLA DINA 42 LAG
// =========================================================================
const TEAM_DATA: Record<string, { short: string; color1: string; color2: string; emoji: string; league: string; stadium: string; city: string }> = {
  // --- Premier League ---
  "Arsenal FC": { short: "ARS", color1: "#EF0107", color2: "#FFFFFF", emoji: "🇬🇧", league: "Premier League", stadium: "Emirates Stadium", city: "London" },
  "Manchester United": { short: "MUN", color1: "#DA291C", color2: "#000000", emoji: "🇬🇧", league: "Premier League", stadium: "Old Trafford", city: "Manchester" },
  "Liverpool FC": { short: "LIV", color1: "#C8102E", color2: "#F6EB61", emoji: "🔴", league: "Premier League", stadium: "Anfield", city: "Liverpool" },
  "Chelsea FC": { short: "CHE", color1: "#034694", color2: "#FFFFFF", emoji: "🔵", league: "Premier League", stadium: "Stamford Bridge", city: "London" },
  "Tottenham Hotspur": { short: "TOT", color1: "#132257", color2: "#FFFFFF", emoji: "🇬🇧", league: "Premier League", stadium: "Tottenham Hotspur Stadium", city: "London" },
  "Manchester City": { short: "MCI", color1: "#6CABDD", color2: "#1C2C5B", emoji: "🇬🇧", league: "Premier League", stadium: "Etihad Stadium", city: "Manchester" },
  "Newcastle United": { short: "NEW", color1: "#241F20", color2: "#FFFFFF", emoji: "🇬🇧", league: "Premier League", stadium: "St James' Park", city: "Newcastle" },
  "Leeds United": { short: "LEE", color1: "#FFCD00", color2: "#1D428A", emoji: "🇬🇧", league: "Premier League", stadium: "Elland Road", city: "Leeds" },
  "Aston Villa": { short: "AVL", color1: "#95BFE6", color2: "#670E36", emoji: "🇬🇧", league: "Premier League", stadium: "Villa Park", city: "Birmingham" },

  // --- La Liga ---
  "Real Madrid": { short: "RMA", color1: "#FFFFFF", color2: "#FEBE10", emoji: "🇪🇸", league: "La Liga", stadium: "Santiago Bernabéu", city: "Madrid" },
  "FC Barcelona": { short: "BAR", color1: "#004D98", color2: "#A50044", emoji: "🇪🇸", league: "La Liga", stadium: "Camp Nou", city: "Barcelona" },
  "Atlético Madrid": { short: "ATM", color1: "#CB3524", color2: "#FFFFFF", emoji: "🔴", league: "La Liga", stadium: "Metropolitano", city: "Madrid" },
  "Valencia CF": { short: "VAL", color1: "#FF7300", color2: "#000000", emoji: "🇪🇸", league: "La Liga", stadium: "Mestalla", city: "Valencia" },
  "Villarreal CF": { short: "VIL", color1: "#FFE600", color2: "#00519E", emoji: "🇪🇸", league: "La Liga", stadium: "Estadio de la Cerámica", city: "Villarreal" },
  "Real Betis": { short: "BET", color1: "#00954C", color2: "#FFFFFF", emoji: "🇪🇸", league: "La Liga", stadium: "Benito Villamarín", city: "Sevilla" },
  "Sevilla FC": { short: "SEV", color1: "#D00027", color2: "#FFFFFF", emoji: "🇪🇸", league: "La Liga", stadium: "Ramón Sánchez-Pizjuán", city: "Sevilla" },
  "Real Sociedad": { short: "RSO", color1: "#0067B1", color2: "#FFFFFF", emoji: "🇪🇸", league: "La Liga", stadium: "Anoeta", city: "San Sebastián" },
  "Athletic Bilbao": { short: "ATH", color1: "#EE2523", color2: "#FFFFFF", emoji: "🇪🇸", league: "La Liga", stadium: "San Mamés", city: "Bilbao" },

  // --- Serie A ---
  "Inter": { short: "INT", color1: "#00529F", color2: "#000000", emoji: "🇮🇹", league: "Serie A", stadium: "San Siro", city: "Milano" },
  "Milan": { short: "MIL", color1: "#FB090B", color2: "#000000", emoji: "🔴", league: "Serie A", stadium: "San Siro", city: "Milano" },
  "Juventus": { short: "JUV", color1: "#000000", color2: "#FFFFFF", emoji: "🇮🇹", league: "Serie A", stadium: "Allianz Stadium", city: "Torino" },
  "Napoli": { short: "NAP", color1: "#0087D1", color2: "#FFFFFF", emoji: "🇮🇹", league: "Serie A", stadium: "Stadio Diego Armando Maradona", city: "Neapel" },
  "Roma": { short: "ROM", color1: "#8E1F2F", color2: "#F0BC42", emoji: "🇮🇹", league: "Serie A", stadium: "Stadio Olimpico", city: "Rom" },
  "Lazio": { short: "LAZ", color1: "#87D8F7", color2: "#FFFFFF", emoji: "🇮🇹", league: "Serie A", stadium: "Stadio Olimpico", city: "Rom" },
  "Atalanta": { short: "ATA", color1: "#1E71B8", color2: "#000000", emoji: "🇮🇹", league: "Serie A", stadium: "Gewiss Stadium", city: "Bergamo" },
  "Bologna": { short: "BOL", color1: "#1A2C4A", color2: "#A21C2B", emoji: "🇮🇹", league: "Serie A", stadium: "Stadio Renato Dall'Ara", city: "Bologna" },
  "Como": { short: "COM", color1: "#0055A5", color2: "#FFFFFF", emoji: "🇮🇹", league: "Serie A", stadium: "Stadio Giuseppe Sinigaglia", city: "Como" },

  // --- Ligue 1 ---
  "Paris Saint-Germain": { short: "PSG", color1: "#004170", color2: "#DA291C", emoji: "🇫🇷", league: "Ligue 1", stadium: "Parc des Princes", city: "Paris" },
  "Lille": { short: "LIL", color1: "#E1000F", color2: "#1A2035", emoji: "🇫🇷", league: "Ligue 1", stadium: "Stade Pierre-Mauroy", city: "Lille" },
  "Strasbourg": { short: "STR", color1: "#009EE0", color2: "#FFFFFF", emoji: "🇫🇷", league: "Ligue 1", stadium: "Stade de la Meinau", city: "Strasbourg" },
  "Nice": { short: "NIC", color1: "#000000", color2: "#D00027", emoji: "🇫🇷", league: "Ligue 1", stadium: "Allianz Riviera", city: "Nice" },
  "Marseille": { short: "OM", color1: "#009CDE", color2: "#FFFFFF", emoji: "🇫🇷", league: "Ligue 1", stadium: "Stade Vélodrome", city: "Marseille" },
  "Lyon": { short: "OL", color1: "#121A3E", color2: "#DA291C", emoji: "🇫🇷", league: "Ligue 1", stadium: "Groupama Stadium", city: "Lyon" },

  // --- Bundesliga ---
  "Bayern München": { short: "FCB", color1: "#DC052D", color2: "#0066B2", emoji: "🇩🇪", league: "Bundesliga", stadium: "Allianz Arena", city: "München" },
  "Dortmund": { short: "BVB", color1: "#FDE100", color2: "#000000", emoji: "🇩🇪", league: "Bundesliga", stadium: "Signal Iduna Park", city: "Dortmund" },
  "Leverkusen": { short: "B04", color1: "#E32219", color2: "#000000", emoji: "🇩🇪", league: "Bundesliga", stadium: "BayArena", city: "Leverkusen" },
  "Frankfurt": { short: "SGE", color1: "#E1000F", color2: "#000000", emoji: "🇩🇪", league: "Bundesliga", stadium: "Deutsche Bank Park", city: "Frankfurt" },
  "Stuttgart": { short: "VFB", color1: "#E32219", color2: "#FFFFFF", emoji: "🇩🇪", league: "Bundesliga", stadium: "MHPArena", city: "Stuttgart" },
  "Union Berlin": { short: "FCU", color1: "#D4001A", color2: "#F8CA00", emoji: "🇩🇪", league: "Bundesliga", stadium: "An der Alten Försterei", city: "Berlin" },

  // --- Eredivisie ---
  "Ajax": { short: "AJA", color1: "#D2122E", color2: "#FFFFFF", emoji: "🇳🇱", league: "Eredivisie", stadium: "Johan Cruijff ArenA", city: "Amsterdam" },
  "PSV": { short: "PSV", color1: "#FF0000", color2: "#FFFFFF", emoji: "🇳🇱", league: "Eredivisie", stadium: "Philips Stadion", city: "Eindhoven" },
  "Feyenoord": { short: "FEY", color1: "#FF0000", color2: "#000000", emoji: "🇳🇱", league: "Eredivisie", stadium: "De Kuip", city: "Rotterdam" },
  "Twente": { short: "TWE", color1: "#E30613", color2: "#FFFFFF", emoji: "🇳🇱", league: "Eredivisie", stadium: "De Grolsch Veste", city: "Enschede" },

  // --- Allsvenskan ---
  "Malmö FF": { short: "MFF", color1: "#6CACE4", color2: "#FFFFFF", emoji: "🇸🇪", league: "Allsvenskan", stadium: "Eleda Stadion", city: "Malmö" }
};

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
      const homeConfig = TEAM_DATA[m.home] || { short: m.home.substring(0, 3).toUpperCase(), color1: "#111827", color2: "#FFFFFF", emoji: "⚽", league: "Fotboll", stadium: "Arena", city: "Stad" };
      const awayConfig = TEAM_DATA[m.away] || { short: m.away.substring(0, 3).toUpperCase(), color1: "#4B5563", color2: "#FFFFFF", emoji: "⚽", league: "Fotboll", stadium: "Arena", city: "Stad" };

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
        homeTeam: { name: m.home, shortName: homeConfig.short, primaryColor: homeConfig.color1, secondaryColor: homeConfig.color2, emoji: homeConfig.emoji },
        awayTeam: { name: m.away, shortName: awayConfig.short, primaryColor: awayConfig.color1, secondaryColor: awayConfig.color2, emoji: awayConfig.emoji },
        league: homeConfig.league,
        date: m.date,
        time: m.time,
        stadium: homeConfig.stadium,
        city: homeConfig.city,
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