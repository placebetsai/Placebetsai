import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("https://formsubmit.co/ajax/info@ihatecollege.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name || "Anonymous",
          email: form.email,
          message: form.message,
          _subject: `IHateCollege.com contact from ${form.name || form.email}`,
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

  const input = "w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm transition-all";

  return (
    <section id="contact" className="section">
      <div className="section-header">
        <h2>Contact Us</h2>
        <p>Got a story, collab, or idea? We read every message and respond within a few hours.</p>
      </div>

      <div className="contact-grid">
        <div className="card form-card">
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-xl font-black text-white mb-2">Message Sent!</h3>
              <p className="text-slate-400 text-sm mb-6">We'll get back to you within a few hours.</p>
              <button onClick={() => setStatus("idle")}
                className="text-sky-400 text-sm font-bold hover:underline">
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Name</label>
                  <input type="text" value={form.name} onChange={set("name")} placeholder="Your name" className={input} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Email <span className="text-red-400">*</span></label>
                  <input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" className={input} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Message <span className="text-red-400">*</span></label>
                <textarea required rows={5} value={form.message} onChange={set("message")}
                  placeholder="Tell us what's on your mind..."
                  className={`${input} resize-none leading-relaxed`} />
              </div>
              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-900/30 border border-red-700 text-red-300 text-sm">
                  Something went wrong. Email us directly at <strong>info@ihatecollege.com</strong>.
                </div>
              )}
              <button type="submit" disabled={status === "sending"}
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white font-black rounded-xl transition-colors text-sm">
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>
              <p className="text-xs text-slate-500 text-center">We respond within a few hours · info@ihatecollege.com</p>
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
          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(14,165,233,0.08)", borderRadius: "0.75rem", border: "1px solid rgba(14,165,233,0.2)" }}>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              <strong style={{ color: "#e2e8f0" }}>Typical response time:</strong> a few hours, same day at the latest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
