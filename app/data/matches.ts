import { Match, FAQItem } from "../types";

export const MATCHES_DATA: Match[] = [
  {
    id: "m1",
    homeTeam: {
      name: "Real Madrid",
      shortName: "RMA",
      primaryColor: "#00529F",
      secondaryColor: "#FFFFFF",
      emoji: "🇪🇸"
    },
    awayTeam: {
      name: "FC Barcelona",
      shortName: "BAR",
      primaryColor: "#004D98",
      secondaryColor: "#A50044",
      emoji: "🔴"
    },
    league: "La Liga",
    date: "2026-06-28",
    time: "21:00",
    stadium: "Santiago Bernabéu",
    city: "Madrid",
    priceFrom: 1250,
    totalTicketsCount: 412,
    offers: [
      {
        id: "o1-1",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Kortsida – Övre sektion",
        category: "Kortsida",
        priceSEK: 1250,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o1-2",
        merchantName: "Viagogo",
        rating: 4.4,
        reviewsCount: 1980,
        section: "Långsida – Kategori 2",
        category: "Långsida",
        priceSEK: 2100,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o1-3",
        merchantName: "Sports Events 365",
        rating: 4.9,
        reviewsCount: 890,
        section: "Långsida – Kategori 1 (Nedre)",
        category: "Långsida",
        priceSEK: 3500,
        availableQuantity: 6,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o1-4",
        merchantName: "FootballTicketNet",
        rating: 4.3,
        reviewsCount: 1240,
        section: "VIP Box – Silver Hospitality",
        category: "VIP",
        priceSEK: 7500,
        availableQuantity: 8,
        deliveryType: "Pappersbiljett",
        isVerified: true
      },
      {
        id: "o1-5",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "Bortasektion",
        category: "Borta",
        priceSEK: 1800,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      }
    ]
  },
  {
    id: "m2",
    homeTeam: {
      name: "Manchester United",
      shortName: "MUN",
      primaryColor: "#DA291C",
      secondaryColor: "#000000",
      logo: "/logos/manchester-united.png" ,
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
    date: "2026-07-04",
    time: "13:30",
    stadium: "Old Trafford",
    city: "Manchester",
    priceFrom: 1450,
    totalTicketsCount: 328,
    offers: [
      {
        id: "o2-1",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "North Stand Tier 3",
        category: "Kortsida",
        priceSEK: 1450,
        availableQuantity: 2,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o2-2",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Sir Alex Ferguson Stand (Långsida)",
        category: "Långsida",
        priceSEK: 1950,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o2-3",
        merchantName: "Viagogo",
        rating: 4.4,
        reviewsCount: 1980,
        section: "East Stand (Kortsida nedre)",
        category: "Kortsida",
        priceSEK: 1600,
        availableQuantity: 4,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o2-4",
        merchantName: "Sports Events 365",
        rating: 4.9,
        reviewsCount: 890,
        section: "Sir Bobby Charlton Stand Centrerad",
        category: "Långsida",
        priceSEK: 2800,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o2-5",
        merchantName: "Ticketbande",
        rating: 4.2,
        reviewsCount: 450,
        section: "Centenary Club VIP (Inkl. Mat)",
        category: "VIP",
        priceSEK: 6200,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      }
    ]
  },
  {
    id: "m3",
    homeTeam: {
      name: "Hammarby IF",
      shortName: "HAM",
      primaryColor: "#008751",
      secondaryColor: "#FFFFFF",
      emoji: "🇸🇪"
    },
    awayTeam: {
      name: "AIK",
      shortName: "AIK",
      primaryColor: "#222222",
      secondaryColor: "#F6EB61",
      emoji: "✊"
    },
    league: "Allsvenskan",
    date: "2026-06-25",
    time: "19:00",
    stadium: "Tele2 Arena",
    city: "Stockholm",
    priceFrom: 390,
    totalTicketsCount: 184,
    offers: [
      {
        id: "o3-1",
        merchantName: "Biljett Nu",
        rating: 4.5,
        reviewsCount: 340,
        section: "Södra Ståplats (Kortsida)",
        category: "Kortsida",
        priceSEK: 390,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o3-2",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Östra Långsida (Sektion 124)",
        category: "Långsida",
        priceSEK: 550,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o3-3",
        merchantName: "Viagogo",
        rating: 4.4,
        reviewsCount: 1980,
        section: "Västra Långsida Premium",
        category: "Långsida",
        priceSEK: 790,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o3-4",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "Bortasekt. Norra Stå (AIK)",
        category: "Borta",
        priceSEK: 450,
        availableQuantity: 4,
        deliveryType: "Mobilbiljett",
        isVerified: true
      }
    ]
  },
  {
    id: "m4",
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
    date: "2026-07-12",
    time: "17:30",
    stadium: "Emirates Stadium",
    city: "London",
    priceFrom: 1150,
    totalTicketsCount: 226,
    offers: [
      {
        id: "o4-1",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Clock End Upper Tier",
        category: "Kortsida",
        priceSEK: 1150,
        availableQuantity: 6,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o4-2",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "East Stand Lower Tier (Långsida)",
        category: "Långsida",
        priceSEK: 1650,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o4-3",
        merchantName: "Sports Events 365",
        rating: 4.9,
        reviewsCount: 890,
        section: "Club Level VIP Hospitality (Inkl. dryck)",
        category: "VIP",
        priceSEK: 4200,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      }
    ]
  },
  {
    id: "m5",
    homeTeam: {
      name: "AC Milan",
      shortName: "MIL",
      primaryColor: "#E31B23",
      secondaryColor: "#000000",
      emoji: "🇮🇹"
    },
    awayTeam: {
      name: "Inter Milan",
      shortName: "INT",
      primaryColor: "#0066B2",
      secondaryColor: "#000000",
      emoji: "🔵"
    },
    league: "Serie A",
    date: "2026-07-19",
    time: "20:45",
    stadium: "San Siro",
    city: "Milano",
    priceFrom: 850,
    totalTicketsCount: 195,
    offers: [
      {
        id: "o5-1",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "Curva Sud (Kortsida)",
        category: "Kortsida",
        priceSEK: 850,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o5-2",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Rosso Långsida – Kategori 1",
        category: "Långsida",
        priceSEK: 1450,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o5-3",
        merchantName: "Viagogo",
        rating: 4.4,
        reviewsCount: 1980,
        section: "Curva Nord Bortasektion",
        category: "Borta",
        priceSEK: 980,
        availableQuantity: 2,
        deliveryType: "Mobilbiljett",
        isVerified: true
      }
    ]
  },
  {
    id: "m6",
    homeTeam: {
      name: "Paris Saint-Germain",
      shortName: "PSG",
      primaryColor: "#002F6C",
      secondaryColor: "#DA291C",
      emoji: "🇫🇷"
    },
    awayTeam: {
      name: "Bayern München",
      shortName: "FCB",
      primaryColor: "#DC052D",
      secondaryColor: "#0066B2",
      emoji: "🔴"
    },
    league: "Champions League",
    date: "2026-08-11",
    time: "21:00",
    stadium: "Parc des Princes",
    city: "Paris",
    priceFrom: 1650,
    totalTicketsCount: 143,
    offers: [
      {
        id: "o6-1",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Kortsida Virage Auteuil",
        category: "Kortsida",
        priceSEK: 1650,
        availableQuantity: 2,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o6-2",
        merchantName: "Sports Events 365",
        rating: 4.9,
        reviewsCount: 890,
        section: "Borelli Långsida nedre",
        category: "Långsida",
        priceSEK: 2750,
        availableQuantity: 4,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o6-3",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "Espace Borelli VIP (Inkl. Buffé)",
        category: "VIP",
        priceSEK: 8900,
        availableQuantity: 2,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      }
    ]
  },
  {
    id: "m7",
    homeTeam: {
      name: "Borussia Dortmund",
      shortName: "BVB",
      primaryColor: "#FDE100",
      secondaryColor: "#000000",
      emoji: "🇩🇪"
    },
    awayTeam: {
      name: "Real Madrid",
      shortName: "RMA",
      primaryColor: "#00529F",
      secondaryColor: "#FFFFFF",
      emoji: "🇪🇸"
    },
    league: "Champions League",
    date: "2026-08-18",
    time: "21:00",
    stadium: "Signal Iduna Park",
    city: "Dortmund",
    priceFrom: 1350,
    totalTicketsCount: 209,
    offers: [
      {
        id: "o7-1",
        merchantName: "Viagogo",
        rating: 4.4,
        reviewsCount: 1980,
        section: "Südtribüne (Ståplats kortsida)",
        category: "Kortsida",
        priceSEK: 1350,
        availableQuantity: 1,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o7-2",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Osttribüne Långsida (Block 43)",
        category: "Långsida",
        priceSEK: 1950,
        availableQuantity: 4,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      }
    ]
  },
  {
    id: "m8",
    homeTeam: {
      name: "Malmö FF",
      shortName: "MFF",
      primaryColor: "#009CDC",
      secondaryColor: "#FFFFFF",
      emoji: "🇸🇪"
    },
    awayTeam: {
      name: "IFK Göteborg",
      shortName: "IFK",
      primaryColor: "#004B87",
      secondaryColor: "#FFFFFF",
      emoji: "🔵"
    },
    league: "Allsvenskan",
    date: "2026-06-21",
    time: "15:00",
    stadium: "Eleda Stadion",
    city: "Malmö",
    priceFrom: 340,
    totalTicketsCount: 167,
    offers: [
      {
        id: "o8-1",
        merchantName: "Biljett Nu",
        rating: 4.5,
        reviewsCount: 340,
        section: "Norra Stå (Kortsida Malmö)",
        category: "Kortsida",
        priceSEK: 340,
        availableQuantity: 6,
        deliveryType: "E-biljett (Direkt)",
        isVerified: true
      },
      {
        id: "o8-2",
        merchantName: "StubHub",
        rating: 4.8,
        reviewsCount: 3102,
        section: "Sittplats Långsida (Sektion 19)",
        category: "Långsida",
        priceSEK: 480,
        availableQuantity: 4,
        deliveryType: "Mobilbiljett",
        isVerified: true
      },
      {
        id: "o8-3",
        merchantName: "Ticombo",
        rating: 4.7,
        reviewsCount: 1540,
        section: "Bortaläktaren (Sektion 17)",
        category: "Borta",
        priceSEK: 350,
        availableQuantity: 4,
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
