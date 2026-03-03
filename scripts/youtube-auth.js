#!/usr/bin/env node
/**
 * youtube-auth.js — One-time setup to get a YouTube refresh token.
 * Run this ONCE locally, paste the code from Google, and it outputs your refresh token.
 *
 * Prerequisites:
 *   1. Go to https://console.cloud.google.com
 *   2. Create project → enable "YouTube Data API v3"
 *   3. Create OAuth2 credentials → type: Desktop App
 *   4. Add YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET to .env
 *   5. Run: node scripts/youtube-auth.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const https = require("https");
const readline = require("readline");

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("ERROR: YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET must be set in .env");
  process.exit(1);
}

const SCOPES = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
].join(" ");

const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
  `client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&access_type=offline` +
  `&prompt=consent`;

console.log("\n══════════════════════════════════════════════════════");
console.log("  YouTube OAuth Setup");
console.log("══════════════════════════════════════════════════════");
console.log("\n1. Open this URL in your browser:\n");
console.log(authUrl);
console.log("\n2. Log in with the YouTube channel account");
console.log("3. Authorize the app");
console.log("4. Copy the code shown and paste it below\n");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Paste the authorization code: ", (code) => {
  rl.close();

  const body = new URLSearchParams({
    code: code.trim(),
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  }).toString();

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
        if (json.refresh_token) {
          console.log("\n══════════════════════════════════════════════════════");
          console.log("  SUCCESS! Add these to your Railway environment:");
          console.log("══════════════════════════════════════════════════════");
          console.log(`\nYOUTUBE_CLIENT_ID=${CLIENT_ID}`);
          console.log(`YOUTUBE_CLIENT_SECRET=${CLIENT_SECRET}`);
          console.log(`YOUTUBE_REFRESH_TOKEN=${json.refresh_token}\n`);
        } else {
          console.error("Failed:", data);
        }
      } catch { console.error("Parse error:", data); }
    });
  });
  req.on("error", console.error);
  req.write(body);
  req.end();
});
