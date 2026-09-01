"use client";

import React, { useState } from "react";
import { CityBenchmark } from "@/lib/cityBenchmarks";

interface TotalCostCalculatorProps {
  ticketPriceSEK: number;
  benchmark: CityBenchmark;
  cityName: string;
}

export function TotalCostCalculator({
  ticketPriceSEK,
  benchmark,
  cityName,
}: TotalCostCalculatorProps) {
  const [nights, setNights] = useState<number>(2);
  const [travelers, setTravelers] = useState<number>(1);

  // Beräkningar
  const hotelTotal = benchmark.hotelPerNightSEK * nights;
  const flightTotal = benchmark.flightEstimateSEK;
  const transitTotal = benchmark.transitSEK;
  const cleanCity = cityName.split(",")[0].trim();
  
  // Totalpris per person (hotell delas på 2 om man är fler än 1 resenär)
  const hotelPerPerson = travelers > 1 ? hotelTotal / 2 : hotelTotal;
  const totalPerPerson = ticketPriceSEK + flightTotal + transitTotal + hotelPerPerson;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-lg my-6">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          ✈️ Resekalkylator – {cityName}
        </h3>
        <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 bg-blue-900/80 px-3 py-1 rounded-full border border-blue-500/40 shadow-sm">
          Estimerat totalpris
        </span>
      </div>

      {/* Interaktiva val */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-slate-400 mb-1 font-medium">
            Antal nätter på hotell
          </label>
          <div className="flex bg-slate-800 rounded-lg p-1">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setNights(n)}
                className={`flex-1 py-1.5 text-xs rounded-md transition-all font-medium ${
                  nights === n
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {n} {n === 1 ? "natt" : "nätter"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1 font-medium">
            Antal resenärer
          </label>
          <div className="flex bg-slate-800 rounded-lg p-1">
            {[1, 2].map((t) => (
              <button
                key={t}
                onClick={() => setTravelers(t)}
                className={`flex-1 py-1.5 text-xs rounded-md transition-all font-medium ${
                  travelers === t
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t === 1 ? "1 pers" : "2 pers (delat rum)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kostnadsspecifikation */}
      <div className="space-y-2 text-sm border-t border-slate-800 pt-4">
        <div className="flex justify-between text-slate-300">
          <span>Matchbiljett (lägsta pris):</span>
          <span className="font-semibold text-white">{ticketPriceSEK.toLocaleString("sv-SE")} kr</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Flyg t/r (schablon):</span>
          <span className="font-semibold text-white">{flightTotal.toLocaleString("sv-SE")} kr</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Hotell ({nights} {nights === 1 ? "natt" : "nätter"}{travelers > 1 ? ", 1/2 rum" : ""}):</span>
          <span className="font-semibold text-white">{Math.round(hotelPerPerson).toLocaleString("sv-SE")} kr</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Lokal transport (flygplatståg/lokaltrafik):</span>
          <span className="font-semibold text-white">{transitTotal.toLocaleString("sv-SE")} kr</span>
        </div>
      </div>

        {/* Totalsumma & Snabblänkar */}
      <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 block font-bold">Totalt per person ca:</span>
          <span className="text-2xl font-black text-emerald-400">
            {Math.round(totalPerPerson).toLocaleString("sv-SE")} kr
          </span>
          <p className="text-[10px] text-slate-500 mt-1 max-w-[280px]">
            *Uppskattad totalkostnad inkl. matchbiljett, boende, flyg &amp; lokal transport.
          </p>
        </div>

        {/* Direktbokning */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://www.google.com/travel/flights?q=flyg+till+${encodeURIComponent(cleanCity)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-xl border border-blue-500 transition-colors flex items-center gap-1.5"
          >
            <span>✈️ Sök flyg</span>
          </a>
          <a
            href={`https://www.booking.com/searchresults.sv.html?ss=${encodeURIComponent(cleanCity)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-xl border border-blue-500 transition-colors flex items-center gap-1.5"
          >
            <span>🏨 Sök hotell</span>
          </a>
      </div>
    </div>

      {/* JSON-LD för AI & Sökmotorer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Totalkalkylator för Fotbollsresor",
            "url": "https://biljetterfotboll.se",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "All",
            "description": "Beräkna den totala kostnaden för din fotbollsresa inklusive biljetter, flyg, hotell och lokal transport i Europa.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "SEK"
            },
            "featureList": [
              "Jämförelse av biljettpriser",
              "Uppskattning av flygkostnader",
              "Beräkning av hotellkostnader per natt",
              "Lokal transportberäkning"
            ]
          })
        }}
      />
    </div>
  );
}