#!/usr/bin/env node

const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const AUTOMATION_ROOT = path.join(ROOT, "..", "shopkurt-automation");
const TRENDING = path.join(AUTOMATION_ROOT, "trending.js");
const ORCHESTRA = path.join(AUTOMATION_ROOT, "orchestra-v2.js");
const CRON = path.join(AUTOMATION_ROOT, "cron.js");
const prompt = process.argv.slice(2).join(" ").trim().toLowerCase();

if (!prompt) {
  console.error('Usage: node hive/commerce.js "preview trends for fashionistas"');
  process.exit(1);
}

function runNode(args, cwd) {
  return new Promise((resolve, reject) => {
    const proc = spawn("node", args, { cwd, env: { ...process.env } });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (chunk) => (stdout += chunk.toString()));
    proc.stderr.on("data", (chunk) => (stderr += chunk.toString()));
    proc.on("close", (code) => {
      if (code !== 0) return reject(new Error(stderr.trim() || `node ${args.join(" ")} exited ${code}`));
      resolve(stdout.trim());
    });
  });
}

async function previewTrends() {
  const inline = `
    require("dotenv").config();
    const { getTrendingProducts } = require(${JSON.stringify(TRENDING)});
    getTrendingProducts(12).then((items) => {
      const out = items.map((item, idx) =>
        \`\${idx + 1}. \${item.title} | tier=\${item.tier || "unknown"} | score=\${item.trending_score || 0} | amazon=\${item.amazonDemandScore || 0} | cj="\${item.cjSearch || ""}" | trendsi="\${item.trendsiSearch || ""}"\`
      ).join("\\n");
      console.log(out);
    }).catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
  `;
  return runNode(["-e", inline], AUTOMATION_ROOT);
}

async function runOrchestra(live = false) {
  const args = [ORCHESTRA];
  if (!live) args.push("--dry-run");
  return runNode(args, AUTOMATION_ROOT);
}

async function runCron() {
  return runNode([CRON], AUTOMATION_ROOT);
}

async function main() {
  if (prompt.includes("trend") || prompt.includes("preview") || prompt.includes("research")) {
    console.log(await previewTrends());
    return;
  }
  if (prompt.includes("cron")) {
    console.log(await runCron());
    return;
  }

  const live = prompt.includes(" live ") || prompt.endsWith(" live") || prompt.includes("go live");
  console.log(await runOrchestra(live));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
