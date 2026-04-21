#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const HOME = process.env.HOME || "/home/israeljoffe";
const ENV_FILES = [
  path.join(__dirname, ".env"),
  path.join(ROOT, "..", "shopkurt-automation", ".env"),
  path.join(ROOT, "..", "shopkurt-site", ".env"),
  path.join(ROOT, "..", "ihatecollege", ".env"),
  path.join(ROOT, "..", "Ihatecollege", ".env"),
  path.join(ROOT, "..", "hiddencameras-tv", ".env"),
];

function loadEnv() {
  for (const file of ENV_FILES) {
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

loadEnv();

const ADVISORS = {
  researcher: {
    title: "Market Researcher",
    system: "You are a 2026 market researcher. Give specific intelligence: named competitors, real product types, actual keyword/search signals, platform-policy quirks. Rank findings by revenue signal, not popularity. If unknown, say unknown.",
    backends: ["grok", "gemini"],
  },
  strategist: {
    title: "Monetization Strategist",
    system: "You are a blunt monetization strategist for a solo operator with multiple web properties. Grade ideas on speed to first dollar, compounding potential, moat strength, and tradeoffs. Name the highest-ROI next move and why.",
    backends: ["openai", "gemini"],
  },
  seo: {
    title: "SEO Architect",
    system: "You are a 2026 SEO architect. Focus on E-E-A-T, scaled content abuse risk, internal linking, crawl budget, schema, and Core Web Vitals. Call out risky patterns bluntly.",
    backends: ["sentinel", "gemini", "openai"],
  },
  commerce: {
    title: "Commerce Operator",
    system: "You are an ecommerce operator focused on Shopify, TikTok Shop, Google Shopping, and eBay free-tier. Keep recommendations realistic and avoid paid ads unless explicitly requested.",
    backends: ["grok", "openai", "gemini"],
  },
  product: {
    title: "Product Strategist",
    system: "You are a product strategist. Turn content sites into repeat-usage software with retention loops and premium tiers. Ignore pageview-maximization slop.",
    backends: ["openai", "gemini"],
  },
  critic: {
    title: "Design & Trust Critic",
    system: "You are a design and trust critic. Flag cheap-looking patterns, fake social proof, confusing CTAs, broken trust signals, and brand drift with specifics.",
    backends: ["openai", "gemini"],
  },
  judge: {
    title: "Execution Judge",
    system: "You are the final decision-maker. Rank the next 5 moves by ROI. Each move must include action, time estimate, impact, cost, and dependencies.",
    backends: ["openai", "gemini"],
  },
};

async function callOpenAI(system, user) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY missing");
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.4,
      max_tokens: 1800,
    }),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const d = await r.json();
  return d.choices?.[0]?.message?.content?.trim() || "";
}

async function callGrok(system, user) {
  const key = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
  if (!key) throw new Error("GROK_API_KEY/XAI_API_KEY missing");
  const r = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: "grok-3",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });
  if (!r.ok) throw new Error(`Grok ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const d = await r.json();
  return d.choices?.[0]?.message?.content?.trim() || "";
}

async function callGemini(system, user) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY missing");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ parts: [{ text: user }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 2000,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const d = await r.json();
  return d.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
}

async function callSentinel(system, user) {
  const candidates = [
    path.join(ROOT, "..", "hive", "mcp-servers", "sentinel", "sentinel_agent.py"),
    path.join(__dirname, "mcp-servers", "sentinel", "sentinel_agent.py"),
  ];
  const script = candidates.find((file) => fs.existsSync(file));
  if (!script) throw new Error("sentinel agent missing");

  return new Promise((resolve, reject) => {
    const proc = spawn("python3", [script, `${system}\n\n${user}`], { env: { ...process.env, HOME } });
    let out = "";
    let err = "";
    proc.stdout.on("data", (chunk) => (out += chunk.toString()));
    proc.stderr.on("data", (chunk) => (err += chunk.toString()));
    proc.on("close", (code) => {
      if (code !== 0) return reject(new Error(err.trim() || `sentinel ${code}`));
      resolve(out.trim());
    });
  });
}

const BACKENDS = {
  openai: callOpenAI,
  grok: callGrok,
  gemini: callGemini,
  sentinel: callSentinel,
};

async function ask(role, question) {
  const advisor = ADVISORS[role];
  if (!advisor) throw new Error(`Unknown advisor role: ${role}`);
  const errors = [];
  for (const backend of advisor.backends) {
    try {
      const response = await BACKENDS[backend](advisor.system, question);
      return { role, title: advisor.title, backend, response };
    } catch (error) {
      errors.push(`${backend}: ${error.message}`);
    }
  }
  throw new Error(`All backends failed for ${role}:\n  ${errors.join("\n  ")}`);
}

module.exports = { ADVISORS, ask };

if (require.main === module) {
  const [role, ...rest] = process.argv.slice(2);
  const question = rest.join(" ").trim();
  if (!role || !question) {
    console.error("Usage: node hive/advisors.js <role> \"<question>\"");
    console.error(`Roles: ${Object.keys(ADVISORS).join(", ")}`);
    process.exit(1);
  }
  ask(role, question)
    .then((result) => {
      console.log(`═══ ${result.title} (via ${result.backend}) ═══\n`);
      console.log(result.response);
    })
    .catch((error) => {
      console.error(`FATAL: ${error.message}`);
      process.exit(1);
    });
}
