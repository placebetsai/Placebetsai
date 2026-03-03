#!/usr/bin/env node
/**
 * youtube-auth.js — One-time setup to get a YouTube refresh token.
 * Uses localhost callback (Google deprecated the OOB flow).
 *
 * Prerequisites:
 *   1. Go to console.cloud.google.com → your OAuth client
 *   2. Add http://localhost:3334/callback as an authorized redirect URI
 *   3. Run: node scripts/youtube-auth.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3334/callback";
const ENV_FILE = path.join(__dirname, "../.env");

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("ERROR: YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET must be set in .env");
  process.exit(1);
}

const SCOPES = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
].join(" ");

const authUrl = "https://accounts.google.com/o/oauth2/auth?" + new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope: SCOPES,
  access_type: "offline",
  prompt: "consent",
}).toString();

console.log("\n══════════════════════════════════════════════════════");
console.log("  YouTube OAuth Setup");
console.log("══════════════════════════════════════════════════════");
console.log("\nOpening browser... if it doesn't open, paste this URL:\n");
console.log(authUrl + "\n");

exec(`xdg-open "${authUrl}" 2>/dev/null || open "${authUrl}" 2>/dev/null`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:3334");
  if (url.pathname !== "/callback") { res.end("Not found"); return; }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.end(`<h1>Auth failed: ${error || "no code returned"}</h1>`);
    server.close();
    process.exit(1);
  }

  try {
    const tokens = await exchangeCode(code);
    saveToEnv(tokens.refresh_token);

    res.end(`<h1>✅ YouTube auth complete!</h1><p>Refresh token saved to .env. You can close this tab.</p>`);
    console.log("\n✅ SUCCESS!");
    console.log(`   YOUTUBE_REFRESH_TOKEN saved to .env`);
    console.log("   Add these to Railway:\n");
    console.log(`   YOUTUBE_CLIENT_ID=${CLIENT_ID}`);
    console.log(`   YOUTUBE_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`   YOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
  } catch (err) {
    res.end(`<h1>Token exchange failed: ${err.message}</h1>`);
    console.error("Failed:", err.message);
  }

  server.close();
  process.exit(0);
});

server.listen(3334, () => {
  console.log("Waiting for Google to redirect to localhost:3334...\n");
});

function exchangeCode(code) {
  const body = new URLSearchParams({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  }).toString();

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "oauth2.googleapis.com",
      path: "/token",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }, (res) => {
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.refresh_token) resolve(json);
          else reject(new Error(data.slice(0, 300)));
        } catch { reject(new Error("Invalid response")); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function saveToEnv(refreshToken) {
  let content = fs.readFileSync(ENV_FILE, "utf8");
  if (/^YOUTUBE_REFRESH_TOKEN=.*/m.test(content)) {
    content = content.replace(/^YOUTUBE_REFRESH_TOKEN=.*/m, `YOUTUBE_REFRESH_TOKEN=${refreshToken}`);
  } else {
    content += `\nYOUTUBE_REFRESH_TOKEN=${refreshToken}`;
  }
  fs.writeFileSync(ENV_FILE, content, "utf8");
}
