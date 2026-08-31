"use client";

import React, { useState } from "react";

interface CityBenchmark {
  flightCostSEK: number;
  hotelPerNightSEK: number;
  transportCostSEK: number;
}

interface TotalCostCalculatorProps {
  ticketPriceSEK: number;
  benchmark: CityBenchmark | null;
  cityName: string;
}

export function TotalCostCalculator({
  ticketPriceSEK,
  benchmark,
  cityName,
}: TotalCostCalculatorProps) {
  const [nights, setNights] = useState<number>(2);
  const [persons, setPersons] = useState<number>(1);

  const flight = benchmark?.flightCostSEK || 1200;
  const hotelPerNight = benchmark?.hotelPerNightSEK || 1600;
  const transport = benchmark?.transportCostSEK || 450;

  const totalHotel = hotelPerNight * nights;
  const hotelPerPerson = persons === 2 ? totalHotel / 2 : totalHotel;
  const totalPricePerPerson = ticketPriceSEK + flight + hotelPerPerson + transport;

  const encodedCity = encodeURIComponent(cityName.split(",")[0].trim());
  const flightSearchUrl = `https://www.google.com/travel/flights?q=flyg+till+${encodedCity}`;
  const hotelSearchUrl = `https://www.google.com/travel/hotels/${encodedCity}`;

  return (
    <div className="space-y-3 text-slate-800 text-xs">
      {/* Kompakt rad för filter (nätter & resenärer bredvid varandra) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-slate-600">Nätter:</span>
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

        <div className="flex items-center justify-between gap-2">
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

      {/* Prisdetaljer i en ren rad-struktur */}
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

      {/* Total och sökknappar i en kompakt bottenrad */}
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
  );
}