"use client";

import { useState } from "react";

export default function BankrollPage() {
  const [bankroll, setBankroll] = useState("1000");
  const [edge, setEdge] = useState("5");
  const [odds, setOdds] = useState("-110");

  const br = parseFloat(bankroll) || 0;
  const edgePct = parseFloat(edge) || 0;
  const parsedOdds = parseFloat(odds) || -110;

  // Convert American odds to decimal
  let decimal = 1;
  if (parsedOdds > 0) decimal = parsedOdds / 100 + 1;
  else if (parsedOdds < 0) decimal = 100 / Math.abs(parsedOdds) + 1;

  // Kelly formula: f = (bp - q) / b  where b = decimal-1, p = win prob, q = 1-p
  const impliedProb = parsedOdds > 0
    ? 100 / (parsedOdds + 100)
    : Math.abs(parsedOdds) / (Math.abs(parsedOdds) + 100);

  const trueProb = impliedProb + edgePct / 100;
  const b = decimal - 1;
  const kellyFull = b > 0 ? (b * trueProb - (1 - trueProb)) / b : 0;
  const kellyHalf = Math.max(0, kellyFull / 2);
  const kellyQuarter = Math.max(0, kellyFull / 4);

  const dollarsKellyFull = br * Math.max(0, kellyFull);
  const dollarsKellyHalf = br * kellyHalf;
  const dollarsKellyQuarter = br * kellyQuarter;
  const dollarsTwoPct = br * 0.02;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <h1>Bankroll Management</h1>
      <p>
        Your bankroll is your operating capital. Without discipline here, even a
        genuine edge gets destroyed by variance and bad sizing.
      </p>

      <section className="card mt-4">
        <h2>Kelly Criterion Calculator</h2>
        <p>
          The Kelly Criterion tells you the mathematically optimal fraction of
          your bankroll to bet, given your edge and the odds. Enter your edge
          (how much better your true probability is vs. implied) to see recommended
          bet sizes.
        </p>

        <div className="grid-2 mt-4" style={{ marginBottom: 20 }}>
          <div className="input-group">
            <label>Bankroll ($)</label>
            <input
              type="number"
              value={bankroll}
              onChange={(e) => setBankroll(e.target.value)}
              placeholder="1000"
            />
          </div>
          <div className="input-group">
            <label>American Odds</label>
            <input
              type="number"
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
              placeholder="-110"
            />
          </div>
          <div className="input-group">
            <label>Your Edge (%)</label>
            <input
              type="number"
              value={edge}
              onChange={(e) => setEdge(e.target.value)}
              placeholder="5"
            />
          </div>
        </div>

        <div style={{ background: "#020617", borderRadius: 16, padding: 22, border: "1px solid #1f2937" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#9ca3af" }}>Full Kelly bet</span>
            <span style={{ fontWeight: 700 }}>
              ${dollarsKellyFull.toFixed(2)}{" "}
              <span style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                ({(Math.max(0, kellyFull) * 100).toFixed(2)}% of roll)
              </span>
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#9ca3af" }}>Half Kelly (recommended)</span>
            <span style={{ fontWeight: 700, color: "#22c55e" }}>
              ${dollarsKellyHalf.toFixed(2)}{" "}
              <span style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                ({(kellyHalf * 100).toFixed(2)}% of roll)
              </span>
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#9ca3af" }}>Quarter Kelly (conservative)</span>
            <span style={{ fontWeight: 700, color: "#38bdf8" }}>
              ${dollarsKellyQuarter.toFixed(2)}{" "}
            </span>
          </div>
          <div style={{ height: 1, background: "#111827", margin: "14px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#9ca3af" }}>Flat 2% (simple alternative)</span>
            <span style={{ fontWeight: 700, color: "#e5e7eb" }}>${dollarsTwoPct.toFixed(2)}</span>
          </div>
          <p style={{ fontSize: "0.75rem", marginTop: 12, color: "#6b7280" }}>
            Most recreational bettors should use Half Kelly or flat 2%, not Full Kelly.
            Full Kelly requires an accurately estimated edge—which is hard.
          </p>
        </div>
      </section>

      <section className="card mt-4">
        <h2>The Core Principles</h2>
        <p>
          Every successful sports bettor treats their bankroll like a business.
          These principles are non-negotiable:
        </p>
        <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8 }}>
          <li>
            <strong>Never risk more than 2–3% per bet.</strong> At 2%, you need
            50 consecutive losses to go broke—which is nearly impossible if
            you&apos;re betting selectively. At 10% units, a 10-game losing
            streak (very normal in betting) drops you to 35% of your starting
            bankroll.
          </li>
          <li>
            <strong>Separate your betting bankroll from your life money.</strong>{" "}
            Only bet with money you&apos;ve allocated specifically for this
            purpose. This removes emotional decision-making from losses.
          </li>
          <li>
            <strong>Track every single bet.</strong> Date, game, side, odds,
            stake, result. Without data, you cannot know if your edge is real or
            if you&apos;ve been on a lucky run.
          </li>
          <li>
            <strong>Unit size is a percentage, not a dollar amount.</strong> Your
            unit grows and shrinks with your bankroll. As your roll grows,
            so do your bets. As it shrinks, so do your bets. This is how you
            protect capital during losing streaks.
          </li>
        </ul>
      </section>

      <div className="grid-2 mt-4">
        <div className="card">
          <h2 style={{ fontSize: "1.25rem" }}>Fixed Unit Sizing</h2>
          <p>
            The simplest approach: bet the same dollar amount (e.g., $50) on
            every play regardless of confidence level. Works well for bettors
            who don&apos;t trust their ability to grade their own edge.
          </p>
          <p>
            <strong>Pros:</strong> Easy to track. No overthinking. Consistent exposure.
          </p>
          <p>
            <strong>Cons:</strong> Doesn&apos;t account for varying edge. A 3-unit
            edge play and a 1-unit play get the same bet.
          </p>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "1.25rem" }}>Proportional / Kelly Sizing</h2>
          <p>
            Bet a percentage of bankroll based on your calculated edge. Kelly
            maximizes long-run growth rate but requires accurate edge estimation.
            Most pros use Half Kelly to reduce variance.
          </p>
          <p>
            <strong>Pros:</strong> Mathematically optimal growth. Bet more when edge
            is bigger.
          </p>
          <p>
            <strong>Cons:</strong> Requires knowing your true edge, which is hard. Full
            Kelly has severe drawdowns.
          </p>
        </div>
      </div>

      <div className="card mt-4" style={{ borderColor: "#ff1744" }}>
        <h2 style={{ color: "#ff6b81" }}>🚫 Never Chase Losses</h2>
        <p>
          "Chasing" means increasing your bet size after a loss to win money back
          faster. This is how recreational bettors blow up their bankrolls.
          Variance doesn&apos;t owe you a win. A losing streak of 8 or 10 bets is
          completely normal even for sharp bettors on good plays.
        </p>
        <p>
          Set your unit size once. Review it monthly, not after each loss. If
          you feel the urge to bet 3x your normal amount after a bad day, log off
          and come back tomorrow. There will always be more games.
        </p>
      </div>

      <section className="card mt-4">
        <h2>Bankroll Growth: Realistic Expectations</h2>
        <p>
          Professional sports bettors with genuine edges typically return 3–8%
          ROI over large sample sizes. That&apos;s not 3% per bet—it&apos;s 3%
          on total dollars wagered. Here&apos;s what that looks like:
        </p>
        <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8 }}>
          <li>$1,000 bankroll, $50 units, 200 bets/year at 5% ROI = $500 profit</li>
          <li>$5,000 bankroll, $100 units, 500 bets/year at 4% ROI = $2,000 profit</li>
          <li>$10,000 bankroll, $200 units, 500 bets/year at 5% ROI = $5,000 profit</li>
        </ul>
        <p>
          The edge compounds. After a profitable year, your unit size grows with
          your bankroll. Discipline during losing streaks is what separates people
          who cash out winners from those who give it all back.
        </p>
      </section>
    </div>
  );
}
