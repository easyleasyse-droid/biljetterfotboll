// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MatchList from "./components/MatchList";
import ComparisonDrawer from "./components/ComparisonDrawer";
import BookingModal from "./components/BookingModal";
import Benefits from "./components/Benefits";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Link from "next/link";
import { TEAMS_SEO_DATA } from "./data/teams";
import { Filter, Trophy, MapPin, Loader2 } from "lucide-react";

// Nyckelord för storklubbar som lyfter en match
const TOP_CLUBS = [
  "Real Madrid", "Barcelona", "Atlético Madrid", "Atletico", 
  "Bayern", "PSG", "Paris", "Inter", "Milan", "Juventus", 
  "Liverpool", "Arsenal", "Manchester City", "Man City", 
  "Chelsea", "Tottenham", "Dortmund"
];

// Poängsystem för att räkna ut matchhetta
function getMatchHotnessScore(match) {
  let score = 0;

  // 1. Manuell utvald match (högst prioritet)
  if (match.featured) score += 100;

  // 2. Champions League får extrapoäng
  if (match.league === "Champions League") score += 50;

  const homeName = (match.homeTeam?.name || "").toLowerCase();
  const awayName = (match.awayTeam?.name || "").toLowerCase();

  const isHomeTop = TOP_CLUBS.some((club) => homeName.includes(club.toLowerCase()));
  const isAwayTop = TOP_CLUBS.some((club) => awayName.includes(club.toLowerCase()));

  // 3. Poäng per storklubb (25p för ett storlag, 50p om BÅDA är storlag)
  if (isHomeTop) score += 25;
  if (isAwayTop) score += 25;

  return score;
}

export default function HomePage() {
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [bookingQuantity, setBookingQuantity] = useState(2);
  const [visibleCount, setVisibleCount] = useState<number>(15);

  useEffect(() => {
    async function fetchLiveMatches() {
      try {
        const res = await fetch("/api/matches");
        if (res.ok) {
          const data = await res.json();
          setMatchesData(data);
        }
      } catch (err) {
        console.error("Kunde inte ladda live-matcher:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveMatches();
  }, []);

  const teamSlugs = TEAMS_SEO_DATA ? Object.keys(TEAMS_SEO_DATA) : [];

  const filteredMatches = matchesData.filter((match) => {
    if (selectedLeague && match.league !== selectedLeague) {
      return false;
    }

    if (searchText) {
      const q = searchText.toLowerCase();
      const matchHome = (match.homeTeam?.name || "").toLowerCase().includes(q);
      const matchAway = (match.awayTeam?.name || "").toLowerCase().includes(q);
      const matchStadium = (match.stadium || "").toLowerCase().includes(q);
      const matchCity = (match.city || "").toLowerCase().includes(q);
      const matchLeague = (match.league || "").toLowerCase().includes(q);

      return matchHome || matchAway || matchStadium || matchCity || matchLeague;
    }

    return true;
  });

  // Sortering: Sortera i första hand på hettapoäng (högst först), därefter datum
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const scoreA = getMatchHotnessScore(a);
    const scoreB = getMatchHotnessScore(b);

    if (scoreA !== scoreB) {
      return scoreB - scoreA; // Högst poäng hamnar överst
    }

    // Om samma hettapoäng, sortera på datum/tid
    const timeA = a.time === "TBD" || !a.time ? "23:59" : a.time;
    const timeB = b.time === "TBD" || !b.time ? "23:59" : b.time;
    return `${a.date} ${timeA}`.localeCompare(`${b.date} ${timeB}`);
  }).slice(0, visibleCount);

  const handleSearchFocus = () => {
    const searchInput = document.getElementById("hero-main-search");
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSelectLeague = (league) => {
    setSelectedLeague(league);
    setTimeout(() => {
      const targetSec = document.getElementById("upcoming-matches");
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedLeague(null);
  };

  const handleBookOffer = (offer, qty) => {
    setBookingQuantity(qty);
    setSelectedOffer(offer);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-slate-100 antialiased">
      
      <Header 
        onSearchFocus={handleSearchFocus}
        selectedLeague={selectedLeague}
        onSelectLeague={handleSelectLeague}
      />

      <Hero
        searchText={searchText}
        setSearchText={setSearchText}
        matches={matchesData}
        onSelectMatch={handleSelectMatch}
        onClearFilters={handleClearFilters}
        onSelectLeague={(league) => handleSelectLeague(league)}
        selectedLeague={selectedLeague}
      />

      {(searchText || selectedLeague) && (
        <div className="bg-slate-50 border-b border-slate-200 text-slate-800 py-3.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>
                Visar <strong className="text-blue-900 font-black">{sortedMatches.length}</strong> matcher 
                {searchText && <span> för sökningen "{searchText}"</span>}
                {selectedLeague && <span> i <span className="text-blue-600 font-extrabold">{selectedLeague}</span></span>}
              </span>
            </div>
            
            <button
              onClick={handleClearFilters}
              className="text-blue-800 hover:text-blue-600 font-black underline transition-colors cursor-pointer uppercase tracking-wider text-[10px]"
            >
              Visa samtliga toppmatcher
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Hämtar dagens hetaste toppmatcher live...</p>
        </div>
      ) : (
        <>
          <MatchList
            matches={sortedMatches.slice(0, visibleCount)}
            onSelectMatch={handleSelectMatch}
            selectedLeague={selectedLeague}
          />
          {sortedMatches.length > visibleCount && (
            <div className="text-center mt-8 mb-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + 15)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Visa fler matcher ({sortedMatches.length - visibleCount} kvar)
              </button>
            </div>
          )}
        </>
      )}

      <section className="bg-slate-50 border-t border-b border-slate-200 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 mb-8 flex items-center gap-2">
            <Trophy className="text-indigo-600 h-6 w-6" />
            Sök biljetter per lag
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {teamSlugs.map((slug) => {
              const teamData = TEAMS_SEO_DATA[slug];
              if (!teamData) return null;

              const logoUrl = teamData.logo || teamData.image || teamData.crestUrl;

              return (
                <Link 
                  key={slug} 
                  href={`/lag/${slug}`} 
                  className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all text-center flex flex-col justify-center items-center"
                >
                  <div className="mb-3 h-12 w-12 flex items-center justify-center">
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={teamData.name} 
                        className="h-10 w-10 object-contain transform group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    <div 
                      className="bg-slate-100 rounded-full h-10 w-10 flex items-center justify-center font-bold text-indigo-600 group-hover:bg-indigo-50 transition-colors text-sm"
                      style={{ display: logoUrl ? 'none' : 'flex' }}
                    >
                      {teamData.name ? teamData.name.substring(0, 2).toUpperCase() : "FC"}
                    </div>
                  </div>

                  <h3 className="font-bold text-xs text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {teamData.name || slug}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-0.5 line-clamp-1">
                    <MapPin className="h-2.5 w-2.5" /> 
                    {teamData.stadiumName || "Arena"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Benefits />
      <Faq />
      <Footer />

      {selectedMatch && (
        <ComparisonDrawer
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onBookOffer={handleBookOffer}
        />
      )}

      {selectedOffer && selectedMatch && (
        <BookingModal
          match={selectedMatch}
          offer={selectedOffer}
          quantity={bookingQuantity}
          onClose={() => {
            setSelectedOffer(null);
            setSelectedMatch(null);
          }}
        />
      )}
      {/* FAQ JSON-LD för AI-sökmotorer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Vad kostar en fotbollsresa i Europa totalt?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "En typisk fotbollsresa till Premier League eller La Liga kostar oftast mellan 3 500 SEK och 8 000 SEK per person. Detta inkluderar matchbiljett, 2 nätters boende på hotell, flyg tur och retur samt lokal transport."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hur hittar man billiga fotbollsbiljetter säkert?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Genom att jämföra priser från verifierade biljettaktörer och partners på biljetterfotboll.se kan du enkelt hitta det lägsta tillgängliga priset för din valda match utan att riskera ogiltiga biljetter."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Vad ingår i totalkostnaden för en fotbollsresa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Utöver själva matchbiljetten består den totala reskalkylen av tur-och-returflyg, hotellnätter samt lokal kollektivtrafik eller taxi till och från arenan och flygplatsen."
                  }
                }
              ]
            })
          }}
        />
      </div>
    );
  }