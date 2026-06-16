import React from "react";
import { Team } from "../types";
// Vi importerar den faktiska variabeln från din teams-fil
import { TEAMS_SEO_DATA } from "../data/teams"; 

interface TeamBadgeProps {
  team: Team;
  size?: "sm" | "md" | "lg";
}

export default function TeamBadge({ team, size = "md" }: TeamBadgeProps) {
  const dimensions = {
    sm: "w-7 h-7 text-[10px] p-0.5",
    md: "w-11 h-11 text-xs p-1",
    lg: "w-14 h-14 text-sm p-1.5"
  };

  if (!team) {
    return <div className={`${dimensions[size]} rounded-full bg-slate-100 border border-slate-200`} />;
  }

  // Vi letar i TEAMS_SEO_DATA efter det lag vars namn matchar namnet i matchen
  const teamList = Object.values(TEAMS_SEO_DATA);
  const fullTeamData = teamList.find((t: any) => t.name === team.name) as any;
  
  // Hämta loggan (.logo) från SEO-datan om den hittas, annars används matchens fallback
  const logoSrc = fullTeamData?.logo || team.logo;

  const fallbackText = team.shortName || team.name?.substring(0, 3) || "";
  const primaryColor = team.primaryColor || "#cbd5e1";
  const secondaryColor = team.secondaryColor || "#cbd5e1";

  const badgeStyle = {
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor} 50%, ${secondaryColor} 50%, ${secondaryColor} 100%)`,
    textShadow: '0px 1px 2px rgba(0,0,0,0.4)'
  };

  return (
    <div className="flex flex-col items-center text-center">
      {logoSrc ? (
        /* Riktigt klubbmärke med vit premium-bakgrund */
        <div 
          className={`${dimensions[size]} bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm relative group-hover:scale-105 transition-transform duration-200`}
        >
          <img 
            src={logoSrc} 
            alt={team.name || "Klubbmärke"} 
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        /* Fallback: Färggradient med textförkortning */
        <div 
          style={badgeStyle}
          className={`${dimensions[size]} rounded-full flex items-center justify-center font-black border border-slate-200/20 shadow-inner relative group-hover:scale-105 transition-transform duration-200 text-white`}
        >
          <span className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          {fallbackText}
        </div>
      )}
    </div>
  );
}