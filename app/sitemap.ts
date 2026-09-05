import { MetadataRoute } from 'next'
import { TEAMS_SEO_DATA } from './data/teams'
import { LEAGUES_DATA } from './data/leagues'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.biljetterfotboll.se'

  // Statiska sidor
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/om-oss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/integritetspolicy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/anvandarvillkor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Dynamiska ligasidor
  const leaguePages: MetadataRoute.Sitemap = Object.keys(LEAGUES_DATA).map((slug) => ({
    url: `${baseUrl}/liga/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Dynamiska lagsidor
  const teamPages: MetadataRoute.Sitemap = Object.keys(TEAMS_SEO_DATA).map((slug) => ({
    url: `${baseUrl}/lag/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...leaguePages, ...teamPages]
}