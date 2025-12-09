export default function BankrollPage() {
  return (
    <section className="section">
      <h1 className="section-title">Bankroll & Risk Management</h1>
      <p className="section-intro">
        If you skip this page, none of the other pages matter. Bankroll
        management is the difference between “this is fun” and “I just drained
        my rent money on a Tuesday NBA slate”.
      </p>

      <div className="card-grid">
        <div className="card">
          <h3>Step 1: Define a real bankroll</h3>
          <p className="card-tag">Not your credit card</p>
          <ul className="card-list">
            <li>Pick a number you can afford to lose without life damage.</li>
            <li>That is your bankroll. Treat it like a poker chip stack.</li>
            <li>Do not keep secretly “adding more” after bad weeks.</li>
          </ul>
          <p className="card-example">
            Example: You choose $1,000 as bankroll. That&apos;s your universe.
          </p>
        </div>

        <div className="card">
          <h3>Step 2: Convert to units</h3>
          <p className="card-tag">Uniform bet sizing</p>
          <ul className="card-list">
            <li>Set 1 unit = 1–2% of bankroll.</li>
            <li>With $1,000 roll, 1 unit = $10–$20.</li>
            <li>Most bets are 1 unit. Strongest reads are 2 units max.</li>
          </ul>
          <p className="card-example">
            Example: Instead of &quot;$200 on this one&quot;, it&apos;s &quot;2 units max&quot;.
          </p>
        </div>

        <div className="card">
          <h3>Step 3: Pre-define stop rules</h3>
          <p className="card-tag">Protect yourself from tilt</p>
          <ul className="card-list">
            <li>Daily stop: e.g. -3 units in a day = you&apos;re done.</li>
            <li>Weekly stop: e.g. -10 units = scale down size.</li>
            <li>Never increase unit size mid-downswing.</li>
          </ul>
          <p className="card-example">
            Example: Down 3 units on Sunday? You&apos;re off live betting Sunday
            Night Football.
          </p>
        </div>

        <div className="card">
          <h3>Step 4: Track your bets</h3>
          <p className="card-tag">Reality check</p>
          <ul className="card-list">
            <li>Simple spreadsheet: date, market, odds, stake, result.</li>
            <li>Tag by sport and bet type (spread, total, parlay, prop).</li>
            <li>Review monthly which ones bleed you dry.</li>
          </ul>
          <p className="card-example">
            Example: You think parlays are your thing. The sheet shows 
            -20 units lifetime. Now you know.
          </p>
        </div>

        <div className="card">
          <h3>Step 5: Respect volume</h3>
          <p className="card-tag">More bets ≠ more profit</p>
          <ul className="card-list">
            <li>Most people bet way too many games.</li>
            <li>Focus on your best edges, not every primetime matchup.</li>
            <li>Being selective makes variance less violent.</li>
          </ul>
          <p className="card-example">
            Example: 5–10 solid bets a week beats 40 &quot;lean&quot; bets every
            single time.
          </p>
        </div>

        <div className="card">
          <h3>Step 6: Treat it like a long game</h3>
          <p className="card-tag">Not a scratch-off ticket</p>
          <ul className="card-list">
            <li>Hot streaks end; cold streaks end too.</li>
            <li>Your process matters more than your last weekend.</li>
            <li>If you&apos;re miserable, you&apos;re over-betting.</li>
          </ul>
          <p className="card-example">
            Example: Betting should feel like a side hobby, not a heart attack.
          </p>
        </div>
      </div>

      <p className="bankroll-note">
        None of this makes betting safe. It just gives you a framework so the
        swings don&apos;t control your life. If you feel out of control, step away
        completely and get help.
      </p>
    </section>
  );
}
