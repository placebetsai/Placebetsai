// pages/api/jobs/post.js
// Creates a new job post in Supabase.
// Requires env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_ANON_KEY

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(503).json({ error: "Database not configured yet. Check back soon!" });
  }

  const { title, company, location, category, salary_min, salary_max, description, apply_url, contact_email, logo_url } = req.body;

  // Basic validation
  if (!title?.trim() || !location?.trim() || !category?.trim() || !description?.trim()) {
    return res.status(400).json({ error: "Title, location, category, and description are required." });
  }
  if (!apply_url?.trim() && !contact_email?.trim()) {
    return res.status(400).json({ error: "Provide either an apply URL or contact email." });
  }

  const payload = {
    title:         title.trim().slice(0, 120),
    company:       (company || "").trim().slice(0, 100) || null,
    location:      location.trim().slice(0, 100),
    category:      category.trim(),
    salary_min:    salary_min ? parseInt(salary_min) : null,
    salary_max:    salary_max ? parseInt(salary_max) : null,
    description:   description.trim().slice(0, 2000),
    apply_url:     apply_url?.trim() || null,
    contact_email: contact_email?.trim() || null,
    logo_url:      logo_url?.trim() || null,
    is_approved:   true,
  };

  try {
    const resp = await fetch(`${url}/rest/v1/job_posts`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(err);
    }

    const [created] = await resp.json();
    return res.status(201).json({ ok: true, id: created?.id });
  } catch (err) {
    console.error("jobs/post error:", err);
    return res.status(500).json({ error: "Failed to post job. Please try again." });
  }
}
