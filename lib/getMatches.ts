import { UPCOMING_MATCHES } from "@/app/data/upcomingMatches";
import { getTeamKey } from "./teamMapping";

const LEAGUES = ["PL", "PD", "SA", "BL1", "FL1"];

async function fetchLeagueMatches(code: string, apiKey: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(
      `https://api.football-data.org/v4/competitions/${code}/matches?status=SCHEDULED,TIMED`,
      {
        headers: { "X-Auth-Token": apiKey },
        next: { revalidate: 3600 },
        signal: controller.signal,
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.matches) ? data.matches : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function getSyncedUpcomingMatches() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  if (!apiKey) {
    return UPCOMING_MATCHES;
  }

  try {
    const results = await Promise.all(
      LEAGUES.map((code) => fetchLeagueMatches(code, apiKey))
    );
    const allApiMatches = results.flat();

    if (allApiMatches.length === 0) {
      return UPCOMING_MATCHES;
    }

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

    return UPCOMING_MATCHES.map((match: any) => {
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