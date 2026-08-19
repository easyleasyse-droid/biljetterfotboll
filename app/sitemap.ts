import { MetadataRoute } from 'next'
import { TEAMS_SEO_DATA } from './data/teams'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://biljetterfotboll.se'

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

  // Dynamiska lagsidor (genereras från TEAMS_SEO_DATA)
  const teamPages: MetadataRoute.Sitemap = Object.keys(TEAMS_SEO_DATA).map((slug) => ({
    url: `${baseUrl}/lag/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...teamPages]
}