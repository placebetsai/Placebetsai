"use client";

import { useState } from "react";

export default function CalculatorsPage() {
  const [mlOdds, setMlOdds] = useState("");
  const [mlStake, setMlStake] = useState("");
  const [mlResult, setMlResult] = useState("");

  const [parlayOdds, setParlayOdds] = useState(["", "", ""]);
  const [parlayStake, setParlayStake] = useState("");
  const [parlayResult, setParlayResult] = useState("");

  function calcMoneyline() {
    const o = parseFloat(mlOdds);
    const s = parseFloat(mlStake);
    if (isNaN(o) || isNaN(s) || s <= 0) {
      setMlResult("Enter a real number for odds and stake.");
      return;
    }

    let win = 0;
    if (o > 0) {
      win = (o / 100) * s;
    } else {
      win = (100 / Math.abs(o)) * s;
    }
    const payout = s + win;

    const implied =
      o > 0 ? 100 / (o + 100) : Math.abs(o) / (Math.abs(o) + 100);

    setMlResult(
      `Risk $${s.toFixed(2)} to win $${win.toFixed(
        2
      )}. Total return: $${payout.toFixed(
        2
      )}. Implied chance: ${(implied * 100).toFixed(1)}%.`
    );
  }

  function calcParlay() {
    const s = parseFloat(parlayStake);
    if (isNaN(s) || s <= 0) {
      setParlayResult("Enter a real stake amount.");
      return;
    }

    const parsed = parlayOdds
      .map((o) => parseFloat(o))
      .filter((o) => !isNaN(o));

    if (parsed.length === 0) {
      setParlayResult("Enter at least one valid set of odds.");
      return;
    }

    let multiplier = 1;
    parsed.forEach((o) => {
      if (o > 0) {
        multiplier *= 1 + o / 100;
      } else {
        multiplier *= 1 + 100 / Math.abs(o);
      }
    });

    const payout = s * multiplier;
    const win = payout - s;
    setParlayResult(
      `If every leg hits, your $${s.toFixed(2)} returns $${payout.toFixed(
        2
      )} (profit $${win.toFixed(2)}).`
    );
  }

  return (
    <section className="section">
      <h1 className="section-title">Betting Calculators</h1>
      <p className="section-intro">
        Type in your odds and stake, and stop guessing what your “$100 bet”
        actually pays. No logins, no ads covering the numbers.
      </p>

      <div className="card-grid">
        <div className="card calc-card">
          <h3>Moneyline payout</h3>
          <p className="card-tag">Single bet</p>
          <label>American odds (e.g. -150 or +200)</label>
          <input
            value={mlOdds}
            onChange={(e) => setMlOdds(e.target.value)}
            placeholder="-150"
          />
          <label>Stake amount ($)</label>
          <input
            value={mlStake}
            onChange={(e) => setMlStake(e.target.value)}
            placeholder="100"
          />
          <button
            className="btn btn-primary small"
            style={{ marginTop: "0.7rem" }}
            onClick={calcMoneyline}
          >
            Calculate
          </button>
          {mlResult && <div className="calc-result">{mlResult}</div>}
          <p className="calc-footnote">
            Positive odds (e.g. +200) show how much profit you win on $100
            stake. Negative odds (e.g. -150) show how much you risk to win $100.
          </p>
        </div>

        <div className="card calc-card">
          <h3>Parlay payout</h3>
          <p className="card-tag">Up to 3 legs</p>
          <label>Leg 1 odds</label>
          <input
            value={parlayOdds[0]}
            onChange={(e) =>
              setParlayOdds([e.target.value, parlayOdds[1], parlayOdds[2]])
            }
            placeholder="-110"
          />
          <label>Leg 2 odds (optional)</label>
          <input
            value={parlayOdds[1]}
            onChange={(e) =>
              setParlayOdds([parlayOdds[0], e.target.value, parlayOdds[2]])
            }
            placeholder="-110"
          />
          <label>Leg 3 odds (optional)</label>
          <input
            value={parlayOdds[2]}
            onChange={(e) =>
              setParlayOdds([parlayOdds[0], parlayOdds[1], e.target.value])
            }
            placeholder="+200"
          />
          <label>Stake amount ($)</label>
          <input
            value={parlayStake}
            onChange={(e) => setParlayStake(e.target.value)}
            placeholder="50"
          />
          <button
            className="btn btn-primary small"
            style={{ marginTop: "0.7rem" }}
            onClick={calcParlay}
          >
            Calculate
          </button>
          {parlayResult && <div className="calc-result">{parlayResult}</div>}
          <p className="calc-footnote">
            This ignores boosts and limits. It&apos;s here to show you how wild
            the risk/reward really is when you stack too many legs.
          </p>
        </div>

        <div className="card">
          <h3>Quick reference</h3>
          <p className="card-tag">Common moneyline odds</p>
          <ul className="card-list">
            <li>-110 ≈ 52.4% implied chance</li>
            <li>-150 ≈ 60.0%</li>
            <li>+100 = 50.0%</li>
            <li>+200 ≈ 33.3%</li>
            <li>+300 ≈ 25.0%</li>
          </ul>
          <p className="card-example">
            If you&apos;re constantly betting long shots with implied chances
            under 20%… don&apos;t be shocked when they lose 4 times in a row.
          </p>
        </div>
      </div>
    </section>
  );
              }
