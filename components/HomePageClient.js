"use client";

import Link from "next/link";
import Script from "next/script";
import SportsbookCTA from "./SportsbookCTA";

const SITE_URL = "https://placebets.ai";

const UPCOMING_EVENTS = [
  { name: "WSOP Main Event 2026", date: "Jun 28 - Jul 16", type: "poker", prize: "$15M GTD", link: "https://www.wsop.com/" },
  { name: "NBA Finals 2026", date: "Jun 5 - Jun 22", type: "sports", prize: "Odds Live", link: "https://kalshi.com/sign-up/?utm_source=placebetsai&referral=PENDING" },
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
        {/* ========== HERO ========== */}
        <section style={{
          textAlign: "center",
          padding: "60px 20px 40px",
          maxWidth: 640,
          margin: "0 auto",
        }}>
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
            <a href="#picks" className="btn btn-primary btn-lg" style={{ minWidth: 180 }}>
              See Today&#39;s Picks
            </a>
            <Link href="/calculators" className="btn btn-ghost btn-lg" style={{ minWidth: 180 }}>
              Try the EV Calculator
            </Link>
          </div>
        </section>

        {/* ========== TODAY'S PICKS ========== */}
        <section id="picks" style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 40px" }}>
          <h2 style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--text-main, #e5e7eb)",
          }}>
            Today&#39;s Picks
          </h2>
          <p style={{
            fontSize: "0.88rem",
            color: "var(--text-dim, #6b7280)",
            marginBottom: 20,
          }}>
            Live odds from prediction markets, updated every 2 minutes.
          </p>

          {topPicks.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {topPicks.map((m) => {
                const pct = m.yesPrice != null ? Math.round(m.yesPrice * 100) : null;
                const color = pct != null ? probColor(pct) : "#6b7280";
                return (
                  <div
                    key={m.ticker}
                    style={{
                      background: "var(--bg-card, #0f172a)",
                      border: "1px solid var(--border, #1f2937)",
                      borderRadius: 12,
                      padding: "18px 20px",
                    }}
                  >
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                      marginBottom: 12,
                    }}>
                      <div style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--text-main, #e5e7eb)",
                        lineHeight: 1.4,
                        flex: 1,
                      }}>
                        {humanizeTitle(m.title)}
                      </div>
                      {pct != null && (
                        <div style={{
                          fontSize: "1.2rem",
                          fontWeight: 800,
                          color: color,
                          whiteSpace: "nowrap",
                          minWidth: 56,
                          textAlign: "right",
                        }}>
                          {pct}%
                        </div>
                      )}
                    </div>
                    {pct != null && (
                      <div style={{
                        background: "var(--border, #1f2937)",
                        borderRadius: 6,
                        height: 8,
                        overflow: "hidden",
                      }}>
                        <div style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: color,
                          borderRadius: 6,
                          transition: "width 0.3s ease",
                        }} />
                      </div>
                    )}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 8,
                    }}>
                      <span style={{
                        fontSize: "0.75rem",
                        color: "var(--text-dim, #6b7280)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>
                        {m.category || "Sports"}
                      </span>
                      {pct != null && (
                        <span style={{
                          fontSize: "0.75rem",
                          color: "var(--text-dim, #6b7280)",
                        }}>
                          Yes {pct}% / No {100 - pct}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              background: "var(--bg-card, #0f172a)",
              border: "1px solid var(--border, #1f2937)",
              borderRadius: 12,
              padding: "32px 20px",
              textAlign: "center",
              color: "var(--text-muted, #9ca3af)",
              fontSize: "0.95rem",
            }}>
              Markets are loading or currently closed. Check back soon, or explore our tools below.
            </div>
          )}
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
