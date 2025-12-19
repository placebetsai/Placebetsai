// pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
  const siteUrl = "https://ihatecollege.com";

  // Your static money pages
  const staticPaths = [
    "",
    "/alternatives",
    "/trade-schools",
    "/cheat-sheets",
    "/debt-calculator",
    "/rank-your-school",
    "/civil-service",
    "/liberal-vs-conservative",
    "/contact"
  ];

  // Fetch all college slugs from Scorecard API
  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;
  let collegePaths = [];

  if (apiKey) {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&per_page=100&page=${page}&fields=school.name`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        hasMore = false;
        break;
      }

      // Generate slugs for each school
      data.results.forEach(school => {
        const name = school['school.name'];
        const slug = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        if (slug) {
          collegePaths.push(`/college/${slug}`);
        }
      });

      page++;
    }
  }

  // Combine static + dynamic
  const allPaths = [...staticPaths, ...collegePaths];

  // Generate XML
  const xmlUrls = allPaths
    .map(path => `
      <url>
        <loc>${siteUrl}${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${path === "" ? "daily" : "weekly"}</changefreq>
        <priority>${path === "" ? "1.0" : "0.8"}</priority>
      </url>`)
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`.trim();

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
