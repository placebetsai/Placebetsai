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
        <div className="pill green" style={{ display: "inline-block", marginBottom: "8px" }}>LIVE DATA</div>
        <h2 style={{ marginBottom: "8px" }}>Prediction Markets</h2>
        <p style={{ fontSize: "0.9rem", color: "#9ca3af", maxWidth: 560, margin: "0 auto" }}>
          Real-time prediction market prices from Kalshi. See what the market thinks will happen.
        </p>
      </div>

      <div className="grid-3" style={{ marginTop: "20px" }}>
        {markets.slice(0, 9).map((market) => (
          <div
            key={market.ticker}
            className="card"
            style={{
              borderColor: "#1f2937",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}>
                <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>Yes</span>
                <span style={{
                  color: "#22c55e",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}>
                  {market.yesPrice != null ? `${Math.round(market.yesPrice * 100)}c` : "--"}
                </span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>No</span>
                <span style={{
                  color: "#ef4444",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}>
                  {market.noPrice != null ? `${Math.round(market.noPrice * 100)}c` : "--"}
                </span>
              </div>

              {/* Volume */}
              {market.volume != null && (
                <p style={{ color: "#4b5563", fontSize: "0.7rem", marginTop: "8px", marginBottom: 0 }}>
                  Vol: {market.volume.toLocaleString()} contracts
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <a
          href="https://kalshi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{ fontSize: "0.85rem" }}
        >
          View All Markets on Kalshi →
        </a>
        <p style={{ fontSize: "0.68rem", color: "#4b5563", marginTop: "10px" }}>
          Data sourced from Kalshi's public API. Prices update in real-time. Not financial or betting advice.
        </p>
      </div>
    </section>
  );
}
