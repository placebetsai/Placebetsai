import { NextResponse } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body = {};
  try { body = await req.json(); } catch {}
  const { email } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  console.log(`[SUBSCRIBE] New email signup: ${email} at ${new Date().toISOString()}`);

  if (process.env.EMAIL_WEBHOOK_URL) {
    try {
      await fetch(process.env.EMAIL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "ihatecollege.com", timestamp: new Date().toISOString() }),
      });
    } catch (err) {
      console.error("[SUBSCRIBE] Webhook failed:", err.message);
    }
  }

  return NextResponse.json({ success: true });
}
