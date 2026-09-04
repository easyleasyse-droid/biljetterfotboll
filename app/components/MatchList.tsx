// @ts-nocheck
"use client";

import React, { useState } from "react";
import { Match } from "../types";
import { ArrowUpDown, ShieldCheck, HeartHandshake } from "lucide-react";

interface MatchListProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  selectedLeague?: string | null;
  totalMatchesCount?: number;
  visibleCount?: number;
  onShowMore?: () => void;
}

type SortOption = "date" | "price-asc" | "price-desc";

export default function MatchList({ 
  matches, 
  onSelectMatch, 
  selectedLeague,
  totalMatchesCount,
  visibleCount,
  onShowMore
}: MatchListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Sortera matcherna dynamiskt
  const sortedMatches = [...matches].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(`${a.date}T${a.time || "00:00"}`);
      const dateB = new Date(`${b.date}T${b.time || "00:00"}`);
      return dateA.getTime() - dateB.getTime();
    } else if (sortBy === "price-asc") {
      return (a.priceFrom || 0) - (b.priceFrom || 0);
    } else if (sortBy === "price-desc") {
      return (b.priceFrom || 0) - (a.priceFrom || 0);
    }
    return 0;
  });

  const remainingCount = (totalMatchesCount || 0) - (visibleCount || 0);

  return (
    <section className="bg-white py-12 px-4 md:px-8 rounded-2xl border border-slate-200 shadow-sm" id="upcoming-matches">
      <div className="max-w-7xl mx-auto">
        
        {/* Sektionens Header & Sortering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-600 font-black text-xs uppercase tracking-[0.25em] mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>Exklusivt urval</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {selectedLeague ? `Matcher i ${selectedLeague}` : "Kommande matcher"}
            </h3>
          </div>

          {/* Sorteringsmeny */}
          <div className="flex items-center gap-2.5 self-start md:self-auto bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm text-slate-800 font-bold">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs font-black uppercase tracking-wider focus:outline-none cursor-pointer pr-1"
            >
              <option value="date">Sortera efter: Datum</option>
              <option value="price-asc">Sortera efter: Billigast först</option>
              <option value="price-desc">Sortera efter: Dyrast först</option>
            </select>
          </div>
        </div>

        {/* LISTVY ISTÄLLET FÖR GRID */}
        {sortedMatches.length > 0 ? (
          <>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
              {sortedMatches.map((match) => (
                <div 
                  key={match.id || `${match.homeTeam?.name}-${match.awayTeam?.name}-${match.date}`} 
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  {/* DATUM & ARENA */}
                  <div className="flex items-center gap-3 min-w-[150px]">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 text-center min-w-[64px]">
                      <span className="block text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
                        {match.date ? new Date(match.date).toLocaleDateString('sv-SE', { month: 'short' }) : ''}
                      </span>
                      <span className="block text-xl font-black text-slate-900 leading-none mt-0.5">
                        {match.date ? new Date(match.date).getDate() : ''}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      <div className="font-bold text-slate-700">{match.time || "TBD"}</div>
                      <div className="truncate max-w-[130px]">{match.stadium || "Arena"}</div>
                    </div>
                  </div>

                  {/* LAGEN & LOGGOR */}
                  <div className="flex items-center justify-start md:justify-center gap-3 flex-1">
                    {/* Hemmalag */}
                    <div className="flex items-center gap-2.5 w-[42%] justify-end text-right">
                      <span className="font-bold text-sm md:text-base text-slate-800 truncate">
                        {match.homeTeam?.name}
                      </span>
                      {match.homeTeam?.logo ? (
                        <img 
                          src={match.homeTeam.logo} 
                          alt="" 
                          className="h-7 w-7 object-contain shrink-0" 
                          onError={(e) => { e.target.style.display = 'none'; }} 
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600 shrink-0">
                          {match.homeTeam?.shortName || match.homeTeam?.name?.substring(0, 3)}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-2 py-1 rounded-md shrink-0">
                      VS
                    </span>

                    {/* Bortalag */}
                    <div className="flex items-center gap-2.5 w-[42%] justify-start text-left">
                      {match.awayTeam?.logo ? (
                        <img 
                          src={match.awayTeam.logo} 
                          alt="" 
                          className="h-7 w-7 object-contain shrink-0" 
                          onError={(e) => { e.target.style.display = 'none'; }} 
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600 shrink-0">
                          {match.awayTeam?.shortName || match.awayTeam?.name?.substring(0, 3)}
                        </div>
                      )}
                      <span className="font-bold text-sm md:text-base text-slate-800 truncate">
                        {match.awayTeam?.name}
                      </span>
                    </div>
                  </div>

                  {/* PRIS & KNAPP */}
                  <div className="flex items-center justify-between md:justify-end gap-4 min-w-[180px] pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pris från</span>
                      <span className="text-base md:text-lg font-black text-slate-900">
                        {match.priceFrom ? `${match.priceFrom} kr` : 'Jämför'}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => onSelectMatch(match)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm active:scale-95"
                    >
                      Jämför
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* KNAPPEN LIGGER NU HÄR – OVANFÖR KÖPGARANTIN */}
            {onShowMore && remainingCount > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={onShowMore}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Visa fler matcher ({remainingCount} kvar)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center text-slate-500 max-w-md mx-auto shadow-sm">
            <p className="font-black text-slate-800 text-base mb-1.5 uppercase tracking-wide">Inga matcher tillgängliga</p>
            <p className="text-sm font-semibold">Tyvärr matchar inget din nuvarande sökning eller det valda ligafiltret.</p>
          </div>
        )}

        {/* Förtroendesektion längst ned */}
        <div className="mt-10 border border-slate-200 bg-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left select-none shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-indigo-600 shadow-sm">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">Priser i realtid</p>
              <p className="text-xs text-slate-500 font-medium">Priser uppdateras automatiskt från våra partners.</p>
            </div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-slate-200"></div>
          <div className="flex items-center gap-3.5">
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-indigo-600 shadow-sm">
              <HeartHandshake className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">100% Köpargaranti</p>
              <p className="text-xs text-slate-500 font-medium">Alla biljetter är certifierade och garanteras för inträde.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}