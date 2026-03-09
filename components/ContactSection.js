import { useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.contactName.value.trim() || "(not given)";
    const email = form.contactEmail.value.trim();
    const message = form.contactMessage.value.trim();

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("done");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="section-header">
        <h2>Contact (quietly)</h2>
        <p>
          Got a story, idea, or collab pitch? This doesn&apos;t post anywhere public — it emails us directly.
        </p>
      </div>

      <div className="contact-grid">
        <div className="card form-card">
          {status === "done" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Message sent ✓</p>
              <p style={{ opacity: 0.7 }}>We&apos;ll get back to you at your email.</p>
              <button className="btn btn-secondary" style={{ marginTop: "1.5rem" }} onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="contactName">Name (optional)</label>
                <input id="contactName" name="contactName" type="text" />
              </div>
              <div className="form-row">
                <label htmlFor="contactEmail">Your email (so we can reply)</label>
                <input id="contactEmail" name="contactEmail" type="email" required />
              </div>
              <div className="form-row">
                <label htmlFor="contactMessage">Message</label>
                <textarea id="contactMessage" name="contactMessage" rows={5} required />
              </div>
              {status === "error" && (
                <p style={{ color: "#f87171", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                  Something went wrong — try emailing us directly at info@ihatecollege.com
                </p>
              )}
              <button type="submit" className="btn btn-secondary" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>

        <div className="card">
          <h3>What this inbox is for</h3>
          <ul className="list">
            <li>Reality checks about specific colleges or programs.</li>
            <li>Ideas for tools, cheat sheets, or comparison features.</li>
            <li>Collabs, sponsorships, or &quot;help me escape this place&quot; stories.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
