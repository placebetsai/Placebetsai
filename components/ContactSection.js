export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="section-header">
        <h2>Contact (quietly)</h2>
        <p>Got a story, idea, or collab pitch? Hit the button to email us directly.</p>
      </div>

      <div className="contact-grid">
        <div className="card form-card" style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Let's Talk</h3>
          <p style={{ marginBottom: "2rem", opacity: 0.8 }}>
            Send your rants, ideas, or pitches to <strong>info@ihatecollege.com</strong>.
          </p>
          <a
            href="mailto:info@ihatecollege.com?subject=ihatecollege.com%20contact"
            className="btn btn-secondary"
            style={{ display: "inline-block", padding: "0.75rem 1.5rem", textDecoration: "none", fontWeight: "bold" }}
          >
            Open Email App
          </a>
          <p className="hint" style={{ marginTop: "1.5rem", fontSize: "0.85rem", opacity: 0.6 }}>
            Opens your default email client — Gmail, Apple Mail, etc.
          </p>
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
