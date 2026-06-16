// @ts-nocheck
"use client";

import React, { useState } from "react"; // Uppdaterad med useState
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MatchCard from "../../components/MatchCard";
import ComparisonDrawer from "../../components/ComparisonDrawer"; // Importerad
import BookingModal from "../../components/BookingModal"; // Importerad
import { LEAGUES_DATA } from "../../data/leagues";
import { TEAMS_SEO_DATA } from "../../data/teams";
import { MATCHES_DATA } from "../../data/matches";
import { Trophy, Globe, Ticket, Info, ShieldCheck, MapPin, ChevronRight } from "lucide-react";

export default function LeaguePage() {
  const params = useParams();
  const rawSlug = params?.leagueSlug || "";
  const leagueSlug = typeof rawSlug === "string" ? rawSlug.toLowerCase() : "";
  
  const leagueData = LEAGUES_DATA[leagueSlug];

  // Skapa staterna högst upp så att de alltid laddas i rätt ordning
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [bookingQuantity, setBookingQuantity] = useState<number>(2);

  if (!leagueData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Ligan hittades inte</h1>
          <p className="text-slate-600 mb-6">Vi kunde inte hitta ligan: "{rawSlug}"</p>
          <Link href="/" className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold">
            Gå till startsidan
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredMatches = MATCHES_DATA.filter(
    (match) => match.league?.toLowerCase() === leagueData.name.toLowerCase()
  );

  const handleBookOffer = (offer: any, quantity: number) => {
    setSelectedOffer(offer);
    setBookingQuantity(quantity);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />

      <div className="bg-slate-950 text-white py-16 md:py-20 px-4 shadow-lg bg-gradient-to-br from-slate-900 to-indigo-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs md:text-sm text-slate-400 mb-3 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Hem</Link> 
            <ChevronRight className="h-3 w-3 text-slate-600" /> 
            <span className="text-indigo-400 font-bold">{leagueData.name}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Biljetter till {leagueData.name}
          </h1>
          
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300 mb-6 bg-slate-900/50 w-fit px-4 py-2 rounded-full border border-slate-800">
            <Globe className="h-4 w-4 text-indigo-400" /> 
            <span>Region/Land: <strong>{leagueData.country}</strong></span>
          </div>

          <p className="text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
            {leagueData.description}
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-14">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mb-6 flex items-center gap-2">
            <ShieldCheck className="text-indigo-600 h-6 w-6" />
            Lag i {leagueData.name}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {leagueData.teams.map((slug) => {
              const teamData = TEAMS_SEO_DATA[slug];
              if (!teamData) return null;
              
              return (
                <Link 
                  key={slug} 
                  href={`/lag/${slug}`} 
                  className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all text-center"
                >
                  <div className="bg-slate-100 rounded-full h-12 w-12 mx-auto mb-3 flex items-center justify-center font-bold text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                    {teamData.name.substring(0,2).toUpperCase()}
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {teamData.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 justify-center">
                  <MapPin className="h-3 w-3" /> 
                  {teamData ? teamData.stadiumName : "Data saknas för detta lag"}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mb-6 flex items-center gap-2">
            <Trophy className="text-amber-500 h-6 w-6" />
            Kommande matcher i ligan
          </h2>
          
          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  onSelect={() => setSelectedMatch(match)} // Ändrad från () => {} till att sätta matchen!
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 text-slate-500 shadow-sm">
              Just nu har vi inga inlagda matcher för {leagueData.name}. Fler matcher kommer inom kort!
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-800">
              <Ticket className="text-indigo-600" /> Biljettinfo för ligan
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {leagueData.aboutTickets}
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-800">
              <Info className="text-amber-500" /> Viktiga tips inför din resa
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {leagueData.ticketTips}
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* JÄMFÖRELSEFÖNSTER (Öppnas när man klickar på en match i listan) */}
      {selectedMatch && (
        <ComparisonDrawer 
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onBookOffer={(offer: any) => handleBookOffer(offer, bookingQuantity)}
        />
      )}

      {/* BOKNINGSFÖNSTER (Öppnas när man klickar vidare från ComparisonDrawer) */}
      {selectedOffer && (
        <BookingModal 
          match={selectedMatch}
          offer={selectedOffer}
          quantity={bookingQuantity}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}