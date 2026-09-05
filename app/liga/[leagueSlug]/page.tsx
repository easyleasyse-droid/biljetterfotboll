import LeagueClient from "./LeagueClient";
import { LEAGUES_DATA } from "../../data/leagues";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ leagueSlug: string }> }) {
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
            "item": `${baseUrl}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": league.name,
            "item": `${baseUrl}/liga/${leagueSlug}`
          }
        ]
      }
    ]
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