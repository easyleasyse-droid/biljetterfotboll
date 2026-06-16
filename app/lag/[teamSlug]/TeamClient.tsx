// @ts-nocheck
"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import MatchList from "../../components/MatchList";
import ComparisonDrawer from "../../components/ComparisonDrawer";
import BookingModal from "../../components/BookingModal";
import Footer from "../../components/Footer";
import { MATCHES_DATA } from "../../data/matches";
import { TEAMS_SEO_DATA } from "../../data/teams";
import { 
  Calendar, MapPin, Trophy, ChevronDown, ChevronUp, Ticket, Building2, Map, Hotel, Info
} from "lucide-react";

// Vi tar emot teamSlug direkt som en prop från servern istället
export default function TeamClient({ teamSlug }: { teamSlug: string }) {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [bookingQuantity, setBookingQuantity] = useState<number>(2);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const seoData = TEAMS_SEO_DATA[teamSlug];

  const filteredMatches = MATCHES_DATA.filter((match: any) => {
    const homeName = match.homeTeam?.name?.toLowerCase() || "";
    const awayName = match.awayTeam?.name?.toLowerCase() || "";
    const cleanSlug = teamSlug.replace("-", " ");
    
    return homeName.includes(cleanSlug) || awayName.includes(cleanSlug);
  }).sort((a, b) => {
    return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime();
  });

  const teamName = seoData ? seoData.name : teamSlug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const handleBookOffer = (offer: any, quantity: number) => {
    setSelectedOffer(offer);
    setBookingQuantity(quantity);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans scroll-smooth">
      <Header onSearchFocus={() => {}} onSelectLeague={() => {}} selectedLeague="" />

      {/* Modern Hero med Bakgrundsbild */}
      <div 
        className="relative bg-slate-950 text-white py-16 md:py-24 px-4 bg-cover bg-center shadow-xl"
        style={{ 
          backgroundImage: seoData?.heroImage 
            ? `linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(3, 7, 18, 0.95)), url(${seoData.heroImage})` 
            : 'linear-gradient(to br, #0f172a, #030712)' 
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-xs md:text-sm text-slate-400 mb-4 flex items-center gap-2 font-medium">
            <span>Hem</span> <span className="text-slate-600">/</span> <span>Lag</span> <span className="text-slate-600">/</span> <span className="text-indigo-400 capitalize">{teamName}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-md">
            {teamName} biljetter
          </h1>
          
          <div className="flex flex-wrap gap-2 text-xs md:text-sm text-slate-200 mb-8">
            <span className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-800">
              <Building2 className="h-4 w-4 text-indigo-400" /> {seoData?.stadiumName || "Klubbarena"}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-800">
              <MapPin className="h-4 w-4 text-emerald-400" /> {seoData?.location || "Europa"}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-800">
              <Trophy className="h-4 w-4 text-amber-400" /> {seoData?.league || "Toppligan"}
            </span>
          </div>

          <p className="text-slate-300 max-w-3xl text-base md:text-lg leading-relaxed font-normal">
            {seoData?.aboutTickets || `Hitta och jämför de bästa biljettalternativen för att uppleva {teamName} live på arenan.`}
          </p>
        </div>
      </div>

      {/* Snabbvalsmeny (Anchor Links) */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm hidden md:block">
        <div className="max-w-6xl mx-auto px-4 flex gap-8 h-14 items-center text-sm font-semibold text-slate-600">
          <button onClick={() => scrollToSection("matcher")} className="hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 h-full transition-all">Matcher</button>
          <button onClick={() => scrollToSection("biljettinfo")} className="hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 h-full transition-all">Biljettguide</button>
          <button onClick={() => scrollToSection("arenaguide")} className="hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 h-full transition-all">Arenainfo</button>
          {seoData?.faqs && <button onClick={() => scrollToSection("faq")} className="hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 h-full transition-all">Vanliga frågor</button>}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Matchlista */}
        <section id="matcher" className="mb-16 scroll-mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
              <Calendar className="text-indigo-600 h-6 w-6" />
              Aktuella matcher & biljetter 2026
            </h2>
            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
              {filteredMatches.length} st planerade
            </span>
          </div>

          {filteredMatches.length > 0 ? (
            <MatchList matches={filteredMatches} onSelectMatch={(match: any) => setSelectedMatch(match)} selectedLeague="" />
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm text-slate-500">
              <Info className="h-8 w-8 text-slate-300 mx-auto mb-3" />
              Inga kommande matcher hittades för närvarande för {teamName}.
            </div>
          )}
        </section>

        {/* Info-Grid */}
        {seoData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
            <div id="biljettinfo" className="lg:col-span-2 space-y-6 scroll-mt-20">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2 text-slate-800">
                  <Ticket className="text-indigo-600 h-5 w-5" /> Hur du köper {teamName} biljetter
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{seoData.howToBuy}</p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2 text-slate-800">
                  <Info className="text-blue-600 h-5 w-5" /> Olika sektioner och prisnivåer
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{seoData.sectionsAndPrices}</p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2 text-slate-800">
                  <Hotel className="text-emerald-600 h-5 w-5" /> Matchpaket med boende
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{seoData.packages}</p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-extrabold mb-3 flex items-center gap-2 text-slate-800">
                    <Trophy className="text-amber-500 h-5 w-5" /> Klubbens historia
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">{seoData.history}</p>
                </div>
                {seoData.contentImage && (
                  <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100 h-44 w-full">
                    <img src={seoData.contentImage} alt={`${teamName} matchatmosfär`} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Högerbox (Arena) */}
            <div id="arenaguide" className="space-y-6 lg:sticky lg:top-20 scroll-mt-20">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 font-bold flex items-center gap-2 text-sm md:text-base">
                  <Map className="h-4 w-4 text-indigo-400" /> Arenaguide: {seoData.stadiumName}
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{seoData.stadiumDescription}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {seoData.googleMapsEmbedUrl && (
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                        <iframe src={seoData.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Karta över ${seoData.stadiumName}`}></iframe>
                      </div>
                    )}
                    {seoData.stadiumLayoutImage && (
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 relative group shadow-sm">
                        <img src={seoData.stadiumLayoutImage} alt={`Layoutritning över ${seoData.stadiumName}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded text-slate-200 border border-slate-700">Matchatmosfär</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Sektion */}
        {seoData && seoData.faqs && seoData.faqs.length > 0 && (
          <section id="faq" className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-4xl scroll-mt-20">
            <h2 className="text-2xl font-black mb-6 text-slate-800 flex items-center gap-2">Vanliga frågor om biljetter till {teamName}</h2>
            <div className="divide-y divide-slate-200">
              {seoData.faqs.map((faq: any, index: number) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between text-left font-bold text-slate-700 hover:text-indigo-600 transition-colors text-sm md:text-base py-2">
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="h-5 w-5 text-indigo-500 shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && <div className="mt-2 pr-6 text-slate-600 text-sm md:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">{faq.answer}</div>}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {selectedMatch && <ComparisonDrawer match={selectedMatch} onClose={() => setSelectedMatch(null)} onBookOffer={(offer: any) => handleBookOffer(offer, bookingQuantity)} />}
      {selectedOffer && <BookingModal match={selectedMatch} offer={selectedOffer} quantity={bookingQuantity} onClose={() => setSelectedOffer(null)} />}
    </div>
  );
}