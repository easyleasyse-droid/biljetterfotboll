import React, { useState } from "react";
import { FAQ_DATA } from "../data/matches";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>("faq1");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-slate-50 py-20 px-4 md:px-8 border-b border-slate-200" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-500 mb-3 block">VANLIGA FRÅGOR</span>
          <h3 className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tight leading-none mt-2">
            Frågor &amp; Svar om fotbollsbiljetter
          </h3>
          <p className="text-slate-500 text-sm sm:text-base font-semibold mt-3">
            Allt du behöver veta inför ditt biljettköp till stormatchen.
          </p>
        </div>

        <div className="space-y-4" id="faq-accordion">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white border border-slate-250 rounded-2xl overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  id={`faq-btn-${faq.id}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="font-extrabold text-blue-900 text-sm sm:text-base select-none text-left tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${isOpen ? "rotate-180 text-blue-900" : ""}`} />
                </button>

                <div 
                  className={`transition-all overflow-hidden ${
                    isOpen ? "max-h-96 opacity-100 border-t border-slate-150" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 py-5 text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line bg-slate-50/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
