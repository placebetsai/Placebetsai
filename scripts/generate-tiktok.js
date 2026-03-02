#!/usr/bin/env node
/**
 * generate-tiktok.js
 * 1. Generates a daily TikTok video script via Anthropic API → saves to /tiktok-queue/
 * 2. Scans /tiktok-videos/ for any .mp4 files and uploads them via tiktok-uploader (Python)
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ROOT = path.join(__dirname, "..");
const QUEUE_DIR = path.join(ROOT, "tiktok-queue");
const VIDEOS_DIR = path.join(ROOT, "tiktok-videos");

const SCRIPT_HOOKS = [
  "college debt horror story",
  "electrician earns more than teacher",
  "18 year old skips college and wins",
  "the real cost of a business degree",
  "trade school in 6 months vs 4 years of debt",
  "Google hired him with no degree",
  "plumber vs doctor: who retires first",
  "the jobs AI can't take from tradespeople",
  "why your college major doesn't matter",
  "how apprenticeships pay you to learn",
];

async function generateScript() {
  const hook = SCRIPT_HOOKS[Math.floor(Math.random() * SCRIPT_HOOKS.length)];
  console.log(`  Generating TikTok script: "${hook}"`);

  const prompt = `You write viral TikTok scripts for @_ihatecollege, a channel that gives young people honest information about skipping college and pursuing trades, tech certs, or self-employment.

Write a 45-60 second TikTok video script with this hook concept: "${hook}"

Format:
- Hook (first 3 seconds, must stop the scroll)
- Body (main content, 40-50 seconds)
- CTA (last 5 seconds, drive to ihatecollege.com)

Rules:
- Write it as spoken word — natural, punchy, conversational
- Include specific stats or dollar amounts
- Build tension or surprise in the middle
- No hashtag suggestions needed
- End with "Check the link in bio for more"

Return as JSON:
{
  "hook": "opening line",
  "concept": "${hook}",
  "script": "full spoken script with [PAUSE] markers where relevant",
  "onScreenText": ["text overlay 1", "text overlay 2", "text overlay 3"],
  "duration": "estimated seconds",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in response");
  return JSON.parse(jsonMatch[0]);
}

function saveScript(scriptData) {
  const date = new Date().toISOString().split("T")[0];
  const slug = scriptData.concept.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const filename = `${date}-${slug}.json`;
  const filepath = path.join(QUEUE_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(scriptData, null, 2));
  console.log(`  Script saved: tiktok-queue/${filename}`);
  return filename;
}

function uploadVideos() {
  const files = fs.readdirSync(VIDEOS_DIR).filter((f) => f.endsWith(".mp4"));

  if (files.length === 0) {
    console.log("  No .mp4 files in tiktok-videos/ to upload.");
    return;
  }

  console.log(`  Found ${files.length} video(s) to upload...`);

  // Check if tiktok-uploader is installed
  const pipCheck = spawnSync("python3", ["-c", "import tiktok_uploader"], { encoding: "utf8" });
  if (pipCheck.status !== 0) {
    console.log("  Installing tiktok-uploader...");
    execSync("pip3 install tiktok-uploader --quiet", { stdio: "inherit" });
  }

  // Check for cookies file
  const cookiesPath = path.join(ROOT, "cookies.txt");
  if (!fs.existsSync(cookiesPath)) {
    console.warn("  WARNING: cookies.txt not found. Run: tiktok-uploader auth");
    console.warn("  Skipping video upload. Place cookies.txt in project root.");
    return;
  }

  for (const file of files) {
    const videoPath = path.join(VIDEOS_DIR, file);
    // Load matching script from queue if available
    const scripts = fs.readdirSync(QUEUE_DIR).filter((f) => f.endsWith(".json"));
    const latestScript = scripts.sort().pop();
    let description = "Follow for daily anti-college content. Link in bio → ihatecollege.com";

    if (latestScript) {
      try {
        const scriptData = JSON.parse(fs.readFileSync(path.join(QUEUE_DIR, latestScript), "utf8"));
        description = `${scriptData.hook} | ihatecollege.com`;
      } catch {}
    }

    console.log(`  Uploading: ${file}`);

    // Build Python upload command
    const pyScript = `
import sys
try:
    from tiktok_uploader.upload import upload_video
    result = upload_video(
        filename="${videoPath}",
        description="${description.replace(/"/g, '\\"')}",
        cookies="${cookiesPath}"
    )
    print("Upload result:", result)
except Exception as e:
    print("Upload failed:", e, file=sys.stderr)
    sys.exit(1)
`;

    const result = spawnSync("python3", ["-c", pyScript], {
      encoding: "utf8",
      cwd: ROOT,
    });

    if (result.status === 0) {
      console.log(`  Uploaded: ${file}`);
      // Move to uploaded folder so we don't re-upload
      const uploadedDir = path.join(ROOT, "tiktok-videos", "uploaded");
      if (!fs.existsSync(uploadedDir)) fs.mkdirSync(uploadedDir, { recursive: true });
      fs.renameSync(videoPath, path.join(uploadedDir, file));
    } else {
      console.error(`  Upload failed for ${file}:`, result.stderr);
    }

    // Delay between uploads
    if (files.indexOf(file) < files.length - 1) {
      execSync("sleep 30");
    }
  }
}

async function run() {
  console.log("\n=== TikTok Generator & Uploader ===");
  console.log(`Date: ${new Date().toISOString()}\n`);

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "your-anthropic-key-here") {
    console.error("ERROR: ANTHROPIC_API_KEY not set");
    process.exit(1);
  }

  // Step 1: Generate script
  try {
    const scriptData = await generateScript();
    saveScript(scriptData);
    console.log(`\n  Script preview:\n  Hook: "${scriptData.hook}"\n  Duration: ~${scriptData.duration}s`);
  } catch (err) {
    console.error("  Script generation failed:", err.message);
  }

  // Step 2: Upload any pending videos
  console.log("\n  Checking for videos to upload...");
  try {
    uploadVideos();
  } catch (err) {
    console.error("  Upload step failed:", err.message);
  }

  console.log("\nDone.");
}

run().catch(console.error);
