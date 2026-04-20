"use client";

import Link from "next/link";
import Script from "next/script";
import SportsbookCTA from "./SportsbookCTA";
import NewsTicker from "./NewsTicker";

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
          textAlign: "center",
          padding: "48px 20px 40px",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          {/* Hero SVG illustration — probability curve + market chart vibe */}
          <div aria-hidden="true" style={{ maxWidth: 560, margin: "0 auto 28px", opacity: 0.95 }}>
            <svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }} role="img" aria-label="Prediction market probability chart illustration">
              <defs>
                <linearGradient id="pbLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="pbFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* grid */}
              <g stroke="#1f2937" strokeWidth="1">
                <line x1="40" y1="40"  x2="540" y2="40" />
                <line x1="40" y1="90"  x2="540" y2="90" />
                <line x1="40" y1="140" x2="540" y2="140" />
                <line x1="40" y1="190" x2="540" y2="190" />
              </g>
              {/* y-axis labels */}
              <g fill="#6b7280" fontSize="10" fontFamily="monospace">
                <text x="6"  y="44">100%</text>
                <text x="10" y="94">75%</text>
                <text x="10" y="144">50%</text>
                <text x="10" y="194">25%</text>
              </g>
              {/* area fill under curve */}
              <path d="M 40,170 C 100,160 140,90 190,100 S 260,60 310,80 S 380,50 430,70 S 500,40 540,55 L 540,190 L 40,190 Z" fill="url(#pbFill)" />
              {/* main line */}
              <path d="M 40,170 C 100,160 140,90 190,100 S 260,60 310,80 S 380,50 430,70 S 500,40 540,55" fill="none" stroke="url(#pbLine)" strokeWidth="3" strokeLinecap="round" />
              {/* live price dots */}
              <g>
                <circle cx="190" cy="100" r="5" fill="#8b5cf6" />
                <circle cx="310" cy="80"  r="5" fill="#8b5cf6" />
                <circle cx="430" cy="70"  r="5" fill="#10b981" />
                <circle cx="540" cy="55"  r="6" fill="#10b981" stroke="#064e3b" strokeWidth="2" />
              </g>
              {/* pill badges */}
              <g fontFamily="monospace" fontSize="11" fontWeight="700">
                <rect x="160" y="72" width="58" height="20" rx="4" fill="#8b5cf622" stroke="#8b5cf644" />
                <text x="168" y="86" fill="#a78bfa">NBA 57¢</text>
                <rect x="280" y="52" width="58" height="20" rx="4" fill="#8b5cf622" stroke="#8b5cf644" />
                <text x="286" y="66" fill="#a78bfa">NFL 68¢</text>
                <rect x="398" y="42" width="64" height="20" rx="4" fill="#10b98122" stroke="#10b98144" />
                <text x="404" y="56" fill="#34d399">+EV 12%</text>
              </g>
            </svg>
          </div>

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
        </section>

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
