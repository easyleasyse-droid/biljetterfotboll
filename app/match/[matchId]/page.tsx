import { notFound } from "next/navigation";
import MatchClient from "./MatchClient";
import { UPCOMING_MATCHES } from "../../data/upcomingMatches";
import { TEAMS_SEO_DATA } from "../../data/teams";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    matchId: string;
  }>;
}

function createMatchSlug(match: any) {
  const home = TEAMS_SEO_DATA[match.homeKey]?.name || match.homeKey;
  const away = TEAMS_SEO_DATA[match.awayKey]?.name || match.awayKey;
  return `${home}-vs-${away}-${match.date}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const match = UPCOMING_MATCHES.find((m: any) => createMatchSlug(m) === resolvedParams.matchId);

  if (!match) {
    return { title: "Match hittades inte | Biljetter Fotboll" };
  }

  const homeTeamName = TEAMS_SEO_DATA[match.homeKey]?.name || match.homeKey;
  const awayTeamName = TEAMS_SEO_DATA[match.awayKey]?.name || match.awayKey;

  return {
    title: `${homeTeamName} vs ${awayTeamName} biljetter – Jämför priser`,
    description: `Köp biljetter till ${homeTeamName} mot ${awayTeamName} den ${match.date}. Jämför realtidspriser från verifierade leverantörer.`
  };
}

export default async function MatchPage({ params }: PageProps) {
  const resolvedParams = await params;
  const match = UPCOMING_MATCHES.find((m: any) => createMatchSlug(m) === resolvedParams.matchId);

  if (!match) {
    notFound();
  }

  return <MatchClient match={match} />;
}