import React from "react";
import Link from "next/link";
import { Ticket, ShieldCheck, Search, Users } from "lucide-react";

export const metadata = {
  title: "Om oss | Biljetterfotboll.se",
  description: "Lär känna Sveriges ledande jämförelsetjänst för fotbollsbiljetter och fotbollsresor.",
};

export default function OmOssPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Ticket className="w-4 h-4 text-blue-600" />
            <span>Om Biljetterfotboll.se</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-blue-900 tracking-tight">
            Vi gör det enkelt att hitta rätt fotbollsbiljett
          </h1>
          <p className="text-slate-600 font-semibold text-base sm:text-lg leading-relaxed">
            Biljetterfotboll.se är en oberoende svensk jämförelsetjänst skapad för fotbollsfans som vill hitta de bästa priserna på matchbiljetter och fotbollsresor i Europa.
          </p>
        </div>

        {/* Innehållskort */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Vårt uppdrag</h2>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            Att boka biljetter till matcher i Premier League, La Liga, Serie A eller Champions League kan ofta kännas snårigt med varierande priser och osäkra andrahandsmarknader. Vi samlar erbjudanden från etablerade och verifierade återförsäljare på ett ställe så att du tryggt kan jämföra priser och villkor innan du bokar.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-2">
              <Search className="w-6 h-6 text-blue-600 mx-auto" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">Jämför enkelt</h3>
              <p className="text-xs text-slate-500">Sök på lag, liga eller arena och se tillgängliga biljetter i realtid.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-2">
              <ShieldCheck className="w-6 h-6 text-blue-600 mx-auto" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">Verifierade partners</h3>
              <p className="text-xs text-slate-500">Vi hänvisar enbart till trygga och auktoriserade biljettsajter.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-2">
              <Users className="w-6 h-6 text-blue-600 mx-auto" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">100% Gratis</h3>
              <p className="text-xs text-slate-500">Vår tjänst är helt kostnadsfri att använda för alla besökare.</p>
            </div>
          </div>
        </div>

        {/* Tillbaka-knapp */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
          >
            ← Tillbaka till startsidan
          </Link>
        </div>

      </div>
    </main>
  );
}