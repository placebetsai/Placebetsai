export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message } = req.body || {};
  if (!email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Email and message are required." });
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
      return res.status(200).json({ success: true });
    }
    console.error("[CONTACT] formsubmit did not return success:", data);
    return res.status(500).json({ error: "Failed to send." });
  } catch (err) {
    console.error("[CONTACT] error:", err);
    return res.status(500).json({ error: "Failed to send." });
  }
}
