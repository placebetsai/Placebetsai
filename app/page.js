export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-pill">
          <span>SPORTS BETTING SCHOOL</span>
          <span>NO GURU COURSES</span>
        </div>
        <h1>
          Learn how sports betting actually works{" "}
          <span className="hero-gradient">
            before the book buries you.
          </span>
        </h1>
        <p className="hero-sub">
          PlaceBets.ai is the neon chalkboard that finally explains odds,
          parlays, spreads, and bankroll management like you talk to your boys:
          honest, a little rude, and focused on not going broke.
        </p>

        <div className="hero-actions">
          <a href="/learn-betting" className="btn btn-primary">
            Start with the basics →
          </a>
          <a href="/calculators" className="btn btn-outline">
            What does a $100 bet win? →
          </a>
        </div>

        <p className="hero-note">
          No picks to sell. No “locks of the decade”. Just the math and mindset
          the books hope you never learn.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">What you&apos;ll learn here</h2>
        <p className="section-intro">
          If you understand these four things, you&apos;re already ahead of 90%
          of bettors screaming at their TV on Sunday.
        </p>

        <div className="card-grid">
          <div className="card">
            <h3>Moneylines, spreads & totals</h3>
            <p className="card-tag">Odds decoded</p>
            <ul className="card-list">
              <li>Why -150 is not &quot;safe&quot; and +250 is not &quot;lottery&quot;.</li>
              <li>How spreads are really just point handicaps.</li>
              <li>What books imply about win probability.</li>
            </ul>
            <p className="card-example">
              Example: -110 on both sides = book quietly taking a cut from every
              drunk argument.
            </p>
          </div>

          <div className="card">
            <h3>Parlays & same-game traps</h3>
            <p className="card-tag">High risk, shiny buttons</p>
            <ul className="card-list">
              <li>How books stack edge against you with every leg.</li>
              <li>When parlays actually make sense (rare, but real).</li>
              <li>How to calculate real expected value.</li>
            </ul>
            <p className="card-example">
              Example: 3-leg +500 parlay that “should hit” actually pays you like
              a clown.
            </p>
          </div>

          <div className="card">
            <h3>Bankroll & tilt defense</h3>
            <p className="card-tag">Staying in the game</p>
            <ul className="card-list">
              <li>How big your bet size should actually be.</li>
              <li>Why chasing losses nukes solid strategy.</li>
              <li>Simple stop-loss rules to avoid rage deposits.</li>
            </ul>
            <p className="card-example">
              Example: 1–2% of bankroll per bet keeps you alive through cold
              streaks.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">What does a $100 bet really win?</h2>
        <p className="section-intro">
          Before you fire off your next “sure thing”, know exactly what the
          payout is and what chance the odds say you really have.
        </p>
        <div className="card-grid">
          <div className="card">
            <h3>$100 at -110</h3>
            <p className="card-tag">Standard spread/total price</p>
            <p className="card-example">
              Risk $110 to win $100. Implied chance: ~52.4% just to break even.
            </p>
          </div>
          <div className="card">
            <h3>$100 at +200</h3>
            <p className="card-tag">Plus-money underdog</p>
            <p className="card-example">
              Risk $100 to win $200. Implied chance: ~33.3% — not &quot;longshot&quot;,
              just math.
            </p>
          </div>
          <div className="card">
            <h3>$100 3-leg parlay</h3>
            <p className="card-tag">Three -110 legs</p>
            <p className="card-example">
              Roughly +596. A $100 bet returns ~$696. Implied chance: under 15%.
            </p>
          </div>
        </div>
      </section>
    </>
  );
            }
