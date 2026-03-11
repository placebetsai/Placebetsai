export default function handler(req, res) {
  return res.json({ u: process.env.NEXT_PUBLIC_SUPABASE_URL, k: (process.env.SUPABASE_ANON_KEY||"").slice(0,20) });
}
