// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link"; // Importera Next.js Link
import { Search, Headphones } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* Top Ticker Bar */}
      <div className="bg-indigo-900 text-white text-[11px] font-bold py-2 px-4 flex flex-wrap justify-between items-center hidden md:flex">
        <div>● JÄMFÖR PRISER FRÅN 50+ VERIFIERADE ÅTERFÖRSÄLJARE</div>
        <div className="flex gap-6">
          <span>✓ 100% GARANTERADE BILJETTER</span>
          <span>🌐 BÄSTA PRISET DIREKT</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-indigo-900 text-white p-2 rounded-lg font-black tracking-tighter text-xl">
            BF
          </div>
          <div>
            <span className="font-black text-xl text-slate-900 tracking-tight block leading-none">
              BILJETTERFOTBOLL<span className="text-indigo-600">.SE</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Sveriges ledande jämförelsesida
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Sök lag, liga eller arena..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Right Side Info & Button */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-right">
            <Headphones className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">KUNDSUPPORT 24/7</p>
              <p className="text-[11px] text-emerald-600 font-medium">● Få hjälp online direkt</p>
            </div>
          </div>
          <button className="bg-indigo-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-indigo-800 transition-colors">
            SÖK NU
          </button>
        </div>
      </div>

      {/* Navigation Bar - HÄR LIGGER FIXEN! */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex gap-6 overflow-x-auto py-3 text-xs font-black tracking-wider text-slate-500 uppercase whitespace-nowrap scrollbar-none">
          
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Alla Matcher
          </Link>
          
          {/* Ändrat från stumma element till riktiga Next.js Links */}
          <Link href="/liga/premier-league" className="hover:text-indigo-600 transition-colors">
            Premier League
          </Link>
          
          <Link href="/liga/la-liga" className="hover:text-indigo-600 transition-colors">
            La Liga
          </Link>

          <Link href="/liga/serie-a" className="hover:text-indigo-600 transition-colors">
            Serie A
          </Link>
          
          <Link href="/liga/champions-league" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            🔥 Champions League
          </Link>

          <Link href="/liga/ligue-1" className="hover:text-indigo-600 transition-colors">
            Ligue 1
          </Link>  

          <Link href="/liga/bundesliga" className="hover:text-indigo-600 transition-colors">
            Bundesliga
          </Link>

          <Link href="/liga/eredivisie" className="hover:text-indigo-600 transition-colors">
            Eredivisie
            </Link>

          <Link href="/liga/allsvenskan" className="hover:text-indigo-600 transition-colors">
            Allsvenskan
          </Link>
          
        </div>
      </div>
    </header>
  );
}