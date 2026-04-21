export default function sitemap() {
  const base = 'https://placebets.ai';
  const now = new Date();
  return [
    { url: `${base}/`,                        lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/tournaments`,             lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/ev-betting`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/bankroll`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/calculators`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/how-predictions-work`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/glossary`,                lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/about`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/shop`,                    lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${base}/contact`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/responsible-gambling`,    lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/terms`,                   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/what-is-ev-betting`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/draftkings-promo-codes`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/fanduel-promo-codes`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/best-sports-betting-apps-2026`,     lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/prediction-markets-explained`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/sports-betting-strategies`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/bankroll-management-guide`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/nba-betting-guide`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
  ];
}
