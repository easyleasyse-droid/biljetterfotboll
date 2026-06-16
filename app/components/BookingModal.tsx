import React, { useState, useEffect } from "react";
import { TicketOffer, Match } from "../types";
import { ShieldCheck, Loader2, ArrowRight, CheckCircle, ExternalLink, Lock, HelpCircle, X } from "lucide-react";

interface BookingModalProps {
  match: Match | null;
  offer: TicketOffer | null;
  quantity: number;
  onClose: () => void;
}

export default function BookingModal({ match, offer, quantity, onClose }: BookingModalProps) {
  if (!match || !offer) return null;

  const [step, setStep] = useState<"loading" | "success">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulated loading animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("success");
          return 100;
        }
        return prev + 12;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const totalCost = offer.priceSEK * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="booking-modal-overlay">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-100 transition-all duration-300 animate-scale-up"
        id="booking-modal-content"
      >
        {/* Close Button on Top Right */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {step === "loading" ? (
          /* Loading Animation Block */
          <div className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-blue-900 animate-spin" />
                <Lock className="w-5 h-5 text-blue-950 absolute inset-0 m-auto" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight">Ansluter säkert...</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-sm mx-auto leading-relaxed">
                Skickar dig till partnerns säkra betalningssida hos <span className="text-blue-900 font-extrabold">{offer.merchantName}</span> för att slutföra ditt biljettköp.
              </p>
            </div>

            {/* Progress Bar container */}
            <div className="max-w-xs mx-auto">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-900 h-full transition-all duration-150"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2.5 p-1 font-black tracking-widest">
                <span>VERIFIERAR KÖPARSKYDD</span>
                <span>{Math.min(progress, 100)}%</span>
              </div>
            </div>

            <div className="border-t border-slate-150 pt-5 flex items-center justify-center gap-2 text-xs text-slate-400 font-semibold">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-505" />
              <span>Säker krypterad anslutning via partners SSL</span>
            </div>
          </div>
        ) : (
          /* Redirection success confirmation */
          <div>
            {/* Header banner */}
            <div className="bg-blue-900 p-6 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="inline-flex p-3 bg-white/10 rounded-full text-white border border-white/20 mb-3 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Omdirigering klar!</h3>
              <p className="text-blue-100 text-xs font-semibold mt-1">Dina biljetter har reserverats och hålls i 10 minuter</p>
            </div>

            {/* Recapitulation of Tickets */}
            <div className="p-6 space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between p-1 border-b border-slate-200/60 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evenemang</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">{match.league}</span>
                </div>

                <div className="space-y-1">
                  <p className="font-extrabold text-slate-900 text-sm">
                    {match.homeTeam.name} vs {match.awayTeam.name}
                  </p>
                  <p className="text-xs text-slate-500 text-left">
                    Arena: {match.stadium} ({match.city})
                  </p>
                  <p className="text-xs text-slate-500 text-left">
                    Datum: {match.date} • Matchstart Kl. {match.time}
                  </p>
                </div>

                <div className="border-t border-slate-200/60 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-bold">{offer.section}</p>
                    <p className="text-[10px] text-slate-400">Leverans: {offer.deliveryType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium">{quantity}x Biljetter</p>
                    <p className="text-sm font-bold text-slate-900">Totalt: {totalCost.toLocaleString("sv-SE")} kr</p>
                  </div>
                </div>
              </div>

              {/* Security advice text */}
              <div className="bg-emerald-50/50 border border-emerald-200/70 p-3.5 rounded-xl text-emerald-800 text-[11px] sm:text-xs">
                <p className="font-bold flex items-center gap-1.5 text-emerald-920">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Svensk Köpargaranti Aktiv</span>
                </p>
                <p className="text-emerald-700 mt-1">
                  Ditt köp är nu skyddat. Du slutför checkouten tryggt och krypterat på partnersajten <span className="font-bold">{offer.merchantName}</span>. Din biljett är garanterat autentisk.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                <a 
                  href="https://stubhub.se" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-black text-xs uppercase tracking-widest py-4 px-4 rounded-xl transition-all shadow-lg shadow-blue-900/10 text-center flex items-center justify-center gap-2 cursor-pointer"
                  id="external-partner-book-btn"
                >
                  <span>Öppna betalsida hos {offer.merchantName}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={onClose}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all cursor-pointer text-center"
                >
                  Gå tillbaka till jämförelse
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
