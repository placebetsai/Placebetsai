#!/usr/bin/env node
/**
 * post-twitter.js
 * Generates 5 anti-college tweets per day using Anthropic API and
 * posts them via X API v2 with OAuth 1.0a, spaced 90 minutes apart.
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const { TwitterApi } = require("twitter-api-v2");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Use OAuth 2.0 user token if available, fall back to OAuth 1.0a
function getTwitterClient() {
  if (process.env.X_OAUTH2_TOKEN) {
    return new TwitterApi(process.env.X_OAUTH2_TOKEN);
  }
  return new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
  });
}

const twitter = getTwitterClient();

const TWEET_STYLES = [
  "stat-based shocking fact",
  "hot take / contrarian opinion",
  "comparison (trade school vs college)",
  "motivational for people who skipped college",
  "question that makes people think",
];

const SITE_LINKS = [
  "https://ihatecollege.com",
  "https://ihatecollege.com/trade-schools",
  "https://ihatecollege.com/alternatives",
  "https://ihatecollege.com/debt-calculator",
  "https://ihatecollege.com/cheat-sheets",
];

async function generateTweets() {
  console.log("  Generating 5 tweets via Anthropic...");

  const prompt = `You run the Twitter account @ihatecollege4u. Generate exactly 5 tweets about the following styles in order:
${TWEET_STYLES.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Rules:
- Each tweet must be under 250 characters (leaving room for a link)
- Use real statistics where relevant (BLS data, Gallup, etc.)
- Be direct, punchy, slightly edgy but not mean-spirited
- No emojis unless it really adds punch (max 1-2 per tweet)
- Do NOT include hashtags (they hurt reach in 2025)
- Do NOT include URLs (we'll add them programmatically)

Return a JSON array of exactly 5 strings, e.g.:
["tweet 1", "tweet 2", "tweet 3", "tweet 4", "tweet 5"]`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].text;
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON array in response");
  const tweets = JSON.parse(jsonMatch[0]);
  if (!Array.isArray(tweets) || tweets.length !== 5) {
    throw new Error(`Expected 5 tweets, got ${tweets?.length}`);
  }
  return tweets;
}

async function postTweet(text, linkUrl) {
  const fullText = `${text}\n\n${linkUrl}`;
  const result = await twitter.v2.tweet(fullText);
  return result.data.id;
}

async function run() {
  console.log("\n=== Twitter Poster ===");
  console.log(`Date: ${new Date().toISOString()}\n`);

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "your-anthropic-key-here") {
    console.error("ERROR: ANTHROPIC_API_KEY not set");
    process.exit(1);
  }

  let tweets;
  try {
    tweets = await generateTweets();
  } catch (err) {
    console.error("Failed to generate tweets:", err.message);
    process.exit(1);
  }

  const DELAY_MS = 90 * 60 * 1000; // 90 minutes between tweets

  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i];
    const link = SITE_LINKS[i % SITE_LINKS.length];

    try {
      const id = await postTweet(tweet, link);
      console.log(`  [${i + 1}/5] Posted tweet ${id}`);
      console.log(`         "${tweet.substring(0, 60)}..."`);
    } catch (err) {
      console.error(`  [${i + 1}/5] Failed to post:`, err.message);
    }

    // Wait 90 minutes between posts (skip delay after last tweet)
    if (i < tweets.length - 1) {
      console.log(`  Waiting 90 minutes before next tweet...`);
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  console.log("\nDone. Posted all tweets.");
}

run().catch(console.error);
