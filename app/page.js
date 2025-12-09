import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-wrap">
      
      {/* HERO SECTION */}
      <section className="text-center" style={{ marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
        <div className="pill green">BETA 2.0 • EDUCATION ONLY</div>
        <h1>
          Stop gambling.<br />
          <span className="highlight">Start betting like a pro.</span>
        </h1>
        <p>
          The house wins because you guess. The pros win because they understand odds, value, and bankroll. 
          This site gives you the tools.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
          <Link href="/calculators" className="btn btn-primary">Open Odds Calculator</Link>
          <Link href="/ev-betting" className="btn btn-ghost">Learn +EV Strategy</Link>
        </div>
      </section>

      {/* SPORTSBOOK GRID */}
      <section className="mt-4">
        <h2 className="text-center" style={{ marginBottom: '10px' }}>Verified Sportsbooks</h2>
        <p className="text-center" style={{ fontSize: '0.9rem' }}>
          When you're ready to bet for real, always grab the biggest signup bonus you can.
        </p>

        <div className="grid-3" style={{ marginTop: '30px' }}>

          {/* DRAFTKINGS */}
          <div className="card book-card featured">
            <div>
              <div className="pill green">TOP PICK</div>
              <h3>DraftKings</h3>
              <p className="bonus-text">Bet $5, Get $200 Bonus Bets*</p>
              <p style={{ fontSize: '0.9rem' }}>Best UI for live betting and player props.</p>
            </div>
            <a href="#" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
              Claim DraftKings Offer →
            </a>
          </div>

          {/* FANDUEL */}
          <div className="card book-card">
            <div>
              <div className="pill">Parlay King</div>
              <h3>FanDuel</h3>
              <p className="bonus-text">$150 in Bonus Bets*</p>
              <p style={{ fontSize: '0.9rem' }}>Known for Same Game Parlays and slick mobile app.</p>
            </div>
            <a href="#" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
              Claim FanDuel Offer →
            </a>
          </div>

          {/* BETMGM */}
          <div className="card book-card">
            <div>
              <div className="pill">High Limits</div>
              <h3>BetMGM</h3>
              <p className="bonus-text">Up to $1,500 Paid Back if You Lose*</p>
              <p style={{ fontSize: '0.9rem' }}>Good for bigger bettors and VIP rewards.</p>
            </div>
            <a href="#" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
              Claim BetMGM Offer →
            </a>
          </div>

        </div>
      </section>

      {/* EDUCATION CARDS */}
      <section className="mt-4" style={{ paddingTop: '60px', borderTop: '1px solid #1f2937' }}>
        <div className="grid-3">

          <Link href="/ev-betting" className="card">
            <h3>📈 +EV Betting</h3>
            <p>
              Understand Expected Value — the only mathematical way to beat the book long-term.
            </p>
          </Link>

          <Link href="/bankroll" className="card">
            <h3>🛡️ Bankroll Mgmt</h3>
            <p>
              Learn units, the 1% rule, and how not to torch your roll in one bad Sunday.
            </p>
          </Link>

          <Link href="/glossary" className="card">
            <h3>📖 Betting Glossary</h3>
            <p>
              Vig, handle, steam, chalk. Learn the language so you’re not the dumbest money at the window.
            </p>
          </Link>

        </div>
      </section>

    </div>
  );
        }
