export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: 'https://placebets.ai/sitemap.xml',
    host: 'https://placebets.ai',
  };
}
