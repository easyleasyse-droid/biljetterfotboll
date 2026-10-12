export const dynamic = 'force-dynamic';

import { TEAMS_SEO_DATA } from "../../data/teams";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamClient from "./TeamClient";

interface Props {
  params: Promise<{ teamSlug: string }>;
}

// Helper för att tvätta "-biljetter" till den interna nyckeln ("arsenal")
function getCleanSlug(slug: string): string {
  return slug.replace(/-biljetter$/, "");
}

// ==========================================
// 1. DYNAMISK SEO (Metadata)
// ==========================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.teamSlug;
  const cleanSlug = getCleanSlug(rawSlug);
  
  // Hämta team från teams.ts med den rena nyckeln
  const team = TEAMS_SEO_DATA[cleanSlug] || TEAMS_SEO_DATA[rawSlug];
  
  if (!team) {
    return { title: "Laget hittades inte" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.biljetterfotboll.se";
  
  const title = `Biljetter ${team.name} 2026/27 – Jämför Priser & Matcher`;
  const description = team.aboutTickets 
    ? `Jämför priser på matchbiljetter till ${team.name}. Se spelschema, läktarinfo och köp biljetter till ${team.stadiumName} från verifierade återförsäljare.`
    : `Jämför priser och boka biljetter till ${team.name}. Se aktuellt spelschema och priser för alla matcher.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/lag/${cleanSlug}-biljetter`,
    },
    openGraph: {
      title: `Biljetter & Matchpaket till ${team.name}`,
      description,
      url: `${baseUrl}/lag/${cleanSlug}-biljetter`,
      images: [{ url: team.heroImage || "" }],
    },
  };
}

// ==========================================
// 2. BUILD OPTIMERING
// ==========================================
export async function generateStaticParams() {
  return Object.keys(TEAMS_SEO_DATA).map((slug) => ({
    teamSlug: `${slug}-biljetter`,
  }));
}

// ==========================================
// 3. SERVERKOMPONENTEN
// ==========================================
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.teamSlug;
  const cleanSlug = getCleanSlug(rawSlug);
  const canonicalSlug = `${cleanSlug}-biljetter`;

  // Hämta laget med den rena nyckeln ("arsenal")
  const team = TEAMS_SEO_DATA[cleanSlug] || TEAMS_SEO_DATA[rawSlug];

  if (!team) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.biljetterfotboll.se";
  const graphItems: any[] = [];

  // 0) BreadcrumbList Schema
  graphItems.push({
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Hem",
        "item": `${baseUrl}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": team.league,
        "item": `${baseUrl}/liga/${team.league.toLowerCase().replace(/\s+/g, '-')}-biljetter`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": team.name,
        "item": `${baseUrl}/lag/${canonicalSlug}`
      }
    ]
  });

  // 0) SportsTeam Schema
  graphItems.push({
    "@type": "SportsTeam",
    "name": team.name,
    "sport": "Soccer",
    "url": `${baseUrl}/lag/${canonicalSlug}`,
    "logo": team.logo ? `${baseUrl}${team.logo}` : undefined,
    "memberOf": {
      "@type": "SportsOrganization",
      "name": team.league,
    },
    "location": {
      "@type": "Place",
      "name": team.stadiumName,
      "address": team.location
    }
  });

  // A) FAQ Schema
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
      
      const teamMatches = matches.filter((match: any) => {
        const homeName = (match.homeTeam?.name || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ø/g, "o");
        const awayName = (match.awayTeam?.name || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ø/g, "o");
        
        const slug = cleanSlug.toLowerCase().trim();

        if (slug === "milan" || slug === "ac-milan") {
          if (homeName.includes("inter") || awayName.includes("inter")) return false;
          return homeName.includes("milan") || awayName.includes("milan");
        }

        if (slug === "inter" || slug === "inter-milan") {
          return homeName.includes("inter") || awayName.includes("inter");
        }

        if (slug === "union-sg") {
          return homeName.includes("union") || awayName.includes("union");
        }

        const realName = (team.name || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ø/g, "o");
        const targetName = slug.replace(/-/g, " ");

        return homeName.includes(realName) || awayName.includes(realName) || 
               homeName.includes(targetName) || awayName.includes(targetName);
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
          "offers": match.priceFrom ? {
            "@type": "AggregateOffer",
            "lowPrice": match.priceFrom,
            "priceCurrency": "SEK",
            "offerCount": match.offers?.length || 1,
            "url": `${baseUrl}/lag/${canonicalSlug}`
          } : undefined,
        });
      });
    }
  } catch (error) {
    console.error("Misslyckades att hämta matcher för schema:", error);
  }

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
      <TeamClient teamSlug={cleanSlug} />
    </>
  );
}