"use client";

import { useEffect, useState } from "react";

export default function KalshiMarkets({ initialMarkets = [] }) {
  const [markets, setMarkets] = useState(initialMarkets);
  const [loading, setLoading] = useState(initialMarkets.length === 0);
  const [error, setError] = useState("");

  useEffect(() => {
    // If we already have server-side data, skip the client fetch
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
    // Refresh every 60 seconds
    const interval = setInterval(fetchMarkets, 60000);
    return () => clearInterval(interval);
  }, [initialMarkets]);

  if (loading) {
    return (
      <section style={{ marginTop: "40px", marginBottom: "40px" }}>
        <h2 className="text-center" style={{ marginBottom: "10px" }}>
          Live Prediction Markets
        </h2>
        <p className="text-center" style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          Loading markets from Kalshi...
        </p>
      </section>
    );
  }

  if (error || markets.length === 0) {
    return (
      <section style={{ marginTop: "40px", marginBottom: "40px" }}>
        <h2 className="text-center" style={{ marginBottom: "10px" }}>
          Live Prediction Markets
        </h2>
        <p className="text-center" style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          {error || "No active sports prediction markets right now. Check back soon."}
        </p>
      </section>
    );
  }

  return (
    <section style={{ marginTop: "40px", marginBottom: "40px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          className="pill green pulse-live"
          style={{ display: "inline-block", marginBottom: "8px" }}
        >
          LIVE DATA
        </div>
        <h2 style={{ marginBottom: "8px" }}>Prediction Markets</h2>
        <p style={{ fontSize: "0.9rem", color: "#9ca3af", maxWidth: 560, margin: "0 auto" }}>
          Real-time prediction market prices from Kalshi. See what the market thinks will happen.
        </p>
      </div>

      <div className="grid-3" style={{ marginTop: "20px" }}>
        {markets.slice(0, 9).map((market) => {
          const yesPercent = market.yesPrice != null ? Math.round(market.yesPrice * 100) : 50;
          const noPercent = market.noPrice != null ? Math.round(market.noPrice * 100) : 50;

          return (
            <a
              key={market.ticker}
              href={`https://kalshi.com/markets/${market.ticker}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                borderColor: "#1f2937",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <div>
                <p style={{
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "8px",
                  fontSize: "0.9rem",
                  lineHeight: 1.3,
                }}>
                  {market.title}
                </p>
                {market.category && (
                  <span
                    className="pill"
                    style={{
                      fontSize: "0.65rem",
                      marginBottom: "8px",
                      display: "inline-block",
                    }}
                  >
                    {market.category}
                  </span>
                )}
              </div>

              <div style={{ marginTop: "12px" }}>
                {/* Prominent Yes price */}
                <div style={{
                  textAlign: "center",
                  marginBottom: "12px",
                }}>
                  <span style={{ color: "#9ca3af", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Yes Price</span>
                  <div style={{
                    color: "#00e676",
                    fontWeight: 800,
                    fontSize: "2rem",
                    lineHeight: 1.1,
                  }}>
                    {market.yesPrice != null ? `${yesPercent}\u00a2` : "--"}
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{
                  display: "flex",
                  height: "8px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginBottom: "8px",
                  background: "#1f2937",
                }}>
                  <div style={{
                    width: `${yesPercent}%`,
                    background: "linear-gradient(90deg, #00e676, #22c55e)",
                    borderRadius: "4px 0 0 4px",
                    transition: "width 0.5s ease",
                  }} />
                  <div style={{
                    width: `${noPercent}%`,
                    background: "linear-gradient(90deg, #ef4444, #dc2626)",
                    borderRadius: "0 4px 4px 0",
                    transition: "width 0.5s ease",
                  }} />
                </div>

                {/* Yes / No labels under bar */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "4px",
                }}>
                  <span style={{ color: "#22c55e", fontSize: "0.8rem", fontWeight: 600 }}>
                    Yes {yesPercent}c
                  </span>
                  <span style={{ color: "#ef4444", fontSize: "0.8rem", fontWeight: 600 }}>
                    No {noPercent}c
                  </span>
                </div>

                {/* Volume */}
                {market.volume != null && (
                  <p style={{ color: "#4b5563", fontSize: "0.7rem", marginTop: "8px", marginBottom: 0 }}>
                    Vol: {market.volume.toLocaleString()} contracts
                  </p>
                )}
              </div>
            </a>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <a
          href="https://kalshi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            fontSize: "1.1rem",
            padding: "18px 36px",
          }}
        >
          View All Markets on Kalshi &rarr;
        </a>
        <p style={{ fontSize: "0.68rem", color: "#4b5563", marginTop: "10px" }}>
          Data sourced from Kalshi&apos;s public API. Prices update in real-time. Not financial or betting advice.
        </p>
      </div>
    </section>
  );
}
