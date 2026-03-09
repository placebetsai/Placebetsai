#!/usr/bin/env node
/**
 * post-twitter.js
 * Generates 1-2 anti-college tweets per run using Claude and posts them
 * via Twitter API v2 with OAuth 1.0a (permanent, never needs refresh).
 * Called by run-daily.js every hour from 8 AM to 10 PM = ~15 tweets/day.
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const { TwitterApi } = require("twitter-api-v2");

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

// OAuth 1.0a client — permanent credentials, never needs refresh
function getTwitterClient() {
  const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET } = process.env;
  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_TOKEN_SECRET) {
    throw new Error("Missing X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, or X_ACCESS_TOKEN_SECRET in env");
  }
  return new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_TOKEN_SECRET,
  });
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

  const required = ["ANTHROPIC_API_KEY", "X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_TOKEN_SECRET"];
  for (const key of required) {
    if (!process.env[key]) { console.error(`ERROR: ${key} not set`); process.exit(1); }
  }

  let twitter;
  try {
    twitter = getTwitterClient();
    console.log("  Auth OK (OAuth 1.0a)");
  } catch (err) {
    console.error(`  Auth failed: ${err.message}`);
    process.exit(1);
  }

  const count = 1; // 3 runs/day × 1 tweet = ~90/month, well under free tier 1,500 limit
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
