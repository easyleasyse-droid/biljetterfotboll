import { TEAMS_SEO_DATA } from "../../data/teams";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamClient from "./TeamClient";

interface Props {
  params: Promise<{ teamSlug: string }>;
}

// ==========================================
// 1. DYNAMISK SEO (Metadata)
// ==========================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
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
// 2. SERVERKOMPONENTEN (Hanterar Page + Schema)
// ==========================================
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const teamSlug = resolvedParams.teamSlug;
  const team = TEAMS_SEO_DATA[teamSlug];

  if (!team) {
    notFound();
  }

  // Hämta matcherna direkt på serversidan för att bygga vår Schema Markup
  let schemaJson = null;
  try {
    // Vi anropar API-rutten (använd absolut URL om Next.js kräver det i din miljö, 
    // men eftersom det är Next.js Server Component kan vi köra fetch)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/matches`, { next: { revalidate: 60 } });
    
    if (res.ok) {
      const matches = await res.json();
      const cleanSlug = teamSlug.replace("-", " ");
      
      // Filtrera fram lagets matcher
      const teamMatches = matches.filter((match: any) => {
        const homeName = match.homeTeam?.name?.toLowerCase() || "";
        const awayName = match.awayTeam?.name?.toLowerCase() || "";
        return homeName.includes(cleanSlug) || awayName.includes(cleanSlug);
      });

      // Bygg SportsEvent-strukturen för Google
      if (teamMatches.length > 0) {
        schemaJson = {
          "@context": "https://schema.org",
          "@graph": teamMatches.map((match: any) => ({
            "@type": "SportsEvent",
            "name": `${match.homeTeam.name} - ${match.awayTeam.name}`,
            "startDate": `${match.date}T${match.time || "20:00"}:00`,
            "homeTeam": {
              "@type": "SportsTeam",
              "name": match.homeTeam.name
            },
            "awayTeam": {
              "@type": "SportsTeam",
              "name": match.awayTeam.name
            },
            "location": {
              "@type": "Place",
              "name": team.stadiumName,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": team.location
              }
            },
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": match.priceFrom,
              "priceCurrency": "SEK",
              "offerCount": match.offers?.length || 1,
              "url": `${baseUrl}/lag/${teamSlug}`
            }
          }))
        };
      }
    }
  } catch (error) {
    console.error("Misslyckades att bygga schema markup på servern:", error);
  }

  return (
    <>
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      )}
      <TeamClient teamSlug={teamSlug} />
    </>
  );
}