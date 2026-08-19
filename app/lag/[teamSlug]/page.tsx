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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.biljetterfotboll.se";

  return {
    title: `Köp biljetter till ${team.name} | Guide till ${team.stadiumName}`,
    description: team.aboutTickets?.substring(0, 160) || `Hitta biljetter till ${team.name}`,
    alternates: {
      canonical: `${baseUrl}/lag/${resolvedParams.teamSlug}`,
    },
    openGraph: {
      title: `Officiella biljetter & matchpaket: ${team.name}`,
      description: `Hitta trygga biljetter till ${team.name} på ${team.stadiumName}. Jämför priser och boka din fotbollsresa här.`,
      images: [{ url: team.heroImage || "" }],
    },
  };
}

// ==========================================
// 2. BUILD OPTIMERING (Generera alla 115 sidor)
// ==========================================
export async function generateStaticParams() {
  return Object.keys(TEAMS_SEO_DATA).map((slug) => ({
    teamSlug: slug,
  }));
}

// ==========================================
// 3. SERVERKOMPONENTEN (Page + Combined Schema)
// ==========================================
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const teamSlug = resolvedParams.teamSlug;
  const team = TEAMS_SEO_DATA[teamSlug];

  if (!team) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.biljetterfotboll.se";
  const graphItems: any[] = [];

  // A) FAQ Schema (om FAQ finns för laget)
  if (team.faqs && team.faqs.length > 0) {
    graphItems.push({
      "@type": "FAQPage",
      "mainEntity": team.faqs.map((faq: { question: string; answer: string }) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    });
  }

  // B) SportsEvent Schema för matcher
  try {
    const res = await fetch(`${baseUrl}/api/matches`, { next: { revalidate: 3600 } });
    
    if (res.ok) {
      const matches = await res.json();
      const cleanSlug = teamSlug.replaceAll("-", " ");
      
      const teamMatches = matches.filter((match: any) => {
        const homeName = match.homeTeam?.name?.toLowerCase() || "";
        const awayName = match.awayTeam?.name?.toLowerCase() || "";
        return homeName.includes(cleanSlug) || awayName.includes(cleanSlug);
      });

      teamMatches.forEach((match: any) => {
        graphItems.push({
          "@type": "SportsEvent",
          "name": `${match.homeTeam.name} - ${match.awayTeam.name}`,
          "startDate": `${match.date}T${match.time || "20:00"}:00`,
          "homeTeam": {
            "@type": "SportsTeam",
            "name": match.homeTeam.name,
          },
          "awayTeam": {
            "@type": "SportsTeam",
            "name": match.awayTeam.name,
          },
          "location": {
            "@type": "Place",
            "name": team.stadiumName,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": team.location,
            },
          },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": match.priceFrom,
            "priceCurrency": "SEK",
            "offerCount": match.offers?.length || 1,
            "url": `${baseUrl}/lag/${teamSlug}`,
          },
        });
      });
    }
  } catch (error) {
    console.error("Misslyckades att hämta matcher för schema:", error);
  }

  // Samla allt i en gemensam Schema.org Graph
  const schemaJson = graphItems.length > 0 ? {
    "@context": "https://schema.org",
    "@graph": graphItems
  } : null;

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