import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Scale, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans py-20 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-blue-400 transition-colors group">
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          Tillbaka till startsidan
        </Link>

        {/* Header */}
        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex p-2.5 bg-blue-600/10 rounded-xl text-blue-500 border border-blue-500/20 mb-2">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight sm:text-4xl">Användarvillkor</h1>
          <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Senast uppdaterad: Juli 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm leading-relaxed font-medium">
          <p>
            Genom att använda <strong>Biljetterfotboll.se</strong> godkänner du följande användarvillkor. Om du inte accepterar dessa villkor bör du avstå från att använda vår webbplats.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Scale className="w-4 h-4 text-blue-500" /> 1. Tjänstens omfattning</h2>
            <p>
              Biljetterfotboll.se är en kostnadsfri sökmotor och prisjämförelsesida för evenemangs- och fotbollsbiljetter. Vi säljer inga egna biljetter. Alla köp, bokningar och transaktioner sker direkt på externa partnersajter.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-blue-500" /> 2. Ansvarsfriskrivning</h2>
            <p>
              Vi strävar efter att alltid visa korrekta priser och tillgänglighet i realtid, men då biljettpriser på andrahandsmarknaden fluktuerar kan vi inte garantera att informationen på vår sajt alltid är 100 % identisk med slutpriset hos partnern. Biljetterfotboll.se kan inte hållas ansvariga för eventuella tvister, inställda matcher eller leveransproblem som uppstår mellan köparen och den externa biljettplattformen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Immateriella rättigheter</h2>
            <p>
              Allt innehåll på denna webbplats, inklusive logotyper, kod, text och designlayout tillhör Biljetterfotboll.se och är skyddat av upphovsrättslagen. Inget material får kopieras eller distribueras utan skriftligt godkännande.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}