import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// super simple in-memory throttle per IP
const hits = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_HITS = 8;

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
    arr.push(now);
    hits.set(ip, arr);
    if (arr.length > MAX_HITS) {
      return NextResponse.json({ ok: true });
    }

    const { name = "", email = "", message = "", website = "" } =
      await req.json();

    // honeypot hit → pretend success, do nothing
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await resend.emails.send({
      from: "PlaceBets.ai <onboarding@resend.dev>",
      to: ["placebetsai@gmail.com"],
      subject: `New Contact – ${name}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_ERROR", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
