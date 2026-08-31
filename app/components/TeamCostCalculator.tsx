"use client";

import React, { useState } from "react";
import { TotalCostCalculator } from "./TotalCostCalculator";
import { getCityBenchmark } from "@/lib/cityBenchmarks";

interface Match {
  id?: string | number;
  homeTeam: { name: string; city?: string };
  awayTeam: { name: string; city?: string };
  cityName?: string;
  location?: string;
  venueCity?: string;
  priceFrom?: number;
  date?: string;
}

interface TeamCostCalculatorProps {
  teamName: string;
  cityName: string;
  matches: Match[];
}

export function TeamCostCalculator({
  teamName,
  cityName,
  matches,
}: TeamCostCalculatorProps) {
  const validMatches = matches.filter((m) => m.priceFrom && m.priceFrom > 0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  if (validMatches.length === 0) return null;

  const selectedMatch = validMatches[selectedIndex] || validMatches[0];
  const ticketPrice = selectedMatch.priceFrom || 0;

  const targetCity =
    selectedMatch.venueCity ||
    selectedMatch.cityName ||
    selectedMatch.location ||
    selectedMatch.homeTeam?.city ||
    cityName;

  const benchmark = getCityBenchmark(targetCity);

  return (
    <div className="my-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      {/* Tajtare header med integrerad dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            ✈️ Resekalkylator – {targetCity}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Beräkna uppskattad totalkostnad för fotbollsresan inkl. flyg & boende.
          </p>
        </div>

        <div className="min-w-[250px]">
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full bg-slate-50 text-slate-800 font-semibold text-xs py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 cursor-pointer"
          >
            {validMatches.map((m, idx) => (
              <option key={m.id || idx} value={idx}>
                {m.homeTeam.name} vs {m.awayTeam.name} ({m.priceFrom?.toLocaleString("sv-SE")} kr)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kalkylatorn */}
      <TotalCostCalculator
        ticketPriceSEK={ticketPrice}
        benchmark={benchmark}
        cityName={targetCity}
        theme="light" // Kräver en snabbjustering i TotalCostCalculator om du vill styra temat via prop
      />
    </div>
  );
}