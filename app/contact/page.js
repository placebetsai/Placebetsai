import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Partnerships, press, bug reports, and data requests. No picks provided.',
  alternates: { canonical: 'https://placebets.ai/contact' },
};

const TEAM_EMAILS = [
  { role: 'Partnerships', email: 'partners@placebets.ai', desc: 'Sportsbook, data feeds, affiliate programs.' },
  { role: 'Press / Media', email: 'press@placebets.ai', desc: 'Quotes, interviews, industry commentary.' },
  { role: 'Product Feedback', email: 'feedback@placebets.ai', desc: 'Feature requests, calculator bugs, broken data.' },
  { role: 'Legal / Compliance', email: 'legal@placebets.ai', desc: 'DMCA, privacy, responsible gambling concerns.' },
];

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
            <ul className="contact-email-list">
              {TEAM_EMAILS.map((t) => (
                <li key={t.email} className="contact-email-item">
                  <div className="contact-email-row">
                    <span className="contact-email-role">{t.role}</span>
                    <a className="contact-email-addr" href={`mailto:${t.email}`}>
                      {t.email}
                    </a>
                  </div>
                  <p className="contact-email-desc">{t.desc}</p>
                </li>
              ))}
            </ul>
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
