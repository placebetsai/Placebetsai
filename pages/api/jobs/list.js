// pages/api/jobs/list.js
import { NextResponse } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";
  const state = searchParams.get("state") || "";

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ jobs: [], configured: false });
  }

  try {
    let query = `${url}/rest/v1/job_posts?select=*&is_approved=eq.true&expires_at=gte.${new Date().toISOString()}&order=created_at.desc&limit=100`;

    const govKeywords = ["law enforcement", "police", "sheriff", "patrol", "officer", "federal", "faa", "fbi", "dea", "cbp", "usps", "postal", "park service", "national park", "military", "army", "navy", "marines", "air force"];

    let dbCategory = "";
    if (["Government", "Law Enforcement", "Federal", "Municipal"].includes(category)) {
      dbCategory = "Government";
    } else if (["Tech", "Trades", "Healthcare", "Business"].includes(category)) {
      dbCategory = category;
    }

    if (dbCategory) {
      query += `&category=eq.${encodeURIComponent(dbCategory)}`;
    }

    const resp = await fetch(query, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) throw new Error(`Supabase error: ${resp.status}`);
    let jobs = await resp.json();

    if (q) {
      const qLower = q.toLowerCase();
      jobs = jobs.filter((j) =>
        j.title?.toLowerCase().includes(qLower) ||
        (j.company || "").toLowerCase().includes(qLower) ||
        (j.location || "").toLowerCase().includes(qLower) ||
        (j.description || "").toLowerCase().includes(qLower)
      );
    }

    if (state && state !== "All States" && state !== "Remote / Nationwide") {
      jobs = jobs.filter((j) =>
        (j.location || "").toLowerCase().includes(state.toLowerCase())
      );
    }
    if (state === "Remote / Nationwide") {
      jobs = jobs.filter((j) =>
        (j.location || "").toLowerCase().includes("remote") ||
        (j.location || "").toLowerCase().includes("nationwide") ||
        (j.location || "").toLowerCase().includes("all states")
      );
    }

    if (category === "Law Enforcement") {
      jobs = jobs.filter((j) =>
        govKeywords.slice(0, 8).some((kw) =>
          ((j.title || "") + " " + (j.description || "")).toLowerCase().includes(kw)
        )
      );
    }

    if (category === "Federal") {
      const fedKw = ["federal", "faa", "fbi", "dea", "cbp", "usps", "postal", "park service", "national park", "tsa", "cia", "irs", "army", "navy", "marines", "air force", "coast guard"];
      jobs = jobs.filter((j) =>
        fedKw.some((kw) => ((j.title || "") + " " + (j.company || "") + " " + (j.description || "")).toLowerCase().includes(kw))
      );
    }

    return NextResponse.json({ jobs, configured: true });
  } catch (err) {
    console.error("jobs/list error:", err);
    return NextResponse.json({ jobs: [], configured: true, error: true });
  }
}
