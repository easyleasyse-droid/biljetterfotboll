import LeagueClient from "./LeagueClient";
import { LEAGUES_DATA } from "../../data/leagues";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ leaguesSlug: string }> }) {
  const { leaguesSlug } = await params;

  if (!LEAGUES_DATA[leaguesSlug]) {
    notFound();
  }

  return <LeagueClient leagueSlug={leaguesSlug} />;
}