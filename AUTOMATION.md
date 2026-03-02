# IHateCollege.com — Social Media Automation

Automated content system that runs 24/7 on Railway.app:
- **3 SEO blog articles/day** pushed to GitHub → auto-deploys on Vercel
- **5 anti-college tweets/day** via X API, spaced 90 minutes apart
- **1 TikTok script/day** + auto-upload of any `.mp4` files placed in `/tiktok-videos/`

---

## Scripts

| Script | What it does |
|--------|-------------|
| `scripts/generate-articles.js` | Generates 3 SEO blog posts, saves to `/pages/blog/`, updates sitemap, commits & pushes |
| `scripts/post-twitter.js` | Generates & posts 5 tweets via X API, 90 min apart |
| `scripts/generate-tiktok.js` | Generates TikTok script, uploads any `.mp4` from `/tiktok-videos/` |
| `scripts/run-daily.js` | Master cron scheduler — runs everything at 6 AM daily |

---

## Setup

### 1. Install dependencies

```bash
npm install @anthropic-ai/sdk twitter-api-v2 node-cron dotenv
pip3 install tiktok-uploader
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your real credentials
```

Required values in `.env`:
- `ANTHROPIC_API_KEY` — get from [console.anthropic.com](https://console.anthropic.com)
- `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` — from [developer.twitter.com](https://developer.twitter.com)
- `GITHUB_REPO` — e.g. `placebetsai/Ihatecollege`
- `GITHUB_BRANCH` — e.g. `restore-good`

### 3. TikTok authentication

TikTok requires browser cookies for upload. Run once on your local machine:

```bash
# Install tiktok-uploader
pip3 install tiktok-uploader

# Authenticate (opens browser)
tiktok-uploader auth --username _ihatecollege

# This creates cookies.txt in your project root
# Upload cookies.txt to Railway as a secret file or paste into env
```

### 4. Configure git for auto-commits (articles script)

```bash
git config user.email "automation@ihatecollege.com"
git config user.name "IHateCollege Bot"

# Set up SSH or HTTPS token so push works without prompts
git remote set-url origin https://YOUR_TOKEN@github.com/placebetsai/Ihatecollege.git
```

---

## Test locally

```bash
# Test article generation
node scripts/generate-articles.js

# Test Twitter posting
node scripts/post-twitter.js

# Test TikTok script generation
node scripts/generate-tiktok.js

# Run everything immediately (skip cron wait)
node scripts/run-daily.js --now
```

---

## Deploy to Railway.app (24/7)

Railway runs Node.js workers persistently — perfect for the cron scheduler.

### Step 1: Create Railway project

1. Go to [railway.app](https://railway.app) → **New Project**
2. Select **Deploy from GitHub repo**
3. Connect `placebetsai/Ihatecollege`

### Step 2: Add environment variables

In Railway dashboard → **Variables** tab, add every line from your `.env` file:

```
ANTHROPIC_API_KEY=sk-ant-...
X_API_KEY=...
X_API_SECRET=...
X_ACCESS_TOKEN=...
X_ACCESS_TOKEN_SECRET=...
GITHUB_REPO=placebetsai/Ihatecollege
GITHUB_BRANCH=restore-good
SITE_URL=https://ihatecollege.com
TIMEZONE=America/New_York
```

### Step 3: Set start command

In Railway → **Settings** → **Start Command**:

```
node scripts/run-daily.js
```

### Step 4: Add Nixpacks config (for Python + Node.js)

Create `nixpacks.toml` in root:

```toml
[phases.setup]
nixPkgs = ["python311", "nodejs_20"]

[phases.install]
cmds = ["npm install", "pip3 install tiktok-uploader"]

[start]
cmd = "node scripts/run-daily.js"
```

### Step 5: Deploy

```bash
git add nixpacks.toml
git commit -m "Add Railway nixpacks config"
git push origin restore-good
```

Railway will auto-deploy. The scheduler starts and waits for 6 AM.

---

## TikTok videos

To post a video:
1. Drop any `.mp4` file into `/tiktok-videos/`
2. The next run of `generate-tiktok.js` will auto-upload it using the latest script as description
3. Uploaded videos are moved to `/tiktok-videos/uploaded/`

---

## Blog articles

Generated articles go to `/pages/blog/[slug].js`. They are:
- Auto-committed and pushed to GitHub
- Auto-deployed by Vercel's git integration
- Auto-added to sitemap

---

## Monitoring

View logs in Railway dashboard → **Deployments** → **Logs**.

To check if everything is running:
```bash
railway logs --tail
```
