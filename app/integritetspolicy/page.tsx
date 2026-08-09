import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight sm:text-4xl">Integritetspolicy</h1>
          <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Senast uppdaterad: Juli 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm leading-relaxed font-medium">
          <p>
            Välkommen till <strong>Biljetterfotboll.se</strong>. Vi värnar om din personliga integritet och strävar efter att alltid skydda dina personuppgifter på bästa möjliga sätt. Denna integritetspolicy förklarar hur vi samlar in och använder information, samt dina rättigheter.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Eye className="w-4 h-4 text-blue-500" /> 1. Information vi samlar in</h2>
            <p>
              Eftersom Biljetterfotboll.se är en oberoende jämförelsetjänst säljer vi inga biljetter direkt och hanterar inga betalningar. Vi samlar främst in anonym teknisk data via analysverktyg (såsom besöksstatistik, enhetstyp och webbläsare) för att förbättra sajtens funktionalitet och användarupplevelse.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Lock className="w-4 h-4 text-blue-500" /> 2. Cookies och Tredjepartslänkar</h2>
            <p>
              Vi använder cookies för att optimera din sökning och spara dina preferenser. När du klickar på en länk och omdirigeras till en partner (t.ex. StubHub eller Viagogo) för att slutföra ett biljettköp, gäller den specifika partnerns integritetspolicy och villkor för de uppgifter du lämnar hos dem.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Affiliate-nätverk</h2>
            <p>
              Vi samarbetar med affiliatenätverk för att förmedla biljetter. När du klickar vidare via våra länkar sätts en spårningscookie från tredje part för att verifiera att trafiken kommer från oss, vilket gör att vi kan erhålla en provision på förmedlade köp.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Dina rättigheter</h2>
            <p>
              Du har alltid rätt att neka användningen av cookies via dina webbläsarinställningar. Vid frågor gällande vår hantering av data är du välkommen att kontakta oss via kontaktlänken i vår footer.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}