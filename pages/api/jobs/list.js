// pages/api/jobs/list.js
// Fetches approved, non-expired job posts from Supabase.
// Requires env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_ANON_KEY

export default async function handler(req, res) {
  const { category = "", q = "" } = req.query;

  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key  = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    // DB not configured yet — return empty so the page still renders
    return res.status(200).json({ jobs: [], configured: false });
  }

  try {
    let query = `${url}/rest/v1/job_posts?select=*&is_approved=eq.true&expires_at=gte.${new Date().toISOString()}&order=created_at.desc&limit=50`;

    if (category && category !== "All") {
      query += `&category=eq.${encodeURIComponent(category)}`;
    }

    const resp = await fetch(query, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) throw new Error(`Supabase error: ${resp.status}`);
    const jobs = await resp.json();

    // Client-side text search if q provided
    const filtered = q
      ? jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(q.toLowerCase()) ||
            (j.company || "").toLowerCase().includes(q.toLowerCase()) ||
            (j.location || "").toLowerCase().includes(q.toLowerCase())
        )
      : jobs;

    return res.status(200).json({ jobs: filtered, configured: true });
  } catch (err) {
    console.error("jobs/list error:", err);
    return res.status(200).json({ jobs: [], configured: true, error: true });
  }
}
