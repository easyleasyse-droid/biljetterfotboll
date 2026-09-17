import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { fetchP1FeedRows, findP1TicketInRows } from "@/lib/p1Feed";
import { fetchTicomboParsedRows, findTicomboTicketInRows } from "@/lib/ticomboFeed";
import { getAwinData, findAwinTicketsForMatchSync } from "@/lib/awinFeed";
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

const sanitizeTeamName = (name: string) => {
  if (!name) return "";

  let clean = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\bfc\b|\bac\b|\bafc\b|\bsv\b|\bbcf\b|\brcd\b|\bbud\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const aliasMap: Record<string, string> = {
    "inter milan": "inter",
    "internazionale": "inter",
    "bayern munich": "bayern",
    "bayern munchen": "bayern",
    "real betis": "betis",
    "real sociedad": "sociedad",
    "atletico madrid": "atletico",
    "paris saint germain": "psg",
    "ac milan": "milan",
    "sporting cp": "sporting",
    "tottenham hotspur": "tottenham",
  };

  for (const [key, alias] of Object.entries(aliasMap)) {
    if (clean.includes(key)) return alias;
  }

  return clean;
};

const getSearchUrl = (
  merchantName: string,
  homeTeam: string,
  awayTeam: string,
  customUrl?: string
): string => {
  if (customUrl) return customUrl;

  const query = encodeURIComponent(`${homeTeam} ${awayTeam}`);
  const affiliateId = "3043299"; // Ditt Publicist-ID

  const domainMap: Record<string, string> = {
    "StubHub": "https://www.stubhub.se/",
    "Ticombo": `https://ticombo.prf.hn/click/camref:1100l5Rouq/destination:${encodeURIComponent('https://www.ticombo.com/en/sports-tickets/football')}`,
    "P1 Travel": `https://p1travel.prf.hn/click/camref:1100l5RoWA/destination:${encodeURIComponent(`https://www.p1travel.com/en/search?q=${query}`)}`,
    "Sports Events 365": `https://www.sportsevents365.com/?a_aid=5jutr9xaq8h3j`,
    "Gigsberg": `https://www.awin1.com/cread.php?awinmid=122390&awinaffid=${affiliateId}&ued=${encodeURIComponent(`https://www.gigsberg.com/search?q=${query}`)}`,
    "TicketNetwork": `https://www.awin1.com/cread.php?awinmid=89223&awinaffid=${affiliateId}&ued=${encodeURIComponent(`https://www.ticketnetwork.com/search?q=${query}`)}`
  };

  return domainMap[merchantName] || `https://www.google.com/search?q=${query}`;
};

const getFootballTicketNetUrl = (homeTeam: string, awayTeam: string): string => {
  const query = `${homeTeam} ${awayTeam}`;
  return `https://www.footballticketnet.com/search?q=${encodeURIComponent(query)}`;
};

const getChampionsTravelUrl = (homeTeam: string): string => {
  return `https://www.championstravel.co.uk/search?q=${encodeURIComponent(homeTeam)}`;
};

// Cachad funktion för att bygga matchlistan med priser
const getCachedMatchesData = unstable_cache(
  async () => {
    const today = new Date().toISOString().split("T")[0];
    const upcomingMatches = UPCOMING_MATCHES.filter((m) => m.date >= today);

    const [p1Rows, ticomboRows, awinRows] = (await Promise.all([
      fetchP1FeedRows().catch(() => []),
      fetchTicomboParsedRows().catch(() => []),
      getAwinData().catch(() => []),
    ])) as [any[], any[], any[]];

    const matches = upcomingMatches.map((m, index) => {
      const matchId = `m-${index + 1}`;

      const homeInfo = (TEAMS_SEO_DATA as any)?.[m.homeKey];
      const awayInfo = (TEAMS_SEO_DATA as any)?.[m.awayKey];

      const homeName = homeInfo?.name || formatTeamName(m.homeKey);
      const awayName = awayInfo?.name || formatTeamName(m.awayKey);

      const cleanHome = sanitizeTeamName(homeName);
      const cleanAway = sanitizeTeamName(awayName);

      const basePrice = 1100 + (index * 120) % 750;
      const EUR_TO_SEK = 11.3;

      const p1Data = findP1TicketInRows(p1Rows, homeName, awayName, m.date);
      const ticomboData = findTicomboTicketInRows(ticomboRows, homeName, awayName, m.date);

      const offers: any[] = [
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
        }
      ];

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

      // Sök i Awin Feed (Gigsberg, TicketNetwork, Football Ticket Net)
      const awinTickets = findAwinTicketsForMatchSync(awinRows, cleanHome, cleanAway);
      const matchedAwinMerchants = new Set<string>();

      if (Array.isArray(awinTickets)) {
        for (const ticket of awinTickets) {
          if (ticket.priceSEK && ticket.priceSEK > 50) {
            const merchantKey = ticket.merchantName.toLowerCase();
            matchedAwinMerchants.add(merchantKey);

            offers.push({
              id: `o-${matchId}-${merchantKey.replace(/\s+/g, '-')}`,
              merchantName: ticket.merchantName,
              rating: 4.6,
              reviewsCount: 350,
              section: "Standard / Verifierad",
              category: "Biljetter",
              priceSEK: Math.round(ticket.priceSEK),
              availableQuantity: 4,
              deliveryType: "E-biljett (Direkt)",
              isVerified: true,
              url: ticket.url,
              type: "ticket"
            });
          }
        }
      }

      // Reservlänk för Gigsberg om matchen inte hittas live i Awin-feeden
      if (!matchedAwinMerchants.has("gigsberg")) {
        offers.push({
          id: `o-${matchId}-gigsberg`,
          merchantName: "Gigsberg",
          rating: 4.6,
          reviewsCount: 890,
          section: "Standard / Kortsida",
          category: "Biljetter",
          priceSEK: Math.round(basePrice * 1.05),
          availableQuantity: 5,
          deliveryType: "E-biljett (Direkt)",
          isVerified: true,
          url: getSearchUrl("Gigsberg", homeName, awayName),
          type: "ticket"
        });
      }

      // Reservlänk för TicketNetwork om matchen inte hittas live i Awin-feeden
      if (!matchedAwinMerchants.has("ticketnetwork")) {
        offers.push({
          id: `o-${matchId}-ticketnetwork`,
          merchantName: "TicketNetwork",
          rating: 4.5,
          reviewsCount: 620,
          section: "Standard / VIP",
          category: "Biljetter",
          priceSEK: Math.round(basePrice * 1.1),
          availableQuantity: 4,
          deliveryType: "E-biljett (Direkt)",
          isVerified: true,
          url: getSearchUrl("TicketNetwork", homeName, awayName),
          type: "ticket"
        });
      }

      const lftTargetUrl = "https://www.livefootballtickets.com/";
      const lftAwinUrl = `https://www.awin1.com/cread.php?awinmid=119227&awinaffid=3043299&ued=${encodeURIComponent(lftTargetUrl)}`;

      offers.push(
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
          id: `o-${matchId}-ftn`,
          merchantName: "Football Ticket Net",
          rating: 4.6,
          reviewsCount: 380,
          section: "Sittplats / Sektion valfri",
          category: "Standard / VIP",
          priceSEK: Math.round(basePrice * 0.95),
          availableQuantity: 6,
          deliveryType: "E-biljett / Mobil",
          isVerified: true,
          url: getFootballTicketNetUrl(homeName, awayName),
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
        priceFrom: Math.min(...offers.map((o) => o.priceSEK)),
        totalTicketsCount: 45,
        offers: offers
      };
    });

    return matches;
  },
  ['global-matches-cache-v3'],
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