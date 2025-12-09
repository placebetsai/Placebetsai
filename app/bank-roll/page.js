export default function BankrollPage() {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <h1>Bankroll Management</h1>
      <p>
        Your bankroll is your lifeline. Strategy is useless if you size bets
        like a lunatic.
      </p>

      <div className="grid-2 mt-4">
        <div className="card">
          <h2 style={{ fontSize: "1.25rem" }}>The 1–2% Rule</h2>
          <p>
            Simple rule: never risk more than{" "}
            <strong>1–2% of your total bankroll</strong> on a single bet.
          </p>
          <p>
            $1,000 roll → $10–20 units.  
            $5,000 roll → $50–100 units.
          </p>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "1.25rem" }}>Fixed vs. Proportional</h2>
          <p>
            <strong>Fixed unit:</strong> Always bet the same amount (like
            $50). Easiest for most people.
          </p>
          <p>
            <strong>Proportional / Kelly:</strong> Bet a % of bankroll based
            on your perceived edge. More aggressive, more swingy, requires
            real skill.
          </p>
        </div>
      </div>

      <div className="card mt-4" style={{ borderColor: "#ff1744" }}>
        <h2 style={{ color: "#ff6b81" }}>🚫 Never Chase</h2>
        <p>
          &quot;Chasing&quot; is when you bet bigger after a loss just to win
          it back. This is how people blow up bankrolls, credit cards, and
          marriages.
        </p>
        <p>
          Set a unit size. Stick to it. If you tilt, log off. There&apos;s
          always another slate tomorrow.
        </p>
      </div>
    </div>
  );
              }
