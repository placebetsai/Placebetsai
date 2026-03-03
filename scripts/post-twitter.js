#!/usr/bin/env node
/**
 * post-twitter.js
 * Generates 1-2 anti-college tweets per run using Claude and posts them
 * via Twitter API v2 with OAuth 2.0 + auto-refresh.
 * Called by run-daily.js every hour from 8 AM to 10 PM = ~15 tweets/day.
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const { TwitterApi } = require("twitter-api-v2");
const fs = require("fs");

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Path to persist the rotating refresh token between cron runs
const RT_FILE = "/tmp/twitter_rt.txt";

const TWEET_STYLES = [
  "shocking stat about student debt or underemployment — cite a source like BLS, Fed, or Gallup",
  "hot take comparing trade school vs college outcomes",
  "motivational for someone who chose a trade or cert over college",
  "question that makes college grads question their ROI",
  "story-style: a specific no-degree career path with real numbers",
  "myth-busting: something people believe about college that data disproves",
  "comparison of two paths: one with degree, one without — who wins financially?",
];

const SITE_LINKS = [
  "https://ihatecollege.com",
  "https://ihatecollege.com/trade-schools",
  "https://ihatecollege.com/alternatives",
  "https://ihatecollege.com/debt-calculator",
  "https://ihatecollege.com/college-rankings",
  "https://ihatecollege.com/job-board",
  "https://ihatecollege.com/civil-service",
];

// Get a fresh access token via OAuth 2.0 refresh, persist the new refresh token
async function getTwitterClient() {
  const { X_CLIENT_ID, X_CLIENT_SECRET, X_OAUTH2_REFRESH_TOKEN } = process.env;
  if (!X_CLIENT_ID || !X_CLIENT_SECRET || !X_OAUTH2_REFRESH_TOKEN) {
    throw new Error("Missing X_CLIENT_ID, X_CLIENT_SECRET, or X_OAUTH2_REFRESH_TOKEN in env");
  }

  // Use persisted refresh token if available (it rotates on each use)
  let refreshToken = X_OAUTH2_REFRESH_TOKEN;
  if (fs.existsSync(RT_FILE)) {
    const saved = fs.readFileSync(RT_FILE, "utf8").trim();
    if (saved) refreshToken = saved;
  }

  const base = new TwitterApi({ clientId: X_CLIENT_ID, clientSecret: X_CLIENT_SECRET });
  const { client, accessToken, refreshToken: newRefreshToken } =
    await base.refreshOAuth2Token(refreshToken);

  // Save the new refresh token for the next run
  if (newRefreshToken) {
    fs.writeFileSync(RT_FILE, newRefreshToken, "utf8");
  }

  return client;
}

async function generateTweets(count = 2) {
  const styles = TWEET_STYLES.sort(() => Math.random() - 0.5).slice(0, count);

  const prompt = `You run @ihatecollege4u on X (Twitter). Generate exactly ${count} tweets, one for each style below:
${styles.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Rules:
- Each tweet max 240 characters (we add a link after)
- Use real, specific numbers and statistics
- Direct, punchy, slightly provocative — not preachy
- No hashtags (they kill reach)
- No emojis (optional, max 1 if it really helps)
- No URLs (added programmatically)

Return a JSON array of exactly ${count} strings:
["tweet one", "tweet two"]`;

  const msg = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const match = msg.content[0].text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error("No JSON array in response");
  const tweets = JSON.parse(match[0]);
  if (!Array.isArray(tweets)) throw new Error("Response is not an array");
  return tweets.slice(0, count);
}

async function run() {
  const ts = () => new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(`\n[${ts()}] === Twitter Poster ===`);

  const required = ["ANTHROPIC_API_KEY", "X_CLIENT_ID", "X_CLIENT_SECRET", "X_OAUTH2_REFRESH_TOKEN"];
  for (const key of required) {
    if (!process.env[key]) { console.error(`ERROR: ${key} not set`); process.exit(1); }
  }

  let twitter;
  try {
    twitter = await getTwitterClient();
    console.log("  Auth OK (OAuth 2.0)");
  } catch (err) {
    console.error(`  Auth failed: ${err.message}`);
    process.exit(1);
  }

  const count = Math.random() < 0.5 ? 1 : 2;
  let tweets;
  try {
    tweets = await generateTweets(count);
    console.log(`  Generated ${tweets.length} tweet(s)`);
  } catch (err) {
    console.error(`  Generate failed: ${err.message}`);
    process.exit(1);
  }

  for (let i = 0; i < tweets.length; i++) {
    const link = SITE_LINKS[Math.floor(Math.random() * SITE_LINKS.length)];
    const text = `${tweets[i]}\n\n${link}`;
    try {
      const res = await twitter.v2.tweet(text);
      console.log(`  [${i + 1}/${tweets.length}] Posted ${res.data.id}: "${tweets[i].slice(0, 60)}..."`);
    } catch (err) {
      console.error(`  [${i + 1}/${tweets.length}] Post failed: ${err.message}`);
    }
    if (i < tweets.length - 1) await new Promise(r => setTimeout(r, 5000));
  }

  console.log(`[${ts()}] Done.\n`);
}

run().catch(console.error);
