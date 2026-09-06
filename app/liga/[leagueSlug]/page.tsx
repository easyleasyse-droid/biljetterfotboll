import LeagueClient from "./LeagueClient";
import { LEAGUES_DATA } from "../../data/leagues";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ leagueSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { leagueSlug } = await params;
  const league = LEAGUES_DATA[leagueSlug];

  if (!league) {
    return {
      title: "Ligan hittades inte | Biljetter Fotboll",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.biljetterfotboll.se";
  const leagueName = league.name || leagueSlug;

  return {
    title: `Fotbollsbiljetter till ${leagueName} – Jämför priser & boka`,
    description: `Jämför priser på fotbollsbiljetter och matchpaket till ${leagueName}. Se aktuellt spelschema, jämför verifierade försäljare och boka tryggt.`,
    openGraph: {
      title: `Köpa biljetter till ${leagueName} | Biljetter Fotboll`,
      description: `Hitta de bästa priserna på matchbiljetter till ${leagueName}. Jämför alla tillgängliga platser och aktörer på biljetterfotboll.se.`,
      url: `${baseUrl}/liga/${leagueSlug}`,
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
  const league = LEAGUES_DATA[leagueSlug];

  if (!league) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.biljetterfotboll.se";

  // Skapa Schema.org Graph med Brödsmulor
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
            "item": `${baseUrl}/liga/${leagueSlug}`,
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
      <LeagueClient leagueSlug={leagueSlug} />
    </>
  );
}