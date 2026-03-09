import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message } = req.body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  // Try to send via Gmail if credentials are set
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: "ihatecollege79@gmail.com",
        cc: "info@ihatecollege.com",
        replyTo: email,
        subject: `Contact from ${name} — IHateCollege.com`,
        text: body,
      });
    } catch (err) {
      console.error("[CONTACT] Email send failed:", err.message);
      // Still return success so the user sees the confirmation
    }
  }

  // Always log the submission
  console.log(`[CONTACT] ${new Date().toISOString()} — ${name} <${email}>: ${message.slice(0, 120)}`);

  return res.status(200).json({ success: true });
}
