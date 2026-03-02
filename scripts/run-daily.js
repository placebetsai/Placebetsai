#!/usr/bin/env node
/**
 * run-daily.js
 * Master scheduler. Runs all automation scripts at 6:00 AM daily.
 *
 * Schedule:
 *  6:00 AM  → generate-articles.js (3 SEO blog posts + push to GitHub)
 *  6:10 AM  → post-twitter.js      (5 tweets, 90 min apart)
 *  6:15 AM  → generate-tiktok.js   (script + upload any queued videos)
 *
 * Run with: node scripts/run-daily.js
 * Keep alive on Railway with: node scripts/run-daily.js (it never exits)
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const cron = require("node-cron");
const { fork } = require("child_process");
const path = require("path");

const SCRIPTS = {
  articles: path.join(__dirname, "generate-articles.js"),
  twitter: path.join(__dirname, "post-twitter.js"),
  tiktok: path.join(__dirname, "generate-tiktok.js"),
};

function runScript(name, scriptPath) {
  return new Promise((resolve) => {
    console.log(`\n[${timestamp()}] Starting ${name}...`);
    const child = fork(scriptPath, [], { silent: false });
    child.on("exit", (code) => {
      console.log(`[${timestamp()}] ${name} exited with code ${code}`);
      resolve(code);
    });
    child.on("error", (err) => {
      console.error(`[${timestamp()}] ${name} error:`, err.message);
      resolve(1);
    });
  });
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function timestamp() {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

async function runAll() {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`[${timestamp()}] DAILY RUN STARTED`);
  console.log("=".repeat(50));

  // 1. Generate articles (commits and pushes to GitHub)
  await runScript("generate-articles", SCRIPTS.articles);
  await delay(10 * 1000); // 10 seconds gap

  // 2. Post tweets (runs in background — 90 min delays between tweets)
  //    We fork it and don't await so it runs independently
  console.log(`\n[${timestamp()}] Starting Twitter poster in background...`);
  const twitterChild = fork(SCRIPTS.twitter, [], { silent: false, detached: true });
  twitterChild.unref(); // don't block on this — it takes 6+ hours for all 5 tweets

  // 3. Generate TikTok script + upload videos
  await delay(5 * 1000);
  await runScript("generate-tiktok", SCRIPTS.tiktok);

  console.log(`\n[${timestamp()}] DAILY RUN COMPLETE`);
  console.log("=".repeat(50));
}

// ─── Cron: 6:00 AM every day ────────────────────────────────────────────────
// Timezone set via TZ env var on Railway (e.g. TZ=America/New_York)
cron.schedule("0 6 * * *", () => {
  runAll().catch((err) => {
    console.error(`[${timestamp()}] Fatal error in daily run:`, err);
  });
}, {
  timezone: process.env.TIMEZONE || "America/New_York",
});

console.log(`[${timestamp()}] Scheduler started. Next run: 6:00 AM ${process.env.TIMEZONE || "America/New_York"}`);
console.log("Waiting for scheduled time... (process will stay alive)\n");

// ─── Optional: run immediately if --now flag passed ──────────────────────────
if (process.argv.includes("--now")) {
  console.log("--now flag detected, running immediately...");
  runAll().catch(console.error);
}
