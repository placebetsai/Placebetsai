// pages/api/submit-rating.js
import { NextResponse } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") return new Response(null, { status: 405 });

  let body = {};
  try { body = await req.json(); } catch {}
  const { school, city, state, debtScore, mentalHealthScore, comment } = body;

  if (!school) return NextResponse.json({ error: "school is required" }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  const payload = {
    school: String(school).slice(0, 200),
    city: String(city || "").slice(0, 100),
    state: String(state || "").slice(0, 2).toUpperCase(),
    debt_score: Number(debtScore) || 5,
    mental_health_score: Number(mentalHealthScore) || 5,
    comment: String(comment || "").slice(0, 2000),
    created_at: new Date().toISOString(),
  };

  console.log("[RATING]", JSON.stringify(payload));

  if (url && key) {
    try {
      const resp = await fetch(`${url}/rest/v1/school_ratings`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        return NextResponse.json({ ok: true });
      }

      const errText = await resp.text();

      if (resp.status === 404 || errText.includes("does not exist")) {
        const created = await createTable(url, key);
        if (created) {
          const retry = await fetch(`${url}/rest/v1/school_ratings`, {
            method: "POST",
            headers: {
              apikey: key,
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify(payload),
          });
          if (retry.ok) return NextResponse.json({ ok: true });
        }
      }

      console.error("[RATING] Supabase error:", resp.status, errText);
    } catch (err) {
      console.error("[RATING] Supabase fetch error:", err.message);
    }
  }

  return NextResponse.json({ ok: true, stored: "logs" });
}

async function createTable(url, key) {
  const sql = `
    CREATE TABLE IF NOT EXISTS school_ratings (
      id bigserial PRIMARY KEY,
      school text NOT NULL,
      city text,
      state text,
      debt_score int NOT NULL DEFAULT 5,
      mental_health_score int NOT NULL DEFAULT 5,
      comment text,
      created_at timestamptz DEFAULT now()
    );
  `;

  try {
    const resp = await fetch(`${url}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}
