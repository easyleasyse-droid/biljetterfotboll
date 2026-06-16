import React from "react";

interface StadiumMapProps {
  selectedCategory: string;
  onSelectCategory: (category: "VIP" | "Långsida" | "Kortsida" | "Borta" | "Alla") => void;
  prices: {
    VIP: number;
    Långsida: number;
    Kortsida: number;
    Borta: number;
  };
}

export default function StadiumMap({ selectedCategory, onSelectCategory, prices }: StadiumMapProps) {
  const getZoneColor = (category: string) => {
    if (selectedCategory === "Alla") {
      switch (category) {
        case "VIP": return "fill-amber-500/10 stroke-amber-500 hover:fill-amber-500/20";
        case "Långsida": return "fill-blue-500/10 stroke-blue-500 hover:fill-blue-500/20";
        case "Kortsida": return "fill-emerald-500/10 stroke-emerald-500 hover:fill-emerald-500/20";
        case "Borta": return "fill-purple-500/10 stroke-purple-500 hover:fill-purple-500/20";
        default: return "fill-slate-800/10 stroke-slate-500";
      }
    }

    if (selectedCategory === category) {
      switch (category) {
        case "VIP": return "fill-amber-500/30 stroke-amber-500 ring-2";
        case "Långsida": return "fill-blue-500/30 stroke-blue-500 ring-2";
        case "Kortsida": return "fill-emerald-500/30 stroke-emerald-500 ring-2";
        case "Borta": return "fill-purple-500/30 stroke-purple-500 ring-2";
        default: return "fill-slate-800/20 stroke-slate-500";
      }
    }

    return "fill-slate-100/40 stroke-slate-200/80 cursor-pointer opacity-40 hover:opacity-100 transition-opacity";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col items-center select-none text-white relative">
      <div className="text-center mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Interaktiv Arenakarta</span>
        <h4 className="text-xs font-semibold text-slate-300">Klicka på sektion för att filtrera biljetter</h4>
      </div>

      {/* SVG Arenakarta */}
      <div className="w-full max-w-[320px] aspect-[4/3] relative">
        <svg viewBox="0 0 400 300" className="w-full h-full font-sans">
          {/* Pitch Grass Outer Outer */}
          <rect x="0" y="0" width="400" height="300" rx="20" fill="#020617" />
          
          {/* Football pitch in the center */}
          <g className="opacity-80">
            <rect x="110" y="80" width="180" height="140" fill="#065f46" stroke="#047857" strokeWidth="2" rx="4" />
            {/* Center circle */}
            <circle cx="200" cy="150" r="25" fill="none" stroke="#a7f3d0" strokeWidth="1.5" />
            <circle cx="200" cy="150" r="2" fill="#a7f3d0" />
            {/* Center line */}
            <line x1="200" y1="80" x2="200" y2="220" stroke="#a7f3d0" strokeWidth="1.5" />
            {/* Penalty boxes */}
            <rect x="110" y="110" width="25" height="80" fill="none" stroke="#a7f3d0" strokeWidth="1.5" />
            <rect x="265" y="110" width="25" height="80" fill="none" stroke="#a7f3d0" strokeWidth="1.5" />
          </g>

          {/* STANDS (Clickable Zones) */}
          
          {/* VIP Longside (Top Bench) */}
          <path
            d="M 110 30 L 290 30 L 270 70 L 130 70 Z"
            className={`${getZoneColor("VIP")} transition-all duration-200 cursor-pointer stroke-2 stroke-dasharray-none`}
            onClick={() => onSelectCategory(selectedCategory === "VIP" ? "Alla" : "VIP")}
          />
          <text x="200" y="48" fill="#F59E0B" className="text-[10px] font-bold text-center pointer-events-none" textAnchor="middle">
            VIP (fr. {prices.VIP || "N/A"}:-)
          </text>

          {/* Långsida (Bottom Bench) */}
          <path
            d="M 130 230 L 270 230 L 290 270 L 110 270 Z"
            className={`${getZoneColor("Långsida")} transition-all duration-200 cursor-pointer stroke-2`}
            onClick={() => onSelectCategory(selectedCategory === "Långsida" ? "Alla" : "Långsida")}
          />
          <text x="200" y="256" fill="#3B82F6" className="text-[10px] font-bold text-center pointer-events-none" textAnchor="middle">
            Långsida (fr. {prices.Långsida || "N/A"}:-)
          </text>

          {/* Kortsida Hemmakurvan (Left Stand) */}
          <path
            d="M 25 70 L 95 70 L 95 230 L 25 230 Z"
            className={`${getZoneColor("Kortsida")} transition-all duration-200 cursor-pointer stroke-2`}
            onClick={() => onSelectCategory(selectedCategory === "Kortsida" ? "Alla" : "Kortsida")}
          />
          <text x="60" y="154" fill="#10B981" className="text-[10px] font-bold text-center pointer-events-none" textAnchor="middle" transform="rotate(-90, 60, 154)">
            Kortsida (fr. {prices.Kortsida || "N/A"}:-)
          </text>

          {/* Bortasektionen (Right Stand Top Quarter) */}
          <path
            d="M 305 70 L 375 70 L 375 145 L 305 145 Z"
            className={`${getZoneColor("Borta")} transition-all duration-200 cursor-pointer stroke-2`}
            onClick={() => onSelectCategory(selectedCategory === "Borta" ? "Alla" : "Borta")}
          />
          <text x="340" y="112" fill="#A855F7" className="text-[9px] font-bold text-center pointer-events-none" textAnchor="middle">
            Borta (v)
          </text>

          {/* Regular Right Stand (Right Stand Bottom Quarter) */}
          <path
            d="M 305 155 L 375 155 L 375 230 L 305 230 Z"
            className={`${getZoneColor("Långsida")} transition-all duration-200 cursor-pointer stroke-2`}
            onClick={() => onSelectCategory(selectedCategory === "Långsida" ? "Alla" : "Långsida")}
          />
          <text x="340" y="196" fill="#3B82F6" className="text-[9px] font-bold text-center pointer-events-none" textAnchor="middle">
            Långsida
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center mt-3 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500 inline-block"></span>
          VIP
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-blue-500/20 border border-blue-500 inline-block"></span>
          Långsida
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500 inline-block"></span>
          Kortsida
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-purple-500/20 border border-purple-500 inline-block"></span>
          Bortaklack
        </span>
      </div>
    </div>
  );
}
