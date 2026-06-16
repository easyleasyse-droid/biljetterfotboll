import React from "react";
import { Match } from "../types";
import TeamBadge from "./TeamBadge";
import { Calendar, MapPin, ChevronRight } from "lucide-react"; // Reensat bort Ticket & ShieldCheck

interface MatchCardProps {
  key?: React.Key;
  match: Match;
  onSelect: (match: Match) => void;
}

export default function MatchCard({ match, onSelect }: MatchCardProps) {
  // Helper to format date into Swedish
  const getSwedishDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const weekdays = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
      const months = [
        "jan",
        "feb",
        "mars",
        "apr",
        "maj",
        "juni",
        "juli",
        "aug",
        "sept",
        "okt",
        "nov",
        "dec"
      ];
      
      const dayName = weekdays[date.getDay()];
      const day = date.getDate();
      const monthName = months[date.getMonth()];
      
      return `${dayName}, ${day} ${monthName}`;
    } catch {
      return dateStr;
    }
  };

  // Determine league color pill
  const getLeagueStyle = (league: string) => {
    switch (league) {
      case "Premier League":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "La Liga":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Champions League":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Serie A":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Allsvenskan":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 border-slate-200 text-slate-700";
    }
  };

  return (
    <div 
      className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
      id={`match-card-${match.id}`}
    >
      {/* Card Header (Enbart Liga kvar nu) */}
      <div className="px-5 py-3.5 bg-white border-b border-slate-150 flex items-center justify-between">
        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${getLeagueStyle(match.league)}`}>
          {match.league}
        </span>
      </div>

      {/* Main Body (Teams comparison) */}
      <div className="p-6 flex-1 flex flex-col justify-center">
        {/* Teams Visual Layout */}
        <div className="flex items-center justify-between gap-4 mb-5">
          {/* Home Team Badge */}
          <div className="flex-1 flex flex-col items-center select-none">
            <TeamBadge team={match.homeTeam} size="md" />
            <span className="text-[9px] font-black text-slate-400 mt-1.5 uppercase tracking-wider">Hemma</span>
          </div>

          {/* Versus Divider */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded">
              VS
            </span>
          </div>

          {/* Away Team Badge */}
          <div className="flex-1 flex flex-col items-center select-none">
            <TeamBadge team={match.awayTeam} size="md" />
            <span className="text-[9px] font-black text-slate-400 mt-1.5 uppercase tracking-wider">Borta</span>
          </div>
        </div>

        {/* Text Matchup Header */}
        <h4 className="text-lg font-black text-blue-900 mb-2.5 tracking-tight text-center truncate">
          {match.homeTeam.name} <span className="text-slate-350">vs</span> {match.awayTeam.name}
        </h4>

        {/* Stadium & City details */}
        <div className="space-y-1.5 border-t border-slate-150 pt-4 text-slate-600">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{getSwedishDate(match.date)} • Kl. {match.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{match.stadium}, {match.city}</span>
          </div>
        </div>
      </div>

      {/* Card Footer (Price & CTA Button) */}
      <div className="p-5 border-t border-slate-150 bg-white flex items-center justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase font-black tracking-widest text-slate-400">Pris från</p>
          <p className="text-xl font-black text-blue-900 tracking-tighter">
            {match.priceFrom} <span className="text-xs font-bold text-slate-500">kr</span>
          </p>
        </div>

        <button
          onClick={() => onSelect(match)}
          className="flex-1 max-w-[140px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-xs uppercase tracking-widest py-3 px-3 rounded-xl transition-all duration-150 cursor-pointer shadow-md shadow-blue-600/15 flex items-center justify-center gap-1 group-hover:translate-x-0.5"
          id={`btn-buy-${match.id}`}
        >
          <span>Köp</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}