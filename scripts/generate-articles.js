#!/usr/bin/env node
/**
 * generate-articles.js
 * Generates 13 SEO articles per run, 4x/day = ~52 articles/day.
 * Runs 6AM, 10AM, 2PM, 6PM EST via run-daily.js on Railway.
 * Pushes to restore-good with [skip ci] to prevent Railway redeploy loop.
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

// Pool of 200+ rotating SEO topics — anti-college / trade / no-degree angle
const TOPIC_POOL = [
  // Anti-college / regret
  { keyword: "i hate college", angle: "why so many students regret going and what to do instead" },
  { keyword: "i hate college so much", angle: "you're not alone — here's why and what to do" },
  { keyword: "college is a waste of money", angle: "data proving college ROI is declining fast" },
  { keyword: "college is a scam", angle: "predatory pricing, useless degrees, and who profits" },
  { keyword: "why college is not worth it", angle: "earnings data vs debt load by major" },
  { keyword: "college regret statistics", angle: "how many graduates regret going to college" },
  { keyword: "drop out of college and succeed", angle: "famous dropouts and statistical outcomes" },
  { keyword: "college debt not worth it", angle: "when student loans cost more than they return" },
  { keyword: "should i drop out of college", angle: "decision framework with real financial data" },
  { keyword: "college dropout success stories", angle: "billionaires and founders who skipped college" },
  { keyword: "should i go to college or work", angle: "decision framework for 18 year olds" },
  { keyword: "college dropout rate 2026", angle: "who drops out and why the data shows" },
  { keyword: "for-profit college scams 2026", angle: "list of predatory colleges and settlements" },
  { keyword: "college tuition increase over time", angle: "how tuition outpaced inflation and wages since 1980" },
  { keyword: "college not worth it for everyone", angle: "who college actually works for and who it doesn't" },
  { keyword: "is a four year degree worth it", angle: "breaking down the real cost vs. lifetime earnings" },
  { keyword: "wasted money on a college degree", angle: "what graduates say about their degree ROI" },
  { keyword: "college makes you poor", angle: "the math behind how student debt destroys wealth" },
  { keyword: "university is a bad investment", angle: "investment analysis of a degree vs alternatives" },
  { keyword: "i regret going to college", angle: "common regrets and what you can still do about it" },
  { keyword: "liberal arts degree useless 2026", angle: "what employers actually think of liberal arts grads" },
  { keyword: "college acceptance rates dropping", angle: "how admissions pressure fuels the scam" },
  { keyword: "ivy league not worth it", angle: "data showing state schools often outperform Ivy grads" },
  // Worth it comparisons
  { keyword: "is college worth it 2026", angle: "student debt vs earnings ROI by major" },
  { keyword: "trade school salary vs college 2026", angle: "electrician and plumber vs 4-year grad earnings" },
  { keyword: "community college vs university", angle: "cost and outcome comparison with real data" },
  { keyword: "alternatives to college 2026", angle: "every legitimate path that pays without a degree" },
  { keyword: "cheapest way to get a good career", angle: "certs vs degrees — real cost comparison" },
  { keyword: "how to make money without a degree", angle: "self-taught and freelance paths that work" },
  { keyword: "best trade schools in America 2026", angle: "top programs, costs, and outcomes" },
  { keyword: "apprenticeship programs near me 2026", angle: "paid apprenticeship complete guide" },
  { keyword: "google career certificates worth it", angle: "IT and cloud certs without college" },
  { keyword: "free online courses that get you hired", angle: "Coursera MIT AWS Google certs" },
  { keyword: "income share agreement vs student loans", angle: "ISA programs compared" },
  { keyword: "online degree worth it 2026", angle: "employer acceptance and salary outcomes" },
  { keyword: "military vs college which is better", angle: "GI Bill, salary, and career outcomes compared" },
  { keyword: "gap year instead of college", angle: "what gap years actually do for careers" },
  { keyword: "plumber vs lawyer salary", angle: "who actually earns more over a lifetime" },
  { keyword: "college major with best ROI", angle: "data on which degrees actually pay off" },
  { keyword: "student loan debt crisis 2026", angle: "latest statistics and borrower stories" },
  // Trades — electrician
  { keyword: "electrician salary 2026", angle: "how much electricians make by state" },
  { keyword: "how to become an electrician without college", angle: "step-by-step apprenticeship guide" },
  { keyword: "lineman apprenticeship salary", angle: "IBEW pay scale and career path" },
  { keyword: "master electrician salary 2026", angle: "what it takes and what you earn" },
  { keyword: "electrician vs engineer salary", angle: "trades vs degree earnings over 30 years" },
  { keyword: "IBEW apprenticeship how to join", angle: "step by step guide to electrical union" },
  { keyword: "journeyman electrician salary by state", angle: "best states to work as an electrician" },
  // Trades — plumbing
  { keyword: "plumber apprenticeship how to start", angle: "unions, pay, and timeline to journeyman" },
  { keyword: "plumbing business owner salary", angle: "how much plumbers make owning a business" },
  { keyword: "how much do plumbers make 2026", angle: "plumber salary by state and experience" },
  // Trades — HVAC
  { keyword: "HVAC technician salary 2026", angle: "HVAC career path and earnings" },
  { keyword: "how to become an HVAC technician", angle: "training, certs, and salary expectations" },
  { keyword: "HVAC vs electrician salary", angle: "which trade pays better in 2026" },
  // Trades — welding
  { keyword: "welder salary 2026", angle: "pipeline vs structural welding earnings" },
  { keyword: "underwater welder salary", angle: "the highest paid welding specialty" },
  { keyword: "how to become a welder without college", angle: "welding school vs apprenticeship" },
  // Trades — other
  { keyword: "CDL truck driver salary 2026", angle: "OTR vs local vs regional earnings" },
  { keyword: "pipe fitter salary 2026", angle: "industrial vs commercial pipefitting earnings" },
  { keyword: "ironworker apprenticeship", angle: "structural steel careers and union pay" },
  { keyword: "boilermaker apprenticeship pay", angle: "boilermaker career outlook and salary" },
  { keyword: "sheet metal worker salary", angle: "HVAC sheet metal vs aerospace pay" },
  { keyword: "millwright trade school salary", angle: "industrial millwright career path" },
  { keyword: "solar panel installer salary 2026", angle: "clean energy trades growth and pay" },
  { keyword: "wind turbine technician salary", angle: "fastest growing trade job in America" },
  { keyword: "fiber optic technician salary", angle: "telecom trade career path and earnings" },
  { keyword: "elevator mechanic salary", angle: "highest paid trade in America" },
  { keyword: "union vs non-union trade jobs", angle: "benefits, pay, and job security compared" },
  { keyword: "construction manager no degree", angle: "paths from trade worker to management" },
  { keyword: "offshore oil rig jobs no degree", angle: "roughneck salary and offshore schedule" },
  { keyword: "highest paying trade jobs 2026", angle: "top 10 skilled trades by average salary" },
  { keyword: "skilled trades shortage America", angle: "why tradespeople are in demand and command premium pay" },
  { keyword: "aviation mechanic school salary", angle: "FAA A&P mechanic career and pay" },
  { keyword: "nuclear power plant technician salary", angle: "highest paying no-degree energy job" },
  { keyword: "pipeline welder salary", angle: "most lucrative welding specialty explained" },
  { keyword: "heavy equipment operator salary 2026", angle: "operating engineers union pay and career" },
  { keyword: "mason bricklayer salary 2026", angle: "masonry trade pay and apprenticeship path" },
  { keyword: "carpenter apprenticeship salary", angle: "union carpenter pay by region and level" },
  { keyword: "roofer salary 2026", angle: "roofing trade career path and earnings" },
  { keyword: "concrete finisher salary", angle: "concrete trade pay and career outlook" },
  { keyword: "crane operator salary 2026", angle: "one of the best paid construction trades" },
  { keyword: "sprinkler fitter apprenticeship", angle: "fire protection trade pay and career path" },
  { keyword: "insulation installer salary", angle: "energy efficiency trade pay and outlook" },
  { keyword: "tile setter salary 2026", angle: "flooring trade career path and income" },
  // Tech & certs
  { keyword: "cybersecurity certifications worth it 2026", angle: "CompTIA Security+ vs CEH vs CISSP ROI" },
  { keyword: "AWS certification salary 2026", angle: "cloud engineer pay without a degree" },
  { keyword: "CompTIA A+ certification jobs", angle: "IT helpdesk to sysadmin path without college" },
  { keyword: "network administrator no degree", angle: "certs that replace a CS degree" },
  { keyword: "IT helpdesk salary no degree", angle: "entry point to six-figure tech career" },
  { keyword: "project management certification PMP salary", angle: "PMP vs MBA ROI comparison" },
  { keyword: "drone pilot license salary 2026", angle: "FAA Part 107 commercial drone jobs" },
  { keyword: "freelance web developer income no degree", angle: "self-taught dev earning data" },
  { keyword: "social media manager salary no degree", angle: "how to break into digital marketing" },
  { keyword: "copywriter salary without degree", angle: "freelance vs agency copywriting income" },
  { keyword: "coding bootcamp worth it 2026", angle: "bootcamp vs self-study vs CS degree ROI" },
  { keyword: "google IT support certificate salary", angle: "what you earn after Google IT cert" },
  { keyword: "data analyst no degree salary", angle: "SQL Python path to six figures without college" },
  { keyword: "UI UX designer salary no degree", angle: "portfolio-based design career path" },
  { keyword: "DevOps engineer without degree", angle: "Linux certs and cloud skills that get you hired" },
  { keyword: "Salesforce certification salary", angle: "CRM admin and developer pay without degree" },
  { keyword: "certified ethical hacker salary", angle: "CEH certification career and pay" },
  { keyword: "CISSP certification salary 2026", angle: "senior security role pay without a CS degree" },
  { keyword: "help desk to sysadmin no degree", angle: "career ladder in IT without college" },
  { keyword: "cybersecurity analyst no degree 2026", angle: "how to break into security without college" },
  { keyword: "Microsoft Azure certification salary", angle: "Azure cloud jobs that skip the degree" },
  { keyword: "Cisco CCNA salary 2026", angle: "network engineering pay with just a cert" },
  { keyword: "Python programming jobs no degree", angle: "how self-taught devs land six figures" },
  { keyword: "game developer salary no degree", angle: "portfolio path into game development" },
  { keyword: "IT project manager no degree", angle: "PMP path without a four-year degree" },
  // Bad degrees
  { keyword: "is a business degree worth it", angle: "ROI data for business majors vs alternatives" },
  { keyword: "computer science degree worth it 2026", angle: "CS degree vs self-taught vs bootcamp" },
  { keyword: "psychology degree jobs and salary", angle: "what psychology grads actually earn" },
  { keyword: "communications degree worth it", angle: "job outcomes and salary data" },
  { keyword: "art degree salary vs debt", angle: "worst ROI degrees by the numbers" },
  { keyword: "philosophy degree jobs 2026", angle: "what you can actually do with a philosophy degree" },
  { keyword: "sociology degree salary", angle: "earning outcomes for social science majors" },
  { keyword: "english degree worth it 2026", angle: "job outcomes for English majors" },
  { keyword: "history degree jobs 2026", angle: "what history majors actually end up doing" },
  { keyword: "gender studies degree salary", angle: "employment outcomes for gender studies majors" },
  { keyword: "political science degree salary", angle: "what poli sci grads actually earn" },
  { keyword: "anthropology degree worth it", angle: "job market reality for anthropology grads" },
  { keyword: "fine arts degree salary", angle: "the real financial outcome of an art school degree" },
  { keyword: "theater degree worth it", angle: "performing arts degree vs trade salary comparison" },
  { keyword: "journalism degree worth it 2026", angle: "media industry collapse and grad outcomes" },
  { keyword: "education degree worth it", angle: "teacher salary vs debt — is it worth it?" },
  // Government & emergency services
  { keyword: "firefighter salary 2026", angle: "firefighter pay by state and overtime income" },
  { keyword: "police officer salary vs college degree", angle: "law enforcement pay and career path" },
  { keyword: "paramedic salary no degree required", angle: "EMT to paramedic career path and pay" },
  { keyword: "postal service jobs no degree", angle: "USPS salary, benefits, and retirement pension" },
  { keyword: "federal government jobs no degree required", angle: "GS pay scale entry-level paths" },
  { keyword: "air traffic controller salary no degree", angle: "FAA career path and six-figure pay" },
  { keyword: "border patrol agent salary 2026", angle: "federal law enforcement career and pay" },
  { keyword: "coast guard salary benefits", angle: "military branch with no degree requirement" },
  { keyword: "TSA officer salary 2026", angle: "federal airport security pay and career" },
  { keyword: "park ranger salary no degree", angle: "national park service career path" },
  { keyword: "correctional officer salary 2026", angle: "prison officer pay, pension, and career" },
  { keyword: "DEA agent salary requirements", angle: "federal drug enforcement career without degree" },
  { keyword: "sheriff deputy salary 2026", angle: "local law enforcement pay by state" },
  { keyword: "army civilian jobs no degree", angle: "civilian DOD jobs that skip the college requirement" },
  // Healthcare (no 4-year degree)
  { keyword: "dental hygienist school no degree", angle: "two-year program earnings breakdown" },
  { keyword: "medical coding certification salary", angle: "remote healthcare jobs without a degree" },
  { keyword: "pharmacy technician no degree", angle: "certification path and earning potential" },
  { keyword: "surgical technologist salary 2026", angle: "OR tech pay and two-year program path" },
  { keyword: "radiologic technologist salary 2026", angle: "X-ray tech career with an associates degree" },
  { keyword: "respiratory therapist salary no degree", angle: "two-year RT program salary outcomes" },
  { keyword: "phlebotomist salary 2026", angle: "fastest entry into healthcare with no degree" },
  { keyword: "EMT salary and career path 2026", angle: "emergency medical career without college" },
  { keyword: "medical assistant salary 2026", angle: "clinical admin career without a 4-year degree" },
  { keyword: "occupational therapy assistant salary", angle: "OTA two-year degree pay and career" },
  { keyword: "physical therapy assistant salary", angle: "PTA associate degree vs PT bachelor earnings" },
  { keyword: "MRI technician salary no degree", angle: "imaging tech career and pay with 2-year program" },
  { keyword: "veterinary technician salary 2026", angle: "vet tech career path without a 4-year degree" },
  // Side hustles & entrepreneurship
  { keyword: "real estate license vs degree salary", angle: "agent vs broker income without college" },
  { keyword: "insurance agent salary no degree", angle: "life insurance career income potential" },
  { keyword: "notary public income side hustle", angle: "loan signing agent earnings potential" },
  { keyword: "landscaping business owner income", angle: "trades entrepreneurship earnings and startup" },
  { keyword: "how to start a pressure washing business", angle: "low cost trade business that scales fast" },
  { keyword: "cleaning business owner income", angle: "commercial cleaning profit margins and startup" },
  { keyword: "hvac business owner salary", angle: "how much HVAC contractors make owning their company" },
  { keyword: "electrician business owner salary", angle: "what electrical contractors earn vs employees" },
  { keyword: "how to start a roofing company", angle: "roofing business startup and profit potential" },
  { keyword: "trucking company owner operator salary", angle: "owner-operator income vs company driver" },
  { keyword: "dropshipping income no degree", angle: "ecommerce side hustle that replaces college" },
  { keyword: "amazon fba seller income", angle: "how much FBA sellers make without a degree" },
  { keyword: "stock market investing without college", angle: "self-directed investing vs finance degree" },
  { keyword: "real estate investing without a degree", angle: "property income paths with no college" },
  // College-specific critiques
  { keyword: "liberal arts college worth it 2026", angle: "hard data on liberal arts graduate outcomes" },
  { keyword: "student loan forgiveness 2026", angle: "what forgiveness programs exist and who qualifies" },
  { keyword: "college application process too stressful", angle: "how the college industrial complex creates anxiety" },
  { keyword: "college mental health crisis", angle: "student mental health stats and whether college helps" },
  { keyword: "college drinking culture consequences", angle: "what nobody tells you about campus life" },
  { keyword: "greek life worth it", angle: "fraternity and sorority ROI in actual career terms" },
  { keyword: "college athletes exploited", angle: "how schools profit while athletes stay broke" },
  { keyword: "college financial aid scams", angle: "FAFSA loopholes and institutional aid manipulation" },
  { keyword: "college admissions scandal aftermath", angle: "what Varsity Blues revealed about college value" },
  { keyword: "student debt by major 2026", angle: "which majors carry the highest loan burdens" },
  { keyword: "college campus politics too extreme", angle: "how campus ideology affects career outcomes" },
  { keyword: "conservative alternatives to college", angle: "trade and service paths favored by conservatives" },
  { keyword: "why conservatives distrust college", angle: "the political economy of university skepticism" },
  // Salary deep dives
  { keyword: "six figure jobs without college degree", angle: "proven paths to $100k without a BA" },
  { keyword: "how to make 100k without college", angle: "specific career paths with salary data" },
  { keyword: "highest paying jobs no degree required 2026", angle: "top 20 no-degree jobs over $70k" },
  { keyword: "blue collar millionaires", angle: "how trade workers build seven-figure wealth" },
  { keyword: "white collar vs blue collar income 2026", angle: "which actually pays better after debt" },
  { keyword: "overtime pay trades vs office jobs", angle: "how OT pushes trade income past white collar" },
  { keyword: "union pension vs 401k which is better", angle: "retirement comparison for trade vs office workers" },
  { keyword: "job security trades vs corporate", angle: "which career survives recession better" },
  { keyword: "remote jobs no degree 2026", angle: "work from home careers that skip college" },
  { keyword: "entry level jobs that pay well 2026", angle: "best first jobs for people skipping college" },
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

// 13 per run × 4 runs/day = 52 articles/day
const ARTICLES_PER_RUN = 13;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickTopics() {
  const usedFile = path.join(ROOT, ".used-topics.json");
  let used = [];
  if (fs.existsSync(usedFile)) {
    try { used = JSON.parse(fs.readFileSync(usedFile, "utf8")); } catch {}
  }
  // Filter out recently used, shuffle remainder, reset when pool runs low
  let available = TOPIC_POOL.filter((t) => !used.includes(t.keyword));
  if (available.length < ARTICLES_PER_RUN) {
    used = []; // reset — cycle through all topics again
    available = [...TOPIC_POOL];
  }
  const picked = shuffle(available).slice(0, ARTICLES_PER_RUN);
  // Only keep last 100 used to allow gradual recycling
  const newUsed = [...used, ...picked.map((t) => t.keyword)].slice(-100);
  fs.writeFileSync(usedFile, JSON.stringify(newUsed, null, 2));
  return picked;
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function randomPast2026Date() {
  // Random date between 2026-01-01 and yesterday — always before today
  const start = new Date("2026-01-01").getTime();
  const yesterday = Date.now() - 86400000;
  const ms = start + Math.random() * (yesterday - start);
  return new Date(ms).toISOString().split("T")[0];
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
    "publishDate": "${randomPast2026Date()}"
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

  return `// date: ${article.publishDate}
// keyword: ${topic.keyword}
// author: ${author.name}
import Head from "next/head";
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

        <div className="mt-12 p-6 rounded-2xl text-center" style={{background:"#111",border:"1px solid #ff2020"}}>
          <h3 className="text-xl font-black text-white mb-2">Stop Paying For A Piece of Paper</h3>
          <p className="text-slate-400 text-sm mb-6">Use our free tools to map your path without debt.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/debt-calculator" style={{background:"#ff2020",color:"#fff",fontWeight:900,padding:"12px 22px",borderRadius:8,textDecoration:"none",fontSize:14}}>Calculate My Debt</Link>
            <Link href="/alternatives" style={{background:"#1a1a1a",color:"#fff",fontWeight:900,padding:"12px 22px",borderRadius:8,textDecoration:"none",fontSize:14,border:"1px solid #2a2a2a"}}>Explore Alternatives</Link>
            <Link href="/trade-schools" style={{background:"#1a1a1a",color:"#fff",fontWeight:900,padding:"12px 22px",borderRadius:8,textDecoration:"none",fontSize:14,border:"1px solid #2a2a2a"}}>Trade Schools</Link>
          </div>
        </div>

        <div className="mt-8 p-5 rounded-xl" style={{background:"#0d0d0d",border:"1px solid #2a2a2a"}}>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Keep Reading</p>
          <div className="flex flex-col gap-2">
            <Link href="/is-college-worth-it-2026" className="text-slate-300 hover:text-white text-sm font-semibold">→ Is College Worth It in 2026? The Real ROI Data</Link>
            <Link href="/trade-school-vs-college-salary-2026" className="text-slate-300 hover:text-white text-sm font-semibold">→ Trade School vs College Salary: Who Actually Wins?</Link>
            <Link href="/blog/highest-paying-trade-jobs-2026" className="text-slate-300 hover:text-white text-sm font-semibold">→ The 8 Highest-Paying Trade Jobs in 2026</Link>
            <Link href="/blog/student-loan-debt-crisis-2026" className="text-slate-300 hover:text-white text-sm font-semibold">→ The Student Loan Crisis Is Worse Than You Think</Link>
          </div>
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
    // On Railway, set git identity and use token-authenticated remote
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (GITHUB_TOKEN) {
      try {
        execSync("git config user.email 'bot@ihatecollege.com'", { cwd: ROOT });
        execSync("git config user.name 'IHateCollege Bot'", { cwd: ROOT });
        execSync(`git remote set-url origin https://placebetsai:${GITHUB_TOKEN}@github.com/placebetsai/Ihatecollege.git`, { cwd: ROOT });
      } catch {}
    }
    execSync("git add pages/blog/ pages/sitemap.xml.js .used-topics.json 2>/dev/null || true", { cwd: ROOT });
    execSync(
      `git commit -m "Auto-generate ${slugs.length} blog articles for ${dateStr} [skip ci] [railway skip]"`,
      { cwd: ROOT }
    );
    execSync("git push origin restore-good", { cwd: ROOT });
    execSync("git push origin restore-good:main", { cwd: ROOT });
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

  console.log(`\nDone. Generated ${slugs.length}/${ARTICLES_PER_RUN} articles.`);
}

run().catch(console.error);
