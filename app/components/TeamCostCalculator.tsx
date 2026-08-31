"use client";

import React, { useState } from "react";
import { getCityBenchmark } from "@/lib/cityBenchmarks";

interface Match {
  id?: string | number;
  homeTeam: { name: string; city?: string } | string;
  awayTeam: { name: string; city?: string } | string;
  cityName?: string;
  location?: string;
  venueCity?: string;
  venue?: string;
  priceFrom?: number;
  date?: string;
}

interface TeamCostCalculatorProps {
  teamName: string;
  cityName: string;
  matches: Match[];
}

// Hjälpfunktion för att tvinga fram rätt spelort utifrån lag och arena om API-data saknas
function resolveMatchCity(match: Match, defaultCity: string): string {
  // 1. Om direkt stadsdata finns på matchen
  if (match.cityName) return match.cityName;
  if (match.venueCity) return match.venueCity;
  if (match.location) return match.location;

  // Hämta hemmalagets namn oavsett om det är ett objekt eller en sträng
  const homeName =
    typeof match.homeTeam === "string"
      ? match.homeTeam
      : match.homeTeam?.name || "";

  const homeCity =
    typeof match.homeTeam === "object" ? match.homeTeam?.city : undefined;

  if (homeCity) return homeCity;

  // 2. Identifiera stad utifrån hemmalagets namn (fångar t.ex. Aston Villa -> Birmingham)
  const lowerHome = homeName.toLowerCase();
  if (lowerHome.includes("aston villa")) return "Birmingham";
  if (lowerHome.includes("birmingham")) return "Birmingham";
  if (lowerHome.includes("manchester")) return "Manchester";
  if (lowerHome.includes("liverpool")) return "Liverpool";
  if (lowerHome.includes("newcastle")) return "Newcastle";
  if (lowerHome.includes("leeds")) return "Leeds";
  if (lowerHome.includes("brighton")) return "Brighton";
  if (lowerHome.includes("southampton")) return "Southampton";
  if (lowerHome.includes("nottingham")) return "Nottingham";
  if (lowerHome.includes("wolves") || lowerHome.includes("wolverhampton")) return "Wolverhampton";
  if (lowerHome.includes("leicester")) return "Leicester";

  // 3. Fallback till sidans generella stad
  return defaultCity;
}

export function TeamCostCalculator({
  teamName,
  cityName,
  matches,
}: TeamCostCalculatorProps) {
  const validMatches = matches.filter((m) => m.priceFrom && m.priceFrom > 0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [nights, setNights] = useState<number>(2);
  const [persons, setPersons] = useState<number>(1);

  if (validMatches.length === 0) return null;

  const selectedMatch = validMatches[selectedIndex] || validMatches[0];
  const ticketPriceSEK = selectedMatch.priceFrom || 0;

  // Hitta den garanterat korrekta spelorten
  const rawCity = resolveMatchCity(selectedMatch, cityName);
  const cleanCity = rawCity.split(",")[0].trim();

  // Hämta samma benchmark som biljettsidan
  const benchmark: any = getCityBenchmark(cleanCity);

  const flight = benchmark?.flightEstimateSEK || 1200;
  const hotelPerNight = benchmark?.hotelPerNightSEK || 1600;
  const transport = benchmark?.transitSEK || benchmark?.transportCostSEK || 450;

  const totalHotel = hotelPerNight * nights;
  const hotelPerPerson = persons === 2 ? totalHotel / 2 : totalHotel;
  const totalPricePerPerson = ticketPriceSEK + flight + hotelPerPerson + transport;

  const encodedCity = encodeURIComponent(cleanCity);
  const flightSearchUrl = `https://www.google.com/travel/flights?q=flyg+till+${encodedCity}`;
  const hotelSearchUrl = `https://www.google.com/travel/hotels/${encodedCity}`;

  // Snygg namnhantering för drop-down menyn
  const getMatchTitle = (m: Match) => {
    const hName = typeof m.homeTeam === "string" ? m.homeTeam : m.homeTeam?.name || "";
    const aName = typeof m.awayTeam === "string" ? m.awayTeam : m.awayTeam?.name || "";
    return `${hName} vs ${aName}`;
  };

  return (
    <div className="my-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-slate-800">
      {/* Header med matchväljare */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            ✈️ Resekalkylator – {cleanCity}
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
                {getMatchTitle(m)} ({m.priceFrom?.toLocaleString("sv-SE")} kr)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {/* Kompakt rad med knapparna */}
        <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          
          {/* Nätter */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Antal nätter:</span>
            <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setNights(n)}
                  className={`px-2.5 py-1 font-semibold rounded-md transition-all ${
                    nights === n ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Resenärer */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Resenärer:</span>
            <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setPersons(1)}
                className={`px-2.5 py-1 font-semibold rounded-md transition-all ${
                  persons === 1 ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                1 pers
              </button>
              <button
                onClick={() => setPersons(2)}
                className={`px-2.5 py-1 font-semibold rounded-md transition-all ${
                  persons === 2 ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                2 pers (delat)
              </button>
            </div>
          </div>

        </div>

        {/* Prisdetaljer */}
        <div className="px-1 py-1 space-y-1.5 text-slate-600">
          <div className="flex justify-between">
            <span>Matchbiljett:</span>
            <span className="font-semibold text-slate-900">{ticketPriceSEK.toLocaleString("sv-SE")} kr</span>
          </div>
          <div className="flex justify-between">
            <span>Flyg t/r (schablon):</span>
            <span className="font-semibold text-slate-900">{flight.toLocaleString("sv-SE")} kr</span>
          </div>
          <div className="flex justify-between">
            <span>Hotell ({nights} {nights === 1 ? "natt" : "nätter"}):</span>
            <span className="font-semibold text-slate-900">{Math.round(hotelPerPerson).toLocaleString("sv-SE")} kr</span>
          </div>
          <div className="flex justify-between">
            <span>Lokal transport:</span>
            <span className="font-semibold text-slate-900">{transport.toLocaleString("sv-SE")} kr</span>
          </div>
        </div>

        {/* Total och sökknappar */}
        <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-medium">Totalt per person:</span>
            <div className="text-xl font-extrabold text-indigo-600">
              {Math.round(totalPricePerPerson).toLocaleString("sv-SE")} kr
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={flightSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              ✈️ Sök flyg
            </a>
            <a
              href={hotelSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              🏨 Sök hotell
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}