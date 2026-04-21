"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import SportsbookCTA from "./SportsbookCTA";
import NewsTicker from "./NewsTicker";
import BettingDeskCta from "./BettingDeskCta";

// ── HERO CAROUSEL DATA ─────────────────────────────────────────────────────
// Sport-specific gradients + icons + CTAs. No external image dependencies.
const HERO_SLIDES = [
  {
    id: "wsop",
    eyebrow: "POKER · JUN 28 – JUL 16",
    title: "WSOP Main Event 2026",
    sub: "$15M GTD · Track every chip leader, payout structure, and live final-table odds.",
    cta: { label: "Open Tournament Hub", href: "/tournaments" },
    gradient: "linear-gradient(135deg, #0c3a2a 0%, #064e3b 38%, #050505 100%)",
    accent: "#34d399",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="14" />
        <path d="M32 14v8M32 42v8M14 32h8M42 32h8M19.5 19.5l5.5 5.5M39 39l5.5 5.5M19.5 44.5l5.5-5.5M39 25l5.5-5.5" />
      </svg>
    ),
  },
  {
    id: "nba",
    eyebrow: "NBA · JUN 5 – JUN 22",
    title: "NBA Finals 2026",
    sub: "Live championship odds, MVP markets, and game-by-game closing-line tracking.",
    cta: { label: "View NBA Markets", href: "/tournaments" },
    gradient: "linear-gradient(135deg, #c2410c 0%, #7c2d12 45%, #18181b 100%)",
    accent: "#fb923c",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <circle cx="32" cy="32" r="22" />
        <path d="M10 32h44M32 10v44M14.5 18C20 26 26 32 32 32s12-6 17.5-14M14.5 46C20 38 26 32 32 32s12 6 17.5 14" />
      </svg>
    ),
  },
  {
    id: "wc",
    eyebrow: "FIFA · JUN 11 – JUL 19",
    title: "FIFA World Cup 2026",
    sub: "48 teams. Group-stage moneylines, dark-horse futures, and live in-play markets.",
    cta: { label: "World Cup Markets", href: "/tournaments" },
    gradient: "linear-gradient(135deg, #15803d 0%, #1e40af 55%, #0f172a 100%)",
    accent: "#4ade80",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="22" />
        <path d="M32 12l8 6-3 10h-10l-3-10 8-6zM37 28l5 9M27 28l-5 9M40 38l-3 10M24 38l3 10M37 48h-10" />
      </svg>
    ),
  },
  {
    id: "val",
    eyebrow: "ESPORTS · AUG 2 – AUG 24",
    title: "Valorant Champions 2026",
    sub: "$2M prize pool. Map-by-map odds, head-to-head splits, and tournament EV.",
    cta: { label: "Esports Markets", href: "/tournaments" },
    gradient: "linear-gradient(135deg, #7c3aed 0%, #be185d 50%, #1e1b4b 100%)",
    accent: "#c084fc",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="20" width="48" height="24" rx="6" />
        <circle cx="20" cy="32" r="3" fill="currentColor" />
        <circle cx="44" cy="32" r="3" fill="currentColor" />
        <path d="M28 28v8M32 32h-4M44 28v8M48 32h-4" />
      </svg>
    ),
  },
  {
    id: "uso",
    eyebrow: "TENNIS · AUG 25 – SEP 7",
    title: "US Open 2026",
    sub: "$65M Slam. Live set-by-set markets, draw-bracket EV, and futures shading.",
    cta: { label: "Tennis Markets", href: "/tournaments" },
    gradient: "linear-gradient(135deg, #65a30d 0%, #0e7490 50%, #082f49 100%)",
    accent: "#bef264",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="22" />
        <path d="M14 22c12 4 24 4 36 0M14 42c12-4 24-4 36 0" />
      </svg>
    ),
  },
  {
    id: "ev",
    eyebrow: "FREE TOOL",
    title: "Find +EV Bets in Seconds",
    sub: "Plug a sportsbook line + a fair-market price. Get instant expected value, Kelly stake, and ROI.",
    cta: { label: "Open EV Calculator", href: "/calculators" },
    gradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 50%, #1e1b4b 100%)",
    accent: "#a5b4fc",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="10" width="44" height="44" rx="6" />
        <path d="M22 22h6M36 22h6M22 32h6M36 32h6M22 42h20" />
      </svg>
    ),
  },
];

function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const slide = HERO_SLIDES[idx];
  const next = () => setIdx((i) => (i + 1) % HERO_SLIDES.length);
  const prev = () => setIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 24px 60px -20px rgba(0,0,0,0.55)",
        border: "1px solid rgba(255,255,255,0.06)",
        marginBottom: 36,
      }}
    >
      <div
        key={slide.id}
        style={{
          background: slide.gradient,
          padding: "44px 32px 40px",
          minHeight: 280,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) auto",
          gap: 24,
          alignItems: "center",
          color: "#fff",
          animation: "pbHeroFade 0.6s ease",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{
            display: "inline-block",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.22em",
            color: slide.accent,
            background: "rgba(0,0,0,0.32)",
            padding: "6px 12px",
            borderRadius: 999,
            marginBottom: 16,
          }}>
            {slide.eyebrow}
          </div>
          <h2 style={{
            fontSize: "clamp(1.6rem, 4.2vw, 2.6rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 14px",
            letterSpacing: "-0.01em",
          }}>
            {slide.title}
          </h2>
          <p style={{
            fontSize: "1rem",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.86)",
            maxWidth: 540,
            margin: "0 0 22px",
          }}>
            {slide.sub}
          </p>
          <Link href={slide.cta.href} style={{
            display: "inline-block",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            padding: "12px 22px",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: "0.92rem",
            textDecoration: "none",
            border: `1px solid ${slide.accent}55`,
            transition: "background 0.2s",
          }}>
            {slide.cta.label} →
          </Link>
        </div>
        <div style={{
          width: "clamp(80px, 18vw, 160px)",
          height: "clamp(80px, 18vw, 160px)",
          color: slide.accent,
          opacity: 0.92,
          flexShrink: 0,
        }}>
          {slide.icon}
        </div>
      </div>

      {/* prev / next */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          width: 36, height: 36, borderRadius: "50%", border: "none",
          background: "rgba(0,0,0,0.42)", color: "#fff", cursor: "pointer",
          fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >‹</button>
      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          width: 36, height: 36, borderRadius: "50%", border: "none",
          background: "rgba(0,0,0,0.42)", color: "#fff", cursor: "pointer",
          fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >›</button>

      {/* dots */}
      <div style={{
        position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8,
      }}>
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === idx ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              background: i === idx ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes pbHeroFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const SITE_URL = "https://placebets.ai";

const UPCOMING_EVENTS = [
  { name: "WSOP Main Event 2026", date: "Jun 28 - Jul 16", type: "poker", prize: "$15M GTD", link: "https://www.wsop.com/" },
  { name: "NBA Finals 2026", date: "Jun 5 - Jun 22", type: "sports", prize: "Odds Live", link: "https://www.nba.com/playoffs" },
  { name: "FIFA World Cup 2026", date: "Jun 11 - Jul 19", type: "sports", prize: "48 Teams", link: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
  { name: "Valorant Champions 2026", date: "Aug 2 - Aug 24", type: "esports", prize: "$2M Pool", link: "https://valorantesports.com" },
  { name: "US Open (Tennis)", date: "Aug 25 - Sep 7", type: "sports", prize: "$65M", link: "https://www.usopen.org" },
];

const TYPE_COLORS = {
  poker: { bg: "#7c3aed22", text: "#a78bfa", border: "#7c3aed44" },
  sports: { bg: "#10b98122", text: "#34d399", border: "#10b98144" },
  esports: { bg: "#f59e0b22", text: "#fbbf24", border: "#f59e0b44" },
};

const LEARNING_PATHS = [
  {
    tag: "Start Here",
    title: "Learn EV before you bet another dollar",
    desc: "The calculator, the concept, and the guide pages that explain why expected value is the backbone of long-term betting.",
    href: "/ev-betting-guide",
    color: "#6366f1",
  },
  {
    tag: "Protect Capital",
    title: "Build a bankroll system you can actually follow",
    desc: "Move from random unit sizes to a repeatable framework built around risk, Kelly sizing, and discipline.",
    href: "/bankroll-management-guide",
    color: "#10b981",
  },
  {
    tag: "Stay Current",
    title: "Track tournaments, promo codes, and market opportunities",
    desc: "Use live events, sportsbook offers, and tournament timing as part of a sharper weekly betting routine.",
    href: "/tournaments",
    color: "#f59e0b",
  },
];

/**
 * Converts a raw Kalshi market title into plain English.
 * Falls back to the original title if no pattern matches.
 */
function humanizeTitle(title) {
  if (!title) return "Market";

  // "Will X happen?" -> "X to happen"
  let t = title.replace(/\?$/, "").trim();

  // "Will the NBA..." -> "NBA..."
  t = t.replace(/^Will\s+(the\s+)?/i, "");

  // Capitalize first letter
  t = t.charAt(0).toUpperCase() + t.slice(1);

  return t;
}

/**
 * Returns a color for the probability bar based on probability value.
 */
function probColor(pct) {
  if (pct >= 70) return "#10b981"; // green - likely
  if (pct >= 40) return "#f59e0b"; // amber - toss-up
  return "#ef4444"; // red - unlikely
}

export default function HomePageClient({ initialMarkets = [] }) {
  const topPicks = initialMarkets.slice(0, 5);

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PlaceBets.ai",
    url: SITE_URL,
    description:
      "Free sports betting tools, live odds, and expert picks for smart bettors.",
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PlaceBets.ai",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
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
        <NewsTicker />

        {/* ========== HERO ========== */}
        <section style={{
          padding: "32px 20px 32px",
          maxWidth: 1000,
          margin: "0 auto",
        }}>
          <HeroCarousel />

          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <h1 style={{
            fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 16,
            color: "var(--text-main, #e5e7eb)",
          }}>
            Smart Sports Betting{" "}
            <span style={{ color: "var(--primary, #6366f1)" }}>Starts Here</span>
          </h1>
          <p style={{
            fontSize: "1.05rem",
            color: "var(--text-muted, #9ca3af)",
            lineHeight: 1.6,
            marginBottom: 28,
            maxWidth: 480,
            margin: "0 auto 28px",
          }}>
            Free tools to find +EV bets, manage your bankroll, and track the
            markets that matter. No signup required.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/calculators" className="btn btn-primary btn-lg" style={{ minWidth: 200 }}>
              Try the EV Calculator
            </Link>
            <Link href="/bankroll" className="btn btn-ghost btn-lg" style={{ minWidth: 200 }}>
              Manage Your Bankroll
            </Link>
          </div>
          </div>
        </section>

        {topPicks.length > 0 && (
          <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px 48px" }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(15,23,42,0.96) 60%)",
              border: "1px solid var(--border, #1f2937)",
              borderRadius: 16,
              padding: "28px 24px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end", flexWrap: "wrap", marginBottom: 18 }}>
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#818cf8", marginBottom: 8 }}>
                    Market Pulse
                  </p>
                  <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, lineHeight: 1.1, color: "var(--text-main, #e5e7eb)", margin: 0 }}>
                    Live sports markets worth watching right now
                  </h2>
                </div>
                <Link href="/tournaments" style={{ color: "#34d399", fontWeight: 700, textDecoration: "none" }}>
                  View all events →
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {topPicks.map((market) => {
                  const pct = market.yesPrice != null ? Math.round(market.yesPrice * 100) : null;
                  return (
                    <div
                      key={market.ticker}
                      style={{
                        background: "rgba(15,23,42,0.88)",
                        border: "1px solid rgba(99,102,241,0.12)",
                        borderRadius: 12,
                        padding: "16px 14px",
                      }}
                    >
                      <div style={{ color: "#818cf8", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                        {market.category || "Sports"}
                      </div>
                      <div style={{ color: "var(--text-main, #e5e7eb)", fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.35, marginBottom: 14 }}>
                        {humanizeTitle(market.title)}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 8 }}>
                        <span style={{ color: "var(--text-muted, #9ca3af)" }}>Yes price</span>
                        <span style={{ color: pct != null ? probColor(pct) : "#e5e7eb", fontWeight: 700 }}>
                          {pct != null ? `${pct}%` : "Live"}
                        </span>
                      </div>
                      <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: 10 }}>
                        <div style={{ width: `${pct || 35}%`, height: "100%", background: pct != null ? probColor(pct) : "#6366f1" }} />
                      </div>
                      <div style={{ color: "var(--text-dim, #6b7280)", fontSize: "0.78rem" }}>
                        Vol: {Number(market.volume || 0).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========== STATS BAR ========== */}
        <section style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "0 16px 40px",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14,
          }}>
            {[
              {
                top: "100% Free",
                bottom: "No account needed",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v12M9 9h6M9 15h6" />
                  </svg>
                ),
              },
              {
                top: "3 Pro Tools",
                bottom: "EV, Bankroll, Glossary",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path d="M14 17.5h7M17.5 14v7" />
                  </svg>
                ),
              },
              {
                top: "Updated Daily",
                bottom: "Live market data",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                ),
              },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "var(--bg-card, #0f172a)",
                border: "1px solid var(--border, #1f2937)",
                borderRadius: 12,
                padding: "20px 16px",
                textAlign: "center",
              }}>
                <div style={{ color: "var(--primary, #6366f1)", marginBottom: 6, display: "flex", justifyContent: "center" }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "var(--primary, #6366f1)",
                  marginBottom: 4,
                }}>{stat.top}</div>
                <div style={{
                  fontSize: "0.82rem",
                  color: "var(--text-muted, #9ca3af)",
                }}>{stat.bottom}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== GLOSSARY SHOWCASE ========== */}
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px 48px" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.06) 100%)",
            border: "1px solid var(--border, #1f2937)",
            borderRadius: 16,
            padding: "32px 28px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 8,
            }}>
              <span style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "var(--primary, #6366f1)",
                background: "rgba(99,102,241,0.12)",
                padding: "4px 10px",
                borderRadius: 4,
                textTransform: "uppercase",
                fontFamily: "var(--font-mono, monospace)",
              }}>
                NEW · 159 Terms
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-dim, #6b7280)" }}>
                Sports · Poker · Slots · Casino · Horses · DFS
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--text-main, #e5e7eb)",
              margin: "0 0 10px",
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
            }}>
              The Sharp Bettor&rsquo;s Dictionary
            </h2>
            <p style={{
              fontSize: "1rem",
              color: "var(--text-muted, #9ca3af)",
              lineHeight: 1.6,
              marginBottom: 24,
              maxWidth: 640,
            }}>
              159 terms across every game, written by people who actually bet. Clean definitions, real examples, zero fluff. From CLV to ICM, juice to Megaways — learn the language the pros use.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
              marginBottom: 24,
            }}>
              {[
                { term: "CLV", def: "Closing Line Value — beat the closing line, beat the market." },
                { term: "ICM", def: "Independent Chip Model. Tournament equity math for the final table." },
                { term: "RTP", def: "Return to Player. The % a slot pays back over millions of spins." },
                { term: "Juice", def: "The sportsbook's built-in margin. The -110 on both sides." },
              ].map((item) => (
                <Link
                  key={item.term}
                  href={`/glossary#${item.term.toLowerCase()}`}
                  style={{
                    display: "block",
                    background: "var(--bg-card, #0f172a)",
                    border: "1px solid var(--border, #1f2937)",
                    borderRadius: 10,
                    padding: "14px 16px",
                    textDecoration: "none",
                    transition: "border-color 0.15s, transform 0.15s",
                  }}
                >
                  <div style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--primary, #6366f1)",
                    fontFamily: "var(--font-mono, monospace)",
                    letterSpacing: "0.5px",
                    marginBottom: 6,
                  }}>
                    {item.term}
                  </div>
                  <div style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted, #9ca3af)",
                    lineHeight: 1.4,
                  }}>
                    {item.def}
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/glossary" className="btn btn-primary" style={{ minWidth: 180 }}>
                Open Full Glossary &rarr;
              </Link>
              <Link href="/glossary#poker" style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 18px",
                borderRadius: 6,
                border: "1px solid var(--border, #1f2937)",
                color: "var(--text-main, #e5e7eb)",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
              }}>
                Jump to Poker
              </Link>
            </div>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 40px" }}>
          <h2 style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--text-main, #e5e7eb)",
          }}>
            How It Works
          </h2>
          <p style={{
            fontSize: "0.88rem",
            color: "var(--text-dim, #6b7280)",
            marginBottom: 20,
          }}>
            Three steps to smarter betting.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14,
          }}>
            {[
              { num: "1", title: "Find Value", desc: "Use our EV calculator to identify bets where the odds are in your favor" },
              { num: "2", title: "Size Your Bets", desc: "Apply Kelly Criterion through our bankroll manager to optimize bet sizing" },
              { num: "3", title: "Track Results", desc: "Monitor your betting performance and adjust your strategy" },
            ].map((step, i) => (
              <div key={i} style={{
                background: "var(--bg-card, #0f172a)",
                border: "1px solid var(--border, #1f2937)",
                borderRadius: 12,
                padding: "22px 20px",
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "#6366f122",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "var(--primary, #6366f1)",
                  marginBottom: 12,
                }}>{step.num}</div>
                <h3 style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-main, #e5e7eb)",
                  marginBottom: 6,
                }}>{step.title}</h3>
                <p style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted, #9ca3af)",
                  lineHeight: 1.5,
                  margin: 0,
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px 44px" }}>
          <h2 style={{
            fontSize: "1.35rem",
            fontWeight: 800,
            marginBottom: 8,
            color: "var(--text-main, #e5e7eb)",
          }}>
            Build a Real Betting Edge
          </h2>
          <p style={{
            fontSize: "0.9rem",
            color: "var(--text-dim, #6b7280)",
            marginBottom: 20,
            maxWidth: 720,
          }}>
            PlaceBets works best when it feels like a serious workflow: learn the core math, track the live calendar, and use one repeatable system instead of random bets and random pages.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
          }}>
            {LEARNING_PATHS.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                style={{
                  display: "block",
                  background: "var(--bg-card, #0f172a)",
                  border: "1px solid var(--border, #1f2937)",
                  borderRadius: 14,
                  padding: "22px 20px",
                  textDecoration: "none",
                }}
              >
                <div style={{
                  color: path.color,
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}>
                  {path.tag}
                </div>
                <div style={{
                  color: "var(--text-main, #e5e7eb)",
                  fontSize: "1.02rem",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  marginBottom: 10,
                }}>
                  {path.title}
                </div>
                <p style={{
                  color: "var(--text-muted, #9ca3af)",
                  fontSize: "0.86rem",
                  lineHeight: 1.65,
                  marginBottom: 14,
                }}>
                  {path.desc}
                </p>
                <span style={{ color: path.color, fontWeight: 700, fontSize: "0.86rem" }}>
                  Open Path →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ========== TOOLS ========== */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 40px" }}>
          <h2 style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--text-main, #e5e7eb)",
          }}>
            Free Betting Tools
          </h2>
          <p style={{
            fontSize: "0.88rem",
            color: "var(--text-dim, #6b7280)",
            marginBottom: 20,
          }}>
            The math behind every smart bet. No account needed.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 14,
          }}>
            <Link href="/calculators" className="tool-card" style={{
              display: "block",
              background: "var(--bg-card, #0f172a)",
              border: "1px solid var(--border, #1f2937)",
              borderRadius: 12,
              padding: "22px 20px",
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#6366f122",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "var(--primary, #6366f1)",
                marginBottom: 12,
              }}>+EV</div>
              <h3 style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-main, #e5e7eb)",
                marginBottom: 6,
              }}>EV Calculator</h3>
              <p style={{
                fontSize: "0.85rem",
                color: "var(--text-muted, #9ca3af)",
                lineHeight: 1.5,
                marginBottom: 10,
              }}>
                Find positive expected value bets. Enter the odds, your edge, and see if the math works.
              </p>
              <span style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--primary, #6366f1)",
              }}>Open Calculator &rarr;</span>
            </Link>

            <Link href="/bankroll" className="tool-card" style={{
              display: "block",
              background: "var(--bg-card, #0f172a)",
              border: "1px solid var(--border, #1f2937)",
              borderRadius: 12,
              padding: "22px 20px",
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#10b98122",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "#10b981",
                marginBottom: 12,
              }}>$</div>
              <h3 style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-main, #e5e7eb)",
                marginBottom: 6,
              }}>Bankroll Manager</h3>
              <p style={{
                fontSize: "0.85rem",
                color: "var(--text-muted, #9ca3af)",
                lineHeight: 1.5,
                marginBottom: 10,
              }}>
                Kelly criterion bet sizing. Know exactly how much to wager on every bet.
              </p>
              <span style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#10b981",
              }}>Manage Bankroll &rarr;</span>
            </Link>

            <Link href="/glossary" className="tool-card" style={{
              display: "block",
              background: "var(--bg-card, #0f172a)",
              border: "1px solid var(--border, #1f2937)",
              borderRadius: 12,
              padding: "22px 20px",
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#f59e0b22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 800,
                color: "#f59e0b",
                marginBottom: 12,
              }}>A-Z</div>
              <h3 style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-main, #e5e7eb)",
                marginBottom: 6,
              }}>Betting Glossary</h3>
              <p style={{
                fontSize: "0.85rem",
                color: "var(--text-muted, #9ca3af)",
                lineHeight: 1.5,
                marginBottom: 10,
              }}>
                Juice, vig, handle, steam, CLV -- learn every term the sharps use.
              </p>
              <span style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#f59e0b",
              }}>Learn Terms &rarr;</span>
            </Link>
          </div>
        </section>

        {/* ========== SPORTSBOOK CTA ========== */}
        <BettingDeskCta />

        {/* ========== SPORTSBOOK CTA ========== */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px" }}>
          <SportsbookCTA />
        </section>

        {/* ========== SPORTS BETTING 101 ========== */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 40px" }}>
          <h2 style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--text-main, #e5e7eb)",
          }}>
            Sports Betting 101
          </h2>
          <p style={{
            fontSize: "0.88rem",
            color: "var(--text-dim, #6b7280)",
            marginBottom: 20,
          }}>
            Learn the fundamentals before you place a bet.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 14,
          }}>
            {[
              { title: "What is Expected Value?", desc: "Understand why EV is the single most important concept in profitable sports betting.", href: "/ev-betting" },
              { title: "Kelly Criterion Explained", desc: "The mathematical formula that tells you exactly how much to wager on each bet.", href: "/bankroll" },
              { title: "Reading Betting Odds", desc: "American, decimal, and fractional odds demystified. Convert between formats instantly.", href: "/glossary" },
              { title: "Bankroll Management Tips", desc: "Protect your money with proven strategies used by professional bettors.", href: "/bankroll" },
            ].map((card, i) => (
              <Link key={i} href={card.href} style={{
                display: "block",
                background: "var(--bg-card, #0f172a)",
                border: "1px solid var(--border, #1f2937)",
                borderRadius: 12,
                padding: "20px 20px",
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.2s",
              }}>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text-main, #e5e7eb)",
                  marginBottom: 6,
                }}>{card.title}</h3>
                <p style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted, #9ca3af)",
                  lineHeight: 1.5,
                  margin: 0,
                }}>{card.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ========== UPCOMING EVENTS ========== */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 40px" }}>
          <h2 style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--text-main, #e5e7eb)",
          }}>
            Upcoming Events
          </h2>
          <p style={{
            fontSize: "0.88rem",
            color: "var(--text-dim, #6b7280)",
            marginBottom: 20,
          }}>
            Major events with active betting markets.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
          }}>
            {UPCOMING_EVENTS.map((ev, i) => {
              const colors = TYPE_COLORS[ev.type] || TYPE_COLORS.sports;
              return (
                <a
                  key={i}
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    background: "var(--bg-card, #0f172a)",
                    border: "1px solid var(--border, #1f2937)",
                    borderRadius: 12,
                    padding: "18px 20px",
                    textDecoration: "none",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}>
                    <span style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: colors.text,
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 6,
                      padding: "3px 8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      {ev.type}
                    </span>
                    <span style={{
                      fontSize: "0.8rem",
                      color: "var(--text-dim, #6b7280)",
                    }}>
                      {ev.date}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-main, #e5e7eb)",
                    marginBottom: 4,
                  }}>
                    {ev.name}
                  </div>
                  <div style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted, #9ca3af)",
                  }}>
                    {ev.prize}
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ========== BOTTOM CTA ========== */}
        <section style={{
          textAlign: "center",
          padding: "48px 20px",
          maxWidth: 540,
          margin: "0 auto",
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--text-main, #e5e7eb)",
            marginBottom: 12,
          }}>
            Stop Guessing. Start Winning.
          </h2>
          <p style={{
            color: "var(--text-muted, #9ca3af)",
            marginBottom: 24,
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}>
            Use the same math the sharps use. Our free tools help you find
            value, size your bets, and protect your bankroll.
          </p>
          <Link href="/calculators" className="btn btn-primary btn-lg" style={{ minWidth: 200 }}>
            Try the EV Calculator
          </Link>
        </section>

        {/* ========== FOOTER ========== */}
        <footer style={{
          textAlign: "center",
          padding: "24px 20px 32px",
          borderTop: "1px solid var(--border, #1f2937)",
          marginTop: 20,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 16,
          }}>
            <Link href="/responsible-gambling" style={{ fontSize: "0.8rem", color: "var(--text-muted, #9ca3af)", textDecoration: "none" }}>
              Responsible Gambling
            </Link>
            <Link href="/terms" style={{ fontSize: "0.8rem", color: "var(--text-muted, #9ca3af)", textDecoration: "none" }}>
              Terms
            </Link>
            <Link href="/privacy" style={{ fontSize: "0.8rem", color: "var(--text-muted, #9ca3af)", textDecoration: "none" }}>
              Privacy
            </Link>
            <Link href="/contact" style={{ fontSize: "0.8rem", color: "var(--text-muted, #9ca3af)", textDecoration: "none" }}>
              Contact
            </Link>
          </div>
          <p style={{
            fontSize: "0.7rem",
            color: "var(--text-dim, #6b7280)",
            lineHeight: 1.6,
            maxWidth: 480,
            margin: "0 auto",
          }}>
            Educational content only -- not betting or financial advice. 21+ where legal.
            Gambling Problem? Call 1-800-GAMBLER.
          </p>
        </footer>
      </div>
    </>
  );
}
