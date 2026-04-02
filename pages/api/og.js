// pages/api/og.js
// Dynamic OG image generation for social previews (WhatsApp, iMessage, Twitter, etc.)
import { ImageResponse } from "@vercel/og";

export const config = { runtime: "nodejs" };

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "IHateCollege.com";
  const sub = searchParams.get("sub") || "Skip Debt. Stack Cash. No Degree Needed.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #0c1a3d 50%, #020617 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top yellow bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#facc15", display: "flex" }} />

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(250,204,21,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          <span style={{ fontSize: "52px", fontWeight: 900, fontStyle: "italic", color: "#fff", letterSpacing: "-2px" }}>
            IHATECOLLEGE
          </span>
          <span
            style={{
              background: "#facc15",
              color: "#020617",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: 900,
              letterSpacing: "0px",
            }}
          >
            .COM
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? "38px" : "46px",
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            maxWidth: "960px",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          {sub}
        </div>

        {/* Bottom bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", background: "#facc15", display: "flex" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
