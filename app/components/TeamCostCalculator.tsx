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

  // Bestäm rätt stad baserat på var matchen faktiskt spelas
  const targetCity =
    selectedMatch.venueCity ||
    selectedMatch.cityName ||
    selectedMatch.location ||
    selectedMatch.homeTeam?.city ||
    cityName;

  const benchmark = getCityBenchmark(targetCity);

  return (
    <div className="my-8">
      {/* Kompakt header med dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 px-1">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            📊 Beräkna totalkostnad för fotbollsresan
          </h3>
          <p className="text-xs text-slate-500">
            Välj match för att se estimerad resbudget inkl. flyg & boende.
          </p>
        </div>

        <div className="min-w-[240px]">
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full bg-white text-slate-800 font-semibold text-xs py-2 px-3 rounded-xl border border-slate-300 shadow-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {validMatches.map((m, idx) => (
              <option key={m.id || idx} value={idx}>
                {m.homeTeam.name} vs {m.awayTeam.name} ({m.priceFrom?.toLocaleString("sv-SE")} kr)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kalkylatorn i full synlighet utan dubbla svarta ramar */}
      <TotalCostCalculator
        ticketPriceSEK={ticketPrice}
        benchmark={benchmark}
        cityName={targetCity}
      />
    </div>
  );
}