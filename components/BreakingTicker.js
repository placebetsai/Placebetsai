import { useEffect, useState } from "react";
import Link from "next/link";

function decodeEntities(s = "") {
  return String(s)
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => { try { return String.fromCodePoint(+n); } catch { return _; } })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => { try { return String.fromCodePoint(parseInt(h, 16)); } catch { return _; } });
}

const FALLBACK = [
  { title: "Student loan debt hits $1.77 TRILLION — up $2,800 every second", link: "/news" },
  { title: "Plumbers now out-earn most college graduates in 32 states", link: "/news" },
  { title: "Gen Z chooses trades over tuition at record rates in 2025", link: "/news" },
  { title: "53% of recent college graduates are underemployed", link: "/news" },
  { title: "Electricians in NYC average $115,000/year with NO degree", link: "/news" },
  { title: "HVAC techs earning more than nurses in 16 states", link: "/news" },
  { title: "Welders in Texas making $95/hour — shortage now critical", link: "/news" },
  { title: "The college premium is shrinking. The debt is not.", link: "/news" },
];

export default function BreakingTicker() {
  const [items, setItems] = useState(FALLBACK);
  const [runKey, setRunKey] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/news?nocache=1", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!alive) return;
        const list = (data?.items || []).slice(0, 16).map((it) => ({
          title: decodeEntities(it.title || ""),
          link: it.link || "/news",
        }));
        if (list.length > 0) {
          setItems(list);
          setReady(false);
          requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!alive) return;
            setRunKey((k) => k + 1);
            setReady(true);
          }));
        }
      } catch {}
    }
    load();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    setRunKey((k) => k + 1);
    setReady(true);
  }, []);

  const repeated = [...items, ...items];

  return (
    <div style={{ background: "#e80000", width: "100%" }}>

      {/* ── MOBILE: BREAKING label on its own top row ── */}
      <div className="brk-mobile-label" style={{
        background: "linear-gradient(90deg, #900 0%, #c00 100%)",
        padding: "5px 14px",
        display: "none",
        alignItems: "center",
        gap: 8,
        borderBottom: "1px solid rgba(0,0,0,0.2)",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          <span className="brk-dot" />
          BREAKING NEWS
        </span>
        <Link href="/news" style={{ marginLeft: "auto", color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap" }}>More →</Link>
      </div>

      {/* ── DESKTOP ticker row ── */}
      <div style={{ display: "flex", alignItems: "stretch", height: 42, overflow: "hidden" }}>

        {/* BREAKING badge */}
        <div className="brk-desktop-label" style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 18px 0 16px",
          background: "linear-gradient(90deg, #7a0000 0%, #b00 60%, #cc0000 100%)",
          borderRight: "none",
          position: "relative",
          zIndex: 3,
        }}>
          <span className="brk-dot" />
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Breaking
          </span>
          {/* right-pointing chevron shape */}
          <div style={{
            position: "absolute",
            right: -12,
            top: 0,
            bottom: 0,
            width: 24,
            background: "linear-gradient(90deg, #cc0000 0%, #e80000 100%)",
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            zIndex: 4,
          }} />
        </div>

        {/* Scrolling text — with fade overlays */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative", paddingLeft: 18 }}>

          {/* Left fade: headlines emerge from BREAKING */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 72,
            background: "linear-gradient(to right, #e80000 0%, rgba(232,0,0,0) 100%)",
            zIndex: 2, pointerEvents: "none",
          }} />

          {/* Right fade: headlines dissolve before More News */}
          <div className="brk-fade-right" style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
            background: "linear-gradient(to left, #e80000 0%, rgba(232,0,0,0) 100%)",
            zIndex: 2, pointerEvents: "none",
          }} />

          {/* Scrolling headlines */}
          <div
            key={runKey}
            style={{
              display: "inline-flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              height: "100%",
              animation: ready ? "brkTicker 70s linear infinite" : "none",
            }}
          >
            {repeated.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel={item.link.startsWith("http") ? "noreferrer" : undefined}
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  marginRight: 64,
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  letterSpacing: "0.01em",
                }}
                onMouseOver={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseOut={e => e.currentTarget.style.textDecoration = "none"}
              >
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 10 }}>◆</span>
                {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* More News — desktop */}
        <Link
          href="/news"
          className="brk-desktop-label"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            background: "linear-gradient(90deg, #e80000 0%, #aa0000 100%)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 900,
            textDecoration: "none",
            whiteSpace: "nowrap",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderLeft: "1px solid rgba(255,255,255,0.15)",
            gap: 5,
          }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
          onMouseOut={e => e.currentTarget.style.opacity = "1"}
        >
          More News <span style={{ fontSize: 14 }}>›</span>
        </Link>
      </div>

      <style jsx global>{`
        @keyframes brkTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes brkPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
        .brk-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #fff;
          flex-shrink: 0;
          animation: brkPulse 1.4s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .brk-mobile-label { display: flex !important; }
          .brk-desktop-label { display: none !important; }
          .brk-fade-right { display: none !important; }
        }
      `}</style>
    </div>
  );
}
