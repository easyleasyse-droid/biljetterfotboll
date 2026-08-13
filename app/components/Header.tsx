// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { Ticket, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* Top Ticker Bar */}
      <div className="bg-indigo-900 text-white text-[11px] font-bold py-2 px-4 flex flex-wrap justify-between items-center hidden md:flex">
        <div>● JÄMFÖR PRISER FRÅN VERIFIERADE ÅTERFÖRSÄLJARE</div>
        <div className="flex gap-6">
          <span>✓ SMIDIG JÄMFÖRELSE</span>
          <span>🌐 BÄSTA PRISET DIREKT</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo / Brand Name */}
        <Link 
          href="/"
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          id="brand-logo"
        >
          <div className="w-9 h-9 bg-blue-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105 duration-200 shadow-md shadow-blue-950/20">
            <Ticket className="w-5 h-5 rotate-12" />
          </div>
          <div>
            <h1 className="font-black text-xl sm:text-2xl tracking-tighter text-blue-900 uppercase">
              biljetterfotboll<span className="text-blue-500">.se</span>
            </h1>
            <p className="text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase hidden sm:block">
              JÄMFÖR PRISER PÅ FOTBOLLSBILJETTER
            </p>
          </div>
        </Link>

        {/* Right Side - Value Proposition & Badges */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right border-r border-slate-200 pr-6 hidden lg:block">
            <p className="text-xs font-extrabold text-blue-900">
              Vi jämför priserna åt dig – så att du slipper
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              Oberoende prissökning på ett ställe
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verifierade källor</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hidden sm:flex">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Uppdateras direkt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex gap-6 overflow-x-auto py-3 text-xs font-black tracking-wider text-slate-500 uppercase whitespace-nowrap scrollbar-none">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Alla Matcher
          </Link>
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