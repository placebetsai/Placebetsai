#!/usr/bin/env node
// One-time script: fetch all colleges from Urban Institute API (no key needed) and save to data/colleges.json
const fs = require("fs");
const path = require("path");

function toSlug(n) {
  return String(n || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function ownershipLabel(n) {
  if (n === 1) return "Public";
  if (n === 2) return "Private";
  if (n === 3) return "For-Profit";
  return "Other";
}

async function main() {
  console.log("Fetching all colleges from Urban Institute IPEDS API...");
  const res = await fetch(
    "https://educationdata.urban.org/api/v1/college-university/ipeds/directory/2022/?page=1&per_page=100"
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const d = await res.json();
  console.log(`Got ${d.results.length} of ${d.count} institutions`);

  const colleges = d.results
    .filter((r) => r.inst_name && toSlug(r.inst_name))
    .map((r) => ({
      id: r.unitid,
      name: r.inst_name,
      slug: toSlug(r.inst_name),
      city: r.city || null,
      state: r.state_abbr || null,
      type: ownershipLabel(r.inst_control),
      cost: null,
      debt: null,
      earnings: null,
      url: r.url_school || null,
    }));

  const out = path.join(__dirname, "..", "data", "colleges.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ generated: new Date().toISOString(), count: colleges.length, colleges }, null, 0));
  console.log(`Saved ${colleges.length} colleges to data/colleges.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
