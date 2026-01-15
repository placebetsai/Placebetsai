"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Script from "next/script";
import NewsTicker from "../components/NewsTicker";

const SITE_URL = "https://placebets.ai";

export default function HomePage() {
  const [tournaments, setTournaments] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  // JSON-LD objects
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PlaceBets.ai",
    url: SITE_URL,
    description:
      "Professional betting toolkit with +EV calculators, bankroll management, and live tournament information.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PlaceBets.ai",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  // Load tournaments for the hero carousel
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/tournaments");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        const upcoming = list.filter((t) => new Date(t.date) > new Date());
        const chosen = upcoming.length > 0 ? upcoming.slice(0, 6) : list.slice(0, 6);

        setTournaments(chosen);

        if (upcoming.length === 0) {
          setNotice("No upcoming tournaments found – showing recent ones.");
        }
      } catch (err) {
        console.error("Failed to load tournaments:", err);
        setNotice("Live tournaments feed unavailable – showing backup data from the API.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (!tournaments.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % tournaments.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [tournaments]);

  const hasTournaments = tournaments && tournaments.length > 0;
  const t = hasTournaments ? tournaments[current] : null;

  const goNext = () => {
    if (!hasTournaments) return;
    setCurrent((prev) => (prev + 1) % tournaments.length);
  };

  const goPrev = () => {
    if (!hasTournaments) return;
    setCurrent((prev) => (prev === 0 ? tournaments.length - 1 : prev - 1));
  };

  return (
    <>
      {/* SEO: JSON-LD */}
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
        {/* LIVE BETTING NEWS TICKER */}
        <NewsTicker />

        {/* HERO */}
        <section
          className="text-center"
          style={{
            marginBottom: "40px",
            maxWidth: "800px",
            margin: "0 auto 40px",
          }}
        >
          <div className="pill green">BETA 2.0 LIVE</div>
          <h1>
            Stop Gambling.
            <br />
            <span className="highlight">Start Investing.</span>
          </h1>
          <p>
            The house wins because you guess. The pros win because they calculate. Build an edge
            with tools, bankroll strategy, and live tournament info.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/calculators" className="btn btn-primary">
              Open Calculators
            </Link>
            <Link href="/tournaments" className="btn btn-ghost">
              View Tournaments
            </Link>
          </div>
        </section>

        {/* TOURNAMENT CAROUSEL */}
        <section style={{ marginBottom: "40px" }}>
          {loading && (
            <p style={{ marginBottom: "10px", color: "#9ca3af" }}>
              Loading live tournaments…
            </p>
          )}
          {!loading && notice && (
            <p style={{ marginBottom: "10px", color: "#facc15" }}>{notice}</p>
          )}

          {hasTournaments ? (
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid #1f2937",
                background: "#020617",
                minHeight: "340px",
              }}
            >
              {/* Background image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(to top, rgba(3,7,18,0.96) 10%, transparent 70%), url(${t?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Foreground content */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "24px 22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "340px",
                }}
              >
                <div style={{ maxWidth: "780px" }}>
                  <div
                    className="pill green"
                    style={{ marginBottom: "10px", fontSize: "0.7rem" }}
                  >
                    LIVE TOURNAMENT SPOTLIGHT · {t?.gameType?.toUpperCase() || "GAME"}
                  </div>
                  <h2
                    style={{
                      fontSize: "2rem",
                      lineHeight: 1.15,
                      marginBottom: "8px",
                      textShadow: "0 4px 18px rgba(0, 0, 0, 0.9)",
                    }}
                  >
                    {t?.name}
                  </h2>
                  <p
                    style={{
                      color: "#e5e7eb",
                      fontSize: "0.95rem",
                      marginBottom: "10px",
                      fontWeight: 500,
                      textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {(t?.date || "Dates TBA") + " · " + (t?.location || "Location TBA")}
                  </p>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.9rem",
                      marginBottom: "14px",
                      maxWidth: "680px",
                    }}
                  >
                    {t?.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      className="pill"
                      style={{ background: "#020617", color: "#e5e7eb" }}
                    >
                      Buy-in: {t?.buyin}
                    </span>
                    <span className="pill green">{t?.guarantee || "Prize Pool TBA"}</span>
                    {t?.casino && <span className="pill">{t.casino}</span>}
                  </div>
                  {t?.link ? (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      Official Event Page →
                    </a>
                  ) : null}
                </div>

                {/* Carousel controls */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "16px",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                    Showing{" "}
                    <span style={{ color: "#e5e7eb" }}>
                      {current + 1} / {tournaments.length}
                    </span>{" "}
                    · Auto-rotating every few seconds.
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      {tournaments.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrent(idx)}
                          style={{
                            width: idx === current ? 18 : 8,
                            height: 8,
                            borderRadius: 999,
                            border: "none",
                            cursor: "pointer",
                            background:
                              idx === current
                                ? "linear-gradient(90deg, #22c55e, #38bdf8)"
                                : "#4b5563",
                            transition: "all 0.18s ease",
                          }}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={goPrev}
                        className="btn-ghost"
                        style={{
                          padding: "6px 12px",
                          borderRadius: "999px",
                          fontSize: "0.8rem",
                        }}
                      >
                        ← Prev
                      </button>
                      <button
                        onClick={goNext}
                        className="btn-ghost"
                        style={{
                          padding: "6px 12px",
                          borderRadius: "999px",
                          fontSize: "0.8rem",
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            !loading && (
              <div
                style={{
                  padding: "24px 20px",
                  borderRadius: "18px",
                  border: "1px solid #1f2937",
                  background: "#020617",
                  marginBottom: "40px",
                }}
              >
                <h2 style={{ marginBottom: "8px" }}>No tournaments found</h2>
                <p style={{ color: "#9ca3af", marginBottom: 0 }}>
                  Check your <code>/api/tournaments</code> endpoint or try again later.
                </p>
              </div>
            )
          )}
        </section>

        {/* VERIFIED SPORTSBOOKS */}
        <section className="mt-4">
          <h2 className="text-center" style={{ marginBottom: "10px" }}>
            Verified Sportsbooks
          </h2>
          <p className="text-center" style={{ fontSize: "0.9rem" }}>
            Secure the highest signup bonuses available today.
          </p>

          <div className="grid-3" style={{ marginTop: "30px" }}>
            <div className="card book-card featured">
              <div>
                <div className="pill green">RECOMMENDED</div>
                <h3>DraftKings</h3>
                <p className="bonus-text">Bet $5, Get $200</p>
                <p style={{ fontSize: "0.9rem" }}>
                  Best UI for live betting and player props.
                </p>
              </div>
              <a
                href="#"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "20px" }}
                rel="nofollow sponsored"
              >
                Claim Offer →
              </a>
            </div>

            <div className="card book-card">
              <div>
                <div className="pill">POPULAR</div>
                <h3>FanDuel</h3>
                <p className="bonus-text">$150 Bonus Bets</p>
                <p style={{ fontSize: "0.9rem" }}>
                  Market leader for Same Game Parlays (SGP).
                </p>
              </div>
              <a
                href="#"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "20px" }}
                rel="nofollow sponsored"
              >
                Claim Offer →
              </a>
            </div>

            <div className="card book-card">
              <div>
                <div className="pill">HIGH LIMITS</div>
                <h3>BetMGM</h3>
                <p className="bonus-text">$1,500 Paid Back</p>
                <p style={{ fontSize: "0.9rem" }}>
                  Great for large wagers and rewards points.
                </p>
              </div>
              <a
                href="#"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "20px" }}
                rel="nofollow sponsored"
              >
                Claim Offer →
              </a>
            </div>
          </div>
        </section>

        {/* EDUCATIONAL FEATURES */}
        <section
          className="mt-4"
          style={{ paddingTop: "60px", borderTop: "1px solid #1f2937" }}
        >
          <div className="grid-3">
            <Link href="/ev-betting" className="card">
              <h3>📈 +EV Betting</h3>
              <p>
                Understand Expected Value. The only mathematical way to beat the book over time.
              </p>
            </Link>

            <Link href="/bankroll" className="card">
              <h3>🛡️ Bankroll Mgmt</h3>
              <p>
                Calculate unit sizes. Protect your capital from variance and tilt.
              </p>
            </Link>

            <Link href="/glossary" className="card">
              <h3>📖 The Dictionary</h3>
              <p>Don&apos;t look like a rookie. Learn the slang: Juice, Vig, Handle, Steam.</p>
            </Link>
          </div>
        </section>

        {/* ✅ ADSENSE FIX: REAL CONTENT BLOCK */}
        <section style={{ maxWidth: "900px", margin: "70px auto 0", padding: "0 20px" }}>
          <div
            style={{
              border: "1px solid #1f2937",
              background: "#020617",
              borderRadius: "18px",
              padding: "24px 20px",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>AI Sports Betting Analysis & Market Insights</h2>

            <p style={{ color: "#e5e7eb", lineHeight: 1.7 }}>
              PlaceBets.ai is an independent sports analysis platform built to help people
              understand betting markets — not chase “locks.” We analyze odds data, market movement,
              and historical patterns to explain how lines are priced and why they shift.
            </p>

            <p style={{ color: "#9ca3af", lineHeight: 1.7 }}>
              Our tools focus on expected value (+EV), bankroll management, and decision-making under
              uncertainty. Sports are unpredictable — injuries, variance, and randomness are real —
              so nothing on this site should be treated as guaranteed outcomes.
            </p>

            <p style={{ color: "#9ca3af", lineHeight: 1.7, marginBottom: 0 }}>
              This site is for educational and entertainment purposes only. If you choose to bet,
              do it responsibly and only where legal in your jurisdiction.
            </p>
          </div>
        </section>

        {/* ✅ FOOTER TRUST LINKS (CRAWLABLE) */}
        <footer
          style={{
            marginTop: "70px",
            padding: "26px 20px",
            borderTop: "1px solid #1f2937",
            background: "rgba(2,6,23,0.7)",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
              © {new Date().getFullYear()} PlaceBets.ai — Educational analysis only.
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link href="/about" style={{ color: "#e5e7eb", textDecoration: "underline" }}>
                About
              </Link>
              <Link
                href="/how-predictions-work"
                style={{ color: "#e5e7eb", textDecoration: "underline" }}
              >
                How Predictions Work
              </Link>
              <Link
                href="/responsible-gambling"
                style={{ color: "#e5e7eb", textDecoration: "underline" }}
              >
                Responsible Gambling
              </Link>
              <Link href="/contact" style={{ color: "#e5e7eb", textDecoration: "underline" }}>
                Contact
              </Link>
              <Link href="/privacy" style={{ color: "#e5e7eb", textDecoration: "underline" }}>
                Privacy
              </Link>
              <Link href="/terms" style={{ color: "#e5e7eb", textDecoration: "underline" }}>
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
