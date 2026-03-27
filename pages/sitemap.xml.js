// pages/sitemap.xml.js
import fs from "fs";
import path from "path";

function loadCollegesFromFile() {
  try {
    const file = path.join(process.cwd(), "data", "colleges.json");
    if (!fs.existsSync(file)) return [];
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return (data.colleges || []).map((c) => c.slug).filter(Boolean);
  } catch {
    return [];
  }
}

// Fallback: the hardcoded list from college/[slug].js
const FALLBACK_SLUGS = [
  "harvard-university","mit","stanford-university","yale-university",
  "princeton-university","columbia-university","university-of-pennsylvania",
  "dartmouth-college","brown-university","cornell-university",
  "duke-university","northwestern-university","vanderbilt-university",
  "georgetown-university","carnegie-mellon-university","washington-univ-in-st-louis",
  "rice-university","notre-dame-university","emory-university","tufts-university",
  "university-of-southern-california","boston-university","northeastern-university",
  "new-york-university","wake-forest-university","tulane-university",
  "lehigh-university","rensselaer-polytechnic-institute","uc-berkeley","ucla",
  "university-of-michigan","unc-chapel-hill","university-of-virginia","georgia-tech",
  "uc-san-diego","uc-santa-barbara","uc-davis","university-of-illinois-urbana",
  "university-of-wisconsin-madison","purdue-university","university-of-washington",
  "ohio-state-university","penn-state-university","michigan-state-university",
  "university-of-florida","florida-state-university","university-of-texas-at-austin",
  "texas-a-m-university","university-of-maryland","rutgers-university",
  "university-of-minnesota","indiana-university","university-of-colorado-boulder",
  "arizona-state-university","university-of-arizona","university-of-oregon",
  "virginia-tech","nc-state-university","clemson-university","auburn-university",
  "university-of-alabama","louisiana-state-university","university-of-tennessee",
  "university-of-iowa","university-of-pittsburgh","suny-buffalo",
  "stony-brook-university","university-of-nebraska","university-of-kansas",
  "university-of-missouri","west-virginia-university","mississippi-state-university",
  "devry-university","full-sail-university","strayer-university",
  "grand-canyon-university","santa-monica-college","miami-dade-college",
  "valencia-college","broward-college","houston-community-college",
  "ivy-tech-community-college",
];

export async function getServerSideProps({ res }) {
  const siteUrl = "https://ihatecollege.com";

  // Core static pages
  const staticPaths = [
    "",
    "/college-rankings",
    "/alternatives",
    "/trade-schools",
    "/debt-calculator",
    "/rank-your-school",
    "/civil-service",
    "/liberal-vs-conservative",
    "/job-board",
    "/job-board/post",
    "/jobs",
    "/contact",
    "/about",
    "/advertise",
    "/press",
    "/blog",
    "/is-college-worth-it-2025",
    "/trade-school-vs-college-salary-2025",
    "/how-to-make-money-without-a-college-degree",
    "/blog/college-acceptance-rates-dropping",
    "/blog/trade-school-salary-vs-college-2026",
    "/blog/college-mental-health-crisis",
    "/blog/data-analyst-no-degree-salary",
    "/blog/political-science-degree-salary",
    "/blog/cybersecurity-certifications-worth-it-2026",
    "/blog/why-conservatives-distrust-college",
    "/blog/army-civilian-jobs-no-degree",
    "/blog/for-profit-college-scams-2026",
    "/blog/remote-jobs-no-degree-2026",
    "/blog/college-drinking-culture-consequences",
    "/blog/occupational-therapy-assistant-salary",
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
    "/blog/google-career-certificates-worth-it",
    "/blog/college-debt-not-worth-it",
  ];

  // Auto-discover all blog files
  try {
    const blogDir = path.join(process.cwd(), "pages", "blog");
    const blogFiles = fs.readdirSync(blogDir).filter(
      (f) => f.endsWith(".js") && f !== "index.js"
    );
    for (const file of blogFiles) {
      const p = `/blog/${file.replace(".js", "")}`;
      if (!staticPaths.includes(p)) staticPaths.push(p);
    }
  } catch {}

  // College slugs: read from pre-built file (fast, no API calls at runtime)
  let collegeSlugs = loadCollegesFromFile();
  if (collegeSlugs.length === 0) {
    // Fallback to hardcoded list if JSON doesn't exist yet
    collegeSlugs = FALLBACK_SLUGS;
  }

  const collegePaths = collegeSlugs.map((slug) => `/college/${slug}`);
  const allPaths = [...staticPaths, ...collegePaths];

  const HIGH_PRIORITY = new Set([
    "", "/blog", "/job-board", "/trade-schools", "/alternatives",
    "/college-rankings", "/debt-calculator", "/civil-service",
    "/is-college-worth-it-2025", "/how-to-make-money-without-a-college-degree",
    "/trade-school-vs-college-salary-2025", "/liberal-vs-conservative",
    "/blog/i-hate-college", "/blog/i-hate-college-so-much",
    "/blog/college-is-a-scam", "/blog/college-is-a-waste-of-money",
    "/blog/why-college-is-not-worth-it", "/blog/alternatives-to-college-2025",
    "/blog/is-college-worth-it-2025", "/blog/trade-school-salary-vs-college-2025",
    "/blog/student-loan-debt-crisis-2025", "/blog/highest-paying-trade-jobs-2025",
    "/blog/college-dropout-success-stories",
  ]);
  const now = new Date().toISOString();
  const xmlUrls = allPaths
    .map((p) => {
      const priority = p === "" ? "1.0"
        : HIGH_PRIORITY.has(p) ? "0.95"
        : p.startsWith("/blog/") ? "0.85"
        : p.startsWith("/college/") ? "0.70"
        : "0.80";
      const changefreq = p === "" || p === "/blog" ? "daily" : p.startsWith("/blog/") ? "weekly" : "monthly";
      return `
  <url>
    <loc>${siteUrl}${p}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
