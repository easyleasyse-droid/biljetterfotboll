import { NextResponse } from "next/server";

const TOP_TEAMS = [
  { name: "Arsenal", short: "ARS", color1: "#EF0107", color2: "#FFFFFF", emoji: "🇬🇧" },
  { name: "Chelsea", short: "CHE", color1: "#034694", color2: "#FFFFFF", emoji: "🔵" },
  { name: "Manchester United", short: "MUN", color1: "#DA291C", color2: "#000000", emoji: "🇬🇧" },
  { name: "Liverpool", short: "LIV", color1: "#C8102E", color2: "#F6EB61", emoji: "🔴" },
  { name: "Manchester City", short: "MCI", color1: "#6CABDD", color2: "#1C2C5B", emoji: "🇬🇧" },
  { name: "Real Madrid", short: "RMA", color1: "#FFFFFF", color2: "#FEBE10", emoji: "🇪🇸" },
  { name: "Barcelona", short: "BAR", color1: "#004D98", color2: "#A50044", emoji: "🇪🇸" },
  { name: "Atletico Madrid", short: "ATM", color1: "#CB3524", color2: "#FFFFFF", emoji: "🔴" }
];

const getSearchUrl = (merchantName: string, homeTeam: string, awayTeam: string): string => {
  const query = encodeURIComponent(`${homeTeam} ${awayTeam}`);
  const domainMap: Record<string, string> = {
    "Viagogo": `https://www.viagogo.se/Search?q=${query}`,
    "StubHub": `https://www.stubhub.se/search?q=${query}`,
    "Ticombo": `https://www.ticombo.com/sv/search?q=${query}`,
    "Sports Events 365": `https://www.sportsevents365.se/search?q=${query}?a_aid=5jutr9xaq8h3j`
  };
  return domainMap[merchantName] || `https://www.google.com/search?q=${query}`;
};

export async function GET() {
  try {
    // Hämtar öppna matcher för Premier League (eng.1) och La Liga (esp.1) från Öppet API utan nyckel
    const [plRes, laLigaRes] = await Promise.all([
      fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard"),
      fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard")
    ]);

    const plData = await plRes.json();
    const laLigaData = await laLigaRes.json();

    const rawEvents = [...(plData.events || []), ...(laLigaData.events || [])];

    // Omformaterar och filtrerar så att vi enbart visar matcher med dina storlag
    const matches = rawEvents
      .map((event: any) => {
        const competition = event.competitions?.[0];
        if (!competition) return null;

        const homeComp = competition.competitors?.find((c: any) => c.homeAway === "home");
        const awayComp = competition.competitors?.find((c: any) => c.homeAway === "away");

        const homeName = homeComp?.team?.displayName || "";
        const awayName = awayComp?.team?.displayName || "";

        // Kolla om något av lagen matchar våra storklubbar
        const isTopMatch = TOP_TEAMS.some(t => homeName.includes(t.name) || awayName.includes(t.name));
        if (!isTopMatch) return null;

        const homeConfig = TOP_TEAMS.find(t => homeName.includes(t.name)) || {
          color1: "#111827", color2: "#FFFFFF", emoji: "⚽", short: homeName.substring(0, 3).toUpperCase()
        };
        const awayConfig = TOP_TEAMS.find(t => awayName.includes(t.name)) || {
          color1: "#4B5563", color2: "#FFFFFF", emoji: "⚽", short: awayName.substring(0, 3).toUpperCase()
        };

        const matchId = `espn-${event.id}`;
        const eventDate = new Date(event.date);
        const matchDate = eventDate.toISOString().split("T")[0];
        const matchTime = eventDate.toTimeString().substring(0, 5);

        const basePrice = Math.floor(Math.random() * 400) + 1100;

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
            priceSEK: Math.round(basePrice * 1.2),
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
          }
        ];

        return {
          id: matchId,
          homeTeam: {
            name: homeName,
            shortName: homeConfig.short,
            primaryColor: homeConfig.color1,
            secondaryColor: homeConfig.color2,
            emoji: homeConfig.emoji
          },
          awayTeam: {
            name: awayName,
            shortName: awayConfig.short,
            primaryColor: awayConfig.color1,
            secondaryColor: awayConfig.color2,
            emoji: awayConfig.emoji
          },
          league: event.season?.slug === "premier-league" ? "Premier League" : "La Liga",
          date: matchDate,
          time: matchTime,
          stadium: competition.venue?.fullName || "Stadion",
          city: competition.venue?.address?.city || "Europa",
          priceFrom: Math.min(...offers.map(o => o.priceSEK)),
          totalTicketsCount: Math.floor(Math.random() * 80) + 20,
          offers: offers
        };
      })
      .filter(Boolean);

    return NextResponse.json(matches);
  } catch (error: any) {
    return NextResponse.json({ error: "Kunde inte hämta matcher" }, { status: 500 });
  }
}