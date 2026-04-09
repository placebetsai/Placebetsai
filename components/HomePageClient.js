"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Script from "next/script";
import KalshiMarkets from "./KalshiMarkets";

const SITE_URL = "https://placebets.ai";

export default function HomePageClient({ initialMarkets = [] }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // JSON-LD
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PlaceBets.ai",
    url: SITE_URL,
    description:
      "Live prediction market data, +EV calculators, and bankroll tools for sharp bettors.",
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
    // TODO: wire to email service (ConvertKit, Mailchimp, etc.)
    setSubmitted(true);
  };

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
        {/* HERO — Clear value prop + single CTA */}
        <section className="hero-section">
          <div className="hero-badge">LIVE PREDICTION MARKETS</div>
          <h1>
            See What the Market
            <br />
            <span className="highlight">Actually Thinks.</span>
          </h1>
          <p className="hero-subtitle">
            Real-time Kalshi data, +EV calculators, and bankroll tools.
            Free. No account needed.
          </p>
          <div className="hero-ctas">
            <a href="#markets" className="btn btn-primary btn-lg">
              View Live Markets
            </a>
            <Link href="/calculators" className="btn btn-ghost">
              Open Tools
            </Link>
          </div>
        </section>

        {/* LIVE KALSHI MARKETS — The star of the show */}
        <div id="markets">
          <KalshiMarkets initialMarkets={initialMarkets} />
        </div>

        {/* EMAIL CAPTURE — Build the list */}
        <section className="email-capture">
          <h2>Get Sharp Picks Weekly</h2>
          <p style={{ color: "#9ca3af", maxWidth: 480, margin: "0 auto 20px" }}>
            Free weekly email: top prediction market movers, +EV spots, and line movement alerts.
          </p>
          {submitted ? (
            <p style={{ color: "#22c55e", fontWeight: 600 }}>You're in. Check your inbox.</p>
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
                Subscribe Free
              </button>
            </form>
          )}
        </section>

        {/* TOOLS — 3 clear cards with strong CTAs */}
        <section style={{ marginTop: "60px" }}>
          <h2 className="text-center" style={{ marginBottom: "8px" }}>
            Sharpen Your Edge
          </h2>
          <p className="text-center" style={{ color: "#9ca3af", marginBottom: "30px" }}>
            Free tools that separate pros from amateurs.
          </p>
          <div className="grid-3">
            <Link href="/calculators" className="card tool-card">
              <div className="tool-icon">+EV</div>
              <h3>EV Calculator</h3>
              <p>Find positive expected value bets. The only math that matters.</p>
              <span className="card-cta">Open Calculator &rarr;</span>
            </Link>

            <Link href="/bankroll" className="card tool-card">
              <div className="tool-icon">$</div>
              <h3>Bankroll Manager</h3>
              <p>Calculate unit sizes. Survive variance. Protect your capital.</p>
              <span className="card-cta">Manage Bankroll &rarr;</span>
            </Link>

            <Link href="/glossary" className="card tool-card">
              <div className="tool-icon">A-Z</div>
              <h3>Betting Dictionary</h3>
              <p>Juice, vig, handle, steam — learn the language of sharps.</p>
              <span className="card-cta">Learn Terms &rarr;</span>
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS — Trust builder */}
        <section style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid #1f2937" }}>
          <h2 className="text-center" style={{ marginBottom: "30px" }}>
            How Sharp Bettors Think
          </h2>
          <div className="grid-3">
            {[
              {
                num: "01",
                title: "Follow the Money",
                body: "When a line moves opposite to betting percentages, sharp money caused it. Track where the pros are putting capital.",
              },
              {
                num: "02",
                title: "Calculate, Don't Guess",
                body: "Every bet has an expected value. If it's positive, you take it. If it's negative, you pass. Emotion never enters the equation.",
              },
              {
                num: "03",
                title: "Beat the Closing Line",
                body: "If you consistently get better prices than the closing line, you're making mathematically correct decisions — results follow.",
              },
            ].map((p) => (
              <div key={p.num} className="card">
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#22c55e", marginBottom: "12px" }}>{p.num}</div>
                <p style={{ fontWeight: 700, color: "#fff", marginBottom: "8px", fontSize: "1rem" }}>{p.title}</p>
                <p style={{ fontSize: "0.9rem", color: "#9ca3af", marginBottom: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bottom-cta">
          <h2>Ready to Stop Guessing?</h2>
          <p style={{ color: "#9ca3af", marginBottom: "24px" }}>
            Live markets. Real data. Free tools. No signup required.
          </p>
          <a href="#markets" className="btn btn-primary btn-lg">
            View Live Markets
          </a>
        </section>

        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#4b5563", marginTop: "40px" }}>
          Educational content only — not betting advice. 21+ where legal.{" "}
          <a href="/responsible-gambling" style={{ color: "#6b7280" }}>Responsible Gambling</a>
        </p>
      </div>
    </>
  );
}
