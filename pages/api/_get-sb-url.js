export default function handler(req, res) {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const k = process.env.SUPABASE_ANON_KEY || "";
  // Try to extract project ref from JWT anon key
  let ref = "";
  try {
    const payload = JSON.parse(Buffer.from(k.split(".")[1], "base64").toString());
    ref = payload.ref || payload.iss || "";
  } catch {}
  return res.json({ u, k, ref });
}
