#!/usr/bin/env node
/**
 * generate-articles.js
 * Generates 3 SEO-optimized blog articles per day using Anthropic API,
 * saves them as Next.js pages to /pages/blog/, updates the sitemap,
 * then commits and pushes to GitHub.
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "pages", "blog");
const SITEMAP_PATH = path.join(ROOT, "pages", "sitemap.xml.js");

// Pool of rotating SEO topics — anti-college / trade / no-degree angle
const TOPIC_POOL = [
  { keyword: "is college worth it 2025", angle: "student debt vs earnings ROI" },
  { keyword: "trade school salary vs college 2025", angle: "electrician and plumber earnings" },
  { keyword: "how to make money without a degree", angle: "self-taught and freelance paths" },
  { keyword: "best trade schools in America 2025", angle: "top programs and costs" },
  { keyword: "college dropout success stories", angle: "billionaires and founders who skipped college" },
  { keyword: "cheapest way to get a good career", angle: "certs vs degrees" },
  { keyword: "apprenticeship programs near me 2025", angle: "paid apprenticeship guide" },
  { keyword: "google career certificates worth it", angle: "IT and cloud certs without college" },
  { keyword: "electrician salary 2025", angle: "how much electricians make by state" },
  { keyword: "student loan debt crisis 2025", angle: "latest statistics and borrower stories" },
  { keyword: "plumber vs lawyer salary", angle: "who actually earns more lifetime" },
  { keyword: "community college vs university", angle: "cost and outcome comparison" },
  { keyword: "coding bootcamp worth it 2025", angle: "bootcamp vs self-study vs CS degree" },
  { keyword: "highest paying trade jobs 2025", angle: "top 10 skilled trades by salary" },
  { keyword: "college major with best ROI", angle: "data on which degrees pay off" },
  { keyword: "HVAC technician salary 2025", angle: "HVAC career path and earnings" },
  { keyword: "should i go to college or work", angle: "decision framework for 18 year olds" },
  { keyword: "free online courses that get you hired", angle: "Coursera MIT AWS Google certs" },
  { keyword: "skilled trades shortage America", angle: "why tradespeople are in demand" },
  { keyword: "civil service jobs no degree required", angle: "government jobs with no degree" },
  // Trades & Apprenticeships
  { keyword: "welder salary 2025", angle: "pipeline vs structural welding earnings" },
  { keyword: "how to become an electrician without college", angle: "step-by-step apprenticeship guide" },
  { keyword: "plumber apprenticeship how to start", angle: "unions, pay, and timeline" },
  { keyword: "CDL truck driver salary 2025", angle: "OTR vs local vs regional earnings" },
  { keyword: "lineman apprenticeship salary", angle: "IBEW pay scale and career path" },
  { keyword: "pipe fitter salary 2025", angle: "industrial vs commercial pipefitting earnings" },
  { keyword: "ironworker apprenticeship", angle: "structural steel careers and union pay" },
  { keyword: "boilermaker apprenticeship pay", angle: "boilermaker career outlook and salary" },
  { keyword: "sheet metal worker salary", angle: "HVAC sheet metal vs aerospace pay" },
  { keyword: "millwright trade school salary", angle: "industrial millwright career path" },
  { keyword: "solar panel installer salary 2025", angle: "clean energy trades growth and pay" },
  { keyword: "wind turbine technician salary", angle: "fastest growing trade job in America" },
  { keyword: "fiber optic technician salary", angle: "telecom trade career path" },
  { keyword: "elevator mechanic salary", angle: "highest paid trade in America" },
  { keyword: "union vs non-union trade jobs", angle: "benefits, pay, and job security compared" },
  { keyword: "construction manager no degree", angle: "paths from trade to management" },
  { keyword: "offshore oil rig jobs no degree", angle: "roughneck salary and schedule" },
  // Tech & Certs
  { keyword: "cybersecurity certifications worth it 2025", angle: "CompTIA Security+ vs CEH vs CISSP ROI" },
  { keyword: "AWS certification salary 2025", angle: "cloud engineer pay without a degree" },
  { keyword: "CompTIA A+ certification jobs", angle: "IT helpdesk to sysadmin path" },
  { keyword: "network administrator no degree", angle: "certs that replace a CS degree" },
  { keyword: "IT helpdesk salary no degree", angle: "entry point to six-figure tech" },
  { keyword: "project management certification PMP salary", angle: "PMP vs MBA ROI" },
  { keyword: "drone pilot license salary 2025", angle: "FAA Part 107 commercial drone jobs" },
  { keyword: "freelance web developer income no degree", angle: "self-taught dev earning data" },
  { keyword: "social media manager salary no degree", angle: "how to break into digital marketing" },
  { keyword: "copywriter salary without degree", angle: "freelance vs agency copywriting income" },
  // Bad Degrees
  { keyword: "is a business degree worth it", angle: "ROI data for business majors" },
  { keyword: "computer science degree worth it 2025", angle: "CS degree vs self-taught vs bootcamp" },
  { keyword: "psychology degree jobs and salary", angle: "what psychology grads actually earn" },
  { keyword: "communications degree worth it", angle: "job outcomes and salary data" },
  { keyword: "art degree salary vs debt", angle: "worst ROI degrees by the numbers" },
  { keyword: "philosophy degree jobs 2025", angle: "what you can actually do with it" },
  { keyword: "sociology degree salary", angle: "earning outcomes for social science majors" },
  { keyword: "for-profit college scams 2025", angle: "list of predatory colleges and settlements" },
  { keyword: "college dropout rate 2025", angle: "who drops out and why the data shows" },
  // Government & Emergency
  { keyword: "firefighter salary 2025", angle: "firefighter pay by state and overtime" },
  { keyword: "police officer salary vs college degree", angle: "law enforcement pay and career path" },
  { keyword: "paramedic salary no degree required", angle: "EMT to paramedic career path and pay" },
  { keyword: "postal service jobs no degree", angle: "USPS salary, benefits, and retirement" },
  { keyword: "federal government jobs no degree required", angle: "GS pay scale entry-level paths" },
  // Side Hustles & Alternative Income
  { keyword: "real estate license vs degree salary", angle: "agent vs broker income without college" },
  { keyword: "insurance agent salary no degree", angle: "life insurance career income potential" },
  { keyword: "notary public income side hustle", angle: "loan signing agent earnings" },
  { keyword: "landscaping business owner income", angle: "trades entrepreneurship earnings" },
  { keyword: "plumbing business owner salary", angle: "how much plumbers make owning a business" },
  { keyword: "military vs college which is better", angle: "GI Bill, salary, and career outcomes compared" },
  { keyword: "gap year instead of college", angle: "what gap years actually do for careers" },
  { keyword: "income share agreement vs student loans", angle: "ISA programs and how they compare" },
  { keyword: "online degree worth it 2025", angle: "employer acceptance and salary outcomes" },
  { keyword: "aviation mechanic school salary", angle: "FAA A&P mechanic career and pay" },
  { keyword: "dental hygienist school no degree", angle: "two-year program earnings breakdown" },
  { keyword: "medical coding certification salary", angle: "remote healthcare jobs without a degree" },
  { keyword: "pharmacy technician no degree", angle: "certification path and earning potential" },
  { keyword: "nuclear power plant technician salary", angle: "highest paying no-degree energy job" },
];

// Hero image by topic keyword
const HERO_IMAGES = {
  electric:   "photo-1621905251918-48416bd8575a",
  lineman:    "photo-1621905251918-48416bd8575a",
  hvac:       "photo-1504328345606-18bbc8c9d7d1",
  plumb:      "photo-1558618666-fcd25c85cd64",
  weld:       "photo-1504328345606-18bbc8c9d7d1",
  truck:      "photo-1601584115197-04ecc0da31d7",
  cdl:        "photo-1601584115197-04ecc0da31d7",
  construct:  "photo-1504307651254-35680f356dfd",
  solar:      "photo-1509391366360-2e959784a276",
  wind:       "photo-1466611653911-95081537e5b7",
  cyber:      "photo-1550751827-4bd374c3f58b",
  tech:       "photo-1587440871875-191322ee64b0",
  code:       "photo-1587440871875-191322ee64b0",
  aws:        "photo-1587440871875-191322ee64b0",
  police:     "photo-1617817546271-6e3c6f9413e6",
  fire:       "photo-1582139329536-e7284fece509",
  military:   "photo-1541447271487-09612b3f49f7",
  government: "photo-1541614101331-1a5a3a194e92",
  federal:    "photo-1541614101331-1a5a3a194e92",
  postal:     "photo-1568598035424-7070b67317d2",
  healthcare: "photo-1581595219315-a187dd40c322",
  medical:    "photo-1581595219315-a187dd40c322",
  "real.estate":"photo-1560518883-ce09059eeffa",
  money:      "photo-1579621970563-ebec7560ff3e",
  debt:       "photo-1579621970563-ebec7560ff3e",
  salary:     "photo-1579621970563-ebec7560ff3e",
  college:    "photo-1523050854058-8df90110c9f1",
  degree:     "photo-1523050854058-8df90110c9f1",
  trade:      "photo-1621905251918-48416bd8575a",
};

function getHeroImage(keyword) {
  const kw = keyword.toLowerCase();
  for (const [k, id] of Object.entries(HERO_IMAGES)) {
    if (kw.includes(k)) {
      return `https://images.unsplash.com/${id}?w=1200&h=500&fit=crop&auto=format`;
    }
  }
  return `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=500&fit=crop&auto=format`;
}

// Pick 5 topics we haven't used recently
function pickTopics() {
  const usedFile = path.join(ROOT, ".used-topics.json");
  let used = [];
  if (fs.existsSync(usedFile)) {
    try { used = JSON.parse(fs.readFileSync(usedFile, "utf8")); } catch {}
  }
  const available = TOPIC_POOL.filter((t) => !used.includes(t.keyword));
  const pool = available.length >= 5 ? available : TOPIC_POOL; // reset if exhausted
  const picked = pool.slice(0, 5);
  const newUsed = [...used, ...picked.map((t) => t.keyword)].slice(-30);
  fs.writeFileSync(usedFile, JSON.stringify(newUsed, null, 2));
  return picked;
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function randomAuthor() {
  const authors = [
    { name: "Jake Morrison", initials: "JM", color: "from-sky-500 to-blue-700", bio: "Jake spent 6 years in higher education administration before leaving to write about the economics of college. He covers student debt, ROI, and career alternatives." },
    { name: "Sarah Chen", initials: "SC", color: "from-emerald-500 to-teal-700", bio: "Sarah is a labor economist who tracks trade wages and advises high schoolers on alternatives to four-year degrees. Former consultant, current advocate." },
    { name: "Marcus Webb", initials: "MW", color: "from-violet-500 to-purple-700", bio: "Marcus dropped out of a finance degree at 19, taught himself to code, and built a six-figure freelance career by 23. He writes about non-traditional paths." },
    { name: "Danielle Torres", initials: "DT", color: "from-rose-500 to-pink-700", bio: "Danielle is a career counselor who has helped over 400 students find trade apprenticeships and tech certifications as alternatives to expensive four-year degrees." },
    { name: "Ryan Kowalski", initials: "RK", color: "from-amber-500 to-orange-700", bio: "Ryan is a master electrician turned writer. After 15 years in the trades, he documents the financial realities of skilled work vs. the college path." },
  ];
  return authors[Math.floor(Math.random() * authors.length)];
}

async function generateArticle(topic) {
  console.log(`  Generating: "${topic.keyword}"...`);

  const prompt = `You are a writer for IHateCollege.com, a site that gives young people honest, data-driven information about whether college is worth it and what the alternatives are.

Write a comprehensive, SEO-optimized blog article targeting the keyword: "${topic.keyword}"
Angle: ${topic.angle}

Requirements:
- Minimum 1500 words
- Use real, specific statistics (BLS data, Gallup polls, Federal Reserve, etc.)
- Write in a direct, no-BS tone — not preachy, just factual
- Include an H1 title that naturally includes the keyword
- Include at least 6 H2 subheadings
- Include a numbered or bulleted list somewhere in the body
- End with a clear "bottom line" conclusion
- Do NOT use markdown formatting — return clean text sections separated by clear section markers
- Format your response as JSON with these fields:
  {
    "title": "SEO title (60 chars max)",
    "metaDescription": "meta description (155 chars max)",
    "h1": "Main article heading",
    "sections": [
      { "heading": "H2 heading", "content": "paragraph text..." },
      ...
    ],
    "conclusion": "concluding paragraph",
    "publishDate": "${new Date().toISOString().split("T")[0]}"
  }`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].text;
  // Extract JSON — strip markdown code fences if present
  const stripped = text.replace(/```(?:json)?\n?/g, "").trim();
  const jsonMatch = stripped.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in response: " + text.slice(0, 200));
  // Fix truncated JSON by ensuring it ends properly
  let jsonStr = jsonMatch[0];
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // Attempt to close truncated JSON
    const depth = (jsonStr.match(/\{/g) || []).length - (jsonStr.match(/\}/g) || []).length;
    jsonStr += "}".repeat(Math.max(0, depth));
    return JSON.parse(jsonStr);
  }
}

function buildPageJsx(article, topic, author) {
  const slug = slugify(topic.keyword);
  const heroImage = getHeroImage(topic.keyword);
  const sectionsJsx = article.sections
    .map(
      (s, i) => `
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">${s.heading}</h2>
          <p className="text-slate-300 leading-relaxed">${s.content.replace(/"/g, "&quot;").replace(/'/g, "&apos;")}</p>
        </section>
        ${i === 1 || i === 3 ? '<AdUnit slot="6600722153" />' : ""}
      `
    )
    .join("\n");

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.h1.replace(/"/g, "&quot;"),
    "description": article.metaDescription.replace(/"/g, "&quot;"),
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
    "author": { "@type": "Person", "name": author.name },
    "publisher": { "@type": "Organization", "name": "IHateCollege.com", "url": "https://ihatecollege.com" },
    "url": `https://ihatecollege.com/blog/${slug}`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://ihatecollege.com/blog/${slug}` }
  });

  return `import Head from "next/head";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import AdUnit from "../../components/AdUnit";
import Link from "next/link";

export default function BlogPost() {
  return (
    <Layout>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${articleSchema.replace(/`/g, "\\`")}\` }} />
      </Head>
      <SEO
        title="${article.title.replace(/"/g, '\\"')}"
        description="${article.metaDescription.replace(/"/g, '\\"')}"
      />

      <article className="max-w-3xl mx-auto px-4 py-12 text-slate-200">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">
            Blog &middot; ${article.publishDate}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            ${article.h1.replace(/"/g, '\\"')}
          </h1>
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
            <img
              src="${heroImage}"
              alt="${article.h1.replace(/"/g, '\\"')}"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Author bio */}
        <div className="flex items-center gap-4 mb-10 p-4 bg-slate-900/60 border border-slate-700 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br ${author.color} flex items-center justify-center text-white font-black text-lg shrink-0">
            ${author.initials}
          </div>
          <div>
            <div className="font-bold text-white text-sm">${author.name}</div>
            <div className="text-slate-400 text-xs leading-relaxed">${author.bio}</div>
          </div>
        </div>

        <AdUnit slot="6600722153" />

        ${sectionsJsx}

        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">The Bottom Line</h2>
          <p className="text-slate-300 leading-relaxed">${article.conclusion.replace(/"/g, "&quot;").replace(/'/g, "&apos;")}</p>
        </section>

        <AdUnit slot="6600722153" />

        <div className="mt-12 p-6 rounded-2xl bg-slate-900 border border-sky-500/30 text-center">
          <h3 className="text-xl font-black text-white mb-2">See All Your Options</h3>
          <p className="text-slate-400 text-sm mb-4">
            Compare trades, certs, apprenticeships, and more.
          </p>
          <Link href="/alternatives" className="inline-block px-6 py-3 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-400 transition-colors">
            Explore Alternatives
          </Link>
        </div>
      </article>
    </Layout>
  );
}
`;
}

function updateSitemap(newPaths) {
  let content = fs.readFileSync(SITEMAP_PATH, "utf8");
  // Find the last entry in staticPaths and insert after it
  const insertMarker = '"/how-to-make-money-without-a-college-degree",';
  const newEntries = newPaths.map((p) => `    "${p}",`).join("\n");
  if (!content.includes(insertMarker)) {
    console.log("  Warning: sitemap marker not found, skipping sitemap update");
    return;
  }
  // Only add paths not already present
  const toAdd = newPaths
    .filter((p) => !content.includes(`"${p}"`))
    .map((p) => `    "${p}",`)
    .join("\n");
  if (!toAdd) return;
  content = content.replace(insertMarker, `${insertMarker}\n${toAdd}`);
  fs.writeFileSync(SITEMAP_PATH, content);
  console.log(`  Sitemap updated with ${newPaths.length} new paths`);
}

function commitAndPush(slugs) {
  const dateStr = new Date().toISOString().split("T")[0];
  try {
    execSync("git add pages/blog/ pages/sitemap.xml.js .used-topics.json 2>/dev/null || true", { cwd: ROOT });
    execSync(
      `git commit -m "Auto-generate ${slugs.length} blog articles for ${dateStr}"`,
      { cwd: ROOT }
    );
    execSync("git push origin restore-good", { cwd: ROOT });
    execSync("git push origin restore-good:main --force", { cwd: ROOT });
    console.log("  Committed and pushed to GitHub");
  } catch (e) {
    console.error("  Git error:", e.message);
  }
}

async function run() {
  console.log("\n=== Article Generator ===");
  console.log(`Date: ${new Date().toISOString()}\n`);

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "your-anthropic-key-here") {
    console.error("ERROR: ANTHROPIC_API_KEY not set in .env");
    process.exit(1);
  }

  const topics = pickTopics();
  const slugs = [];

  for (const topic of topics) {
    try {
      const article = await generateArticle(topic);
      const author = randomAuthor();
      const slug = slugify(topic.keyword);
      const filename = `${slug}.js`;
      const filepath = path.join(BLOG_DIR, filename);
      const jsx = buildPageJsx(article, topic, author);

      fs.writeFileSync(filepath, jsx);
      slugs.push(`/blog/${slug}`);
      console.log(`  Saved: /pages/blog/${filename}`);

      // Delay between API calls
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  Failed for "${topic.keyword}":`, err.message);
    }
  }

  if (slugs.length > 0) {
    updateSitemap(slugs);
    commitAndPush(slugs);
  }

  console.log(`\nDone. Generated ${slugs.length}/5 articles.`);
}

run().catch(console.error);
