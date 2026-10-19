import { UPCOMING_MATCHES } from "@/app/data/upcomingMatches";
import { getTeamKey } from "./teamMapping";

const LEAGUES = ["PL", "PD", "SA", "BL1", "FL1"];

export async function getSyncedUpcomingMatches() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  
  if (!apiKey) {
    return UPCOMING_MATCHES;
  }

  try {
    let allApiMatches: any[] = [];

    // Hämta spelschema direkt från Football-Data.org för dina ligor
    for (const code of LEAGUES) {
      const res = await fetch(`https://api.football-data.org/v4/competitions/${code}/matches?status=SCHEDULED,TIMED`, {
        headers: { "X-Auth-Token": apiKey },
        next: { revalidate: 3600 }, // Cacha i 1 timme
      });

      if (res.ok) {
        const data = await res.json();
        if (data.matches) {
          allApiMatches.push(...data.matches);
        }
      }
    }

    // Skapa en lookup-tabell för matcherna
    const apiMap = new Map<string, { date: string; time: string; isConfirmed: boolean }>();

    for (const match of allApiMatches) {
      const homeKey = getTeamKey(match.homeTeam?.name || "");
      const awayKey = getTeamKey(match.awayTeam?.name || "");
      const lookupKey = `${homeKey}-${awayKey}`;

      const matchDateObj = new Date(match.utcDate);
      const formattedDate = matchDateObj.toISOString().split("T")[0];
      const formattedTime = matchDateObj.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Stockholm",
      });

      const isConfirmed = match.status === "TIMED";

      apiMap.set(lookupKey, {
        date: formattedDate,
        time: formattedTime,
        isConfirmed,
      });
    }

    // Uppdatera dina UPCOMING_MATCHES med riktiga datum/tider
    return UPCOMING_MATCHES.map((match) => {
      const lookupKey = `${match.homeKey}-${match.awayKey}`;
      const apiMatchData = apiMap.get(lookupKey);

      if (apiMatchData) {
        return {
          ...match,
          date: apiMatchData.date,
          time: apiMatchData.time,
          isTimeConfirmed: apiMatchData.isConfirmed,
        };
      }

      return match;
    });
  } catch (error) {
    console.error("Kunde inte synka matcher mot API:", error);
    return UPCOMING_MATCHES;
  }
}