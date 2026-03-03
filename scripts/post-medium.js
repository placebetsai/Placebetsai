#!/usr/bin/env node
/**
 * post-devto.js (named post-medium.js for scheduler compatibility)
 * Generates anti-college articles and publishes them to Dev.to
 * under rotating fake author personas.
 *
 * Setup:
 *   1. Create a Dev.to account at dev.to
 *   2. Go to dev.to/settings/extensions → generate API key
 *   3. Add DEV_API_KEY to .env and Railway environment
 *
 * Run manually: node scripts/post-medium.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const https = require("https");

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const ts = () => new Date().toISOString().replace("T", " ").slice(0, 19);

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

const TAGS = ["career", "productivity", "beginners", "tutorial"];

async function generateArticle(persona, topic) {
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

Write an article for Dev.to on this topic: "${topic}"

Requirements:
- 600-900 words
- First person, conversational, personal story mixed with real data
- Real, specific dollar amounts and statistics (BLS, Fed Reserve, NCES)
- Honest and direct — not a rant, not motivational fluff, just facts + experience
- Title should be direct and click-worthy (under 80 chars)
- End with a 1-sentence CTA linking to ${toolLink}
- Naturally mention https://ihatecollege.com once mid-article as a resource
- Use markdown formatting with ## subheadings
- Do NOT mention AI or that this was generated

Return format (exactly):
TITLE: [title here]
---
[article body in markdown here]`,
    }],
  });

  const raw = msg.content[0].text.trim();
  const titleMatch = raw.match(/^TITLE:\s*(.+)/m);
  const bodyMatch = raw.match(/---\n([\s\S]+)/);

  if (!titleMatch || !bodyMatch) throw new Error("Bad article format from Claude");

  return {
    title: titleMatch[1].trim(),
    body: `*By ${persona.name} — ${persona.bio}*\n\n` + bodyMatch[1].trim(),
  };
}

async function postToDevTo(title, body) {
  const payload = JSON.stringify({
    article: {
      title,
      body_markdown: body,
      published: true,
      tags: TAGS,
      canonical_url: "https://ihatecollege.com",
    },
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "dev.to",
      path: "/api/articles",
      method: "POST",
      headers: {
        "api-key": process.env.DEV_API_KEY,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode === 200 || res.statusCode === 201) resolve(json);
          else reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 300)}`));
        } catch { reject(new Error("Invalid response from Dev.to")); }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`\n[${ts()}] === Dev.to Article Poster ===`);

  if (!process.env.DEV_API_KEY) {
    console.error("  ERROR: DEV_API_KEY not set — get one at dev.to/settings/extensions");
    process.exit(1);
  }

  const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
  const topic = ARTICLE_TOPICS[Math.floor(Math.random() * ARTICLE_TOPICS.length)];

  try {
    console.log(`  Generating: "${topic}" as ${persona.name}...`);
    const { title, body } = await generateArticle(persona, topic);
    console.log(`  Title: "${title}"`);
    const result = await postToDevTo(title, body);
    console.log(`  Published: https://dev.to/${result.slug}`);
  } catch (err) {
    console.error(`  Failed: ${err.message}`);
    process.exit(1);
  }

  console.log(`[${ts()}] Done.\n`);
}

run().catch(console.error);
