import React from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, Code, Sparkles } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans py-20 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-blue-400 transition-colors group">
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          Tillbaka till startsidan
        </Link>

        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex p-2.5 bg-blue-600/10 rounded-xl text-blue-500 border border-blue-500/20 mb-2">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight sm:text-4xl">Jobba hos oss</h1>
          <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Karriär & Möjligheter</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed font-medium">
          <p>
            Brinner du för fotboll, teknik och datadriven utveckling? <strong>Biljetterfotboll.se</strong> är en snabbväxande plattform som ständigt letar efter talanger som vill optimera och skala upp marknadens vassaste prisjämförelse för sportresor.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Code className="w-4 h-4 text-blue-500" /> Spontansökningar</h2>
            <p>
              Just nu har vi inga öppna heltidstjänster, men vi expanderar ständigt och är alltid intresserade av frilansande utvecklare, content-skribenter och SEO-specialister. Skicka ett mail till <strong>info@biljetterfotboll.se</strong> och berätta vad du är grym på!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}