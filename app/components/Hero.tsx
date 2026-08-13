import React, { useState, useRef, useEffect } from "react";
import { Search, Trophy, MapPin, X, Flame, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Match } from "../types";
import { TEAMS_SEO_DATA } from "../data/teams";

interface HeroProps {
  searchText: string;
  setSearchText: (text: string) => void;
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  onClearFilters: () => void;
  onSelectLeague: (league: "Premier League" | "La Liga" | "Champions League" | "Serie A" | "Allsvenskan" | null) => void;
  selectedLeague: string | null;
}

export default function Hero({
  searchText,
  setSearchText,
  matches,
  onSelectMatch,
  onClearFilters,
  onSelectLeague,
  selectedLeague,
}: HeroProps) {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const teamKeys = TEAMS_SEO_DATA ? Object.keys(TEAMS_SEO_DATA) : [];
  const query = searchText.toLowerCase().trim();

  // Begränsa till max 2 lagsidor så att matcherna får plats direkt
  const matchingTeams = query
    ? teamKeys
        .map((slug) => ({ slug, ...TEAMS_SEO_DATA[slug] }))
        .filter((team) => {
          const nameMatch = (team.name || "").toLowerCase().includes(query);
          const stadiumMatch = (team.stadiumName || "").toLowerCase().includes(query);
          const locationMatch = (team.location || "").toLowerCase().includes(query);
          return nameMatch || stadiumMatch || locationMatch;
        })
        .slice(0, 2)
    : [];

  const suggestions = query
    ? matches.filter((m) => {
        return (
          (m.homeTeam?.name || "").toLowerCase().includes(query) ||
          (m.awayTeam?.name || "").toLowerCase().includes(query) ||
          (m.league || "").toLowerCase().includes(query) ||
          (m.city || "").toLowerCase().includes(query) ||
          (m.stadium || "").toLowerCase().includes(query)
        );
      }).slice(0, 8)
    : [];

  const hasResults = matchingTeams.length > 0 || suggestions.length > 0;

  const popularSearches = [
    { label: "El Clásico", query: "FC Barcelona" },
    { label: "Premier League", query: "Premier League" },
    { label: "Allsvenskan derby", query: "Hammarby" },
    { label: "Champions League", query: "Champions League" },
  ];

  return (
    <section className="relative bg-slate-50 text-slate-900 py-16 px-4 md:py-24 border-b border-slate-200 overflow-hidden">
      
      {/* 🖼️ BAKGRUNDSBILD - Synligare mönster av stadium */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-12 mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Ljus overlay för att dämpa bilden och behålla det ljusa temat */}
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />

      {/* Existerande bakgrundsljus (gradients) */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10" id="hero-section">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-smbackdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Svensk biljettjämförelse för sportevenemang</span>
        </div>

        {/* ✅ Ny korrekt rubrik */}
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-blue-900 leading-[0.95] tracking-tight mb-6 max-w-3xl mx-auto">
          Hitta de billigaste <br />
          <span className="text-blue-600">fotbollsbiljetterna</span>
        </h2>
        <p className="text-slate-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
          Vi jämför priser från över 50 auktoriserade återförsäljare så att du alltid får bäst deal på marknaden.
        </p>

        <div className="max-w-2xl mx-auto relative px-1 sm:px-0" ref={dropdownRef}>
          <div className="relative flex items-center bg-white border border-slate-200 hover:border-slate-350 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/5 rounded-2xl transition-all duration-200 shadow-xl shadow-blue-900/10 p-1.5 z-20">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5 text-blue-900" />
            </div>

            <input
              type="text"
              placeholder="Sök lag, liga eller arena..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setIsFocused(true);
              }}
              onFocus={() => setIsFocused(true)}
              className="w-full bg-transparent text-slate-900 placeholder-slate-450 text-sm sm:text-base py-3 px-3 focus:outline-none font-bold"
              id="hero-main-search"
            />

            {searchText ? (
              <button
                onClick={() => setSearchText("")}
                className="p-1.5 hover:bg-slate-100 rounded-full mr-2 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                title="Rensa sökning"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              /* ✅ Ny snyggare sökknapp */
              <button 
                onClick={() => setIsFocused(true)}
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-150 uppercase tracking-wider hidden sm:flex items-center gap-2 shadow-md shadow-blue-900/20 cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Sök</span>
              </button>
            )}
          </div>

          {/* 🔍 ✅ AUTOCOMPLETE DROPDOWN - NU MED SCROLL-FUNKTION ÅTERINFÖRD */}
          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 text-left overflow-y-auto max-h-[70vh] divide-y divide-slate-100 text-slate-900">
              {searchText ? (
                hasResults ? (
                  <div className="py-2 bg-white">
                    {matchingTeams.length > 0 && (
                      <div className="mb-2">
                        <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/80">
                          Klubbar & Lagsidor
                        </div>
                        {matchingTeams.map((team) => (
                          <Link
                            key={team.slug}
                            href={`/lag/${team.slug}`}
                            onClick={() => setIsFocused(false)}
                            className="w-full px-4 py-3 hover:bg-blue-50/50 flex items-center justify-between text-xs sm:text-sm transition-colors text-left text-slate-900 group border-b border-slate-50 last:border-none"
                          >
                            <div className="flex items-center gap-2.5">
                              <Trophy className="w-4 h-4 text-indigo-600 shrink-0" />
                              <span className="font-extrabold text-slate-900 group-hover:text-indigo-600">
                                {team.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                                ({team.stadiumName || "Lagsida"})
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-indigo-600 font-bold gap-1 shrink-0">
                              <span>Visa biljetter</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {suggestions.length > 0 && (
                      <div>
                        <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/80">
                          Matcher
                        </div>
                        {suggestions.map((match) => (
                          <button
                            key={match.id}
                            onClick={() => {
                              onSelectMatch(match);
                              setSearchText("");
                              setIsFocused(false);
                            }}
                            className="w-full px-4 py-3 hover:bg-blue-50/50 flex items-center justify-between text-xs sm:text-sm transition-colors text-left text-slate-900 cursor-pointer border-b border-slate-50 last:border-none"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base shrink-0">{match.homeTeam?.emoji || "⚽"}</span>
                              <span className="font-extrabold text-blue-900">
                                {match.homeTeam?.name || "Hemmalag"} – {match.awayTeam?.name || "Bortalag"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs shrink-0">
                              {match.league && (
                                <span className="bg-slate-100 text-blue-900 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider hidden sm:inline-block">
                                  {match.league}
                                </span>
                              )}
                              {match.priceFrom && (
                                <span className="font-black text-blue-600">Från {match.priceFrom} kr</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500 text-xs font-semibold bg-white">
                    Inga träffar hittades för <span className="text-blue-900 font-mono font-bold">"{searchText}"</span>.
                  </div>
                )
              ) : (
                <div className="p-4 bg-white">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    Populära sökningar just nu
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((m) => (
                      <button
                        key={m.label}
                        onClick={() => {
                          setSearchText(m.query);
                          setIsFocused(false);
                        }}
                        className="bg-slate-50 hover:bg-slate-100 text-xs text-blue-900 font-bold px-3.5 py-2 rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {m.label === "El Clásico" && <Flame className="w-3.5 h-3.5 text-amber-500" />}
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Snabbval:</span>
          {["Allsvenskan", "Premier League", "La Liga", "Champions League"].map((leagueName) => (
            <button
              key={leagueName}
              onClick={() => {
                onSelectLeague(selectedLeague === leagueName ? null : (leagueName as any));
                setSearchText("");
              }}
              className={`text-xs px-4 py-2 rounded-xl border transition-all duration-150 cursor-pointer font-bold ${
                selectedLeague === leagueName
                  ? "bg-blue-900 border-blue-900 text-white font-extrabold shadow-md shadow-blue-900/10"
                  : "bg-white/70 border-slate-200 text-slate-600 hover:text-blue-900 hover:border-slate-350 backdrop-blur-sm"
              }`}
            >
              {leagueName}
            </button>
          ))}
          {(searchText || selectedLeague) && (
            <button
              onClick={onClearFilters}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-black uppercase tracking-wider px-2.5 py-1.5 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Rensa filter</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}