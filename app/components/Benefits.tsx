import React from "react";
import { ShieldCheck, Scale, BadgePercent, Clock } from "lucide-react";

export default function Benefits() {
  const items = [
    {
      icon: <Scale className="w-6 h-6 text-blue-600" />,
      title: "Opartisk Prisjämförelse",
      description: "Vi samlar alla tillgängliga biljetter på andrahandsmarknaden så att du slipper besöka dussintals olika webbplatser."
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-blue-600" />,
      title: "Hitta Alltid Bästa Pris",
      description: "Genom att jämföra priser från över 50 partners sparar våra användare i genomsnitt 32% på sina fotbollsbiljetter."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "100% Giltiga Biljetter",
      description: "Vi listar endast återförsäljare som erbjuder fullständiga garantier, säkra betalningar och äkta personliga biljetter."
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Support Dygnet Runt",
      description: "Våra anslutna samarbetspartners erbjuder kundtjänst dygnet runt på telefon och mail om du har frågor om din bokning."
    }
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-8 border-b border-slate-200" id="benefits">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-500 mb-3 block">FÖRDELAR MED OSS</span>
          <h3 className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tight leading-none mt-2">
            Varför boka via biljetterfotboll.se?
          </h3>
          <p className="text-slate-500 text-sm sm:text-base font-semibold mt-3">
            Sveriges primära sajt för att hitta, jämföra och säkra matchbiljetter till Premier League, Champions League, La Liga och mer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="p-6.5 bg-slate-50 rounded-2xl border border-slate-200/80 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="bg-white p-3 rounded-xl inline-block shadow-sm border border-slate-150 mb-4 text-blue-900 font-bold">
                {item.icon}
              </div>
              <h4 className="text-base sm:text-lg font-black text-blue-900 mb-2 tracking-tight">{item.title}</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
