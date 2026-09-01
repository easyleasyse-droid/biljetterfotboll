import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://biljetterfotboll.se';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // Tillåt specifik åtkomst för AI-botar
        userAgent: ['GPTBot', 'Google-Extended', 'PerplexityBot', 'ClaudeBot'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}