// pages/api/submit-rating.js
export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { schoolId, schoolName, rating, comment } = req.body || {};
  if (!schoolId || !rating) return res.status(400).json({ error: "schoolId and rating required" });

  const r = parseInt(rating, 10);
  if (r < 1 || r > 5) return res.status(400).json({ error: "rating must be 1–5" });

  console.log(
    `[RATING] ${new Date().toISOString()} — "${schoolName}" (id:${schoolId}) rated ${r}/5` +
    (comment ? ` — "${comment.slice(0, 200)}"` : "")
  );

  return res.status(200).json({ ok: true });
}
