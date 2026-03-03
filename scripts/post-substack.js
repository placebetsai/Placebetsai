#!/usr/bin/env node
/**
 * post-substack.js
 * Generates 3-5 wrestling articles per day and posts them to
 * mondaynightwrestling.com (Substack) with fake authors and
 * contextual backlinks to ihatecollege.com + spanishtvshows.com
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const axios = require("axios");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const PUB_URL = (process.env.SUBSTACK_PUB_URL || "https://mondaynightwrestling.com").replace(/\/$/, "");

// ─── Fake author pool ────────────────────────────────────────────────────────
const AUTHORS = [
  { name: "Rick Dominguez",   bio: "Rick has covered pro wrestling for 15 years, from indie shows in New Jersey to WrestleMania press rows. Former contributor to Pro Wrestling Illustrated." },
  { name: "Tommy Hargrove",   bio: "Tommy is a lifelong wrestling fan turned journalist. He broke into the business writing for regional wrestling newsletters in the early 2000s." },
  { name: "Janelle Okafor",   bio: "Janelle covers women's wrestling, storyline analysis, and the business side of sports entertainment. Based in Atlanta." },
  { name: "Carlos Menéndez",  bio: "Carlos is a bilingual wrestling journalist who covers WWE, AEW, AAA, and CMLL. He bridges English and Spanish wrestling fanbases." },
  { name: "Brett Kowalczyk",  bio: "Brett is a wrestling stats obsessive. He tracks win/loss records, title reigns, and pay-per-view buyrates going back to 1985." },
  { name: "Dani Ferraro",     bio: "Dani covers wrestling from the performer's perspective — injuries, career arcs, contract disputes, and life after the ring." },
  { name: "Marcus Ostrowski", bio: "Marcus does deep dives on wrestling history, forgotten territories, and the guys who never got the push they deserved." },
  { name: "Tanya Whitfield",  bio: "Tanya covers AEW, Ring of Honor, and the indie scene. She runs a popular wrestling Discord with 12,000 members." },
];

// ─── Topic pool ──────────────────────────────────────────────────────────────
const TOPICS = [
  { subject: "WWE RAW weekly recap and match grades",           angle: "match results, storyline grades, best moments" },
  { subject: "AEW Dynamite recap and ratings analysis",        angle: "match grades, feuds, TV ratings breakdown" },
  { subject: "SmackDown recap and power rankings",             angle: "who's rising, who's falling, title picture" },
  { subject: "AEW Collision results and highlights",           angle: "match results, surprise appearances, ratings" },
  { subject: "WWE pay-per-view preview and predictions",       angle: "match-by-match predictions with historical context" },
  { subject: "AEW pay-per-view predictions and analysis",     angle: "card breakdown, title match scenarios" },
  { subject: "Top 10 highest paid WWE wrestlers 2025",         angle: "contract values, downside guarantees, bonuses" },
  { subject: "WWE vs AEW roster depth comparison 2025",        angle: "star power, mid-card, tag teams, women's division" },
  { subject: "best wrestling matches of the month",            angle: "star ratings, what made each match special" },
  { subject: "history of the WWE Championship lineage",        angle: "greatest title reigns, shocking losses, longest reigns" },
  { subject: "indie wrestling stars who should be in WWE 2025", angle: "names WWE should sign immediately" },
  { subject: "greatest WrestleMania matches of all time",      angle: "ranked list with analysis of what made them iconic" },
  { subject: "wrestling legend career retrospective",          angle: "peak years, best matches, legacy assessment" },
  { subject: "lucha libre stars crossing over to WWE and AEW", angle: "LA Knight, Rey Mysterio, Latin talent in major promotions" },
  { subject: "women's wrestling revolution 2025 state of play", angle: "best workers, title pictures, who's been booked strong" },
  { subject: "wrestling injuries: stars on the shelf in 2025", angle: "who's hurt, expected return dates, career impact" },
  { subject: "AEW vs WWE Monday night ratings war 2025",       angle: "weekly viewership numbers and trend analysis" },
  { subject: "best wrestling promos of all time ranked",       angle: "Austin 3:16, Pipe Bomb, Dusty Rhodes, Ric Flair" },
  { subject: "CM Punk's impact back in WWE 2025",              angle: "feuds, title picture, crowd reactions, business impact" },
  { subject: "Cody Rhodes title reign analysis",               angle: "defenses, booking quality, long-term storytelling" },
  { subject: "tag team wrestling is thriving in 2025",         angle: "best teams in WWE and AEW, what makes a great team" },
  { subject: "wrestler salaries: what do WWE stars really earn", angle: "downside guarantees, merch cuts, PPV bonuses" },
  { subject: "greatest heels in wrestling history",             angle: "ranked list of all-time top villains and why they worked" },
  { subject: "NXT vs AEW developmental talent pipeline",       angle: "who's coming up, who's ready for the main roster" },
  { subject: "Japanese wrestling influence on WWE and AEW 2025", angle: "NJPW crossovers, strong style, Shinsuke Nakamura legacy" },
  { subject: "wrestling video games ranked best to worst 2025", angle: "WWE 2K25 review, classic games, what fans want" },
  { subject: "MMA vs pro wrestling: crossover fighters in 2025", angle: "Brock Lesnar blueprint, who's crossed over successfully" },
  { subject: "wrestling merchandise revenue breakdown 2025",   angle: "who sells the most shirts, action figures, collectibles" },
  { subject: "best wrestling documentaries and series to watch", angle: "WWE Network, Netflix, HBO docs ranked" },
  { subject: "wrestling podcasts you should be listening to",  angle: "top shows, hosts, weekly must-listens" },
];

// ─── Image pool (Unsplash wrestling/sports CDN IDs) ──────────────────────────
const IMAGE_QUERIES = [
  "professional+wrestling",
  "WWE+wrestling",
  "wrestling+ring",
  "boxing+ring",
  "combat+sports",
  "sports+entertainment",
];

function getImageUrl() {
  const q = IMAGE_QUERIES[Math.floor(Math.random() * IMAGE_QUERIES.length)];
  return `https://source.unsplash.com/featured/1200x630/?${q}`;
}

// ─── Pick topics not used recently ──────────────────────────────────────────
const path = require("path");
const fs = require("fs");
const USED_FILE = path.join(__dirname, "../.used-wrestling-topics.json");

function pickTopics(count = 4) {
  let used = [];
  try { if (fs.existsSync(USED_FILE)) used = JSON.parse(fs.readFileSync(USED_FILE, "utf8")); } catch {}
  const available = TOPICS.filter(t => !used.includes(t.subject));
  const pool = available.length >= count ? available : TOPICS;
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, count);
  const newUsed = [...used, ...picked.map(t => t.subject)].slice(-40);
  fs.writeFileSync(USED_FILE, JSON.stringify(newUsed, null, 2));
  return picked;
}

// ─── Substack auth ───────────────────────────────────────────────────────────
function getSessionCookie() {
  const sid = process.env.SUBSTACK_SID;
  if (!sid) {
    console.error("\nERROR: SUBSTACK_SID not set in .env");
    console.error("To get it:");
    console.error("  1. Open Chrome, go to substack.com and log in");
    console.error("  2. Press F12 → Application → Cookies → https://substack.com");
    console.error("  3. Copy the value of 'substack.sid'");
    console.error("  4. Add to .env:  SUBSTACK_SID=your_cookie_value_here\n");
    process.exit(1);
  }
  // Return in cookie header format
  return sid.startsWith("substack.sid=") ? sid : `substack.sid=${sid}`;
}

// ─── Generate article via Claude ─────────────────────────────────────────────
async function generateArticle(topic, author) {
  console.log(`  Generating: "${topic.subject}"...`);
  const today = new Date().toISOString().split("T")[0];

  // Step 1: get title + subtitle
  const metaMsg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [{ role: "user", content: `You are ${author.name}, wrestling journalist. Give a title (under 90 chars) and subtitle (under 140 chars) for an article about: "${topic.subject}". Return JSON only: {"title":"...","subtitle":"..."}` }],
  });
  const metaText = metaMsg.content[0].text;
  const metaMatch = metaText.match(/\{[\s\S]*\}/);
  const meta = JSON.parse(metaMatch[0]);

  // Step 2: get body HTML separately
  const bodyMsg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 3000,
    messages: [{ role: "user", content: `You are ${author.name}, a wrestling journalist for MondayNightWrestling.com. Bio: ${author.bio}

Write a 700-900 word article on: "${topic.subject}" (angle: ${topic.angle})

Requirements:
- Opinionated, knowledgeable fan voice
- 3-4 H2 section headings
- One bullet list
- Include ONE natural backlink: if wrestlers/careers/money mentioned use <a href="https://ihatecollege.com">IHateCollege.com</a>; if Latin/Spanish wrestling mentioned use <a href="https://spanishtvshows.com">SpanishTVShows.com</a>
- Return ONLY the HTML body — no JSON, no wrapper, just the article HTML starting with <p> or <h2>` }],
  });

  const bodyHtml = bodyMsg.content[0].text.trim();

  return { title: meta.title, subtitle: meta.subtitle, bodyHtml, publishDate: today };
}

// ─── Build full post HTML ────────────────────────────────────────────────────
function buildPostHtml(article, author, imageUrl) {
  return `<img src="${imageUrl}" style="width:100%;border-radius:8px;margin-bottom:24px;" alt="${article.title}" />\n\n<p><em>By ${author.name} — ${article.publishDate}</em></p>\n\n${article.bodyHtml}\n\n<hr/>\n<p><em>${author.name}: ${author.bio}</em></p>`;
}

// ─── Post to Substack ────────────────────────────────────────────────────────
async function postToSubstack(article, author, cookie) {
  const imageUrl = getImageUrl();
  const bodyHtml = buildPostHtml(article, author, imageUrl);

  // 1. Create draft
  const createRes = await axios.post(
    `${PUB_URL}/api/v1/posts`,
    {
      draft_title: article.title,
      draft_subtitle: article.subtitle,
      draft_body: bodyHtml,
      draft_byline: author.name,
      type: "newsletter",
      audience: "everyone",
      section_id: null,
      explicit: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
        Origin: PUB_URL,
        Referer: `${PUB_URL}/publish/post/new`,
      },
    }
  );

  const postId = createRes.data?.id;
  if (!postId) throw new Error(`No post ID returned: ${JSON.stringify(createRes.data).slice(0, 200)}`);

  // 2. Publish
  await axios.post(
    `${PUB_URL}/api/v1/posts/${postId}/publish`,
    { send_email: false, audience: "everyone" },
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
        Origin: PUB_URL,
        Referer: `${PUB_URL}/publish/post/${postId}`,
      },
    }
  );

  return postId;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function run() {
  console.log("\n=== Monday Night Wrestling — Substack Poster ===");
  console.log(`Date: ${new Date().toISOString()}\n`);

  if (!process.env.ANTHROPIC_API_KEY) { console.error("ERROR: ANTHROPIC_API_KEY not set"); process.exit(1); }
  if (!process.env.SUBSTACK_EMAIL)    { console.error("ERROR: SUBSTACK_EMAIL not set"); process.exit(1); }

  const cookie = getSessionCookie();

  const count = process.env.POST_COUNT ? parseInt(process.env.POST_COUNT) : Math.floor(Math.random() * 3) + 3; // 3-5 posts
  const topics = pickTopics(count);
  let posted = 0;

  for (const topic of topics) {
    const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
    try {
      const article = await generateArticle(topic, author);
      const postId = await postToSubstack(article, author, cookie);
      console.log(`  [${posted + 1}/${count}] Posted: "${article.title}" (ID: ${postId})`);
      posted++;
      await new Promise(r => setTimeout(r, 3000)); // 3s between posts
    } catch (err) {
      console.error(`  Failed "${topic.subject}":`, err.message);
    }
  }

  console.log(`\nDone. Posted ${posted}/${count} articles.`);
}

run().catch(console.error);
