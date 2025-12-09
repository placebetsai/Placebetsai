import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-wrap">
      {/* HERO */}
      <section
        className="text-center"
        style={{ marginBottom: "80px", maxWidth: "800px", marginInline: "auto" }}
      >
        <div className="pill green">BETA 2.0 · EDUCATION ONLY</div>
        <h1>
          Stop gambling.
          <br />
          <span className="highlight">Start betting like a pro.</span>
        </h1>
        <p>
          The house wins because you guess. The pros win because they understand{" "}
          <strong>odds</strong>, <strong>value</strong>, and{" "}
          <strong>bankroll</strong>. This site gives you those tools.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "28px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/calculators" className="btn btn-primary">
            Open Odds Calculator
          </Link>
          <Link href="/ev-betting" className="btn btn-ghost">
            Learn +EV Strategy
          </Link>
        </div>
      </section>

      {/* SPORTSBOOK CARDS */}
      <section className="mt-4">
        <h2 className="text-center" style={{ marginBottom: "6px" }}>
          Verified Sportsbooks <span style={{ fontSize: "0.9rem" }}>(demo)</span>
        </h2>
        <p className="text-center" style={{ fontSize: "0.9rem" }}>
          When you&apos;re ready to bet for real, always grab the biggest signup
          bonus you can.
        </p>

        <div className="grid-3" style={{ marginTop: "28px" }}>
          {/* DraftKings */}
          <div className="card book-card featured">
            <div>
              <div className="book-header">
                <div className="book-logo dk">DK</div>
                <div>
                  <div className="pill green">Top Pick</div>
                  <h3 style={{ marginTop: "4px" }}>DraftKings</h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      marginTop: "4px",
                      color: "#9ca3af",
                    }}
                  >
                    Clean UI, tons of props, great live betting.
                  </p>
                </div>
              </div>
              <p className="bonus-text" style={{ marginTop: "14px" }}>
                Bet $5, Get $200 Bonus Bets*
              </p>
            </div>

            <a href="#" className="btn btn-primary book-cta">
              Claim DraftKings Offer →
            </a>
          </div>

          {/* FanDuel */}
          <div className="card book-card">
            <div>
              <div className="book-header">
                <div className="book-logo fd">FD</div>
                <div>
                  <div className="pill">Parlay King</div>
                  <h3 style={{ marginTop: "4px" }}>FanDuel</h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      marginTop: "4px",
                      color: "#9ca3af",
                    }}
                  >
                    Known for Same Game Parlays and slick mobile app.
                  </p>
                </div>
              </div>
              <p className="bonus-text" style={{ marginTop: "14px" }}>
                $150 in Bonus Bets*
              </p>
            </div>

            <a href="#" className="btn btn-ghost book-cta">
              Claim FanDuel Offer →
            </a>
          </div>

          {/* BetMGM */}
          <div className="card book-card">
            <div>
              <div className="book-header">
                <div className="book-logo mgm">MGM</div>
                <div>
                  <div className="pill">High Limits</div>
                  <h3 style={{ marginTop: "4px" }}>BetMGM</h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      marginTop: "4px",
                      color: "#9ca3af",
                    }}
                  >
                    Good for bigger bettors and VIP rewards.
                  </p>
                </div>
              </div>
              <p className="bonus-text" style={{ marginTop: "14px" }}>
                Up to $1,500 Paid Back if You Lose*
              </p>
            </div>

            <a href="#" className="btn btn-ghost book-cta">
              Claim BetMGM Offer →
            </a>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL CARDS */}
      <section className="mt-4" style={{ paddingTop: "56px", borderTop: "1px solid #111827" }}>
        <div className="grid-3">
          <Link href="/calculators" className="card">
            <h3>🧮 Odds &amp; Payout Calculator</h3>
            <p style={{ marginTop: "6px" }}>
              Plug in American odds and your stake to see profit, total payout,
              and implied probability instantly.
            </p>
          </Link>

          <Link href="/bankroll" className="card">
            <h3>🛡️ Bankroll Management</h3>
            <p style={{ marginTop: "6px" }}>
              Learn units, the 1% rule, and how not to torch your roll in one bad
              Sunday.
            </p>
          </Link>

          <Link href="/glossary" className="card">
            <h3>📖 Betting Glossary</h3>
            <p style={{ marginTop: "6px" }}>
              Vig, handle, steam, chalk. Learn the language so you&apos;re not
              the dumbest money at the window.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
            }
