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
    "/job-board",
    "/job-board/post",
    "/contact",
    "/about",
    "/advertise",
    "/press",
    "/blog",
    "/is-college-worth-it-2025",
    "/trade-school-vs-college-salary-2025",
    "/how-to-make-money-without-a-college-degree",
    "/blog/i-hate-college",
    "/blog/i-hate-college-so-much",
    "/blog/college-is-a-waste-of-money",
    "/blog/college-is-a-scam",
    "/blog/why-college-is-not-worth-it",
    "/blog/college-regret-statistics",
    "/blog/drop-out-of-college-and-succeed",
    "/blog/alternatives-to-college-2025",
    "/blog/should-i-drop-out-of-college",
    "/blog/is-college-worth-it-2025",
    "/blog/trade-school-salary-vs-college-2025",
    "/blog/how-to-make-money-without-a-degree",
    "/blog/best-trade-schools-in-america-2025",
    "/blog/college-dropout-success-stories",
    "/blog/cheapest-way-to-get-a-good-career",
    "/blog/apprenticeship-programs-near-me-2025",
    "/blog/electrician-salary-2025",
    "/blog/student-loan-debt-crisis-2025",
    "/blog/plumber-vs-lawyer-salary",
    "/blog/community-college-vs-university",
    "/blog/coding-bootcamp-worth-it-2025",
    "/blog/highest-paying-trade-jobs-2025",
    "/blog/college-major-with-best-roi",
    "/blog/hvac-technician-salary-2025",
    "/blog/should-i-go-to-college-or-work",
    "/blog/free-online-courses-that-get-you-hired",
    "/blog/skilled-trades-shortage-america",
    "/blog/civil-service-jobs-no-degree-required",
    "/blog/welder-salary-2025",
    "/blog/how-to-become-an-electrician-without-college",
    "/blog/cdl-truck-driver-salary-2025",
    "/blog/lineman-apprenticeship-salary",
    "/blog/pipe-fitter-salary-2025",
    "/blog/ironworker-apprenticeship",
    "/blog/boilermaker-apprenticeship-pay",
    "/blog/sheet-metal-worker-salary",
    "/blog/millwright-trade-school-salary",
    "/blog/solar-panel-installer-salary-2025",
    "/blog/wind-turbine-technician-salary",
    "/blog/fiber-optic-technician-salary",
    "/blog/elevator-mechanic-salary",
    "/blog/union-vs-non-union-trade-jobs",
    "/blog/offshore-oil-rig-jobs-no-degree",
    "/blog/cybersecurity-certifications-worth-it-2025",
    "/blog/aws-certification-salary-2025",
    "/blog/comptia-a-certification-jobs",
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
