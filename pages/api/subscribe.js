/**
 * /api/subscribe
 * Handles email signups. Logs to console (visible in Railway/Vercel logs).
 * To connect a real email service, set EMAIL_WEBHOOK_URL in .env
 * and point it to a Zapier/Make.com webhook, ConvertKit API, etc.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  // Log to server console (shows in Railway and Vercel logs)
  console.log(`[SUBSCRIBE] New email signup: ${email} at ${new Date().toISOString()}`);

  // If EMAIL_WEBHOOK_URL is set, forward to Zapier/Make/ConvertKit webhook
  if (process.env.EMAIL_WEBHOOK_URL) {
    try {
      await fetch(process.env.EMAIL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "ihatecollege.com", timestamp: new Date().toISOString() }),
      });
    } catch (err) {
      console.error("[SUBSCRIBE] Webhook failed:", err.message);
      // Don't fail the user request — just log the error
    }
  }

  return res.status(200).json({ success: true });
}
