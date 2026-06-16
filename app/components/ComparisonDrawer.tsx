// @ts-nocheck
import React, { useState } from "react";
import { Match, TicketOffer } from "../types";
import StadiumMap from "./StadiumMap";
import { X, Calendar, MapPin, Shield, Star, Info, Zap, Mail, Trash2, ArrowRight } from "lucide-react";

interface ComparisonDrawerProps {
  match: Match | null;
  onClose: () => void;
  onBookOffer: (offer: TicketOffer, quantity: number) => void;
}

export default function ComparisonDrawer({ match, onClose, onBookOffer }: ComparisonDrawerProps) {
  if (!match) return null;

  const [quantity, setQuantity] = useState<number>(2);
  const [selectedCategory, setSelectedCategory] = useState<"VIP" | "Långsida" | "Kortsida" | "Borta" | "Alla">("Alla");

  // Determine cheapest price for each category to feed into the stadium map
  const getCheapestForCategory = (cat: "VIP" | "Långsida" | "Kortsida" | "Borta") => {
    const filtered = match.offers.filter((o) => o.category === cat);
    if (filtered.length === 0) return 0;
    return Math.min(...filtered.map((o) => o.priceSEK));
  };

  const pricesData = {
    VIP: getCheapestForCategory("VIP"),
    Långsida: getCheapestForCategory("Långsida"),
    Kortsida: getCheapestForCategory("Kortsida"),
    Borta: getCheapestForCategory("Borta")
  };

  // Filter offers based on active filters
  const filteredOffers = match.offers.filter((offer) => {
    // 1. Check Seating Category match
    if (selectedCategory !== "Alla" && offer.category !== selectedCategory) {
      return false;
    }
    // 2. We can show matches even if quantity listed is less, but we'll show warning badge
    return true;
  });

  // Format Date Helper
  const getLongSwedishDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const months = [
        "januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"
      ];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" id="comparison-drawer-overlay">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <main className="relative w-full max-w-2xl bg-white h-screen overflow-y-auto shadow-2xl flex flex-col justify-between z-10 animate-slide-in">
        
        {/* Drawer Header */}
        <section className="bg-blue-900 text-white p-6 sticky top-0 z-30 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 bg-white/10 border border-white/20 text-blue-200 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full">
              Pristabell &amp; Jämförelse
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-blue-850 rounded-full text-blue-100 hover:text-white transition-colors cursor-pointer"
              id="close-drawer-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Match Title Block */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-extrabold">{match.homeTeam.emoji}</span>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight uppercase">
                {match.homeTeam.name} <span className="text-blue-300 text-xs font-bold px-1">VS</span> {match.awayTeam.name}
              </h3>
              <p className="text-blue-100 text-xs mt-1.5 flex flex-wrap gap-x-3.5 gap-y-1 font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-300" />
                  {getLongSwedishDate(match.date)} • {match.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-300" />
                  {match.stadium}, {match.city}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Drawer Body Scroll Container */}
        <div className="flex-1 p-6 space-y-6">
          
          {/* Top layout grid: Stadium map + Quantity selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Interactive map */}
            <StadiumMap
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              prices={pricesData}
            />

            {/* Ticket Customization controls */}
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-250 p-4 rounded-2xl">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5" htmlFor="ticket-qty-select">
                  HUR MÅNGA BILJETTER?
                </label>
                <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 p-2 rounded-xl">
                  <span className="text-sm font-black text-blue-900 px-2 uppercase tracking-wide text-xs">Antal platser</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        id={`qty-btn-${n}`}
                        onClick={() => setQuantity(n)}
                        className={`w-9 h-9 rounded-lg font-black text-xs transition-colors cursor-pointer ${
                          quantity === n
                            ? "bg-blue-900 text-white"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold mt-2.5 flex items-center gap-1.5 leading-none">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Sittplatser garanteras alltid bredvid varandra parvis.</span>
                </p>
              </div>

              {/* Quick filter tabs */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5">
                  KATEGORI PÅ SITTPLATS
                </label>
                <div className="flex flex-wrap gap-1.5" id="category-filter-tabs">
                  {(["Alla", "VIP", "Långsida", "Kortsida", "Borta"] as const).map((catName) => (
                    <button
                      key={catName}
                      onClick={() => setSelectedCategory(catName)}
                      className={`text-xs px-3.5 py-2 rounded-xl border font-black uppercase tracking-wider transition-all cursor-pointer ${
                        selectedCategory === catName
                          ? "bg-blue-900 border-blue-900 text-white"
                          : "bg-white border-slate-250 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {catName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Table list of available comparative offers */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-slate-500 text-xs px-1">
              <span className="font-bold">Hittade erbjudanden ({filteredOffers.length} st)</span>
              <span>Sorterat efter lägsta pris</span>
            </div>

            {filteredOffers.length > 0 ? (
              <div className="space-y-3.5" id="ticket-offers-container">
                {filteredOffers.map((offer) => {
                  const unitPrice = offer.priceSEK;
                  const totalPrice = unitPrice * quantity;
                  const isUnderstocked = offer.availableQuantity < quantity;

                  return (
                    <div 
                      key={offer.id}
                      className={`border rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 relative ${
                        isUnderstocked 
                          ? "bg-slate-50/50 border-slate-200 opacity-75"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
                      }`}
                      id={`offer-card-${offer.id}`}
                    >
                      {/* Left: Merchant trust & seating details */}
                      <div className="space-y-2">
                        {/* Partner Name & Rating */}
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 tracking-tight text-base">
                            {offer.merchantName}
                          </span>
                          
                          <div className="flex items-center gap-0.5 bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] px-1.5 py-0.5 rounded font-bold">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            <span>{offer.rating}</span>
                          </div>

                          <span className="text-[10px] text-slate-400">
                            ({offer.reviewsCount} omdömen)
                          </span>
                        </div>

                        {/* Seating coordinates & details */}
                        <div>
                          <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-900 border border-white"></span>
                            <span>{offer.section}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Kategori: <span className="font-semibold text-slate-700">{offer.category}</span>
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{offer.deliveryType}</span>
                          </span>
                          {offer.isVerified && (
                            <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-emerald-100">
                              <Shield className="w-3 h-3 text-emerald-500" />
                              <span>100% Garanterad</span>
                            </span>
                          )}
                          {isUnderstocked && (
                            <span className="inline-flex items-center bg-rose-50 text-rose-600 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-rose-100">
                              Endast {offer.availableQuantity} st kvar i denna kategori
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Pricing calculation & Call To Action redirection button */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-slate-100 pt-3.5 md:pt-0 gap-2.5 min-w-[150px]">
                        <div className="text-left md:text-right">
                          <p className="text-xs text-slate-400 font-medium leading-none mb-1">
                            {quantity} x {unitPrice} kr
                          </p>
                          <p className="text-xl font-black text-slate-900 tracking-tight leading-none">
                            {totalPrice.toLocaleString("sv-SE")} <span className="text-xs font-semibold text-slate-600">kr</span>
                          </p>
                          <p className="text-[9px] text-emerald-600 font-bold mt-1">
                            Inga dolda serviceavgifter
                          </p>
                        </div>

                        <button
                          disabled={isUnderstocked}
                          onClick={() => onBookOffer(offer, quantity)}
                          className={`w-full max-w-[130px] font-black uppercase tracking-widest text-[10px] py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isUnderstocked
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : "bg-blue-900 hover:bg-blue-800 text-white shadow-md shadow-blue-950/10 hover:-translate-y-0.5"
                          }`}
                        >
                          <span>Välj partner</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 text-center text-slate-500">
                <Info className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="font-bold text-slate-700 text-xs">Inga biljetter i den här kategorin</p>
                <p className="text-[11px] mt-0.5">Prova att välja en annan sittplatskategori eller rensa filter.</p>
                <button
                  onClick={() => setSelectedCategory("Alla")}
                  className="mt-3 text-xs bg-slate-900 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Visa alla kategorier
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Lock safety footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Säker andrahandsmarknad</p>
              <p className="text-[10px] text-slate-400">Köpskydd och äkthetsgaranti ingår i varje transaktion.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
