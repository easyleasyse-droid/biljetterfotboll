import { UPCOMING_MATCHES } from "@/app/data/upcomingMatches";
import { getTeamKey } from "./teamMapping";

export async function getSyncedUpcomingMatches() {
  try {
    // 1. Hämta live-spelschemat från ditt API
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    const res = await fetch(`${baseUrl}/api/test-fixtures`, {
      next: { revalidate: 3600 }, // Cacha i 1 timme
    });

    if (!res.ok) return UPCOMING_MATCHES;

    const data = await res.json();
    const apiMatches = data.matches || [];

    // 2. Skapa en snabb lookup-tabell för API-matcherna
    const apiMap = new Map<string, { date: string; time: string; isConfirmed: boolean }>();

    for (const match of apiMatches) {
      const homeKey = getTeamKey(match.homeTeamAPI || match.homeTeam);
      const awayKey = getTeamKey(match.awayTeamAPI || match.awayTeam);
      const lookupKey = `${homeKey}-${awayKey}`;

      const matchDateObj = new Date(match.utcDate);
      const formattedDate = matchDateObj.toISOString().split("T")[0];
      const formattedTime = matchDateObj.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Stockholm",
      });

      apiMap.set(lookupKey, {
        date: formattedDate,
        time: formattedTime,
        isConfirmed: match.isTimeConfirmed,
      });
    }

    // 3. Loopa igenom dina befintliga UPCOMING_MATCHES och uppdatera datum/tid om API:et har nyare info
    return UPCOMING_MATCHES.map((match) => {
      const lookupKey = `${match.homeKey}-${match.awayKey}`;
      const apiMatchData = apiMap.get(lookupKey);

      if (apiMatchData) {
        return {
          ...match,
          date: apiMatchData.date, // Skriver över med exakt API-datum
          time: apiMatchData.time, // Skriver över med exakt API-tid
          isTimeConfirmed: apiMatchData.isConfirmed,
        };
      }

      return match; // Om matchen inte finns i API:et (t.ex. andra ligor) behålls din manuella data
    });
  } catch (error) {
    console.error("Kunde inte synka matcher mot API:", error);
    return UPCOMING_MATCHES; // Fallback vid fel
  }
}