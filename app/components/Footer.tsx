import React from "react";
import { Ticket, ArrowRight, ShieldAlert, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-16 px-6 sm:px-10 border-t border-slate-950 font-sans" id="main-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Kolumn 1 & 2: Varumärkespresentation och Ansvarsfriskrivning/Affiliate Disclosure */}
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
              <strong className="text-slate-400 uppercase tracking-widest font-bold">Ansvarsfriskrivning & Finansiering:</strong> biljetterfotboll.se säljer inga biljetter direkt. Vi är en oberoende jämförelsetjänst. Tjänsten är gratis att använda och vi erhåller eventuellt en kommission från partners om du slutför ett köp via våra länkar.
            </p>
          </div>
        </div>

        {/* Kolumn 3: Populära ligor */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest mb-5 text-[11px]">Populära Ligobiljetter</h4>
          <ul className="space-y-3 font-semibold">
            {[
              { name: "Premier League biljetter", slug: "premier-league" },
              { name: "La Liga biljetter", slug: "la-liga" },
              { name: "Champions League biljetter", slug: "champions-league" },
              { name: "Serie A biljetter", slug: "serie-a" },
              { name: "Allsvenskan biljetter", slug: "allsvenskan" }
            ].map((item) => (
              <li key={item.slug}>
                <Link 
                  href={`/liga/${item.slug}`}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group text-slate-400"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 transition-transform group-hover:translate-x-0.5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolumn 4: Vår Policy */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest mb-5 text-[11px]">Vår Policy</h4>
          <ul className="space-y-3 font-semibold">
            {[
              { name: "Om oss", slug: "om-oss" },
              { name: "Integritetspolicy", slug: "integritetspolicy" },
              { name: "Användarvillkor", slug: "anvandarvillkor" },
              { name: "Cookies-inställningar", slug: "cookies" },
              { name: "Kontakta oss", slug: "kontakt" },
              { name: "Jobba hos oss", slug: "jobb" }
            ].map((item) => (
              <li key={item.slug}>
                <Link 
                  href={`/${item.slug}`}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group text-slate-400"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 transition-transform group-hover:translate-x-0.5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Copyright-raden längst ner */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-slate-800/65 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {currentYear} Biljetterfotboll.se. Marknadens ledande jämförelsetjänst för fotbollsresor och biljetter.</p>
        <p className="flex items-center gap-1.5">
          Byggd med precision & omsorg för fotbollsfans <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        </p>
      </div>
    </footer>
  );
}