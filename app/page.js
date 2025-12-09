import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto 64px",
          textAlign: "center",
        }}
      >
        <div className="pill green">BETA 2.0 · EDUCATION ONLY</div>
        <h1>
          Stop gambling.
          <br />
          <span className="highlight">Start betting like a pro.</span>
        </h1>
        <p>
          The house wins because you guess. The pros win because they{" "}
          <strong>understand odds, value, and bankroll.</strong> This site
          gives you the tools.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginTop: 26,
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

      {/* AFFILIATE / BOOKS GRID */}
      <section className="mt-4">
        <h2 className="text-center" style={{ textAlign: "center" }}>
          Verified Sportsbooks (Coming Soon)
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
          }}
        >
          When you’re ready to bet for real, always grab the biggest signup
          bonus you can.
        </p>

        <div className="grid-3" style={{ marginTop: 28 }}>
          <div className="card book-card featured">
            <div>
              <div className="pill green">TOP PICK</div>
              <h3>DraftKings</h3>
              <p className="bonus-text">Bet $5, Get $200 Bonus Bets*</p>
              <p>Clean app, deep markets, great live betting.</p>
            </div>
            <a
              href="#"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 18 }}
            >
              Claim DraftKings Offer →
            </a>
          </div>

          <div className="card book-card">
            <div>
              <div className="pill">POPULAR</div>
              <h3>FanDuel</h3>
              <p className="bonus-text">$150 in Bonus Bets*</p>
              <p>Same Game Parlays king. Great for casual bettors.</p>
            </div>
            <a
              href="#"
              className="btn btn-ghost"
              style={{ width: "100%", marginTop: 18 }}
            >
              Claim FanDuel Offer →
            </a>
          </div>

          <div className="card book-card">
            <div>
              <div className="pill">HIGH LIMITS</div>
              <h3>BetMGM</h3>
              <p className="bonus-text">Up to $1,500 Back*</p>
              <p>Good for bigger bettors and reward programs.</p>
            </div>
            <a
              href="#"
              className="btn btn-ghost"
              style={{ width: "100%", marginTop: 18 }}
            >
              Claim BetMGM Offer →
            </a>
          </div>
        </div>

        <p
          style={{
            marginTop: 16,
            fontSize: "0.75rem",
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          *Promo examples only. Offers vary by state. Always check the book’s
          terms.
        </p>
      </section>

      {/* FEATURE CARDS */}
      <section className="mt-4" style={{ paddingTop: 52 }}>
        <div className="grid-3">
          <Link href="/calculators" className="card">
            <h3>🧮 Odds & Payout Calculator</h3>
            <p>
              Plug in American odds and your stake to see profit, total payout,
              and implied probability instantly.
            </p>
          </Link>

          <Link href="/bankroll" className="card">
            <h3>🛡️ Bankroll Management</h3>
            <p>
              How much should you bet per game? Learn units, the 1% rule, and
              how not to torch your roll in one bad Sunday.
            </p>
          </Link>

          <Link href="/glossary" className="card">
            <h3>📖 Betting Glossary</h3>
            <p>
              Vig, handle, steam, chalk. Learn the language so you’re not the
              dumbest money at the window.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
                }
