export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://placebets.ai/sitemap.xml',
    host: 'https://placebets.ai',
  };
}
