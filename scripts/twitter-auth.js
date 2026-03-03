#!/usr/bin/env node
/**
 * twitter-auth.js — Run this ONCE to authorize your Twitter account via OAuth 2.0
 * It will open a browser, you approve access, and your token gets saved to .env
 *
 * Usage: node scripts/twitter-auth.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { TwitterApi } = require("twitter-api-v2");
const http = require("http");
const fs = require("fs");
const path = require("path");

const ENV_PATH = path.join(__dirname, "../.env");
const PORT = 3001;
const CALLBACK_URL = `http://localhost:${PORT}/callback`;

const client = new TwitterApi({
  clientId: process.env.X_CLIENT_ID,
  clientSecret: process.env.X_CLIENT_SECRET,
});

async function main() {
  console.log("\n=== Twitter OAuth 2.0 One-Time Authorization ===\n");

  const { url, codeVerifier, state } = client.generateOAuth2AuthLink(CALLBACK_URL, {
    scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
  });

  console.log("Opening browser for authorization...");
  console.log("If it doesn't open, visit this URL manually:\n");
  console.log(url, "\n");

  // Try to open browser
  const { exec } = require("child_process");
  exec(`xdg-open "${url}" 2>/dev/null || open "${url}" 2>/dev/null || echo "Open manually"`);

  // Start local server to catch callback
  const server = http.createServer(async (req, res) => {
    if (!req.url.startsWith("/callback")) return;

    const params = new URL(req.url, `http://localhost:${PORT}`).searchParams;
    const code = params.get("code");
    const returnedState = params.get("state");

    if (returnedState !== state) {
      res.end("State mismatch error. Try again.");
      server.close();
      return;
    }

    try {
      const { client: loggedClient, accessToken, refreshToken } = await client.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: CALLBACK_URL,
      });

      // Get username to confirm
      const me = await loggedClient.v2.me();
      console.log(`\n✓ Authorized as @${me.data.username}`);
      console.log(`✓ Access token: ${accessToken.slice(0, 20)}...`);

      // Save token to .env
      let envContent = fs.readFileSync(ENV_PATH, "utf8");
      if (envContent.includes("X_OAUTH2_TOKEN=")) {
        envContent = envContent.replace(/X_OAUTH2_TOKEN=.*/, `X_OAUTH2_TOKEN=${accessToken}`);
      } else {
        envContent += `\nX_OAUTH2_TOKEN=${accessToken}`;
      }
      if (refreshToken) {
        if (envContent.includes("X_OAUTH2_REFRESH_TOKEN=")) {
          envContent = envContent.replace(/X_OAUTH2_REFRESH_TOKEN=.*/, `X_OAUTH2_REFRESH_TOKEN=${refreshToken}`);
        } else {
          envContent += `\nX_OAUTH2_REFRESH_TOKEN=${refreshToken}`;
        }
      }
      fs.writeFileSync(ENV_PATH, envContent);

      // Also write refresh token to /tmp so cron picks it up immediately
      if (refreshToken) fs.writeFileSync("/tmp/twitter_rt.txt", refreshToken, "utf8");

      console.log("\n✓ Token saved to .env");
      console.log("✓ Refresh token persisted to /tmp/twitter_rt.txt");
      console.log("✓ You can now run: node scripts/post-twitter.js\n");

      res.end("<h2>✓ Authorization successful! You can close this tab.</h2>");
      server.close();
      process.exit(0);
    } catch (err) {
      console.error("Auth failed:", err.message);
      res.end("Auth failed: " + err.message);
      server.close();
      process.exit(1);
    }
  });

  server.listen(PORT, () => {
    console.log(`Waiting for authorization on port ${PORT}...`);
  });
}

main().catch(console.error);
