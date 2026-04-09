"use client";

import { useState } from "react";

export default function CalculatorsPage() {
  const [odds, setOdds] = useState("-110");
  const [stake, setStake] = useState("100");

  // EV Calculator state
  const [evOdds, setEvOdds] = useState("2.50");
  const [trueProbability, setTrueProbability] = useState("45");
  const [evResult, setEvResult] = useState(null);

  function calculateEV() {
    const decimalOdds = parseFloat(evOdds || "0");
    const prob = parseFloat(trueProbability || "0") / 100;
    if (decimalOdds <= 0 || prob <= 0 || prob > 1) {
      setEvResult({ ev: 0, verdict: "Invalid inputs" });
      return;
    }
    // EV = (probability * (odds - 1)) - (1 - probability)
    const ev = (prob * (decimalOdds - 1)) - (1 - prob);
    const verdict = ev > 0 ? "+EV (Profitable)" : ev < 0 ? "-EV (Unprofitable)" : "Break Even";
    setEvResult({ ev, verdict });
  }

  const parsedOdds = parseFloat(odds || "0");
  const parsedStake = parseFloat(stake || "0");

  let profit = 0;
  let implied = 0;

  if (parsedOdds > 0) {
    profit = parsedStake * (parsedOdds / 100);
    implied = 100 / (parsedOdds + 100);
  } else if (parsedOdds < 0) {
    profit = parsedStake * (100 / Math.abs(parsedOdds));
    implied = Math.abs(parsedOdds) / (Math.abs(parsedOdds) + 100);
  }

  const totalPayout = parsedStake + profit;
  const impliedPct = implied * 100;

  return (
    <div>
      <h1 className="text-center">Betting Calculator</h1>
      <p className="text-center">
        Convert American odds into profit, total payout, and implied
        probability so you know what you&apos;re really betting into.
      </p>

      <div className="calc-box mt-4">
        <div className="grid-2" style={{ marginBottom: 22 }}>
          <div className="input-group">
            <label>American Odds (+/-)</label>
            <input
              type="number"
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
              placeholder="-110"
            />
          </div>
          <div className="input-group">
            <label>Stake / Wager ($)</label>
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              placeholder="100"
            />
          </div>
        </div>

        <div
          style={{
            background: "#020617",
            borderRadius: 16,
            padding: 22,
            border: "1px solid #1f2937",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span style={{ color: "#9ca3af" }}>Potential Profit</span>
            <span style={{ fontWeight: 700, fontSize: "1.2rem" }}>
              ${profit.toFixed(2)}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span style={{ color: "#9ca3af" }}>Total Payout</span>
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#22c55e",
              }}
            >
              ${totalPayout.toFixed(2)}
            </span>
          </div>

          <div
            style={{
              height: 1,
              background: "#111827",
              margin: "14px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9ca3af" }}>Implied Probability</span>
            <span style={{ fontWeight: 700, color: "#38bdf8" }}>
              {isFinite(impliedPct) ? impliedPct.toFixed(2) + "%" : "—"}
            </span>
          </div>

          <p
            style={{
              fontSize: "0.8rem",
              marginTop: 10,
              marginBottom: 0,
            }}
          >
            You need to win this bet more than{" "}
            <span style={{ color: "#e5e7eb" }}>
              {isFinite(impliedPct) ? impliedPct.toFixed(2) + "%" : "—"}
            </span>{" "}
            of the time to be profitable long-term at these odds.
          </p>

          <p
            style={{
              fontSize: "0.75rem",
              marginTop: 10,
              color: "#6b7280",
            }}
          >
            Want to test this on a real book? Try DraftKings, FanDuel, or
            BetMGM (always hunt for the best line).
          </p>
        </div>
      </div>

      {/* EV Calculator */}
      <h2 className="text-center" style={{ marginTop: "60px" }}>Expected Value Calculator</h2>
      <p className="text-center">
        Find out if a bet has positive expected value. Enter the decimal odds and your estimated true probability.
      </p>

      <div className="calc-box mt-4">
        <div className="grid-2" style={{ marginBottom: 22 }}>
          <div className="input-group">
            <label>Decimal Odds</label>
            <input
              type="number"
              step="0.01"
              value={evOdds}
              onChange={(e) => setEvOdds(e.target.value)}
              placeholder="2.50"
            />
          </div>
          <div className="input-group">
            <label>True Probability (%)</label>
            <input
              type="number"
              step="1"
              min="1"
              max="99"
              value={trueProbability}
              onChange={(e) => setTrueProbability(e.target.value)}
              placeholder="45"
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={calculateEV}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          Calculate Expected Value
        </button>

        {evResult && (
          <div
            style={{
              background: "#020617",
              borderRadius: 16,
              padding: 22,
              border: `1px solid ${evResult.ev > 0 ? "rgba(0, 230, 118, 0.4)" : evResult.ev < 0 ? "rgba(239, 68, 68, 0.4)" : "#1f2937"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <span style={{ color: "#9ca3af" }}>Expected Value (per $1 bet)</span>
              <span style={{
                fontWeight: 700,
                fontSize: "1.4rem",
                color: evResult.ev > 0 ? "#00e676" : evResult.ev < 0 ? "#ef4444" : "#9ca3af",
              }}>
                {evResult.ev > 0 ? "+" : ""}{evResult.ev.toFixed(4)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#9ca3af" }}>Verdict</span>
              <span style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: evResult.ev > 0 ? "#00e676" : evResult.ev < 0 ? "#ef4444" : "#38bdf8",
              }}>
                {evResult.verdict}
              </span>
            </div>

            <p
              style={{
                fontSize: "0.8rem",
                marginTop: 14,
                marginBottom: 0,
                color: "#6b7280",
              }}
            >
              A positive EV means this bet is profitable in the long run if your probability estimate is correct.
              For example, an EV of +0.10 means you gain 10 cents per dollar wagered on average.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
