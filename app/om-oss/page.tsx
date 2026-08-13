import Link from 'next/link';
import { ArrowLeft, Search, ShieldCheck, Users, Info } from 'lucide-react';

export default function OmOssPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Tillbaka-länk */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tillbaka till startsidan
          </Link>
        </div>

        {/* Header Badge & Rubrik */}
        <div className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
            <Info className="w-3.5 h-3.5" />
            Om Biljetterfotboll.se
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Vi gör det enkelt att hitta rätt <span className="text-blue-500">fotbollsbiljett</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Biljetterfotboll.se är en oberoende svensk jämförelsetjänst skapad för fotbollsfans som vill hitta de bästa priserna på matchbiljetter och fotbollsresor i Europa.
          </p>
        </div>

        {/* Huvudkort - Vårt uppdrag */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 backdrop-blur-sm">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Vårt uppdrag</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Att boka biljetter till matcher i Premier League, La Liga, Serie A eller Champions League kan ofta kännas snårigt med varierande priser och osäkra andrahandsmarknader. Vi samlar erbjudanden från etablerade och verifierade återförsäljare på ett ställe så att du tryggt kan jämföra priser och villkor innan du bokar.
            </p>
          </div>

          {/* Grid med 3 funktioner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">Jämför enkelt</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sök på lag, liga eller arena och se tillgängliga biljetter i realtid.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">Verifierade partners</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vi hänvisar enbart till trygga och auktoriserade biljettsajter.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">100% Gratis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vår tjänst är helt kostnadsfri att använda för alla besökare.
              </p>
            </div>

          </div>
        </div>

        {/* Knapp längst ner */}
        <div className="text-center pt-2">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            ← Tillbaka till startsidan
          </Link>
        </div>

      </div>
    </main>
  );
}