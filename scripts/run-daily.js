#!/usr/bin/env node
/**
 * run-daily.js
 * Master scheduler. Runs all automation on Railway.
 *
 * Schedule (EST):
 *  6:00 AM  → generate-articles.js  (5 SEO blog posts)
 *  8:00 AM  → post-substack.js      (4 wrestling posts)
 *  Every hour 8 AM–10 PM → post-twitter.js (1-2 tweets = ~15-25/day)
 *  1:00 PM  → generate-articles.js  (5 more SEO blog posts)
 *  7:00 PM  → post-substack.js      (4 more wrestling posts)
 *
 * Schedule (EST):
 *  6:00 AM  → generate-articles.js  (5 SEO blog posts)
 *  8:00 AM  → post-substack.js      (4 wrestling posts)
 *  Every hour 8 AM–10 PM → post-twitter.js (1-2 tweets = ~15-25/day)
 *  1:00 PM  → generate-articles.js  (5 more SEO blog posts)
 *  7:00 PM  → post-substack.js      (4 more wrestling posts)
 *  11:00 AM + 3:00 PM → post-medium.js (1 article each = 2/day)
 *
 * Run with: node scripts/run-daily.js
 * Run now:  node scripts/run-daily.js --now
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const cron = require("node-cron");
const { fork } = require("child_process");
const path = require("path");

const TZ = process.env.TIMEZONE || "America/New_York";

const SCRIPTS = {
  articles: path.join(__dirname, "generate-articles.js"),
  twitter:  path.join(__dirname, "post-twitter.js"),
  tiktok:   path.join(__dirname, "generate-tiktok.js"),
  substack: path.join(__dirname, "post-substack.js"),
  youtube:  path.join(__dirname, "post-youtube.js"),
  medium:   path.join(__dirname, "post-medium.js"),
};

const ts = () => new Date().toISOString().replace("T", " ").slice(0, 19);

function runScript(name, scriptPath) {
  return new Promise((resolve) => {
    console.log(`\n[${ts()}] Starting ${name}...`);
    const child = fork(scriptPath, [], { silent: false });
    child.on("exit", (code) => {
      console.log(`[${ts()}] ${name} exited with code ${code}`);
      resolve(code);
    });
    child.on("error", (err) => {
      console.error(`[${ts()}] ${name} error: ${err.message}`);
      resolve(1);
    });
  });
}

// ── Articles: 6 AM, 10 AM, 2 PM, 6 PM (13 each = 52 articles/day) ───────────
cron.schedule("0 6 * * *", () => {
  runScript("articles-morning", SCRIPTS.articles).catch(console.error);
}, { timezone: TZ });

cron.schedule("0 10 * * *", () => {
  runScript("articles-midmorning", SCRIPTS.articles).catch(console.error);
}, { timezone: TZ });

cron.schedule("0 14 * * *", () => {
  runScript("articles-afternoon", SCRIPTS.articles).catch(console.error);
}, { timezone: TZ });

cron.schedule("0 18 * * *", () => {
  runScript("articles-evening", SCRIPTS.articles).catch(console.error);
}, { timezone: TZ });

// ── Tweets: 3x/day to stay under Twitter free tier (1,500/month limit) ───────
cron.schedule("0 9 * * *", () => {
  runScript("twitter-morning", SCRIPTS.twitter).catch(console.error);
}, { timezone: TZ });
cron.schedule("0 13 * * *", () => {
  runScript("twitter-afternoon", SCRIPTS.twitter).catch(console.error);
}, { timezone: TZ });
cron.schedule("0 18 * * *", () => {
  runScript("twitter-evening", SCRIPTS.twitter).catch(console.error);
}, { timezone: TZ });

// ── Wrestling Substack: 8 AM and 7 PM (4 posts each = 8 posts/day) ───────────
cron.schedule("0 8 * * *", async () => {
  await new Promise(r => setTimeout(r, 10 * 60 * 1000)); // offset 10 min after articles
  runScript("substack-morning", SCRIPTS.substack).catch(console.error);
}, { timezone: TZ });

cron.schedule("0 19 * * *", () => {
  runScript("substack-evening", SCRIPTS.substack).catch(console.error);
}, { timezone: TZ });

// ── TikTok scripts: 9:30 AM ───────────────────────────────────────────────────
cron.schedule("30 9 * * *", () => {
  runScript("tiktok", SCRIPTS.tiktok).catch(console.error);
}, { timezone: TZ });

// YouTube community posts disabled — requires Google app verification for restricted scopes

// ── Medium articles: 11 AM and 3 PM (1 each = 2 articles/day) ────────────────
cron.schedule("0 11 * * *", () => {
  runScript("medium-morning", SCRIPTS.medium).catch(console.error);
}, { timezone: TZ });

cron.schedule("0 15 * * *", () => {
  runScript("medium-afternoon", SCRIPTS.medium).catch(console.error);
}, { timezone: TZ });

console.log(`[${ts()}] Scheduler started (TZ: ${TZ})`);
console.log("  Articles:  6AM + 10AM + 2PM + 6PM (13 each = 52/day)");
console.log("  Tweets:    Every hour 8 AM–10 PM (1-2 each = ~15-25/day)");
console.log("  Wrestling: 8:00 AM + 7:00 PM (4 each = 8/day)");
console.log("  TikTok:    10:00 AM");
console.log("  Medium:    11:00 AM + 3:00 PM articles (2/day)\n");

// ── Run immediately if --now flag ─────────────────────────────────────────────
if (process.argv.includes("--now")) {
  console.log("--now flag: running all scripts immediately...");
  (async () => {
    await runScript("articles", SCRIPTS.articles);
    await runScript("twitter", SCRIPTS.twitter);
    await runScript("substack", SCRIPTS.substack);
  })().catch(console.error);
}
