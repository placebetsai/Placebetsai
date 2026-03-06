import { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const input = {
    width: "100%", padding: "13px 16px", background: "#111",
    border: "1px solid #2a2a2a", borderRadius: 10, color: "#fff",
    fontSize: 15, outline: "none", boxSizing: "border-box",
  };

  return (
    <Layout>
      <SEO
        title="Contact Us | IHateCollege.com"
        description="Got a question, partnership idea, or story to share? Reach the IHateCollege.com team directly."
      />

      <section style={{ maxWidth: 600, margin: "0 auto", padding: "60px 20px 80px" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Direct Line</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 12px" }}>
            Contact Us
          </h1>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6 }}>
            Got a story, a partnership idea, or just want to vent about tuition? We read every message.
          </p>
        </div>

        {status === "success" ? (
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <h2 style={{ color: "#10b981", fontSize: 24, fontWeight: 900, marginBottom: 10 }}>Form successfully submitted</h2>
            <p style={{ color: "#888", fontSize: 15 }}>We will reach out within a few hours.</p>
            <button
              onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus("idle"); }}
              style={{ marginTop: 24, padding: "11px 24px", background: "#1a1a1a", color: "#fff", fontWeight: 800, fontSize: 14, borderRadius: 8, border: "1px solid #2a2a2a", cursor: "pointer" }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ color: "#888", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Name</label>
              <input type="text" value={form.name} onChange={set("name")} required placeholder="Your name" style={input}
                onFocus={e => e.target.style.borderColor = "#ff2020"} onBlur={e => e.target.style.borderColor = "#2a2a2a"} />
            </div>

            <div>
              <label style={{ color: "#888", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email</label>
              <input type="email" value={form.email} onChange={set("email")} required placeholder="you@example.com" style={input}
                onFocus={e => e.target.style.borderColor = "#ff2020"} onBlur={e => e.target.style.borderColor = "#2a2a2a"} />
            </div>

            <div>
              <label style={{ color: "#888", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Message</label>
              <textarea value={form.message} onChange={set("message")} required rows={6} placeholder="What's on your mind?"
                style={{ ...input, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
                onFocus={e => e.target.style.borderColor = "#ff2020"} onBlur={e => e.target.style.borderColor = "#2a2a2a"} />
            </div>

            {status === "error" && <p style={{ color: "#ff2020", fontSize: 13 }}>Something went wrong. Try again.</p>}

            <button type="submit" disabled={status === "loading"}
              style={{ padding: "15px", background: "#ff2020", color: "#fff", fontWeight: 900, fontSize: 16, borderRadius: 10, border: "none", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}
              onMouseOver={e => { if (status !== "loading") e.target.style.background = "#cc0000"; }}
              onMouseOut={e => e.target.style.background = "#ff2020"}
            >
              {status === "loading" ? "Sending..." : "Send Message →"}
            </button>
          </form>
        )}

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #1a1a1a", display: "flex", gap: 20, flexWrap: "wrap" }}>
          <Link href="/blog" style={{ color: "#555", fontSize: 13, textDecoration: "none", fontWeight: 700 }}>← Blog</Link>
          <a href="https://twitter.com/ihatecollege4u" target="_blank" rel="noreferrer" style={{ color: "#555", fontSize: 13, textDecoration: "none", fontWeight: 700 }}>Twitter/X →</a>
        </div>
      </section>
    </Layout>
  );
}
