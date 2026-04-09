"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Script from "next/script";
import KalshiMarkets from "./KalshiMarkets";

const SITE_URL = "https://placebets.ai";

/* Hardcoded upcoming tournaments for the "Coming Up" sidebar */
const UPCOMING_EVENTS = [
  { name: "WSOP Main Event 2026", date: "Jun 28 - Jul 16", type: "poker", prize: "$15M GTD", link: "https://www.wsop.com/" },
  { name: "NBA Finals 2026", date: "Jun 5 - Jun 22", type: "sports", prize: "Odds Live", link: "https://kalshi.com" },
  { name: "FIFA World Cup 2026", date: "Jun 11 - Jul 19", type: "sports", prize: "48 Teams", link: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
  { name: "Valorant Champions 2026", date: "Aug 2 - Aug 24", type: "esports", prize: "$2M Pool", link: "https://valorantesports.com" },
  { name: "US Open (Tennis)", date: "Aug 25 - Sep 7", type: "sports", prize: "$65M", link: "https://www.usopen.org" },
  { name: "The International (Dota 2)", date: "Oct TBD", type: "esports", prize: "$15M+", link: "https://www.dota2.com/esports" },
];

const BADGE_CLASS = {
  poker: "badge-poker",
  sports: "badge-sports",
  esports: "badge-esports",
};

export default function HomePageClient({ initialMarkets = [] }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PlaceBets.ai",
    url: SITE_URL,
    description:
      "Live prediction market data, tournament schedules, and +EV tools for sharp bettors and traders.",
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PlaceBets.ai",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* Build ticker items from markets */
  const tickerMarkets = initialMarkets.length > 0
    ? initialMarkets.slice(0, 10)
    : [];

  return (
    <>
      <Script
        id="ld-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <Script
        id="ld-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />

      <div className="page-wrap">
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-badge">LIVE MARKETS OPEN</div>
          <h1>
            Real-Time Prediction
            <br />
            <span className="highlight">Market Intelligence.</span>
          </h1>
          <p className="hero-subtitle">
            Live Kalshi prices. Global tournament tracker. Sharp tools.
            Everything a serious trader needs — free, no signup.
          </p>
          <div className="hero-ctas">
            <a href="#markets" className="btn btn-primary btn-lg">
              View Live Markets
            </a>
            <Link href="/tournaments" className="btn btn-ghost btn-lg">
              Tournaments
            </Link>
          </div>
        </section>

        {/* LIVE TICKER BAR */}
        {tickerMarkets.length > 0 && (
          <div className="ticker-bar">
            <div className="ticker-track">
              {/* Duplicate for seamless loop */}
              {[...tickerMarkets, ...tickerMarkets].map((m, i) => {
                const yp = m.yesPrice != null ? Math.round(m.yesPrice * 100) : null;
                return (
                  <div key={`${m.ticker}-${i}`} className="ticker-item">
                    <span className="ticker-title">{m.title}</span>
                    <span className={`ticker-price ${yp !== null && yp < 30 ? 'red' : ''}`}>
                      {yp !== null ? `${yp}\u00a2` : '--'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DASHBOARD 3-COL GRID */}
        <div className="dashboard-grid">
          {/* COL 1: Hot Markets */}
          <div className="dashboard-col">
            <div className="section-header">
              <div className="section-title">
                <span className="dot"></span>
                Hot Markets
              </div>
              <a href="#markets" className="section-link">View All</a>
            </div>
            <KalshiMarkets initialMarkets={initialMarkets} compact />
          </div>

          {/* COL 2: Coming Up */}
          <div className="dashboard-col">
            <div className="section-header">
              <div className="section-title">
                <span className="dot" style={{ background: '#fbbf24', boxShadow: '0 0 8px rgba(251,191,36,0.3)' }}></span>
                Coming Up
              </div>
              <Link href="/tournaments" className="section-link">All Events</Link>
            </div>
            {UPCOMING_EVENTS.map((ev, i) => (
              <a
                key={i}
                href={ev.link}
                target="_blank"
                rel="noopener noreferrer"
                className="tournament-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span className="tournament-date">{ev.date}</span>
                  <span className={`tournament-badge ${BADGE_CLASS[ev.type] || 'badge-sports'}`}>
                    {ev.type}
                  </span>
                </div>
                <div className="tournament-name">{ev.name}</div>
                <div className="tournament-prize">{ev.prize}</div>
              </a>
            ))}
          </div>

          {/* COL 3: Your Tools */}
          <div className="dashboard-col">
            <div className="section-header">
              <div className="section-title">
                <span className="dot" style={{ background: '#38bdf8', boxShadow: '0 0 8px rgba(56,189,248,0.3)' }}></span>
                Your Tools
              </div>
            </div>
            <Link href="/calculators" className="tool-card">
              <div className="tool-icon">+EV</div>
              <h3>EV Calculator</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Find positive expected value bets. The only math that matters.</p>
              <span className="card-cta">Open Calculator &rarr;</span>
            </Link>

            <Link href="/bankroll" className="tool-card">
              <div className="tool-icon">$</div>
              <h3>Bankroll Manager</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Kelly criterion sizing. Survive variance. Protect capital.</p>
              <span className="card-cta">Manage Bankroll &rarr;</span>
            </Link>

            <Link href="/glossary" className="tool-card">
              <div className="tool-icon">A-Z</div>
              <h3>Sharp Dictionary</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Juice, vig, handle, steam, CLV — learn the language.</p>
              <span className="card-cta">Learn Terms &rarr;</span>
            </Link>

            {/* Live clock widget */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '16px 20px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                Market Time (ET)
              </div>
              <div className="mono" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>
                {now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false })}
              </div>
            </div>
          </div>
        </div>

        {/* FULL MARKETS SECTION */}
        <div className="glow-line" />
        <div id="markets">
          <KalshiMarkets initialMarkets={initialMarkets} />
        </div>

        {/* EMAIL CAPTURE */}
        <section className="email-capture">
          <h2>Get Tomorrow's +EV Picks Before Markets Open</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 20px', fontSize: '0.95rem' }}>
            Free daily email: top market movers, mispriced lines, and tournament alerts.
            Join 2,000+ traders who read this before placing a single bet.
          </p>
          {submitted ? (
            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
              You're in. Check your inbox tomorrow morning.
            </p>
          ) : (
            <form onSubmit={handleEmailSubmit} className="email-form">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button type="submit" className="btn btn-primary">
                Get +EV Picks Free
              </button>
            </form>
          )}
        </section>

        {/* BOTTOM CTA */}
        <section className="bottom-cta">
          <h2>Stop Guessing. Start Trading.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Live markets. Real tournament data. Professional tools. Updated every 60 seconds.
          </p>
          <a href="#markets" className="btn btn-primary btn-lg">
            View All Live Markets
          </a>
        </section>

        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '40px' }}>
          Educational content only — not betting or financial advice. 21+ where legal.{' '}
          <a href="/responsible-gambling" style={{ color: 'var(--text-muted)' }}>Responsible Gambling</a>
        </p>
      </div>
    </>
  );
}
