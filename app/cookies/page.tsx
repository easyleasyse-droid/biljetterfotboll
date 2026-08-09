import React from "react";
import Link from "next/link";
import { ArrowLeft, Cookie, Shield, EyeOff } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans py-20 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-blue-400 transition-colors group">
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          Tillbaka till startsidan
        </Link>

        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex p-2.5 bg-blue-600/10 rounded-xl text-blue-500 border border-blue-500/20 mb-2">
            <Cookie className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight sm:text-4xl">Cookies</h1>
          <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Senast uppdaterad: Juli 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed font-medium">
          <p>
            På <strong>Biljetterfotboll.se</strong> använder vi cookies (kakor) för att ge dig den bästa möjliga upplevelsen när du söker och jämför fotbollsbiljetter. 
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" /> Vad är cookies?</h2>
            <p>
              En cookie är en liten textfil som sparas på din dator eller mobila enhet när du besöker en webbplats. Den hjälper oss att komma ihåg dina inställningar och optimera sajtens prestanda.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><EyeOff className="w-4 h-4 text-blue-500" /> Tredjepartscookies och Affiliate-spårning</h2>
            <p>
              När du klickar på en länk för att gå vidare till en biljettleverantör används spårningscookies från våra partner (affiliatenätverk). Denna cookie används uteslutande för att registrera att du kom från vår hemsida, vilket gör att vi kan få en provision på eventuella köp. Inga personliga uppgifter som kan identifiera dig sparas i dessa cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}