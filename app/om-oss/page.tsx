import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';

export default function OmOssPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Tillbaka-länk */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tillbaka till startsidan
          </Link>
        </div>

        {/* Header med ikon, vänsterställd rubrik och skiljelinje */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-center justify-center text-blue-400">
            <Users className="w-6 h-6" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            OM BILJETTERFOTBOLL.SE
          </h1>

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            SENAST UPPDATERAD: AUGUSTI 2026
          </p>

          <hr className="border-slate-800/80 my-6" />
        </div>

        {/* Innehåll i ren textstil (samma som villkoren) */}
        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            Välkommen till <strong className="text-white">Biljetterfotboll.se</strong>. Vi är en oberoende svensk jämförelsetjänst skapad för fotbollsfans som vill hitta de bästa priserna på matchbiljetter och fotbollsresor i Europa.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-white pt-2 flex items-center gap-2">
            1. Vårt uppdrag
          </h2>
          <p>
            Att boka biljetter till matcher i Premier League, La Liga, Serie A eller Champions League kan ofta kännas snårigt med varierande priser och osäkra andrahandsmarknader. Vi samlar erbjudanden från etablerade och verifierade återförsäljare på ett ställe så att du tryggt kan jämföra priser och villkor innan du bokar.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-white pt-2 flex items-center gap-2">
            2. Hur tjänsten fungerar
          </h2>
          <p>
            Vår plattform är helt gratis att använda. Vi säljer inga egna biljetter och hanterar inga betalningar själva, utan hänvisar dig vidare direkt till auktoriserade biljettsajter och researrangörer där köpet genomförs säkert.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-white pt-2 flex items-center gap-2">
            3. Verifierade partners
          </h2>
          <p>
            Säkerhet är vår högsta prioritet. Vi granskar och listar enbart partners och marknadsplatser som erbjuder trygga betallösningar och äkthetsgarantier på biljetterna.
          </p>
        </div>

      </div>
    </main>
  );
}