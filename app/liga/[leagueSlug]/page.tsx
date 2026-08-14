// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ComparisonDrawer from "../../components/ComparisonDrawer";
import BookingModal from "../../components/BookingModal";
import { LEAGUES_DATA } from "../../data/leagues";
import { TEAMS_SEO_DATA } from "../../data/teams";
import { Trophy, Globe, Ticket, Info, ShieldCheck, MapPin, ChevronRight, Loader2 } from "lucide-react";

export default function LeaguePage() {
  const params = useParams();
  const rawSlug = params?.leagueSlug || params?.slug || "";
  const leagueSlug = typeof rawSlug === "string" ? rawSlug.toLowerCase() : "";
  
  const leagueData = LEAGUES_DATA[leagueSlug];

  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [bookingQuantity, setBookingQuantity] = useState<number>(2);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const res = await fetch("/api/matches");
        if (res.ok) {
          const data = await res.json();
          setMatches(data);
        }
      } catch (err) {
        console.error("Kunde inte hämta matcher:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

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

  const filteredMatches = matches.filter((match) => {
    if (!match.league) return false;
    
    const matchLeague = match.league.trim().toLowerCase();
    const targetLeague = leagueData.name.trim().toLowerCase();

    return (
      matchLeague === targetLeague ||
      matchLeague.includes(targetLeague) ||
      targetLeague.includes(matchLeague)
    );
  });

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
        
        {/* LAG I LIGAN */}
        <section className="mb-14">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mb-6 flex items-center gap-2">
            <ShieldCheck className="text-indigo-600 h-6 w-6" />
            Lag i {leagueData.name}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {leagueData.teams && leagueData.teams.map((slug) => {
              const teamData = TEAMS_SEO_DATA[slug];
              if (!teamData) return null;
              
              const logoUrl = teamData.logo || teamData.image || teamData.crestUrl;

              return (
                <Link 
                  key={slug} 
                  href={`/lag/${slug}`} 
                  className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all text-center flex flex-col items-center justify-between min-h-[160px]"
                >
                  <div className="mb-2 h-14 w-14 flex items-center justify-center">
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={teamData.name || "Laglogo"} 
                        className="h-12 w-12 object-contain transform group-hover:scale-110 transition-transform"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="bg-slate-100 rounded-full h-12 w-12 flex items-center justify-center font-bold text-indigo-600 text-sm">
                        {teamData.name ? teamData.name.substring(0, 2).toUpperCase() : "FC"}
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {teamData.name || slug}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 justify-center line-clamp-1">
                      <MapPin className="h-3 w-3 shrink-0" /> 
                      {teamData.stadiumName || "Arena"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* KOMMANDE MATCHER - LISTVY */}
        <section className="mb-14">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mb-6 flex items-center gap-2">
            <Trophy className="text-amber-500 h-6 w-6" />
            Kommande matcher i ligan
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12 text-slate-500 gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
              <span>Hämtar matcher...</span>
            </div>
          ) : filteredMatches.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
              {filteredMatches.map((match) => (
                <div 
                  key={match.id} 
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  {/* DATUM & ARENA */}
                  <div className="flex items-center gap-3 min-w-[150px]">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 text-center min-w-[64px]">
                      <span className="block text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
                        {new Date(match.date).toLocaleDateString('sv-SE', { month: 'short' })}
                      </span>
                      <span className="block text-xl font-black text-slate-900 leading-none mt-0.5">
                        {new Date(match.date).getDate()}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      <div className="font-bold text-slate-700">{match.time}</div>
                      <div className="truncate max-w-[130px]">{match.stadium}</div>
                    </div>
                  </div>

                  {/* LAGEN & LOGGOR */}
                  <div className="flex items-center justify-start md:justify-center gap-3 flex-1">
                    <div className="flex items-center gap-2.5 w-[42%] justify-end text-right">
                      <span className="font-bold text-sm md:text-base text-slate-800 truncate">{match.homeTeam.name}</span>
                      {match.homeTeam.logo ? (
                        <img src={match.homeTeam.logo} alt="" className="h-7 w-7 object-contain shrink-0" onError={(e) => e.target.style.display = 'none'} />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600 shrink-0">
                          {match.homeTeam.shortName}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-2 py-1 rounded-md shrink-0">VS</span>

                    <div className="flex items-center gap-2.5 w-[42%] justify-start text-left">
                      {match.awayTeam.logo ? (
                        <img src={match.awayTeam.logo} alt="" className="h-7 w-7 object-contain shrink-0" onError={(e) => e.target.style.display = 'none'} />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600 shrink-0">
                          {match.awayTeam.shortName}
                        </div>
                      )}
                      <span className="font-bold text-sm md:text-base text-slate-800 truncate">{match.awayTeam.name}</span>
                    </div>
                  </div>

                  {/* PRIS & KNAPP */}
                  <div className="flex items-center justify-between md:justify-end gap-4 min-w-[180px] pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pris från</span>
                      <span className="text-base md:text-lg font-black text-slate-900">{match.priceFrom} kr</span>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedMatch(match)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm active:scale-95"
                    >
                      Jämför
                    </button>
                  </div>
                </div>
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

      {selectedMatch && (
        <ComparisonDrawer 
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onBookOffer={(offer: any) => handleBookOffer(offer, bookingQuantity)}
        />
      )}

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