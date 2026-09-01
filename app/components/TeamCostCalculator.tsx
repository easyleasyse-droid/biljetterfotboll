"use client";

import React, { useState } from "react";
import { getCityBenchmark } from "@/lib/cityBenchmarks";
import { TEAMS_SEO_DATA } from "../data/teams";

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

function resolveMatchCity(match: Match, defaultCity: string): string {
  // 1. Om matchen redan har en specifik stad angiven
  if (match.cityName) return match.cityName;
  if (match.venueCity) return match.venueCity;
  if (match.location) return match.location;

  // Hämta hemmalagets namn
  const homeName =
    typeof match.homeTeam === "string"
      ? match.homeTeam
      : match.homeTeam?.name || "";

  const homeCity =
    typeof match.homeTeam === "object" ? match.homeTeam?.city : undefined;

  if (homeCity) return homeCity;

  // 2. Slå upp hemmalaget dynamiskt i app/data/teams.ts
  if (homeName) {
    const lowerHome = homeName.toLowerCase().trim();

    const teamsArray = Array.isArray(TEAMS_SEO_DATA)
      ? TEAMS_SEO_DATA
      : Object.values(TEAMS_SEO_DATA);

    const foundTeam = teamsArray.find((t: any) => {
      const nameMatch = t.name?.toLowerCase().trim() === lowerHome;
      const idMatch = t.id?.toLowerCase().trim() === lowerHome;
      const titleMatch = t.title?.toLowerCase().trim() === lowerHome;
      return nameMatch || idMatch || titleMatch;
    }) as any;

    if (foundTeam?.location) return foundTeam.location;
    if (foundTeam?.city) return foundTeam.city;
  }

  // 3. Fallback till sidans generella stad
  return defaultCity;
}

function formatMatchDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("sv-SE", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return dateString;
  }
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

  const rawCity = resolveMatchCity(selectedMatch, cityName);
  const cleanCity = rawCity.split(",")[0].trim();

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

  const getMatchTitle = (m: Match) => {
    const hName = typeof m.homeTeam === "string" ? m.homeTeam : m.homeTeam?.name || "";
    const aName = typeof m.awayTeam === "string" ? m.awayTeam : m.awayTeam?.name || "";
    const dateFormatted = formatMatchDate(m.date);
    const datePrefix = dateFormatted ? `${dateFormatted}: ` : "";
    return `${datePrefix}${hName} vs ${aName}`;
  };

  return (
    <div className="my-8 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-5 mb-5">
        <div>
          <span className="inline-block px-2.5 py-0.5 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 rounded-md border border-indigo-100">
            Resebudget-kalkylator
          </span>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            ✈️ Resekalkylator – {cleanCity}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Beräkna uppskattad totalkostnad för fotbollsresan inkl. flyg & boende.
          </p>
        </div>

        <div className="min-w-[300px] bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
          <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">
            Välj match att beräkna för:
          </label>
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full bg-slate-50 text-slate-900 font-semibold text-xs py-2 px-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer truncate"
          >
            {validMatches.map((m, idx) => (
              <option key={m.id || idx} value={idx}>
                {getMatchTitle(m)} ({m.priceFrom?.toLocaleString("sv-SE")} kr)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Antal nätter:</span>
            <div className="flex gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/60">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setNights(n)}
                  className={`px-3 py-1 font-semibold rounded-md text-xs transition-all ${
                    nights === n
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-slate-200" />

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Resenärer:</span>
            <div className="flex gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/60">
              <button
                onClick={() => setPersons(1)}
                className={`px-3 py-1 font-semibold rounded-md text-xs transition-all ${
                  persons === 1
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                1 pers
              </button>
              <button
                onClick={() => setPersons(2)}
                className={`px-3 py-1 font-semibold rounded-md text-xs transition-all ${
                  persons === 2
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                2 pers (delat rum)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/60 rounded-xl p-3 border border-slate-200/50 space-y-2 text-slate-600">
          <div className="flex justify-between items-center">
            <span>Matchbiljett (lägsta pris):</span>
            <span className="font-semibold text-slate-900">{ticketPriceSEK.toLocaleString("sv-SE")} kr</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Flyg t/r (schablon):</span>
            <span className="font-semibold text-slate-900">{flight.toLocaleString("sv-SE")} kr</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Hotell ({nights} {nights === 1 ? "natt" : "nätter"}):</span>
            <span className="font-semibold text-slate-900">{Math.round(hotelPerPerson).toLocaleString("sv-SE")} kr</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Lokal transport (flygplatståg/lokaltrafik):</span>
            <span className="font-semibold text-slate-900">{transport.toLocaleString("sv-SE")} kr</span>
          </div>
        </div>

        <div className="border-t border-slate-200/80 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-slate-500 font-medium text-xs">Totalt per person ca:</span>
            <div className="text-2xl font-black text-indigo-600 tracking-tight">
              {Math.round(totalPricePerPerson).toLocaleString("sv-SE")} kr
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={flightSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-xs hover:shadow flex items-center gap-1.5"
            >
              <span>✈️</span> Sök flyg
            </a>
            <a
              href={hotelSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-xs hover:shadow flex items-center gap-1.5"
            >
              <span>🏨</span> Sök hotell
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}