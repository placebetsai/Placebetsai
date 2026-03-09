import { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("https://formsubmit.co/ajax/info@ihatecollege.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name || "Anonymous",
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: `IHateCollege.com message from ${form.name || form.email}`,
          _template: "table",
        }),
      });
      const d = await r.json();
      if (d.success === "true" || d.success === true) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inp = {
    width: "100%", padding: "13px 16px", background: "#0d0d0d",
    border: "1px solid #2a2a2a", borderRadius: 10, color: "#fff",
    fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <Layout>
      <SEO
        title="Contact Us | IHateCollege.com"
        description="Got a story, idea, or want to vent about tuition? Reach us directly — we respond within a few hours."
      />

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
            Real People, Fast Replies
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 14px" }}>
            Get In Touch
          </h1>
          <p style={{ color: "#777", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            We read every message and respond within a few hours — same day at the latest.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>

          {/* FORM */}
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 32 }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24 }}>✓</div>
                <h2 style={{ color: "#10b981", fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Message Sent!</h2>
                <p style={{ color: "#666", fontSize: 15, marginBottom: 24 }}>We'll get back to you within a few hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{ padding: "10px 24px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#ccc", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ color: "#666", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Name</label>
                    <input
                      type="text" value={form.name} onChange={set("name")}
                      placeholder="Your name" style={inp}
                      onFocus={e => e.target.style.borderColor = "#ff2020"}
                      onBlur={e => e.target.style.borderColor = "#2a2a2a"}
                    />
                  </div>
                  <div>
                    <label style={{ color: "#666", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                      Email <span style={{ color: "#ff2020" }}>*</span>
                    </label>
                    <input
                      type="email" value={form.email} onChange={set("email")} required
                      placeholder="you@example.com" style={inp}
                      onFocus={e => e.target.style.borderColor = "#ff2020"}
                      onBlur={e => e.target.style.borderColor = "#2a2a2a"}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: "#666", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                    Message <span style={{ color: "#ff2020" }}>*</span>
                  </label>
                  <textarea
                    value={form.message} onChange={set("message")} required rows={6}
                    placeholder="What's on your mind? We read everything."
                    style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
                    onFocus={e => e.target.style.borderColor = "#ff2020"}
                    onBlur={e => e.target.style.borderColor = "#2a2a2a"}
                  />
                </div>

                {status === "error" && (
                  <div style={{ background: "rgba(255,32,32,0.08)", border: "1px solid rgba(255,32,32,0.3)", borderRadius: 8, padding: "12px 16px", color: "#ff6060", fontSize: 13 }}>
                    Something went wrong. Email us directly at <strong>info@ihatecollege.com</strong>
                  </div>
                )}

                <button
                  type="submit" disabled={status === "sending"}
                  style={{ padding: "15px", background: "#ff2020", color: "#fff", fontWeight: 900, fontSize: 16, borderRadius: 10, border: "none", cursor: status === "sending" ? "default" : "pointer", opacity: status === "sending" ? 0.7 : 1, transition: "background 0.15s" }}
                  onMouseOver={e => { if (status !== "sending") e.target.style.background = "#cc0000"; }}
                  onMouseOut={e => { e.target.style.background = "#ff2020"; }}
                >
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 24 }}>
              <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 900, marginBottom: 12 }}>What this inbox is for</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Reality checks on specific colleges or programs",
                  "Ideas for tools, comparisons, or new features",
                  "Collabs, sponsorships, or job board inquiries",
                  "\"Help me escape this place\" stories",
                  "Press, media, or partnership requests",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#ff2020", fontWeight: 900, flexShrink: 0 }}>→</span>
                    <span style={{ color: "#888", fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: "rgba(255,32,32,0.06)", border: "1px solid rgba(255,32,32,0.2)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: "#ff2020", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Response Time</div>
              <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: "#fff" }}>A few hours</strong>, same day at the latest. We actually read these.
              </p>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,32,32,0.15)" }}>
                <p style={{ color: "#555", fontSize: 12, margin: 0 }}>Or email directly:</p>
                <a href="mailto:info@ihatecollege.com" style={{ color: "#ff2020", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  info@ihatecollege.com
                </a>
              </div>
            </div>

            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Find Us</div>
              <a href="https://twitter.com/ihatecollege4u" target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, color: "#888", textDecoration: "none", fontSize: 13, fontWeight: 700 }}
                onMouseOver={e => e.currentTarget.style.color = "#fff"}
                onMouseOut={e => e.currentTarget.style.color = "#888"}
              >
                <span>𝕏</span> @ihatecollege4u
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 680px) {
          section > div[style*="grid-template-columns"] {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </Layout>
  );
}
