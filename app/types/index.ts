export interface Team {
  name: string;
  shortName: string;
  primaryColor: string; // e.g. '#EF4444'
  secondaryColor: string; // e.g. '#FFFFFF'
  logo?: string; //
  emoji: string; // e.g. '🔴' or stadium badge fallback
}

export interface TicketOffer {
  id: string;
  merchantName: string;
  merchantLogo?: string;
  rating: number; // e.g. 4.8
  reviewsCount: number; // e.g. 1420
  section: string; // e.g. "Kortsida övre"
  category: "VIP" | "Långsida" | "Kortsida" | "Borta";
  priceSEK: number; // Price per ticket
  availableQuantity: number; // e.g. 4
  deliveryType: "E-biljett (Direkt)" | "Mobilbiljett" | "Pappersbiljett";
  isVerified: boolean;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  league: "Premier League" | "La Liga" | "Champions League" | "Serie A" | "Allsvenskan";
  date: string; // e.g. '2026-06-25'
  time: string; // e.g. '20:45'
  stadium: string;
  city: string;
  priceFrom: number; // Calculated dynamic minimum
  totalTicketsCount: number;
  offers: TicketOffer[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
