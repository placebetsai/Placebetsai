// pages/api/jobs/post.js
// Posts a job — tries Supabase first, falls back to email via formsubmit.co

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { title, company, location, category, salary_min, salary_max, description, apply_url, contact_email, logo_url, image_url } = req.body;

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
    image_url:     image_url?.trim() || null,
    is_approved:   true,
  };

  // Try Supabase first if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const resp = await fetch(`${supabaseUrl}/rest/v1/job_posts`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      });
      if (resp.ok) {
        const [created] = await resp.json();
        return res.status(201).json({ ok: true, id: created?.id });
      }
    } catch {}
  }

  // Fallback: email the job posting to admin via formsubmit.co
  try {
    const salary = payload.salary_min && payload.salary_max
      ? `$${payload.salary_min.toLocaleString()} – $${payload.salary_max.toLocaleString()}`
      : "Not specified";

    const emailBody = `
NEW JOB POSTING — IHateCollege.com

Title: ${payload.title}
Company: ${payload.company || "Not specified"}
Location: ${payload.location}
Category: ${payload.category}
Salary: ${salary}
Apply URL: ${payload.apply_url || "N/A"}
Contact Email: ${payload.contact_email || "N/A"}
Logo URL: ${payload.logo_url || "N/A"}
Image URL: ${payload.image_url || "N/A"}

Description:
${payload.description}
    `.trim();

    const r = await fetch("https://formsubmit.co/ajax/info@ihatecollege.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New Job Post: ${payload.title} @ ${payload.company || payload.location}`,
        message: emailBody,
        _template: "box",
      }),
    });
    const d = await r.json();
    if (d.success === "true" || d.success === true) {
      return res.status(201).json({ ok: true });
    }
    throw new Error("formsubmit failed");
  } catch (err) {
    console.error("jobs/post fallback error:", err);
    return res.status(500).json({ error: "Failed to submit. Email us directly at info@ihatecollege.com." });
  }
}
