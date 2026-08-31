"use client";

import React, { useState } from "react";
import { TotalCostCalculator } from "./TotalCostCalculator";
import { getCityBenchmark } from "@/lib/cityBenchmarks";

interface Match {
  id?: string | number;
  homeTeam: { name: string };
  awayTeam: { name: string };
  cityName?: string;
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
  // 1. Filtrera matcher som har ett giltigt pris
  const validMatches = matches.filter(
    (m) => m.priceFrom && m.priceFrom > 0
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  if (validMatches.length === 0) return null;

  const selectedMatch = validMatches[selectedIndex] || validMatches[0];
  const ticketPrice = selectedMatch.priceFrom || 0;
  
  // Använd matchens stad om den finns, annars lagets hemstad
  const currentCity = selectedMatch.cityName || cityName;
  const benchmark = getCityBenchmark(currentCity);

  return (
    <div className="my-10 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            📊 Beräkna totalkostnad för fotbollsresan
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Välj vilken {teamName}-match du vill gå på för att se estimerad totalbudget inkl. flyg, hotell & transport.
          </p>
        </div>

        {/* Dropdown för att välja match */}
        <div className="w-full sm:w-auto min-w-[260px]">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Välj match:
          </label>
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full bg-slate-900 text-white font-medium text-sm py-2.5 px-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {validMatches.map((m, idx) => (
              <option key={m.id || idx} value={idx}>
                {m.homeTeam.name} vs {m.awayTeam.name} ({m.priceFrom?.toLocaleString("sv-SE")} kr)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Själva kalkylatorn med valt matchpris */}
      <TotalCostCalculator
        ticketPriceSEK={ticketPrice}
        benchmark={benchmark}
        cityName={currentCity}
      />
    </div>
  );
}