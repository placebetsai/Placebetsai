// pages/api/college-rankings.js
import { NextResponse } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req) {
  const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: "Server config error: Key missing" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "University";
  const page = 0;
  const perPage = 25;

  const fields = [
    "id",
    "school.name",
    "school.city",
    "school.state",
    "latest.cost.tuition.in_state",
    "latest.aid.median_debt.completers.overall",
    "latest.earnings.10_yrs_after_entry.median",
  ].join(",");

  const url =
    `https://api.data.gov/ed/collegescorecard/v1/schools` +
    `?api_key=${API_KEY}` +
    `&school.name=${encodeURIComponent(search)}` +
    `&per_page=${perPage}` +
    `&page=${page}` +
    `&fields=${encodeURIComponent(fields)}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Gov API error: ${resp.status}`);
    const data = await resp.json();

    const results = (data.results || []).map((item) => {
      const costNum = item["latest.cost.tuition.in_state"];
      const debtNum = item["latest.aid.median_debt.completers.overall"];
      const earnNum = item["latest.earnings.10_yrs_after_entry.median"];

      return {
        id: item.id,
        name: item["school.name"],
        city: item["school.city"],
        state: item["school.state"],
        cost: Number.isFinite(Number(costNum)) ? `$${Math.round(costNum).toLocaleString()}` : "N/A",
        debt: Number.isFinite(Number(debtNum)) ? `$${Math.round(debtNum).toLocaleString()}` : "N/A",
        earnings: Number.isFinite(Number(earnNum)) ? `$${Math.round(earnNum).toLocaleString()}` : "N/A",
      };
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}
