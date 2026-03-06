#!/usr/bin/env node
/**
 * Prebuild script: fetches all US colleges from the College Scorecard API
 * and saves them to data/colleges.json.
 *
 * Run: node scripts/fetch-colleges.js
 * Requires: COLLEGE_SCORECARD_API_KEY env var (or in .env.local)
 *
 * Output: data/colleges.json (~6000+ schools with cost/debt/earnings)
 */

const fs = require("fs");
const path = require("path");

// Load .env / .env.local if running locally
try {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
} catch {}

const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;
const OUT_FILE = path.join(__dirname, "..", "data", "colleges.json");

function toSlug(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ownershipLabel(n) {
  if (n === 1) return "Public";
  if (n === 2) return "Private";
  if (n === 3) return "For-Profit";
  return "Other";
}

function fmt(n, prefix = "$") {
  if (!n || isNaN(n)) return null;
  return prefix + Number(n).toLocaleString("en-US");
}

async function fetchPage(page, perPage = 100) {
  const fields = [
    "id",
    "school.name",
    "school.city",
    "school.state",
    "school.ownership",
    "school.school_url",
    "latest.cost.avg_net_price.public",
    "latest.cost.avg_net_price.private",
    "latest.aid.median_debt.completers.overall",
    "latest.earnings.10_yrs_after_entry.median",
  ].join(",");

  const url =
    `https://api.data.gov/ed/collegescorecard/v1/schools.json` +
    `?api_key=${encodeURIComponent(API_KEY)}` +
    `&per_page=${perPage}` +
    `&page=${page}` +
    `&fields=${encodeURIComponent(fields)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function main() {
  if (!API_KEY) {
    console.warn("[fetch-colleges] No COLLEGE_SCORECARD_API_KEY — skipping fetch.");
    process.exit(0);
  }

  // Skip fetch if we already have a complete dataset (avoids rate limiting on every build)
  try {
    if (fs.existsSync(OUT_FILE)) {
      const existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
      if ((existing.colleges || []).length >= 6000) {
        console.log(`[fetch-colleges] Using cached data (${existing.colleges.length} colleges). Skipping fetch.`);
        process.exit(0);
      }
    }
  } catch {}

  console.log("[fetch-colleges] Starting college data fetch...");

  const colleges = [];
  const PER_PAGE = 100;
  let page = 0;
  let total = null;

  let retries = 0;
  const MAX_RETRIES = 5;

  while (true) {
    try {
      const data = await fetchPage(page, PER_PAGE);
      const results = data?.results || [];
      retries = 0; // reset on success

      if (total === null) {
        total = data?.metadata?.total ?? 0;
        console.log(`[fetch-colleges] Total schools: ${total}`);
      }

      if (results.length === 0) break;

      for (const r of results) {
        const name = r["school.name"];
        if (!name) continue;

        const slug = toSlug(name);
        if (!slug) continue;

        const ownership = r["school.ownership"];
        const netPub = r["latest.cost.avg_net_price.public"];
        const netPriv = r["latest.cost.avg_net_price.private"];
        const netPrice = netPub || netPriv || null;
        const debt = r["latest.aid.median_debt.completers.overall"];
        const earnings = r["latest.earnings.10_yrs_after_entry.median"];

        colleges.push({
          id: r["id"],
          name,
          slug,
          city: r["school.city"] || null,
          state: r["school.state"] || null,
          type: ownershipLabel(ownership),
          cost: fmt(netPrice),
          debt: fmt(debt),
          earnings: fmt(earnings),
          url: r["school.school_url"] || null,
        });
      }

      console.log(`[fetch-colleges] Page ${page + 1}: ${results.length} results (${colleges.length} total so far)`);

      page++;

      // Safety: stop if we've clearly got everything
      if (colleges.length >= total) break;

      // Delay between pages to stay under rate limit (~1 req/sec)
      await new Promise((r) => setTimeout(r, 800));
    } catch (err) {
      const is429 = err.message.includes("429");
      retries++;
      if (is429 && retries <= MAX_RETRIES) {
        const wait = retries * 3000; // 3s, 6s, 9s, 12s, 15s
        console.warn(`[fetch-colleges] Rate limited on page ${page}, waiting ${wait / 1000}s (attempt ${retries}/${MAX_RETRIES})...`);
        await new Promise((r) => setTimeout(r, wait));
        // retry same page (don't increment)
      } else {
        console.error(`[fetch-colleges] Error on page ${page}: ${err.message}`);
        retries = 0;
        page++; // skip this page and continue
        if (page > 100) break;
      }
    }
  }

  if (colleges.length === 0) {
    console.warn("[fetch-colleges] No colleges fetched. Check API key and network.");
    process.exit(0);
  }

  const output = {
    generated: new Date().toISOString(),
    count: colleges.length,
    colleges,
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 0), "utf8");
  console.log(`[fetch-colleges] Saved ${colleges.length} colleges to ${OUT_FILE}`);
}

main().catch((err) => {
  console.error("[fetch-colleges] Fatal error:", err);
  // Exit 0 so a fetch failure doesn't block the build
  process.exit(0);
});
