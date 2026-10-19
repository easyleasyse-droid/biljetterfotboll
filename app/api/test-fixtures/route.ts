import { NextResponse } from "next/server";

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const LEAGUES = ["PL", "PD", "SA","BL1","FL1"];

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "API-nyckel saknas" }, { status: 500 });
  }

  try {
    const leagueTeams: Record<string, string[]> = {};

    for (const code of LEAGUES) {
      // Hämta information om ligan och dess nuvarande lag
      const response = await fetch(
        `https://api.football-data.org/v4/competitions/${code}/teams`,
        {
          headers: { "X-Auth-Token": API_KEY },
          next: { revalidate: 86400 }, // Cacha i 24 timmar
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Plocka ut lagens officiella namn
        leagueTeams[code] = (data.teams || []).map((t: any) => t.name);
      }
    }

    return NextResponse.json(leagueTeams);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}