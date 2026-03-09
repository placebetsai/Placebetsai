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
        _template: "table",
      }),
    });
    const data = await r.json();
    if (data.success === "true" || data.success === true) {
      return res.status(200).json({ success: true });
    }
    throw new Error("formsubmit failed");
  } catch (err) {
    console.error("[CONTACT] error:", err);
    return res.status(500).json({ error: "Failed to send." });
  }
}
