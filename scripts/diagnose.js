#!/usr/bin/env node
/**
 * diagnose.js — Tests every integration and prints exactly what's broken + how to fix it.
 * Run: node scripts/diagnose.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const https = require("https");

const OK  = "✅";
const ERR = "❌";
const WARN = "⚠️ ";

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 8000 }, (res) => {
      let body = "";
      res.on("data", (d) => (body += d));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    }).on("error", reject).on("timeout", () => reject(new Error("timeout")));
  });
}

async function checkTwitter() {
  console.log("\n── Twitter / X ──────────────────────────────────────────");
  const keys = ["X_API_KEY","X_API_SECRET","X_ACCESS_TOKEN","X_ACCESS_TOKEN_SECRET"];
  let missing = keys.filter(k => !process.env[k]);
  if (missing.length) {
    console.log(`${ERR} Missing env vars: ${missing.join(", ")}`);
    return;
  }
  try {
    const { TwitterApi } = require("twitter-api-v2");
    const client = new TwitterApi({
      appKey:       process.env.X_API_KEY,
      appSecret:    process.env.X_API_SECRET,
      accessToken:  process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
    });
    const me = await client.v2.me();
    console.log(`${OK} Authenticated as @${me.data.username}`);
    console.log(`   Tweets will post to: https://twitter.com/${me.data.username}`);
  } catch (e) {
    console.log(`${ERR} Auth failed: ${e.message}`);
    if (e.code === 401 || String(e.message).includes("401")) {
      console.log(`\n   HOW TO FIX (401 = bad tokens):`);
      console.log(`   1. Go to: https://developer.twitter.com/en/portal/projects-and-apps`);
      console.log(`   2. Click your app → "User authentication settings"`);
      console.log(`   3. Make sure permissions = "Read and Write"`);
      console.log(`   4. Click "Keys and Tokens" tab`);
      console.log(`   5. Under "Access Token and Secret" click REGENERATE`);
      console.log(`   6. Copy new values → update X_ACCESS_TOKEN + X_ACCESS_TOKEN_SECRET in Railway env`);
    }
  }
}

async function checkAnthropic() {
  console.log("\n── Anthropic (Claude AI) ────────────────────────────────");
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`${ERR} ANTHROPIC_API_KEY not set`);
    return;
  }
  try {
    const Anthropic = require("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 10,
      messages: [{ role: "user", content: "Say hi" }],
    });
    console.log(`${OK} Anthropic API working (model: ${msg.model})`);
  } catch (e) {
    console.log(`${ERR} Anthropic failed: ${e.message}`);
  }
}

async function checkSubstack() {
  console.log("\n── Substack ─────────────────────────────────────────────");
  const pubUrl = process.env.SUBSTACK_PUB_URL;
  const sid = process.env.SUBSTACK_SID;
  if (!pubUrl) { console.log(`${ERR} SUBSTACK_PUB_URL not set`); return; }
  if (!sid)    { console.log(`${ERR} SUBSTACK_SID not set`); return; }

  try {
    const axios = require("axios");
    const cookie = sid.startsWith("substack.sid=") ? sid : `substack.sid=${sid}`;
    const res = await axios.get(`${pubUrl}/api/v1/posts?limit=1`, {
      headers: { Cookie: cookie },
      timeout: 8000,
    });
    if (res.status === 200) {
      console.log(`${OK} Substack connected: ${pubUrl}`);
    } else {
      console.log(`${WARN} Unexpected status: ${res.status}`);
    }
  } catch (e) {
    const status = e.response?.status;
    console.log(`${ERR} Substack failed (${status || e.message})`);
    if (status === 401 || status === 403) {
      console.log(`\n   HOW TO FIX (session cookie expired):`);
      console.log(`   1. Open Chrome, go to ${pubUrl} and log in`);
      console.log(`   2. Press F12 → Application → Cookies → ${pubUrl}`);
      console.log(`   3. Find cookie named 'substack.sid' and copy its value`);
      console.log(`   4. Update SUBSTACK_SID in Railway env with the new value`);
    }
  }
}

async function checkTikTok() {
  console.log("\n── TikTok ───────────────────────────────────────────────");
  const fs = require("fs"), path = require("path");
  const cookiesPath = path.join(__dirname, "../cookies.txt");
  const videosDir = path.join(__dirname, "../tiktok-videos");

  if (!fs.existsSync(cookiesPath)) {
    console.log(`${ERR} cookies.txt not found in project root`);
    console.log(`\n   HOW TO FIX:`);
    console.log(`   1. Install tiktok-uploader: pip3 install tiktok-uploader`);
    console.log(`   2. Run: tiktok-uploader auth`);
    console.log(`   3. Log in to TikTok when prompted`);
    console.log(`   4. This creates cookies.txt — commit it to the repo (or add to Railway volume)`);
  } else {
    const size = fs.statSync(cookiesPath).size;
    const age = (Date.now() - fs.statSync(cookiesPath).mtimeMs) / (1000 * 60 * 60 * 24);
    if (age > 30) {
      console.log(`${WARN} cookies.txt is ${Math.round(age)} days old — may be expired. Re-run tiktok-uploader auth`);
    } else {
      console.log(`${OK} cookies.txt found (${Math.round(age)}d old, ${size} bytes)`);
    }
  }

  const videos = fs.existsSync(videosDir)
    ? fs.readdirSync(videosDir).filter(f => f.endsWith(".mp4"))
    : [];
  if (videos.length === 0) {
    console.log(`${WARN} No .mp4 files in tiktok-videos/ — nothing to upload`);
    console.log(`   Scripts are generated in tiktok-queue/ but videos must be recorded manually`);
    console.log(`   OR use a text-to-video service to create .mp4 files from the scripts`);
  } else {
    console.log(`${OK} ${videos.length} video(s) ready to upload: ${videos.join(", ")}`);
  }
}

async function checkYouTube() {
  console.log("\n── YouTube ──────────────────────────────────────────────");
  const missing = ["YOUTUBE_CLIENT_ID","YOUTUBE_CLIENT_SECRET","YOUTUBE_REFRESH_TOKEN"]
    .filter(k => !process.env[k]);
  if (missing.length) {
    console.log(`${ERR} Missing: ${missing.join(", ")}`);
    console.log(`\n   HOW TO SET UP YouTube automation:`);
    console.log(`   1. Go to https://console.cloud.google.com`);
    console.log(`   2. Create a project → enable YouTube Data API v3`);
    console.log(`   3. Create OAuth2 credentials (Desktop app)`);
    console.log(`   4. Run: node scripts/youtube-auth.js  (generates refresh token)`);
    console.log(`   5. Add YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN to Railway`);
  } else {
    console.log(`${OK} YouTube env vars set`);
  }
}

async function checkEnv() {
  console.log("\n── Environment ──────────────────────────────────────────");
  const railway = !!process.env.RAILWAY_ENVIRONMENT;
  console.log(railway ? `${OK} Running on Railway` : `${WARN} Running locally (not Railway)`);
  if (!railway) {
    console.log(`   The cron scheduler only runs on Railway via 'node start.js'`);
    console.log(`   Make sure Railway start command is: node start.js`);
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  IHateCollege.com — Integration Diagnostics");
  console.log(`  ${new Date().toISOString()}`);
  console.log("═══════════════════════════════════════════════════════");

  await checkEnv();
  await checkAnthropic();
  await checkTwitter();
  await checkSubstack();
  await checkTikTok();
  await checkYouTube();

  console.log("\n═══════════════════════════════════════════════════════\n");
}

main().catch(console.error);
