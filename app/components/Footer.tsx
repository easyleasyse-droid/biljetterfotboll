import React from "react";
import { Ticket, ArrowRight, ShieldAlert, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-16 px-6 sm:px-10 border-t border-slate-950 font-sans" id="main-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand presentation Column */}
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 p-2.5 rounded-lg text-white">
              <Ticket className="w-5 h-5 rotate-12" />
            </div>
            <span className="font-black text-xl text-white tracking-tighter uppercase">
              biljetterfotboll<span className="text-blue-500 font-extrabold">.se</span>
            </span>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed font-semibold">
            Sveriges mest pålitliga söksajt för att jämföra priser på fotbollsbiljetter över hela världen. Vi sammanställer utbudet från de största återförsäljarna i realtid för att ge dig lägsta möjliga pris.
          </p>
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3 max-w-md">
            <ShieldAlert className="w-4.5 h-4.5 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 leading-normal font-medium">
              <strong className="text-slate-400 uppercase tracking-widest font-bold">Ansvarsfriskrivning:</strong> biljetterfotboll.se säljer inte biljetter direkt. Vi är en oberoende sökmotor och hänvisar säkert vidare till verifierade andrahandsmarknader där köpet bekräftas säkert under gällande garantier.
            </p>
          </div>
        </div>

        {/* Quick jump league links Column */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest mb-5 text-[11px]">Populära Ligobiljetter</h4>
          <ul className="space-y-3 font-semibold">
            {["Premier League biljetter", "La Liga biljetter", "Champions League biljetter", "Serie A biljetter", "Allsvenskan biljetter"].map((link) => (
              <li key={link}>
                <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 transition-transform group-hover:translate-x-0.5" />
                  <span>{link}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Value support Column */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest mb-5 text-[11px]">Vår Policy</h4>
          <ul className="space-y-3 font-semibold">
            <li><span className="hover:text-white transition-colors cursor-pointer">Integritetspolicy</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Användarvillkor</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Cookies-inställningar</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Kontakta Redaktionen</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Jobba hos oss</span></li>
          </ul>
        </div>
      </div>

      {/* Under copyright bar */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-slate-800/65 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-bold">
        <p>© {currentYear} Biljetterfotboll.se. Marknadens ledande jämförelsetjänst för fotbollsresor och biljetter.</p>
        <p className="flex items-center gap-1.5">
          <span>Byggd med precision &amp; omsorg för fotbollsfans</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
        </p>
      </div>
    </footer>
  );
}
