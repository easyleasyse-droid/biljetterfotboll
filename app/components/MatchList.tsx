import React, { useState } from "react";
import { Match } from "../types";
import MatchCard from "./MatchCard";
import { ArrowUpDown, ShieldCheck, HelpCircle, HeartHandshake } from "lucide-react";

interface MatchListProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  selectedLeague: string | null;
}

type SortOption = "date" | "price-asc" | "price-desc";

export default function MatchList({ matches, onSelectMatch, selectedLeague }: MatchListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Sort matches accordingly
  const sortedMatches = [...matches].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    } else if (sortBy === "price-asc") {
      return a.priceFrom - b.priceFrom;
    } else if (sortBy === "price-desc") {
      return b.priceFrom - a.priceFrom;
    }
    return 0;
  });

  return (
    <section className="bg-white py-20 px-4 md:px-8" id="upcoming-matches">
      <div className="max-w-7xl mx-auto">
        {/* Sektionens Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-blue-500 font-black text-xs uppercase tracking-[0.25em] mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Exklusivt urval</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-900 tracking-tight">
              {selectedLeague ? `Matcher i ${selectedLeague}` : "Kommande Toppmatcher"}
            </h3>
            <p className="text-slate-500 text-sm sm:text-base font-semibold mt-2.5 max-w-xl">
              Vi jämför priser från över 50 auktoriserade återförsäljare så att du alltid får bäst deal på marknaden.
            </p>
          </div>

          {/* Sortering och Kontroller */}
          <div className="flex items-center gap-2.5 self-start md:self-auto bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm text-slate-800 font-bold">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs font-black uppercase tracking-wider focus:outline-none cursor-pointer pr-1"
            >
              <option value="date">Sortera efter: Datum</option>
              <option value="price-asc">Sortera efter: Billigast först</option>
              <option value="price-desc">Sortera efter: Lyxigast först</option>
            </select>
          </div>
        </div>

        {/* Matches Grid Layout */}
        {sortedMatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedMatches.map((match) => (
              <MatchCard 
                key={match.id} 
                match={match} 
                onSelect={onSelectMatch} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center text-slate-500 max-w-md mx-auto shadow-sm">
            <p className="font-black text-blue-900 text-base mb-1.5 uppercase tracking-wide">Inga matcher tillgängliga</p>
            <p className="text-sm font-semibold">Tyvärr matchar inget din nuvarande sökning eller det valda ligafiltret.</p>
          </div>
        )}

        {/* Small Trust Snippet row below grid */}
        <div className="mt-16 border border-slate-200 bg-slate-50 rounded-2xl p-6.5 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left select-none shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-blue-600 shadow-sm">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="font-extrabold text-blue-900 text-sm uppercase tracking-wide">Priser i realtid</p>
              <p className="text-xs text-slate-500 font-semibold font-semibold">Priser uppdateras automatiskt varje minut från partners.</p>
            </div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-slate-250"></div>
          <div className="flex items-center gap-3.5">
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-blue-600 shadow-sm">
              <HeartHandshake className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="font-extrabold text-blue-900 text-sm uppercase tracking-wide">100% Köpargaranti</p>
              <p className="text-xs text-slate-500 font-semibold">Alla biljetter är certifierade och garanteras för inträde.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
