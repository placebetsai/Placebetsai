import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PlaceBets.ai - Live Sports Prediction Markets and Betting Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #22c55e, #38bdf8)",
              borderRadius: "12px",
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "#020617",
            }}
          >
            PB
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            PlaceBets.ai
          </span>
        </div>

        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            marginBottom: "40px",
          }}
        >
          Live Prediction Markets | +EV Calculators | Bankroll Tools
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "12px",
              padding: "16px 28px",
              color: "#22c55e",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Real-Time Kalshi Data
          </div>
          <div
            style={{
              background: "rgba(56, 189, 248, 0.15)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "12px",
              padding: "16px 28px",
              color: "#38bdf8",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Sharp Betting Tools
          </div>
          <div
            style={{
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: "12px",
              padding: "16px 28px",
              color: "#a855f7",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Tournament Intel
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
