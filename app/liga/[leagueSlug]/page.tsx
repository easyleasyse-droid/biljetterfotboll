import LeagueClient from "@/app/liga/[leagueSlug]/LeagueClient";
import { LEAGUES_DATA } from "@/app/leagues";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ leagueSlug: string }> }) {
  const { leagueSlug } = await params;

  if (!LEAGUES_DATA[leagueSlug]) {
    notFound();
  }

  return <LeagueClient leagueSlug={leagueSlug} />;
}