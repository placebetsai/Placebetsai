#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const HOME = process.env.HOME || "/home/israeljoffe";
const KNOWN_ENV_FILES = [
  path.join(__dirname, ".env"),
  path.join(ROOT, "..", "shopkurt-automation", ".env"),
  path.join(ROOT, "..", "shopkurt-site", ".env"),
  path.join(ROOT, "..", "ihatecollege", ".env"),
  path.join(ROOT, "..", "Ihatecollege", ".env"),
  path.join(ROOT, "..", "hiddencameras-tv", ".env"),
];

const ROUTE_KEYWORDS = {
  sentinel: [
    "owasp", "xss", "csrf", "ssrf", "idor", "bola", "rce", "audit", "vuln",
    "security", "pentest", "prompt injection", "crawl budget", "eeat", "e-e-a-t",
    "navboost", "schema", "seo strategy", "programmatic seo", "technical seo",
    "timeout", "deadlock", "retry storm", "circuit breaker", "race condition",
    "hardening", "headers", "lighthouse", "core web vitals",
  ],
  trends: [
    "trend", "trending", "viral", "tiktok", "shop trends", "amazon bestseller",
    "ebay sold", "social signal", "what is hot", "what's hot", "what is selling",
    "what's selling", "winner product", "product research",
  ],
  commerce: [
    "catalog", "listing", "list products", "supplier", "dropship", "fashionistas",
    "shopify import", "ebay listings", "tiktok products", "automation run",
    "product pipeline", "commerce run", "inventory",
  ],
  content: [
    "rewrite", "description", "meta title", "meta description", "blog intro",
    "landing page", "product copy", "seo copy", "headline", "faq", "outline",
    "script", "email", "newsletter", "title ideas",
  ],
};

function loadEnvFiles() {
  for (const file of KNOWN_ENV_FILES) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
      if (key && !(key in process.env)) process.env[key] = value;
    }
  }
}

function inferRoute(text) {
  const query = text.toLowerCase();
  for (const route of ["sentinel", "trends", "commerce", "content"]) {
    if (ROUTE_KEYWORDS[route].some((kw) => query.includes(kw))) return route;
  }
  return "content";
}

function isExplicitRoute(value) {
  return ["auto", "content", "trends", "sentinel", "commerce"].includes(value);
}

async function callGemini(text) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not found");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });

  if (!resp.ok) {
    throw new Error(`Gemini API ${resp.status}: ${(await resp.text()).slice(0, 200)}`);
  }

  const data = await resp.json();
  return {
    body: data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "",
    usage: data.usageMetadata || null,
  };
}

async function callGrok(text) {
  const key = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
  if (!key) throw new Error("GROK_API_KEY/XAI_API_KEY not found");

  const resp = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "grok-3-mini",
      messages: [
        {
          role: "system",
          content: "You are the trends worker in Israel's hive. Focus on product demand, TikTok behavior, Amazon/eBay signals, and concise operator recommendations.",
        },
        { role: "user", content: text },
      ],
      max_tokens: 1200,
    }),
  });

  if (!resp.ok) {
    throw new Error(`Grok API ${resp.status}: ${(await resp.text()).slice(0, 200)}`);
  }

  const data = await resp.json();
  return {
    body: data.choices?.[0]?.message?.content?.trim() || "",
    usage: data.usage || null,
  };
}

async function callSentinel(text) {
  const candidates = [
    path.join(ROOT, "..", "hive", "mcp-servers", "sentinel", "sentinel_agent.py"),
    path.join(__dirname, "mcp-servers", "sentinel", "sentinel_agent.py"),
  ];
  const script = candidates.find((file) => fs.existsSync(file));
  if (!script) {
    throw new Error("sentinel agent not found");
  }

  return new Promise((resolve, reject) => {
    const proc = spawn("python3", [script, text], { env: { ...process.env, HOME } });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (chunk) => (stdout += chunk.toString()));
    proc.stderr.on("data", (chunk) => (stderr += chunk.toString()));
    proc.on("close", (code) => {
      if (code !== 0) return reject(new Error(stderr.trim() || `sentinel exited ${code}`));
      resolve({ body: stdout.trim(), usage: null });
    });
  });
}

async function callCommerce(text) {
  const script = path.join(__dirname, "commerce.js");
  return new Promise((resolve, reject) => {
    const proc = spawn("node", [script, text], { env: { ...process.env, HOME } });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (chunk) => (stdout += chunk.toString()));
    proc.stderr.on("data", (chunk) => (stderr += chunk.toString()));
    proc.on("close", (code) => {
      if (code !== 0) return reject(new Error(stderr.trim() || `commerce exited ${code}`));
      resolve({ body: stdout.trim(), usage: null });
    });
  });
}

function printResult(route, result, jsonMode) {
  if (jsonMode) {
    console.log(JSON.stringify({ route, ok: true, ...result }, null, 2));
    return;
  }
  console.log(`[HIVE] Route: ${route}\n`);
  console.log(result.body);
}

function printError(route, message, jsonMode) {
  if (jsonMode) {
    console.log(JSON.stringify({ route, ok: false, error: message }, null, 2));
    return;
  }
  console.error(`[HIVE] ${route} failed: ${message}`);
}

async function main() {
  loadEnvFiles();

  const argv = process.argv.slice(2);
  const prompt = argv.find((arg) => !arg.startsWith("--") && !isExplicitRoute(arg));
  const explicitRoute = argv.find((arg) => isExplicitRoute(arg)) || "auto";
  const jsonMode = argv.includes("--json");

  if (!prompt) {
    console.error('Usage: node hive/route.js "prompt" [auto|content|trends|sentinel|commerce] [--json]');
    process.exit(1);
  }

  const route = explicitRoute === "auto" ? inferRoute(prompt) : explicitRoute;

  try {
    if (route === "content") return printResult(route, await callGemini(prompt), jsonMode);
    if (route === "trends") return printResult(route, await callGrok(prompt), jsonMode);
    if (route === "sentinel") return printResult(route, await callSentinel(prompt), jsonMode);
    return printResult(route, await callCommerce(prompt), jsonMode);
  } catch (error) {
    printError(route, error.message, jsonMode);
    process.exit(1);
  }
}

main();
