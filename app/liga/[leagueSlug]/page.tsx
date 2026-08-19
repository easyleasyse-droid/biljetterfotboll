import LeagueClient from "./LeagueClient";
import { LEAGUES_DATA } from "../../../leagues";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ leagueSlug: string }> }) {
  const { leagueSlug } = await params;

  // Kontrollera att ligan finns innan vi renderar klient-komponenten
  if (!LEAGUES_DATA[leagueSlug]) {
    notFound();
  }

  return <LeagueClient leagueSlug={leagueSlug} />;
}