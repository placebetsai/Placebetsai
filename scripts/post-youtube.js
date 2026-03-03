#!/usr/bin/env node
/**
 * post-youtube.js
 * Generates anti-college content and posts to YouTube as a Community Post (no video needed).
 * Community Posts = text + optional image, like tweets but on YouTube.
 *
 * Setup required:
 *   YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN in .env
 *
 * To get a refresh token, run: node scripts/youtube-auth.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const https = require("https");

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const ts = () => new Date().toISOString().replace("T", " ").slice(0, 19);

// ── Get fresh access token via refresh token ───────────────────────────────
async function getAccessToken() {
  const { YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN } = process.env;
  if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET || !YOUTUBE_REFRESH_TOKEN) {
    throw new Error("Missing YouTube OAuth credentials. Run: node scripts/youtube-auth.js");
  }

  const body = new URLSearchParams({
    client_id:     YOUTUBE_CLIENT_ID,
    client_secret: YOUTUBE_CLIENT_SECRET,
    refresh_token: YOUTUBE_REFRESH_TOKEN,
    grant_type:    "refresh_token",
  }).toString();

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "oauth2.googleapis.com",
      path: "/token",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(body) },
    }, (res) => {
      let data = "";
      res.on("data", (d) => (data += d));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error(`Token refresh failed: ${data}`));
        } catch { reject(new Error("Invalid token response")); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ── Generate post text via Claude ──────────────────────────────────────────
async function generatePost() {
  const STYLES = [
    "shocking student debt statistic with source",
    "comparison: trade school income vs college grad income at 5 years out",
    "myth-busting: something college admissions offices say that's false",
    "success story: specific no-degree career path with real numbers",
    "question that makes college grads question their ROI",
    "hot take: why the college debt bubble is about to pop",
    "specific trades job with salary range and how to get started",
  ];
  const style = STYLES[Math.floor(Math.random() * STYLES.length)];

  const msg = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [{
      role: "user",
      content: `You run the IHateCollege.com YouTube channel. Write a YouTube Community Post (like a tweet but on YouTube) in this style: "${style}".

Rules:
- 150-400 characters
- Punchy, direct, slightly provocative
- Include a real stat or dollar amount
- End with a link or CTA to ihatecollege.com
- No hashtags

Return just the post text, nothing else.`,
    }],
  });

  return msg.content[0].text.trim();
}

// ── Post a Community Post to YouTube ──────────────────────────────────────
async function postCommunityPost(accessToken, text) {
  const body = JSON.stringify({
    snippet: {
      type: "textPost",
      textOriginalContent: text,
    },
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "www.googleapis.com",
      path: "/youtube/v3/communityPosts?part=snippet",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    }, (res) => {
      let data = "";
      res.on("data", (d) => (data += d));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode === 200 || res.statusCode === 201) resolve(json);
          else reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        } catch { reject(new Error("Invalid response")); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ── Main ───────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\n[${ts()}] === YouTube Community Post ===`);

  const count = Math.random() < 0.4 ? 2 : 1; // post 1-2 per run
  let posted = 0;

  try {
    const accessToken = await getAccessToken();
    console.log(`  Auth OK`);

    for (let i = 0; i < count; i++) {
      try {
        const text = await generatePost();
        console.log(`  Post ${i + 1}: "${text.slice(0, 80)}..."`);
        const result = await postCommunityPost(accessToken, text);
        console.log(`  Posted: ${result.id}`);
        posted++;
        if (i < count - 1) await new Promise(r => setTimeout(r, 5000));
      } catch (err) {
        console.error(`  Failed post ${i + 1}: ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`  Fatal: ${err.message}`);
    if (err.message.includes("youtube-auth")) {
      console.error(`\n  To set up YouTube:\n  1. node scripts/youtube-auth.js\n  2. Add credentials to Railway env`);
    }
    process.exit(1);
  }

  console.log(`[${ts()}] Done. Posted ${posted}/${count}.\n`);
}

run().catch(console.error);
