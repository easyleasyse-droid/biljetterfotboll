import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { fetchP1FeedRows, findP1TicketInRows } from "@/lib/p1Feed";
import { fetchTicomboParsedRows, findTicomboTicketInRows } from "@/lib/ticomboFeed";
import { fetchAwinOffers, findAwinTicketsForMatchSync } from "@/lib/awinFeed";
import { TEAMS_SEO_DATA } from "../../data/teams";
import { UPCOMING_MATCHES } from "../../data/upcomingMatches";

export const dynamic = 'force-dynamic';

const formatTeamName = (key: string) => {
  if (!key) return "";
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getSearchUrl = (
  merchantName: string,
  homeTeam: string,
  awayTeam: string,
  customUrl?: string
): string => {
  if (customUrl) return customUrl;

  const cleanHome = homeTeam.replace(/\bfc\b|\bac\b|\bafc\b|\bsc\b/gi, "").trim();
  const cleanAway = awayTeam.replace(/\bfc\b|\bac\b|\bafc\b|\bsc\b/gi, "").trim();
  const combinedQuery = encodeURIComponent(`${cleanHome} ${cleanAway}`);

  const domainMap: Record<string, string> = {
    "StubHub": "https://www.stubhub.se/",
    "Ticombo": `https://ticombo.prf.hn/click/camref:1100l5Rouq/destination:${encodeURIComponent('https://www.ticombo.com/en/sports-tickets/football')}`,
    "P1 Travel": `https://p1travel.prf.hn/click/camref:1100l5RoWA/destination:${encodeURIComponent(`https://www.p1travel.com/en/search?q=${encodeURIComponent(cleanHome)}`)}`,
    "Sports Events 365": `https://www.sportsevents365.com/?a_aid=5jutr9xaq8h3j`,
  };

  return domainMap[merchantName] || `https://www.google.com/search?q=${combinedQuery}`;
};

const getChampionsTravelUrl = (homeTeam: string): string => {
  const cleanHome = homeTeam.replace(/\bfc\b|\bac\b|\bafc\b/gi, "").trim();
  return `https://www.championstravel.co.uk/search?q=${encodeURIComponent(cleanHome)}`;
};

const getCachedMatchesData = unstable_cache(
  async () => {
    const today = new Date().toISOString().split("T")[0];
    const upcomingMatches = UPCOMING_MATCHES.filter((m) => m.date >= today);

    const [p1Rows, ticomboRows, awinRows] = (await Promise.all([
      fetchP1FeedRows().catch(() => []),
      fetchTicomboParsedRows().catch(() => []),
      fetchAwinOffers().catch(() => []),
    ])) as [any[], any[], any[]];

    const EUR_TO_SEK = 11.28;

    const matches = upcomingMatches.map((m, index) => {
      const matchId = `m-${index + 1}`;

      const homeInfo = (TEAMS_SEO_DATA as any)?.[m.homeKey];
      const awayInfo = (TEAMS_SEO_DATA as any)?.[m.awayKey];

      const homeName = homeInfo?.name || formatTeamName(m.homeKey);
      const awayName = awayInfo?.name || formatTeamName(m.awayKey);

      const basePrice = 1100 + (index * 120) % 750;

      // -------------------------------------------------------------
      // LIVE FEEDS (Endast biljetter som faktiskt hittas läggs till)
      // -------------------------------------------------------------
      const offers: any[] = [];

      // 1. P1 Travel Feed
      const p1Data = findP1TicketInRows(p1Rows, homeName, awayName, m.date);
      if (p1Data) {
        const p1PriceSEK = Math.round(p1Data.price * EUR_TO_SEK);
        let p1Url = `https://p1travel.prf.hn/click/camref:1100l5RoWA/destination:${encodeURIComponent(`https://www.p1travel.com/en/search?q=${encodeURIComponent(homeName)}`)}`;

        if (p1Data.directUrl) {
          if (p1Data.directUrl.startsWith('http://') || p1Data.directUrl.startsWith('https://')) {
            p1Url = p1Data.directUrl.includes('camref')
              ? p1Data.directUrl
              : `https://p1travel.prf.hn/click/camref:1100l5RoWA/destination:${encodeURIComponent(p1Data.directUrl)}`;
          } else {
            const fullUrl = `https://www.p1travel.com${p1Data.directUrl.startsWith('/') ? '' : '/'}${p1Data.directUrl}`;
            p1Url = `https://p1travel.prf.hn/click/camref:1100l5RoWA/destination:${encodeURIComponent(fullUrl)}`;
          }
        }

        offers.push({
          id: `o-${matchId}-p1travel`,
          merchantName: "P1 Travel",
          rating: 4.9,
          reviewsCount: 1840,
          section: "Officiell Långsida",
          category: "Långsida",
          priceSEK: p1PriceSEK,
          availableQuantity: 8,
          deliveryType: "E-biljett (Direkt)",
          isVerified: true,
          url: p1Url,
          type: "ticket"
        });
      }

      // 2. Ticombo Feed
      const ticomboData = findTicomboTicketInRows(ticomboRows, homeName, awayName, m.date);
      if (ticomboData) {
        const ticomboPriceSEK = ticomboData.currency === 'EUR'
          ? Math.round(ticomboData.price * EUR_TO_SEK)
          : Math.round(ticomboData.price);

        let ticomboUrl = ticomboData.directUrl;
        if (ticomboUrl && !ticomboUrl.includes("camref")) {
          ticomboUrl = `https://ticombo.prf.hn/click/camref:1100l5Rouq/destination:${encodeURIComponent(ticomboUrl)}`;
        }

        offers.push({
          id: `o-${matchId}-ticombo`,
          merchantName: "Ticombo",
          rating: 4.7,
          reviewsCount: 1540,
          section: "Verifierad Säljare",
          category: "Standard / VIP",
          priceSEK: ticomboPriceSEK,
          availableQuantity: 4,
          deliveryType: "E-biljett (Direkt)",
          isVerified: true,
          url: ticomboUrl || getSearchUrl("Ticombo", homeName, awayName),
          type: "ticket"
        });
      }

      // 3. Awin Feed (Gigsberg, FootballTicketNet, TicketNetwork)
      const awinTickets = findAwinTicketsForMatchSync(awinRows, homeName, awayName);

      if (Array.isArray(awinTickets) && awinTickets.length > 0) {
        // Gigsberg
        const gigsbergMatch = awinTickets.find(
          (t) => t.merchantName.toLowerCase().includes("gigsberg")
        );
        if (gigsbergMatch && gigsbergMatch.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-gigsberg`,
            merchantName: "Gigsberg",
            rating: 4.7,
            reviewsCount: 890,
            section: "Verifierad Marknadsplats",
            category: "Standard / VIP",
            priceSEK: gigsbergMatch.priceSEK,
            availableQuantity: 6,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: gigsbergMatch.url,
            type: "ticket"
          });
        }

        // FootballTicketNet
        const ftnMatch = awinTickets.find(
          (t) =>
            t.merchantName.toLowerCase().includes("football ticket") ||
            t.merchantName.toLowerCase().includes("footballticketnet")
        );
        if (ftnMatch && ftnMatch.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-ftn`,
            merchantName: "Football Ticket Net",
            rating: 4.6,
            reviewsCount: 380,
            section: "Sittplats / Sektion valfri",
            category: "Standard / VIP",
            priceSEK: ftnMatch.priceSEK,
            availableQuantity: 6,
            deliveryType: "E-biljett / Mobil",
            isVerified: true,
            url: ftnMatch.url,
            type: "ticket"
          });
        }

        // TicketNetwork
        const tnMatch = awinTickets.find(
          (t) =>
            t.merchantName.toLowerCase().includes("ticketnetwork") ||
            t.merchantName.toLowerCase().includes("ticket network")
        );
        if (tnMatch && tnMatch.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-ticketnetwork`,
            merchantName: "TicketNetwork",
            rating: 4.5,
            reviewsCount: 1120,
            section: "Verifierad Säljare",
            category: "Standard / VIP",
            priceSEK: tnMatch.priceSEK,
            availableQuantity: 5,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: tnMatch.url,
            type: "ticket"
          });
        }
      }

      // -------------------------------------------------------------
      // SÖK-FALLBACKS / ICKE FEED-PARTNERS (Visas som sökalternativ)
      // -------------------------------------------------------------
      const lftTargetUrl = "https://www.livefootballtickets.com/";
      const lftAwinUrl = `https://www.awin1.com/cread.php?awinmid=119227&awinaffid=3043299&ued=${encodeURIComponent(lftTargetUrl)}`;

      offers.push(
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
          id: `o-${matchId}-lft`,
          merchantName: "LiveFootballTickets",
          rating: 4.8,
          reviewsCount: 2450,
          section: "Verifierad Marknadsplats",
          category: "Standard / VIP",
          priceSEK: Math.round(basePrice * 0.98),
          availableQuantity: 12,
          deliveryType: "E-biljett / Mobil",
          isVerified: true,
          url: lftAwinUrl,
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
          id: `o-${matchId}-champions`,
          merchantName: "Champions Travel",
          rating: 4.8,
          reviewsCount: 1250,
          section: "Officiell Långsida",
          category: "Långsida",
          priceSEK: Math.round(basePrice * 1.15),
          availableQuantity: 2,
          deliveryType: "E-biljett (Direkt)",
          isVerified: true,
          url: getChampionsTravelUrl(homeName),
          type: "ticket"
        }
      );

      const validPrices = offers.map((o) => o.priceSEK).filter((p) => p > 0);
      const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : basePrice;

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
        league: (m as any).league || homeInfo?.league || "Fotboll",
        date: m.date,
        time: m.time,
        stadium: homeInfo?.stadiumName || "Stadion",
        city: homeInfo?.location || "Europa",
        priceFrom: minPrice,
        totalTicketsCount: 45,
        offers: offers
      };
    });

    return matches;
  },
  ['global-matches-cache-v10'],
  { revalidate: 3600 }
);

export async function GET() {
  try {
    const matches = await getCachedMatchesData();
    return NextResponse.json(matches);
  } catch (error: any) {
    console.error("Fel i matches/route.ts:", error);
    return NextResponse.json({ error: "Kunde inte läsa in matcher" }, { status: 500 });
  }
}