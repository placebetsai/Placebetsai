#!/usr/bin/env node
/**
 * post-medium.js
 * Generates anti-college articles and publishes them to Medium
 * under rotating fake author personas.
 *
 * Setup:
 *   1. Create a Medium account (or use existing)
 *   2. Go to medium.com/me/settings → "Integration tokens" → generate one
 *   3. Add MEDIUM_INTEGRATION_TOKEN to .env
 *
 * Run manually: node scripts/post-medium.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const https = require("https");

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const ts = () => new Date().toISOString().replace("T", " ").slice(0, 19);

// Rotating fake personas — each has a distinct voice
const PERSONAS = [
  { name: "Jake Callahan",    bio: "Former electrician apprentice. Paid off his house at 31." },
  { name: "Megan Torres",     bio: "Left pre-med after sophomore year. Now runs two HVAC companies." },
  { name: "Tyler Okafor",     bio: "Never went to college. Became a licensed plumber at 22. Net worth: $600k." },
  { name: "Sara Whitfield",   bio: "Dropped out after one year. Got an AWS cert. Now makes $140k." },
  { name: "Derek Pham",       bio: "Skipped college. Did a CDL program. Owns 3 trucks by 29." },
  { name: "Ashley Kline",     bio: "Left biology degree behind. Got her cosmetology license. Owns 2 salons." },
  { name: "Marcus Bell",      bio: "Straight from high school into an iron workers union. $95/hr at 27." },
  { name: "Jordan Reese",     bio: "College dropout turned freelance developer. Cleared $200k last year." },
];

const ARTICLE_TOPICS = [
  "why I left college and never looked back — real numbers, 5 years later",
  "the trade skill paying more than most engineering degrees right now",
  "I did the math on my friend's $80k degree vs my apprenticeship — here are the numbers",
  "the college admissions industry doesn't want you to know these job statistics",
  "how to make six figures without a degree — the actual path, not the vague advice",
  "student loan interest will steal more from you than you realize — a breakdown",
  "community college + certification vs 4-year university: honest financial comparison",
  "the jobs that are actually hiring right now — none require a bachelor's",
];

// Get the Medium author's userId from their integration token
async function getMediumUserId(token) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "api.medium.com",
      path: "/v1/me",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }, (res) => {
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.data && json.data.id) resolve(json.data.id);
          else reject(new Error(`Could not get user ID: ${data.slice(0, 200)}`));
        } catch { reject(new Error("Invalid response from Medium")); }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

// Generate a full article with Claude
async function generateArticle(persona, topic) {
  const siteLink = "https://ihatecollege.com";
  const toolLinks = [
    "https://ihatecollege.com/debt-calculator",
    "https://ihatecollege.com/trade-schools",
    "https://ihatecollege.com/alternatives",
    "https://ihatecollege.com/job-board",
    "https://ihatecollege.com/college-rankings",
  ];
  const toolLink = toolLinks[Math.floor(Math.random() * toolLinks.length)];

  const msg = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1800,
    messages: [{
      role: "user",
      content: `You are ${persona.name}. Bio: ${persona.bio}.

Write a Medium article on this topic: "${topic}"

Requirements:
- 600–900 words
- First person, conversational, personal story mixed with data
- Real, specific dollar amounts and statistics (BLS, Fed Reserve, NCES data)
- Honest and direct — not a rant, not motivational fluff, just facts + personal experience
- Title should be direct and click-worthy (under 80 chars)
- End with a 1-sentence CTA linking to ${toolLink} for readers who want to see their own numbers
- Naturally mention ${siteLink} once mid-article as a resource you've found useful
- Structure: Title, then body paragraphs (NO headers/subheadings, flowing prose)
- Do NOT mention AI or that this was generated

Return format (exactly):
TITLE: [title here]
---
[article body here]`,
    }],
  });

  const raw = msg.content[0].text.trim();
  const titleMatch = raw.match(/^TITLE:\s*(.+)/m);
  const bodyMatch = raw.match(/---\n([\s\S]+)/);

  if (!titleMatch || !bodyMatch) throw new Error("Bad article format from Claude");

  const title = titleMatch[1].trim();
  const body = bodyMatch[1].trim();

  // Wrap body in simple HTML with persona byline
  const html = `<p><em>By ${persona.name} — ${persona.bio}</em></p>\n\n` +
    body.split("\n\n").map(p => `<p>${p.replace(/\n/g, " ")}</p>`).join("\n");

  return { title, html };
}

// Post article to Medium
async function postToMedium(token, authorId, persona, title, html) {
  const payload = JSON.stringify({
    title,
    contentFormat: "html",
    content: html,
    tags: ["college", "career", "finance", "trades", "education"],
    publishStatus: "public",
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "api.medium.com",
      path: `/v1/users/${authorId}/posts`,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode === 200 || res.statusCode === 201) resolve(json.data || json);
          else reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 300)}`));
        } catch { reject(new Error("Invalid response from Medium")); }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`\n[${ts()}] === Medium Article Poster ===`);

  const token = process.env.MEDIUM_INTEGRATION_TOKEN;
  if (!token) {
    console.error("  ERROR: MEDIUM_INTEGRATION_TOKEN not set in env");
    console.error("  Get one at: medium.com/me/settings → Integration tokens");
    process.exit(1);
  }

  let authorId;
  try {
    authorId = await getMediumUserId(token);
    console.log(`  Auth OK, authorId: ${authorId}`);
  } catch (err) {
    console.error(`  Auth failed: ${err.message}`);
    process.exit(1);
  }

  // Post 1 article per run
  const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
  const topic = ARTICLE_TOPICS[Math.floor(Math.random() * ARTICLE_TOPICS.length)];

  try {
    console.log(`  Generating: "${topic}" as ${persona.name}...`);
    const { title, html } = await generateArticle(persona, topic);
    console.log(`  Title: "${title}"`);
    const result = await postToMedium(token, authorId, persona, title, html);
    console.log(`  Published: ${result.url || result.id}`);
  } catch (err) {
    console.error(`  Failed: ${err.message}`);
    process.exit(1);
  }

  console.log(`[${ts()}] Done.\n`);
}

run().catch(console.error);
