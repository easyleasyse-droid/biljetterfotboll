// @ts-nocheck
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MatchCard from "./components/MatchCard";
import ComparisonDrawer from "./components/ComparisonDrawer";
import BookingModal from "./components/BookingModal";
import { MATCHES_DATA } from "./data/matches";
import { TEAMS_SEO_DATA } from "./data/teams";
import { Search, Trophy, Building2, Ticket, ShieldCheck, Mail } from "lucide-react";

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [bookingQuantity, setBookingQuantity] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookOffer = (offer, quantity) => {
    setSelectedOffer(offer);
    setBookingQuantity(quantity);
  };

  const filteredMatches = MATCHES_DATA.filter(match => {
    return match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           match.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // 1. Sortera matcherna baserat på datum och tid (närmast i tid först)
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // 2. Dela upp matcherna i ligaspecifika listor
  const championsLeagueMatches = sortedMatches.filter(m => m.league === "Champions League");
  const premierLeagueMatches = sortedMatches.filter(m => m.league === "Premier League");
  const laLigaMatches = sortedMatches.filter(m => m.league === "La Liga");
  const allsvenskanMatches = sortedMatches.filter(m => m.league === "Allsvenskan");
  const serieAMatches = sortedMatches.filter(m => m.league === "Serie A");

  // 3. Skapa en struktur för sektionerna som bara visar om det finns matcher
  const matchSections = [
    { title: "🏆 Toppmöten i Champions League", matches: championsLeagueMatches },
    { title: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Heta matcher i Premier League", matches: premierLeagueMatches },
    { title: "🇪🇸 Spansk dramatik i La Liga", matches: laLigaMatches },
    { title: "🇸🇪 Allsvenska stormatcher", matches: allsvenskanMatches },
    { title: "🇮🇹 Italiensk passion i Serie A", matches: serieAMatches },
  ].filter(section => section.matches.length > 0);

  const teamSlugs = Object.keys(TEAMS_SEO_DATA);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header 
        onSearchFocus={() => {}} 
        onSelectLeague={() => {}} 
        selectedLeague="" 
      />

      {/* Hero Section */}
      <div className="bg-slate-950 text-white py-20 px-4 shadow-xl">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
            Jämför & Köp <span className="text-indigo-400">Fotbollsbiljetter</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
            Hitta de bästa auktoriserade biljetterna och fotbollspaketen till Europas största klubbar. Säkert, smidigt och alltid de lägsta priserna.
          </p>
          
          <div className="relative max-w-xl mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input 
              type="search"
              placeholder="Sök lag, t.ex. Arsenal, Liverpool..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 rounded-full pl-12 pr-6 py-4 text-lg focus:ring-4 focus:ring-indigo-500 outline-none shadow-lg shadow-black/30"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center border-t border-slate-800 pt-8">
            <Link href="/" className="bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-700 transition-all">
              Alla Ligor
            </Link>
            {/* Befintliga ligor */}
            <Link href="/liga/premier-league" className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all">
              <ShieldCheck className="h-4 w-4" /> Premier League
            </Link>
            <Link href="/liga/la-liga" className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all">
              <Trophy className="h-4 w-4" /> La Liga
            </Link>
            <Link href="/liga/serie-a" className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all">
              <Trophy className="h-4 w-4" /> Serie A
            </Link>
            <Link href="/liga/ligue-1" className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all">
              <Trophy className="h-4 w-4" /> Ligue 1
            </Link>
            <Link href="/liga/bundesliga" className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all">
              <Trophy className="h-4 w-4" /> Bundesliga
            </Link>
            <Link href="/liga/eredivisie" className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all">
              <Trophy className="h-4 w-4" /> Eredivisie
            </Link>
            <Link href="/liga/champions-league" className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all">
              <Trophy className="h-4 w-4" /> Champions League
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Matchlista uppdelad per liga */}
        <section className="mb-20 space-y-12">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-black tracking-tight text-slate-800 flex items-center gap-2">
              <Trophy className="text-amber-500 h-8 w-8" />
              Aktuella Matcher
            </h2>
            <p className="text-slate-500 text-sm">
              Hittade {sortedMatches.length} match(er)
            </p>
          </div>
          
          {sortedMatches.length > 0 ? (
            matchSections.map((section, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-700 flex items-center gap-2 bg-slate-100/60 px-4 py-2 rounded-lg">
                  {section.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.matches.map(match => (
                    <MatchCard 
                      key={match.id} 
                      match={match} 
                      onSelect={setSelectedMatch} 
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm text-slate-500">
              Inga matcher matchar din sökning. Testa att rensa sökfältet!
            </div>
          )}
        </section>

        {/* Dynamiska Lagsidor */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-800 flex items-center gap-3">
              <ShieldCheck className="text-indigo-600 h-8 w-8" />
              Lagsidor & Biljettinfo
            </h2>
          </div>
          
          {/* Grid-kolumner justerade för att ge det fulla arenanamnet lite mer andrum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {teamSlugs.map(slug => {
              const teamData = TEAMS_SEO_DATA[slug];
              if (!teamData) return null;

              return (
                <Link 
                  key={slug} 
                  href={`/lag/${slug}`} 
                  className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center"
                >
                  <div className="flex flex-col items-center text-center w-full">
                    {/* LOGOCIRKEL - Visar bild om den finns, annars text-fallback */}
                   {/* ✅ KLISTRA IN DETTA BLOCK ISTÄLLET: */}
<div className={`rounded-full h-16 w-16 mb-4 flex items-center justify-center overflow-hidden transition-colors duration-300 border
  ${teamData.logo 
    ? "bg-white border-slate-200/80 shadow-sm group-hover:border-indigo-200" 
    : "bg-slate-100 border-slate-100 text-indigo-600 group-hover:bg-indigo-50"
  }`}
>
  {teamData.logo ? (
    <img 
      src={teamData.logo} 
      alt={`${teamData.name} logotyp`} 
      className="w-full h-full object-contain p-1.5"
    />
  ) : (
    <span className="text-xl font-bold">
      {teamData.name.charAt(0)}
    </span>
  )}
</div>
                    <h3 className="font-extrabold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {teamData.name}
                    </h3>
                    
                    {/* ARENANAMN - Hela namnet visas nu, med mjuk avklippning (truncate) om det blir för långt */}
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 justify-center w-full px-1">
                      <Building2 className="h-3 w-3 shrink-0 text-slate-400" /> 
                      <span className="truncate">{teamData.stadiumName}</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Fördelar */}
        <section className="bg-white rounded-3xl p-10 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/40 grid md:grid-cols-3 gap-10">
          {[
            { icon: Building2, title: "100% Auktoriserat", desc: "Vi listar endast återförsäljare och paket som är godkända av klubbarna. Säkert köp varje gång." },
            { icon: Ticket, title: "Lägsta Priser", desc: "Vår algoritm jämför alla tillgängliga erbjudanden så att du garanterat får det lägsta priset." },
            { icon: Mail, title: "Trygg Leverans", desc: "Vi garanterar säker och trygg leverans av dina biljetter i god tid före matchstart." }
          ].map(benefit => (
            <div key={benefit.title} className="flex flex-col items-center text-center">
              <div className="bg-indigo-50 rounded-2xl h-16 w-16 flex items-center justify-center border border-indigo-100 mb-6 shadow-md shadow-indigo-100/50">
                <benefit.icon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-2">{benefit.title}</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />

      <ComparisonDrawer 
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
        onBookOffer={handleBookOffer}
      />

      <BookingModal 
        match={selectedMatch}
        offer={selectedOffer}
        quantity={bookingQuantity}
        onClose={() => setSelectedOffer(null)}
      />
    </div>
  );
}