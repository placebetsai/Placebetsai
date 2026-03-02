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
];

// Pick 3 topics we haven't used recently
function pickTopics() {
  const usedFile = path.join(ROOT, ".used-topics.json");
  let used = [];
  if (fs.existsSync(usedFile)) {
    try { used = JSON.parse(fs.readFileSync(usedFile, "utf8")); } catch {}
  }
  const available = TOPIC_POOL.filter((t) => !used.includes(t.keyword));
  const pool = available.length >= 3 ? available : TOPIC_POOL; // reset if exhausted
  const picked = pool.slice(0, 3);
  const newUsed = [...used, ...picked.map((t) => t.keyword)].slice(-20);
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
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].text;
  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in response");
  return JSON.parse(jsonMatch[0]);
}

function buildPageJsx(article, topic, author) {
  const slug = slugify(topic.keyword);
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

  return `import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import AdUnit from "../../components/AdUnit";
import Link from "next/link";

export default function BlogPost() {
  return (
    <Layout>
      <SEO
        title="${article.title.replace(/"/g, '\\"')}"
        description="${article.metaDescription.replace(/"/g, '\\"')}"
      />

      <article className="max-w-3xl mx-auto px-4 py-12 text-slate-200">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">
            Blog &middot; ${article.publishDate}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            ${article.h1.replace(/"/g, '\\"')}
          </h1>
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

  console.log(`\nDone. Generated ${slugs.length}/3 articles.`);
}

run().catch(console.error);
