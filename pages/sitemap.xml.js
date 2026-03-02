// pages/sitemap.xml.js
import fs from "fs";
import path from "path";

export async function getServerSideProps({ res }) {
  const siteUrl = "https://ihatecollege.com";

  // Core static pages
  const staticPaths = [
    "",
    "/college-rankings",
    "/jobs",
    "/alternatives",
    "/trade-schools",
    "/cheat-sheets",
    "/debt-calculator",
    "/rank-your-school",
    "/civil-service",
    "/liberal-vs-conservative",
    "/contact",
    "/about",
    "/blog",
    "/is-college-worth-it-2025",
    "/trade-school-vs-college-salary-2025",
    "/how-to-make-money-without-a-college-degree",
  ];

  // Auto-discover all blog articles from the filesystem
  try {
    const blogDir = path.join(process.cwd(), "pages", "blog");
    const blogFiles = fs.readdirSync(blogDir).filter(
      (f) => f.endsWith(".js") && f !== "index.js"
    );
    for (const file of blogFiles) {
      staticPaths.push(`/blog/${file.replace(".js", "")}`);
    }
  } catch {
    // fallback — no crash
  }

  // IMPORTANT: dynamic generation from external API is fragile on serverless.
  // We’ll make it robust: cap pages, add timeouts, and never throw.
  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;

  const collegePaths = [];
  const MAX_PAGES = 60;          // 60 * 100 = 6000 schools max
  const PER_PAGE = 100;
  const TIMEOUT_MS = 8000;

  if (apiKey) {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const url =
          `https://api.data.gov/ed/collegescorecard/v1/schools.json` +
          `?api_key=${encodeURIComponent(apiKey)}` +
          `&per_page=${PER_PAGE}` +
          `&page=${page}` +
          `&fields=school.name`;

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { "User-Agent": "ihatecollege-sitemap/1.0" },
        });

        // If API fails, stop gracefully (never 500 your sitemap)
        if (!response.ok) break;

        let data;
        try {
          data = await response.json();
        } catch {
          break;
        }

        if (!data?.results?.length) break;

        for (const school of data.results) {
          const name = school?.["school.name"];
          if (!name || typeof name !== "string") continue;

          const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

          if (slug) collegePaths.push(`/college/${slug}`);
        }
      } catch {
        // Abort / network error / anything else -> stop, but do not crash
        break;
      } finally {
        clearTimeout(t);
      }
    }
  }

  const allPaths = [...staticPaths, ...collegePaths];

  const now = new Date().toISOString();
  const xmlUrls = allPaths
    .map(
      (path) => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${path === "" ? "daily" : "weekly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

  // Cache so Google/Vercel isn’t hammering this endpoint
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400"); // 6h CDN cache
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
