import { NextResponse } from "next/server";
import { fetchP1FeedRows, findP1TicketInRows } from "@/lib/p1Feed";
import { fetchTicomboParsedRows, findTicomboTicketInRows } from '@/lib/ticomboFeed';
import { fetchAwinOffers, findAwinTicketsForMatchSync } from "@/lib/awinFeed";
import { getOlkaDeepLink } from "@/lib/olkaLinks";
import { fetchSportsEvents365Matches } from "@/lib/sportsEvents365Feed";
import { TEAMS_SEO_DATA } from "../../data/teams";
import { UPCOMING_MATCHES } from "../../data/upcomingMatches";

// Blixtsnabb laddning: Vercel cachar resultatet i 1 timme (ISR)
export const revalidate = 3600;

const formatTeamName = (key: string) => {
  if (!key) return "";
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// 1. Mapping-tabell för OLKA Express exakta lag-slugs
const OLKA_TEAM_SLUGS: Record<string, string> = {
  // Premier League
  "Liverpool": "liverpool-fc",
  "Manchester City": "manchester-city",
  "Arsenal": "arsenal-fc",
  "Chelsea": "chelsea-fc",
  "Manchester United": "manchester-united",
  "Tottenham": "tottenham-hotspur",
  "Tottenham Hotspur": "tottenham-hotspur",
  "Newcastle": "newcastle-united",
  "Newcastle United": "newcastle-united",
  "Aston Villa": "aston-villa",
  "West Ham": "west-ham-united",
  "West Ham United": "west-ham-united",

  // Serie A
  "AC Milan": "ac-milan",
  "Milan": "ac-milan",
  "Inter": "inter",
  "Inter Milan": "inter",
  "Juventus": "juventus",
  "AS Roma": "as-roma",
  "Roma": "as-roma",
  "SS Lazio": "ss-lazio",
  "Lazio": "ss-lazio",
  "SSC Napoli": "ssc-napoli",
  "Napoli": "ssc-napoli",

  // La Liga
  "Real Madrid": "real-madrid",
  "FC Barcelona": "fc-barcelona",
  "Barcelona": "fc-barcelona",
  "Atletico Madrid": "atletico-madrid",
  "Atlético Madrid": "atletico-madrid",
  "Real Betis": "real-betis",
  "Sevilla": "sevilla-fc",
  "Real Sociedad": "real-sociedad"
};

const getOlkaSlug = (teamName: string): string => {
  if (!teamName) return "";
  const cleanName = teamName.trim();
  
  if (OLKA_TEAM_SLUGS[cleanName]) {
    return OLKA_TEAM_SLUGS[cleanName];
  }
  
  return cleanName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const getOlkaUrl = (homeTeam: string, awayTeam: string, matchDate?: string): string => {
  const formatSlug = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Tar bort å, ä, ö
      .replace(/[^a-z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const buildOlkaSlug = (name: string) => {
    let slug = formatSlug(name);
    if (!slug.endsWith("-fc") && !slug.endsWith("-cf") && !slug.endsWith("-sc")) {
      slug += "-fc";
    }
    return slug;
  };

  const homeSlug = buildOlkaSlug(homeTeam);
  const awaySlug = buildOlkaSlug(awayTeam);

  // Om datum finns med skapar vi den exakta djuplänken till matchen
  const targetUrl = matchDate
    ? `https://olka.se/event/soccer/${matchDate}-${homeSlug}-${awaySlug}?eventPackage=ticket`
    : `https://olka.se/`;

  // TradeDoubler-spårning med din korrekta url-parameter
 return `https://clk.tradedoubler.com/click?p=355835&a=3495104&g=0&url=${encodeURIComponent(targetUrl)}`;
};

const getSearchUrl = (
  merchantName: string,
  homeTeam: string,
  awayTeam: string,
  customUrl?: string,
  matchDate?: string
): string => {
  if (customUrl) return customUrl;

  const cleanHome = homeTeam.replace(/\bfc\b|\bac\b|\bafc\b|\bsc\b|\bcf\b/gi, "").trim();
  const cleanAway = awayTeam.replace(/\bfc\b|\bac\b|\bafc\b|\bsc\b|\bcf\b/gi, "").trim();
  const combinedQuery = encodeURIComponent(`${cleanHome} ${cleanAway}`);

  const domainMap: Record<string, string> = {
  "StubHub": "https://www.stubhub.se/",
  "Ticombo": `https://ticombo.prf.hn/click/camref:1100l5Rouq/destination:${encodeURIComponent('https://www.ticombo.com/en/sports-tickets/football')}`,
  "P1 Travel": `https://p1travel.prf.hn/click/camref:1100l5RoWA/destination:${encodeURIComponent(`https://www.p1travel.com/en/search?q=${encodeURIComponent(cleanHome)}`)}`,
  "Sports Events 365": `https://www.sportsevents365.com/?a_aid=5jutr9xaq8h3j`,
  "Gigsberg": `https://www.awin1.com/cread.php?awinmid=122390&awinaffid=3043299&ued=${encodeURIComponent(`https://www.gigsberg.com/search?q=${combinedQuery}`)}`,
  "Football Ticket Net": `https://www.footballticketnet.com/search?q=${combinedQuery}`,
  "TicketNetwork": `https://www.awin1.com/cread.php?awinmid=12028&awinaffid=3043299&ued=${encodeURIComponent(`https://www.ticketnetwork.com/search?q=${combinedQuery}`)}`,
  "OLKA Express": matchDate ? getOlkaUrl(homeTeam, awayTeam, matchDate) : `https://www.olkaexpress.se/`,
};

  return domainMap[merchantName] || `https://www.google.com/search?q=${combinedQuery}`;
};

const getChampionsTravelUrl = (homeTeam: string): string => {
  const cleanHome = homeTeam.replace(/\bfc\b|\bac\b|\bafc\b/gi, "").trim();
  return `https://www.championstravel.co.uk/search?q=${encodeURIComponent(cleanHome)}`;
};

// 1. ORIGINAL-RENSNING FÖR P1 OCH TICOMBO (Rör inte 'united', 'city', 'inter' osv.)
const cleanTeamStr = (str: string) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, ' ')
    .trim();
};

// 2. ISOLERAD RENSNING ENBART FÖR SPORTS EVENTS 365
const cleanTeamStrForSE365 = (str: string) => {
  if (!str) return '';
  let cleaned = str.toLowerCase();

  const synonyms: Record<string, string> = {
    'psg': 'paris saint germain',
    'paris sg': 'paris saint germain',
    'bayern': 'bayern munich',
    'bayern munchen': 'bayern munich',
    'munchen': 'munich',
    'inter': 'inter milan',
    'atletico': 'atletico madrid',
    'ath bilbao': 'athletic bilbao',
  };

  if (synonyms[cleaned]) {
    cleaned = synonyms[cleaned];
  } else {
    Object.keys(synonyms).forEach(key => {
      cleaned = cleaned.replace(new RegExp(`\\b${key}\\b`, 'g'), synonyms[key]);
    });
  }

  return cleaned
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, ' ')
    .replace(/\b(fc|cf|afc|sc|sv|vfb|rb|real|club|hotspur|town|united|city)\b/g, '')
    .trim();
};

// Gör så att SE365 använder exakt samma funktion
const cleanTeamStrForSE365 = cleanTeamStr;

async function getMatchesData() {
  const today = new Date().toISOString().split("T")[0];

  const upcomingMatches = UPCOMING_MATCHES.filter((m) => {
    if (m.date < today) return false;

    const leagueStr = String((m as any).league || "").toLowerCase();
    const homeStr = String(m.homeKey || "").toLowerCase();
    const awayStr = String(m.awayKey || "").toLowerCase();

    const dutchKeywords = ["eredivisie", "ajax", "psv", "feyenoord", "az alkmaar", "utrecht", "twente", "heerenveen", "holland", "nederlands"];
    const isDutch = dutchKeywords.some(keyword =>
      leagueStr.includes(keyword) || homeStr.includes(keyword) || awayStr.includes(keyword)
    );

    return !isDutch;
  });

  const [p1Rows, ticomboRows, awinRows, se365Result] = (await Promise.all([
  fetchP1FeedRows().catch(() => []),
  fetchTicomboParsedRows().catch(() => []),
  fetchAwinOffers().catch(() => []),
  fetchSportsEvents365Matches().catch(() => null),
 ])) as [any[], any[], any[], any];

 const se365Matches = se365Result?.success && Array.isArray(se365Result.matches) ? se365Result.matches : [];

  const EUR_TO_SEK = 11.25;

  const matches = upcomingMatches.map((m, index) => {
    const matchId = `m-${index + 1}`;

    const homeInfo = (TEAMS_SEO_DATA as any)?.[m.homeKey];
    const awayInfo = (TEAMS_SEO_DATA as any)?.[m.awayKey];

    const homeName = homeInfo?.name || formatTeamName(m.homeKey);
    const awayName = awayInfo?.name || formatTeamName(m.awayKey);

    const basePrice = 1100 + (index * 120) % 750;

    const offers: any[] = [];

    // 1. P1 Travel Feed (Visas bara om träff finns)
    const p1Data = findP1TicketInRows(p1Rows, homeName, awayName, m.date);
    if (p1Data && p1Data.price > 0) {
      const p1PriceSEK = Math.round(p1Data.price * EUR_TO_SEK);
      let p1Url = p1Data.directUrl || getSearchUrl("P1 Travel", homeName, awayName);

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

    // 2. Ticombo Feed (Visas bara om träff finns)
    const ticomboData = findTicomboTicketInRows(ticomboRows, homeName, awayName, m.date);
    if (ticomboData && ticomboData.price > 0) {
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

// Matcha mot Sports Events 365
const se365Match = Array.isArray(se365Matches) ? se365Matches.find((se: any) => {
    const seHome = cleanTeamStrForSE365(se.homeTeam || '');
    const seAway = cleanTeamStrForSE365(se.awayTeam || '');

    const hKey = cleanTeamStrForSE365(m.homeKey || '');
    const aKey = cleanTeamStrForSE365(m.awayKey || '');
    const hName = cleanTeamStrForSE365(homeName || '');
    const aName = cleanTeamStrForSE365(awayName || '');

  const homeMatches = seHome.includes(hKey) || hKey.includes(seHome) || seHome.includes(hName) || hName.includes(seHome);
  const awayMatches = seAway.includes(aKey) || aKey.includes(seAway) || seAway.includes(aName) || aName.includes(seAway);

  return homeMatches && awayMatches;
}) : null;

if (se365Match && se365Match.minPrice > 0) {
  const priceSEK = se365Match.currency === 'EUR'
    ? Math.round(se365Match.minPrice * EUR_TO_SEK)
    : Math.round(se365Match.minPrice);

  offers.push({
    id: se365Match.id || `o-${matchId}-se365`,
    merchantName: "Sports Events 365",
    rating: 4.6,
    reviewsCount: 1240,
    section: "Verifierad Biljett",
    category: "Standard / VIP",
    priceSEK: priceSEK,
    availableQuantity: 4,
    deliveryType: "E-biljett (Direkt)",
    isVerified: true,
    // Använd KUNNA direktlänken från API:et
    url: se365Match.url,
    type: "ticket"
  });
}

    // 3. Awin Feed (Strikt filtrerat per merchant)
    const awinTickets = findAwinTicketsForMatchSync(awinRows, homeName, awayName, {
      targetDate: new Date(m.date),
    });

    if (Array.isArray(awinTickets) && awinTickets.length > 0) {
      // Gigsberg - Endast biljetter som TILLHÖR Gigsberg
      const gigsbergMatches = awinTickets.filter(
        (t) =>
          t.merchantName.toLowerCase().includes("gigsberg") ||
          t.merchantId === "122390" ||
          t.merchantId === "107817"
      );
      if (gigsbergMatches.length > 0) {
        const bestGigsberg = gigsbergMatches.reduce((prev, curr) =>
          prev.priceSEK < curr.priceSEK ? prev : curr
        );
        if (bestGigsberg.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-gigsberg`,
            merchantName: "Gigsberg",
            rating: 4.7,
            reviewsCount: 890,
            section: "Verifierad Marknadsplats",
            category: "Standard / VIP",
            priceSEK: bestGigsberg.priceSEK,
            availableQuantity: 6,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: bestGigsberg.url,
            type: "ticket"
          });
        }
      }

      // Football Ticket Net - Endast biljetter som TILLHÖR Football Ticket Net
      const ftnMatches = awinTickets.filter(
        (t) =>
          t.merchantName.toLowerCase().includes("football") ||
          t.merchantName.toLowerCase().includes("ftn") ||
          t.merchantId === "113393"
      );
      if (ftnMatches.length > 0) {
        const bestFTN = ftnMatches.reduce((prev, curr) =>
          prev.priceSEK < curr.priceSEK ? prev : curr
        );
        if (bestFTN.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-ftn`,
            merchantName: "Football Ticket Net",
            rating: 4.6,
            reviewsCount: 380,
            section: "Sittplats / Sektion valfri",
            category: "Standard / VIP",
            priceSEK: bestFTN.priceSEK,
            availableQuantity: 6,
            deliveryType: "E-biljett / Mobil",
            isVerified: true,
            url: bestFTN.url,
            type: "ticket"
          });
        }
      }

      // TicketNetwork - Endast biljetter som TILLHÖR TicketNetwork
      const tnMatches = awinTickets.filter(
        (t) =>
          t.merchantName.toLowerCase().includes("ticketnetwork") ||
          t.merchantName.toLowerCase().includes("ticket network") ||
          t.merchantId === "117212" ||
          t.merchantId === "12028"
      );
      if (tnMatches.length > 0) {
        const bestTN = tnMatches.reduce((prev, curr) =>
          prev.priceSEK < curr.priceSEK ? prev : curr
        );
        if (bestTN.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-ticketnetwork`,
            merchantName: "TicketNetwork",
            rating: 4.5,
            reviewsCount: 1120,
            section: "Verifierad Säljare",
            category: "Standard / VIP",
            priceSEK: bestTN.priceSEK,
            availableQuantity: 5,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: bestTN.url,
            type: "ticket"
          });
        }
      }
    }

    // Generera deeplink till OLKA för hemmalaget
      const olkaUrl = getSearchUrl("OLKA Express", m.homeKey, m.awayKey, undefined, m.date);
      const lowestOtherPrice = offers.length > 0 ? Math.min(...offers.map(o => o.priceSEK).filter(p => p > 0)) : 1290;

      offers.push({
        id: `${matchId}-olka`,
        merchantName: "OLKA Express",
        rating: 4.8,
        reviewsCount: 850,
        section: "Officiell partner",
        category: "Standard / VIP",
        priceSEK: lowestOtherPrice,
        availableQuantity: 5,
        deliveryType: "E-biljett",
        isVerified: true,
        url: olkaUrl,
        type: "ticket",
      });


    // 4. Övriga partners utan livefeed (Sök-fallback)
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
}

export async function GET() {
  try {
    const matches = await getMatchesData();
    return NextResponse.json(matches);
  } catch (error: any) {
    console.error("Fel i matches/route.ts:", error);
    return NextResponse.json({ error: "Kunde inte läsa in matcher" }, { status: 500 });
  }
}