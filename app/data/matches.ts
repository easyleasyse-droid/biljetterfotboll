import { Match, FAQItem } from "../types";

export const MATCHES_DATA: Match[] = [
  {
    id: "m-real-sociedad", // Nytt unikt ID
    homeTeam: {
      name: "Real Madrid",
      shortName: "RMA",
      primaryColor: "#FFFFFF",
      secondaryColor: "#FEBE10",
      emoji: "🇪🇸"
    },
    awayTeam: {
      name: "Real Sociedad",
      shortName: "RSO",
      primaryColor: "#0067B1",
      secondaryColor: "#FFFFFF",
      emoji: "🇪🇸"
    },
    league: "La Liga",
    date: "2026-08-26",
    time: "21:00",
    stadium: "Santiago Bernabéu",
    city: "Madrid",
    priceFrom: 1318,
    totalTicketsCount: 15,
    offers: [
      {
        id: "o-real-sociedad-1", // Unikt ID för detta erbjudande
        merchantName: "Sports Events 365",
        rating: 4.8,
        reviewsCount: 512,
        section: "Short Side - 4th Ring",
        category: "Kortsida",
        priceSEK: 1318,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true,
        url: "https://www.sportsevents365.com/event/395257" // Länken du hittade
      }
    ]
  },
  {
    id: "m1",
    homeTeam: {
      name: "Arsenal FC",
      shortName: "ARS",
      primaryColor: "#EF0107",
      secondaryColor: "#FFFFFF",
      emoji: "🇬🇧"
    },
    awayTeam: {
      name: "Chelsea FC",
      shortName: "CHE",
      primaryColor: "#034694",
      secondaryColor: "#FFFFFF",
      emoji: "🔵"
    },
    league: "Premier League",
    date: "2026-08-22",
    time: "16:00",
    stadium: "Emirates Stadium",
    city: "London",
    priceFrom: 1250,
    totalTicketsCount: 420,
    offers: [
      {
        id: "o1-1",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Lower Tier - Sektion 12",
        category: "Kortsida",
        priceSEK: 1250,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o1-2",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "Club Level - Långsida",
        category: "Långsida",
        priceSEK: 2100,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o1-3",
        merchantName: "Viagogo",
        rating: 4.4,
        reviewsCount: 1980,
        section: "Upper Tier - Långsida",
        category: "Långsida",
        priceSEK: 1650,
        availableQuantity: 4,
        deliveryType: "Mobilbiljett",
        isVerified: true
      }
    ]
  },
  {
    id: "m2",
    homeTeam: {
      name: "Real Madrid",
      shortName: "RMA",
      primaryColor: "#FFFFFF",
      secondaryColor: "#FEBE10",
      emoji: "🇪🇸"
    },
    awayTeam: {
      name: "Atlético Madrid",
      shortName: "ATM",
      primaryColor: "#CB3524",
      secondaryColor: "#FFFFFF",
      emoji: "🔴"
    },
    league: "La Liga",
    date: "2026-08-30",
    time: "21:00",
    stadium: "Santiago Bernabéu",
    city: "Madrid",
    priceFrom: 1450,
    totalTicketsCount: 310,
    offers: [
      {
        id: "o2-1",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "Fondo Sur - Kortsida",
        category: "Kortsida",
        priceSEK: 1450,
        availableQuantity: 2,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o2-2",
        merchantName: "Viagogo",
        rating: 4.4,
        reviewsCount: 1980,
        section: "Lateral Alta - Långsida",
        category: "Långsida",
        priceSEK: 1980,
        availableQuantity: 4,
        deliveryType: "Mobilbiljett",
        isVerified: true
      }
    ]
  },
  {
    id: "m3",
    homeTeam: {
      name: "Manchester United",
      shortName: "MUN",
      primaryColor: "#DA291C",
      secondaryColor: "#000000",
      emoji: "🇬🇧"
    },
    awayTeam: {
      name: "Liverpool FC",
      shortName: "LIV",
      primaryColor: "#C8102E",
      secondaryColor: "#F6EB61",
      emoji: "🔴"
    },
    league: "Premier League",
    date: "2026-09-12",
    time: "13:30",
    stadium: "Old Trafford",
    city: "Manchester",
    priceFrom: 1850,
    totalTicketsCount: 512,
    offers: [
      {
        id: "o3-1",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Sir Alex Ferguson Stand",
        category: "Långsida",
        priceSEK: 2400,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o3-2",
        merchantName: "FootballTicketNet",
        rating: 4.2,
        reviewsCount: 890,
        section: "Stretford End - Kortsida",
        category: "Kortsida",
        priceSEK: 1850,
        availableQuantity: 6,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      }
    ]
  },
  {
    id: "m4",
    homeTeam: {
      name: "AC Milan",
      shortName: "MIL",
      primaryColor: "#E32119",
      secondaryColor: "#000000",
      emoji: "🇮🇹"
    },
    awayTeam: {
      name: "Inter Milan",
      shortName: "INT",
      primaryColor: "#0053A0",
      secondaryColor: "#000000",
      emoji: "🔵"
    },
    league: "Serie A",
    date: "2026-09-20",
    time: "20:45",
    stadium: "San Siro",
    city: "Milano",
    priceFrom: 950,
    totalTicketsCount: 280,
    offers: [
      {
        id: "o4-1",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "Secondo Anello Blu",
        category: "Kortsida",
        priceSEK: 950,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o4-2",
        merchantName: "Viagogo",
        rating: 4.4,
        reviewsCount: 1980,
        section: "Primo Anello Rosso",
        category: "Långsida",
        priceSEK: 1750,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      }
    ]
  },
  {
    id: "m5",
    homeTeam: {
      name: "FC Barcelona",
      shortName: "BAR",
      primaryColor: "#004D98",
      secondaryColor: "#A50044",
      emoji: "🇪🇸"
    },
    awayTeam: {
      name: "Bayern München",
      shortName: "FCB",
      primaryColor: "#DC052D",
      secondaryColor: "#0066B2",
      emoji: "🇩🇪"
    },
    league: "Champions League",
    date: "2026-09-29",
    time: "21:00",
    stadium: "Camp Nou",
    city: "Barcelona",
    priceFrom: 1600,
    totalTicketsCount: 340,
    offers: [
      {
        id: "o5-1",
        merchantName: "Sports Events 365",
        rating: 4.6,
        reviewsCount: 420,
        section: "General Admission",
        category: "Kortsida",
        priceSEK: 1600,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o5-2",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Tribuna Nedre",
        category: "Långsida",
        priceSEK: 2900,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      }
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq1",
    question: "Hur fungerar biljetterfotboll.se?",
    answer: "Vi är en oberoende jämförelsetjänst för fotbollsbiljetter. Vi samlar in och jämför priser i realtid från dussintals pålitliga och verifierade andrahandsmarknader och biljettförmedlare (som StubHub, Ticombo, Viagogo med flera) så att du alltid kan hitta det absolut lägsta priset och bästa platserna."
  },
  {
    id: "faq2",
    question: "Är biljetterna äkta och säkra att köpa?",
    answer: "Ja, alla återförsäljare vi listar är noggrant kontrollerade och erbjuder 100% giltighetsgaranti på biljetterna. Webbplatserna vi länkar till använder krypterade skydd för betalningar och garanterar att du får dina biljetter i tid till matchen, annars får du pengarna tillbaka."
  },
  {
    id: "faq3",
    question: "Varför skiljer sig biljettpriserna från ordinarie pris?",
    answer: "Många av de matcher vi listar (som El Clásico eller stormatcher i Premier League) är slutsålda hos klubbarna. Biljetterna säljs då på andrahandsmarknaden. Priserna styrs av tillgång och efterfrågan och kan därför ligga både under och över det ursprungliga ordinarie priset."
  },
  {
    id: "faq4",
    question: "När och hur levereras fotbollsbiljetterna?",
    answer: "I de allra flesta fall levereras biljetterna digitalt som en E-biljett (PDF som du kan ladda ner och skriva ut) eller som en mobilbiljett direkt till din telefon i god tid före matchstart (oftast 24-72 timmar innan matchen). Det specifika leveranssättet står alltid tydligt i biljettbeskrivningen när du slutför köpet hos återförsäljaren."
  },
  {
    id: "faq5",
    question: "Kan jag sitta tillsammans med mina vänner om jag köper flera biljetter?",
    answer: "Ja, de flesta återförsäljare garanterar att biljetter som köps tillsammans i samma transaktion ger sittplatser bredvid varandra (parvis). Om detta inte garanteras står det tydligt angivet som en varning innan du bekräftar köpet."
  }
];
