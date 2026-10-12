export const dynamic = 'force-dynamic';

import LeagueClient from "./LeagueClient";
import { LEAGUES_DATA } from "../../data/leagues";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ leagueSlug: string }>;
};

// Hjälpfunktion för att tvätta bort "-biljetter" till den interna nyckeln ("premier-league")
function getCleanSlug(slug: string): string {
  return slug.replace(/-biljetter$/, "");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { leagueSlug } = await params;
  const cleanSlug = getCleanSlug(leagueSlug);
  const league = LEAGUES_DATA[cleanSlug] || LEAGUES_DATA[leagueSlug];

  if (!league) {
    return {
      title: "Ligan hittades inte | Biljetter Fotboll",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.biljetterfotboll.se";
  const leagueName = league.name || cleanSlug;
  const canonicalUrl = `${baseUrl}/liga/${cleanSlug}-biljetter`;

  return {
    title: `Fotbollsbiljetter till ${leagueName} – Jämför priser & boka`,
    description: `Jämför priser på fotbollsbiljetter och matchpaket till ${leagueName}. Se aktuellt spelschema, jämför verifierade försäljare och boka tryggt.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Köpa biljetter till ${leagueName} | Biljetter Fotboll`,
      description: `Hitta de bästa priserna på matchbiljetter till ${leagueName}. Jämför alla tillgängliga platser och aktörer på biljetterfotboll.se.`,
      url: canonicalUrl,
      siteName: "Biljetter Fotboll",
      locale: "sv_SE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Fotbollsbiljetter till ${leagueName}`,
      description: `Jämför priser på alla matcher i ${leagueName}.`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { leagueSlug } = await params;
  const cleanSlug = getCleanSlug(leagueSlug);
  const league = LEAGUES_DATA[cleanSlug] || LEAGUES_DATA[leagueSlug];

  if (!league) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.biljetterfotboll.se";
  const canonicalUrl = `${baseUrl}/liga/${cleanSlug}-biljetter`;

  // Skapa Schema.org Graph med Brödsmulor (som pekar på den nya URL:en)
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Hem",
            "item": `${baseUrl}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": league.name,
            "item": canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <LeagueClient leagueSlug={cleanSlug} />
    </>
  );
}