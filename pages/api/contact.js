import { NextResponse } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") return new Response(null, { status: 405 });

  let body = {};
  try { body = await req.json(); } catch {}
  const { name, email, message } = body;

  if (!email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
  }

  try {
    const r = await fetch("https://formsubmit.co/ajax/info@ihatecollege.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: name || "Anonymous",
        email: email.trim(),
        message: message.trim(),
        _subject: `IHateCollege.com contact from ${name || email}`,
        _replyto: email.trim(),
        _captcha: "false",
      }),
    });
    const text = await r.text();
    console.log("[CONTACT] formsubmit response:", r.status, text);
    let data;
    try { data = JSON.parse(text); } catch { data = {}; }
    if (data.success === "true" || data.success === true) {
      return NextResponse.json({ success: true });
    }
    console.error("[CONTACT] formsubmit did not return success:", data);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  } catch (err) {
    console.error("[CONTACT] error:", err);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }
}
