"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Script from "next/script";
import NewsTicker from "./components/NewsTicker";

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
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PlaceBets.ai",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  // Load tournaments
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/tournaments", { cache: "no-store" });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        const upcoming = list.filter((t) => new Date(t.date) > new Date());
        const chosen =
          upcoming.length > 0 ? upcoming.slice(0, 6) : list.slice(0, 6);

        setTournaments(chosen);

        if (upcoming.length === 0) {
          setNotice("No upcoming tournaments found – showing recent ones.");
        }
      } catch (err) {
        console.error("Failed to load tournaments:", err);
        setNotice("Live tournaments feed unavailable – try again later.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (!tournaments.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % tournaments.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [tournaments]);

  const hasTournaments = tournaments.length > 0;
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
        {/* News */}
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
            The house wins because you guess. The pros win because they
            calculate. Build an edge with tools, bankroll strategy, and live
            tournament info.
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

        {/* ✅ VERIFIED SPORTSBOOKS — WORKING LINKS */}
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
                href="https://sportsbook.draftkings.com/"
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "20px" }}
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
                href="https://sportsbook.fanduel.com/"
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "20px" }}
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
                href="https://sports.betmgm.com/"
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "20px" }}
              >
                Claim Offer →
              </a>
            </div>
          </div>
        </section>

        {/* TOURNAMENT SPOTLIGHT (simpler + safe) */}
        <section style={{ marginTop: "40px", marginBottom: "40px" }}>
          {loading && (
            <p style={{ marginBottom: "10px", color: "#9ca3af" }}>
              Loading live tournaments…
            </p>
          )}

          {!loading && notice && (
            <p style={{ marginBottom: "10px", color: "#facc15" }}>{notice}</p>
          )}

          {hasTournaments && t ? (
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid #1f2937",
                background: "#020617",
              }}
            >
              <div style={{ padding: "22px" }}>
                <div className="pill green" style={{ marginBottom: 10 }}>
                  LIVE TOURNAMENT SPOTLIGHT
                </div>
                <h2 style={{ marginTop: 0 }}>{t.name}</h2>
                <p style={{ color: "#9ca3af", marginTop: 6 }}>
                  {(t.date || "Dates TBA") + " · " + (t.location || "Location TBA")}
                </p>
                {t.description && (
                  <p style={{ color: "#e5e7eb", marginTop: 10 }}>
                    {t.description}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 14,
                    marginBottom: 14,
                  }}
                >
                  {t.buyin && <span className="pill">Buy-in: {t.buyin}</span>}
                  {t.guarantee && <span className="pill green">{t.guarantee}</span>}
                  {t.casino && <span className="pill">{t.casino}</span>}
                </div>

                {t.link && (
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Official Event Page →
                  </a>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 18,
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                    {current + 1} / {tournaments.length}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={goPrev} className="btn-ghost">
                      ← Prev
                    </button>
                    <button onClick={goNext} className="btn-ghost">
                      Next →
                    </button>
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
                }}
              >
                <h2 style={{ marginBottom: "8px" }}>No tournaments found</h2>
                <p style={{ color: "#9ca3af", marginBottom: 0 }}>
                  Check your <code>/api/tournaments</code> endpoint or try again
                  later.
                </p>
              </div>
            )
          )}
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
                Understand Expected Value. The only mathematical way to beat the
                book over time.
              </p>
            </Link>

            <Link href="/bankroll" className="card">
              <h3>🛡️ Bankroll Mgmt</h3>
              <p>
                Calculate unit sizes. Protect your capital from variance and
                tilt.
              </p>
            </Link>

            <Link href="/glossary" className="card">
              <h3>📖 The Dictionary</h3>
              <p>
                Don&apos;t look like a rookie. Learn the slang: Juice, Vig,
                Handle, Steam.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}