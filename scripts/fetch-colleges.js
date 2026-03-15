#!/usr/bin/env node
/**
 * Prebuild script: fetches all US colleges from the College Scorecard API
 * and saves them to data/colleges.json.
 *
 * Run: node scripts/fetch-colleges.js
 * Requires: COLLEGE_SCORECARD_API_KEY env var (or in .env.local)
 */

const fs = require("fs");
const path = require("path");

try {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
} catch {}

const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;
const CACHE_FILE = path.join(__dirname, "..", ".next", "cache", "colleges.json");
const DATA_FILE = path.join(__dirname, "..", "data", "colleges.json");
const OUT_FILE = CACHE_FILE;

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

function localeLabel(n) {
  const map = {
    11: "Large city", 12: "Midsize city", 13: "Small city",
    21: "Large suburb", 22: "Midsize suburb", 23: "Small suburb",
    31: "Town", 32: "Distant town", 33: "Remote town",
    41: "Rural", 42: "Distant rural", 43: "Remote rural",
  };
  return map[n] || null;
}

function carnegieLabel(n) {
  if (!n) return null;
  if (n === 14) return "R1 Research University";
  if (n === 15) return "R2 Research University";
  if (n === 16) return "Doctoral/Professional University";
  if (n >= 17 && n <= 19) return "Master's University";
  if (n === 20 || n === 21) return "Liberal Arts College";
  if (n === 22) return "Baccalaureate/Associate's College";
  if (n >= 23 && n <= 29) return "Associate's College";
  return null;
}

function fmt(n, prefix = "$") {
  if (n === null || n === undefined || isNaN(n)) return null;
  return prefix + Number(n).toLocaleString("en-US");
}

function fmtPct(n) {
  if (n === null || n === undefined || isNaN(n)) return null;
  return Math.round(Number(n) * 100) + "%";
}

function isDataHealthy(colleges) {
  if (!colleges || colleges.length < 6000) return false;
  // Require at least 30% of colleges to have earnings data
  const withEarnings = colleges.filter((c) => c.earnings).length;
  return withEarnings / colleges.length >= 0.3;
}

async function fetchPage(page, perPage = 100) {
  const fields = [
    "id",
    "school.name",
    "school.city",
    "school.state",
    "school.ownership",
    "school.school_url",
    "school.locale",
    "school.carnegie_basic",
    "school.religious_affiliation",
    "latest.admissions.admission_rate.overall",
    "latest.student.size",
    "latest.completion.completion_rate_4yr_150nt",
    "latest.cost.avg_net_price.public",
    "latest.cost.avg_net_price.private",
    "latest.cost.tuition.in_state",
    "latest.cost.tuition.out_of_state",
    "latest.aid.median_debt.completers.overall",
    "latest.earnings.10_yrs_after_entry.median",
    "latest.repayment.3_yr_repayment_suppressed.overall",
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

  // Skip fetch only if cached data is both large AND has real financial data
  for (const checkFile of [CACHE_FILE, DATA_FILE]) {
    try {
      if (fs.existsSync(checkFile)) {
        const existing = JSON.parse(fs.readFileSync(checkFile, "utf8"));
        if (isDataHealthy(existing.colleges)) {
          console.log(`[fetch-colleges] Using cached data (${existing.colleges.length} colleges, data healthy) from ${checkFile}.`);
          if (checkFile !== DATA_FILE) {
            fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
            fs.copyFileSync(checkFile, DATA_FILE);
          }
          if (checkFile !== CACHE_FILE) {
            fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
            fs.copyFileSync(checkFile, CACHE_FILE);
          }
          process.exit(0);
        } else {
          console.log(`[fetch-colleges] Cached data exists but is stale/incomplete — refetching.`);
        }
      }
    } catch {}
  }

  console.log("[fetch-colleges] Starting college data fetch...");

  const colleges = [];
  const PER_PAGE = 100;
  let page = 0;
  let total = null;

  while (true) {
    try {
      const data = await fetchPage(page, PER_PAGE);
      const results = data?.results || [];

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

        colleges.push({
          id: r["id"],
          name,
          slug,
          city: r["school.city"] || null,
          state: r["school.state"] || null,
          type: ownershipLabel(ownership),
          locale: localeLabel(r["school.locale"]),
          carnegie: carnegieLabel(r["school.carnegie_basic"]),
          cost: fmt(netPrice),
          tuitionInState: fmt(r["latest.cost.tuition.in_state"]),
          tuitionOutState: fmt(r["latest.cost.tuition.out_of_state"]),
          debt: fmt(r["latest.aid.median_debt.completers.overall"]),
          earnings: fmt(r["latest.earnings.10_yrs_after_entry.median"]),
          admissionRate: fmtPct(r["latest.admissions.admission_rate.overall"]),
          enrollment: r["latest.student.size"] ? Number(r["latest.student.size"]).toLocaleString("en-US") : null,
          gradRate: fmtPct(r["latest.completion.completion_rate_4yr_150nt"]),
          repaymentRate: fmtPct(r["latest.repayment.3_yr_repayment_suppressed.overall"]),
          url: r["school.school_url"] || null,
        });
      }

      console.log(`[fetch-colleges] Page ${page + 1}: ${results.length} results (${colleges.length} total so far)`);

      page++;

      if (colleges.length >= total) break;

      await new Promise((r) => setTimeout(r, 5000));
    } catch (err) {
      if (err.message.includes("429")) {
        console.warn(`[fetch-colleges] Rate limited — stopping early with ${colleges.length} colleges.`);
        break;
      } else {
        console.error(`[fetch-colleges] Error on page ${page}: ${err.message}`);
        page++;
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

  const json = JSON.stringify(output, null, 0);
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, json, "utf8");
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, json, "utf8");
  console.log(`[fetch-colleges] Saved ${colleges.length} colleges to cache and data/`);
}

main().catch((err) => {
  console.error("[fetch-colleges] Fatal error:", err);
  process.exit(0);
});
