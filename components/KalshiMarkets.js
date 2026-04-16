"use client";

import { useEffect, useState } from "react";

/* Find max volume for relative bar sizing */
function getMaxVolume(markets) {
  let max = 0;
  for (const m of markets) {
    if (m.volume != null && m.volume > max) max = m.volume;
  }
  return max || 1;
}

export default function KalshiMarkets({ initialMarkets = [], compact = false }) {
  const [markets, setMarkets] = useState(initialMarkets);
  const [loading, setLoading] = useState(initialMarkets.length === 0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialMarkets.length > 0) return;

    async function fetchMarkets() {
      try {
        const res = await fetch("/api/kalshi");
        if (!res.ok) throw new Error("Failed to fetch markets");
        const data = await res.json();
        setMarkets(data.markets || []);
      } catch (err) {
        console.error("Kalshi fetch error:", err);
        setError("Prediction markets temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    }

    fetchMarkets();
    const interval = setInterval(fetchMarkets, 60000);
    return () => clearInterval(interval);
  }, [initialMarkets]);

  /* COMPACT MODE: sidebar widget showing top 5 */
  if (compact) {
    const display = markets.slice(0, 5);
    const maxVol = getMaxVolume(display);

    if (loading) {
      return (
        <div style={{ padding: '12px 0', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          Loading markets...
        </div>
      );
    }

    if (error || display.length === 0) {
      return (
        <div style={{ padding: '12px 0', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          {error || "No active markets right now."}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {display.map((market) => {
          const yesPercent = market.yesPrice != null ? Math.round(market.yesPrice * 100) : 50;
          const volPct = market.volume != null ? Math.round((market.volume / maxVol) * 100) : 0;

          return (
            <a
              key={market.ticker}
              href="https://kalshi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="market-card"
              style={{ padding: '14px 16px', gap: '8px' }}
            >
              <div className="market-card-title" style={{ fontSize: '0.82rem' }}>
                {market.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span className="mono" style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: yesPercent >= 50 ? 'var(--primary)' : 'var(--red)',
                  textShadow: yesPercent >= 50
                    ? '0 0 12px var(--primary-glow)'
                    : '0 0 12px var(--red-glow)',
                }}>
                  {yesPercent}&cent;
                </span>
                <span className="mono" style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                }}>
                  {market.volume != null ? `${(market.volume / 1000).toFixed(1)}k vol` : ''}
                </span>
              </div>
              <div className="market-bar-container">
                <div className="market-bar-yes" style={{ width: `${yesPercent}%` }} />
                <div className="market-bar-no" style={{ width: `${100 - yesPercent}%` }} />
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  /* FULL MODE: main markets section */
  if (loading) {
    return (
      <section style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div className="section-header">
          <div className="section-title">
            <span className="dot"></span>
            All Prediction Markets
          </div>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          Loading markets from Kalshi...
        </p>
      </section>
    );
  }

  if (error || markets.length === 0) {
    return (
      <section style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div className="section-header">
          <div className="section-title">
            <span className="dot"></span>
            All Prediction Markets
          </div>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          {error || "No active sports prediction markets right now. Check back soon."}
        </p>
      </section>
    );
  }

  const display = markets.slice(0, 12);
  const maxVol = getMaxVolume(display);

  return (
    <section style={{ marginTop: '20px', marginBottom: '40px' }}>
      <div className="section-header">
        <div className="section-title">
          <span className="dot"></span>
          All Prediction Markets
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="pill green pulse-live" style={{ fontSize: '0.65rem' }}>LIVE</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            {markets.length} markets &middot; updates every 60s
          </span>
        </div>
      </div>

      <div className="grid-3" style={{ marginTop: '8px' }}>
        {display.map((market) => {
          const yesPercent = market.yesPrice != null ? Math.round(market.yesPrice * 100) : 50;
          const noPercent = market.noPrice != null ? Math.round(market.noPrice * 100) : 50;
          const volPct = market.volume != null ? Math.round((market.volume / maxVol) * 100) : 0;

          return (
            <a
              key={market.ticker}
              href="https://kalshi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="market-card"
            >
              <div>
                {market.category && (
                  <span className="market-card-category">{market.category}</span>
                )}
                <div className="market-card-title" style={{ marginTop: market.category ? '8px' : 0 }}>
                  {market.title}
                </div>
              </div>

              {/* Price row */}
              <div className="market-price-row">
                <div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                    Yes
                  </div>
                  <div className="market-yes-price mono">
                    {market.yesPrice != null ? `${yesPercent}\u00a2` : "--"}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                    No
                  </div>
                  <div className="market-no-price mono">
                    {market.noPrice != null ? `${noPercent}\u00a2` : "--"}
                  </div>
                </div>
              </div>

              {/* Yes/No bar */}
              <div className="market-bar-container">
                <div className="market-bar-yes" style={{ width: `${yesPercent}%` }} />
                <div className="market-bar-no" style={{ width: `${noPercent}%` }} />
              </div>

              {/* Volume as a bar */}
              <div className="market-meta">
                <span className="mono">
                  {market.volume != null ? `${market.volume.toLocaleString()} contracts` : ''}
                </span>
              </div>
              {market.volume != null && (
                <div className="market-volume-bar">
                  <div className="market-volume-fill" style={{ width: `${volPct}%` }} />
                </div>
              )}

              {/* CTA */}
              <div className="market-cta">
                Trade on Kalshi &rarr;
              </div>
            </a>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <a
          href="https://kalshi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ padding: '16px 48px', fontSize: '1rem' }}
        >
          Explore All Markets on Kalshi &rarr;
        </a>
        <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '12px' }}>
          Data sourced from Kalshi&apos;s public API. Prices update every 60 seconds. Not financial or betting advice.
        </p>
      </div>
    </section>
  );
}
