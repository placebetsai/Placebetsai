import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Partnerships, press, bug reports, and data requests. No picks provided.',
  alternates: { canonical: 'https://placebets.ai/contact' },
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      {/* hero */}
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <span className="contact-hero__eyebrow">PLACEBETS.AI / CONTACT</span>
          <h1 className="contact-hero__h1">
            Talk to us.
          </h1>
          <p className="contact-hero__sub">
            We read every message. Partnerships, press, bug reports — below. <strong>No picks provided.</strong> Serious inquiries only.
          </p>
        </div>
      </section>

      {/* grid: form + sidebar */}
      <section className="contact-grid">
        <div className="contact-form-wrap">
          <div className="contact-card">
            <div className="contact-card__header">
              <h2 className="contact-card__h2">Send us a message</h2>
              <span className="contact-card__status">
                <span className="contact-card__dot" /> Typical reply ≤ 24h
              </span>
            </div>
            <ContactForm />
          </div>
        </div>

        <aside className="contact-sidebar">
          <div className="contact-card">
            <h3 className="contact-card__h3">Direct email</h3>
            <div className="contact-email-item">
              <div className="contact-email-row">
                <span className="contact-email-role">General inbox</span>
                <a className="contact-email-addr" href="mailto:info@placebets.ai">
                  info@placebets.ai
                </a>
              </div>
              <p className="contact-email-desc">
                Use this for partnerships, press, product issues, compliance questions, and everything else.
              </p>
            </div>
          </div>

          <div className="contact-card contact-card--muted">
            <h3 className="contact-card__h3">What we DON'T do</h3>
            <ul className="contact-no-list">
              <li><strong>No picks.</strong> We're a tools site, not a tout.</li>
              <li><strong>No guaranteed winners.</strong> Don't ask.</li>
              <li><strong>No account recovery</strong> for sportsbooks. Contact them directly.</li>
              <li><strong>No gambling addiction counseling.</strong> Call 1-800-GAMBLER (free, confidential).</li>
            </ul>
          </div>

          <div className="contact-card contact-card--tip">
            <div className="contact-tip-head">21+</div>
            <p className="contact-tip-body">
              Gambling Problem? <a href="tel:+18004262537">Call 1-800-GAMBLER</a>.
              Available where legally permitted.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
