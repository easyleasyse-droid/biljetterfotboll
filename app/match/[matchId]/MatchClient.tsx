"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ComparisonDrawer from "../../components/ComparisonDrawer";
import TeamBadge from "../../components/TeamBadge";
import { TEAMS_SEO_DATA } from "../../data/teams";
import { Calendar, MapPin } from "lucide-react";

interface MatchClientProps {
  match: any;
}

export default function MatchClient({ match }: MatchClientProps) {
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);

  const homeTeam = TEAMS_SEO_DATA[match.homeKey] || { name: match.homeKey, slug: match.homeKey };
  const awayTeam = TEAMS_SEO_DATA[match.awayKey] || { name: match.awayKey, slug: match.awayKey };

  const fullMatchData = {
    ...match,
    homeTeam,
    awayTeam,
    league: match.league || "Fotboll",
    stadium: match.stadium || homeTeam.stadiumName || "Arena",
    city: match.city || homeTeam.city || "",
    priceFrom: match.priceFrom || 499
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              {match.league || "Match"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-6 my-8">
            <div className="flex-1 flex flex-col items-center text-center">
              <TeamBadge team={match.homeKey} />
              <h2 className="text-xl font-black text-slate-900 mt-3">{homeTeam.name}</h2>
              <span className="text-xs font-bold text-slate-400 uppercase">Hemma</span>
            </div>

            <div className="text-slate-300 font-black text-xl">VS</div>

            <div className="flex-1 flex flex-col items-center text-center">
              <TeamBadge team={match.awayKey} />
              <h2 className="text-xl font-black text-slate-900 mt-3">{awayTeam.name}</h2>
              <span className="text-xs font-bold text-slate-400 uppercase">Borta</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600">
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Datum & Tid</p>
                <p className="font-extrabold text-slate-800">{match.date} • Kl. {match.time || "19:00"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Arena</p>
                <p className="font-extrabold text-slate-800 truncate">{fullMatchData.stadium}, {fullMatchData.city}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-black text-slate-400 tracking-wider">Pris från</p>
              <p className="text-2xl font-black text-indigo-600">
                {fullMatchData.priceFrom} <span className="text-sm font-bold text-slate-500">kr</span>
              </p>
            </div>

            <button
              onClick={() => setSelectedMatch(fullMatchData)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer active:scale-95"
            >
              Jämför biljetter
            </button>
          </div>
        </div>
      </main>

      <ComparisonDrawer
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
        onBookOffer={(offer) => {
          if (offer?.url) {
            window.open(offer.url, "_blank");
          }
        }}
      />

      <Footer />
    </div>
  );
}