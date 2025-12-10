export default function sitemap() {
  return [
    {
      url: 'https://placebets.ai/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://placebets.ai/tournaments',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://placebets.ai/ev-betting',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://placebets.ai/bankroll',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://placebets.ai/glossary',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }
  ];
}
