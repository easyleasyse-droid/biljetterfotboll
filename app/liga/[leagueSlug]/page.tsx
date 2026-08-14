// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ComparisonDrawer from "../../components/ComparisonDrawer";
import BookingModal from "../../components/BookingModal";
import { TEAMS_SEO_DATA } from "../../data/teams";
import { Trophy, Ticket, Info, MapPin, ChevronRight, Loader2, Calendar } from "lucide-react";

export default function TeamPage() {
  const params = useParams();
  const rawSlug = params?.teamSlug || "";
  const teamSlug = typeof rawSlug === "string" ? rawSlug.toLowerCase() : "";

  const teamData = TEAMS_SEO_DATA[teamSlug];

  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [bookingQuantity, setBookingQuantity] = useState<number>(2);

  // Hämtar alla matcher från API:et
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

  if (!teamData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Laget hittades inte</h1>
          <p className="text-slate-600 mb-6">Vi kunde inte hitta laget: "{rawSlug}"</p>
          <Link href="/" className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold">
            Gå till startsidan
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Filtrerar fram matcher där detta lag spelar (antingen som hemmalag eller bortalag)
  const filteredMatches = matches.filter((match) => {
    const homeName = match.homeTeam?.name?.toLowerCase() || "";
    const awayName = match.awayTeam?.name?.toLowerCase() || "";
    const currentTeamName = (teamData.name || "").toLowerCase();

    return (
      homeName.includes(currentTeamName) ||
      awayName.includes(currentTeamName) ||
      currentTeamName.includes(homeName) ||
      currentTeamName.includes(awayName)
    );
  });

  const handleBookOffer = (offer: any, quantity: number) => {
    setSelectedOffer(offer);
    setBookingQuantity(quantity);
  };

  const logoUrl = teamData.logo || teamData.image || teamData.crestUrl;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />

      {/* HERO SECTION */}
      <div className="bg-slate-950 text-white py-14 md:py-16 px-4 shadow-lg bg-gradient-to-br from-slate-900 to-indigo-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          
          {logoUrl ? (
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 shrink-0">
              <img 
                src={logoUrl} 
                alt={teamData.name} 
                className="h-20 w-20 md:h-24 md:w-24 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ) : null}

          <div className="text-center md:text-left flex-1">
            <div className="text-xs md:text-sm text-slate-400 mb-3 flex items-center justify-center md:justify-start gap-2 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Hem</Link> 
              <ChevronRight className="h-3 w-3 text-slate-600" /> 
              <span className="text-indigo-400 font-bold">{teamData.name}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-white">
              Biljetter till {teamData.name}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs md:text-sm text-slate-300 mb-4">
              <span className="bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-amber-400" />
                {teamData.league || "Liga"}
              </span>
              <span className="bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                {teamData.stadiumName || "Arena"} ({teamData.location || "Plats"})
              </span>
            </div>

            {teamData.description && (
              <p className="text-slate-300 max-w-3xl text-sm md:text-base leading-relaxed">
                {teamData.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        
        {/* KOMMANDE MATCHER - LISTVY */}
        <section className="mb-14">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mb-6 flex items-center gap-2">
            <Calendar className="text-indigo-600 h-6 w-6" />
            Kommande matcher för {teamData.name}
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
              Just nu har vi inga inlagda matcher för {teamData.name}. Fler matcher läggs till löpande!
            </div>
          )}
        </section>

        {/* INFO SEKTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-800">
              <Ticket className="text-indigo-600" /> Biljetter till {teamData.name}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Vi jämför biljetter för {teamData.name}s alla matcher både hemma på {teamData.stadiumName || "arenan"} och på bortaplan. Hitta lägsta priset från pålitliga biljettförsäljare.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-800">
              <Info className="text-amber-500" /> Arenainformation
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {teamData.name} spelar sina hemmamatcher på {teamData.stadiumName || "sin hemmaarena"} i {teamData.location || "staden"}. Se till att boka dina biljetter i god tid inför populära matcher.
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