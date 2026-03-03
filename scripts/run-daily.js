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

// ── Articles: 6 AM and 1 PM (5 each = 10 articles/day) ───────────────────────
cron.schedule("0 6 * * *", () => {
  runScript("articles-morning", SCRIPTS.articles).catch(console.error);
}, { timezone: TZ });

cron.schedule("0 13 * * *", () => {
  runScript("articles-afternoon", SCRIPTS.articles).catch(console.error);
}, { timezone: TZ });

// ── Tweets: every hour 8 AM – 10 PM (1-2 per run = ~15-25 tweets/day) ────────
cron.schedule("0 8-22 * * *", () => {
  runScript("twitter", SCRIPTS.twitter).catch(console.error);
}, { timezone: TZ });

// ── Wrestling Substack: 8 AM and 7 PM (4 posts each = 8 posts/day) ───────────
cron.schedule("0 8 * * *", async () => {
  await new Promise(r => setTimeout(r, 10 * 60 * 1000)); // offset 10 min after articles
  runScript("substack-morning", SCRIPTS.substack).catch(console.error);
}, { timezone: TZ });

cron.schedule("0 19 * * *", () => {
  runScript("substack-evening", SCRIPTS.substack).catch(console.error);
}, { timezone: TZ });

// ── TikTok scripts: 10 AM ─────────────────────────────────────────────────────
cron.schedule("0 10 * * *", () => {
  runScript("tiktok", SCRIPTS.tiktok).catch(console.error);
}, { timezone: TZ });

console.log(`[${ts()}] Scheduler started (TZ: ${TZ})`);
console.log("  Articles:  6:00 AM + 1:00 PM (5 each = 10/day)");
console.log("  Tweets:    Every hour 8 AM–10 PM (1-2 each = ~15-25/day)");
console.log("  Wrestling: 8:00 AM + 7:00 PM (4 each = 8/day)");
console.log("  TikTok:    10:00 AM\n");

// ── Run immediately if --now flag ─────────────────────────────────────────────
if (process.argv.includes("--now")) {
  console.log("--now flag: running all scripts immediately...");
  (async () => {
    await runScript("articles", SCRIPTS.articles);
    await runScript("twitter", SCRIPTS.twitter);
    await runScript("substack", SCRIPTS.substack);
  })().catch(console.error);
}
