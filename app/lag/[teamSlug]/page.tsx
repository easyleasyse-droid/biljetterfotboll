import { TEAMS_SEO_DATA } from "../../data/teams";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamClient from "./TeamClient";

interface Props {
  params: Promise<{ teamSlug: string }>; // Vi talar om att params är asynkront
}

// ==========================================
// 1. DYNAMISK SEO (Väntar in params)
// ==========================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; // Vänta på att Next.js läser av URL:en
  const team = TEAMS_SEO_DATA[resolvedParams.teamSlug];
  
  if (!team) {
    return { title: "Laget hittades inte" };
  }

  return {
    title: `Köp biljetter till ${team.name} | Guide till ${team.stadiumName}`,
    description: team.aboutTickets?.substring(0, 160) || `Hitta biljetter till ${team.name}`,
    openGraph: {
      title: `Officiella biljetter & matchpaket: ${team.name}`,
      description: `Hitta trygga biljetter till ${team.name} på ${team.stadiumName}. Jämför priser och boka din fotbollsresa här.`,
      images: [{ url: team.heroImage || "" }],
    },
  };
}

// ==========================================
// 2. SERVERKOMPONENTEN (Väntar in params)
// ==========================================
export default async function Page({ params }: Props) {
  const resolvedParams = await params; // Vänta på att Next.js läser av URL:en
  const team = TEAMS_SEO_DATA[resolvedParams.teamSlug];

  // Om adressen (t.ex. "arsenal") inte matchar en nyckel i teams.ts, visa 404
  if (!team) {
    notFound();
  }

  return <TeamClient teamSlug={resolvedParams.teamSlug} />;
}