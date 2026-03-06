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
    // don't poll — one load is enough for a sticky bar
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    setRunKey((k) => k + 1);
    setReady(true);
  }, []);

  const repeated = [...items, ...items];

  return (
    <div style={{ background: "#ff2020", width: "100%" }}>
      {/* Ticker row */}
      <div style={{ display: "flex", alignItems: "center", height: 44, overflow: "hidden" }}>
        {/* BREAKING label */}
        <div style={{ background: "#cc0000", height: "100%", display: "flex", alignItems: "center", padding: "0 14px", flexShrink: 0, zIndex: 2 }}>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 900, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>● BREAKING</span>
        </div>

        {/* Scrolling items */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <div
            key={runKey}
            style={{
              display: "inline-flex",
              whiteSpace: "nowrap",
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
                  fontSize: 15,
                  fontWeight: 800,
                  marginRight: 60,
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseOver={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseOut={e => e.currentTarget.style.textDecoration = "none"}
              >
                <span style={{ marginRight: 8, opacity: 0.7 }}>•</span>
                {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* "More news" link — right side, always visible */}
        <Link
          href="/news"
          style={{
            flexShrink: 0,
            background: "#cc0000",
            color: "#fff",
            fontSize: 12,
            fontWeight: 900,
            padding: "0 14px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            whiteSpace: "nowrap",
            letterSpacing: "0.04em",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
          }}
          onMouseOver={e => e.currentTarget.style.background = "#aa0000"}
          onMouseOut={e => e.currentTarget.style.background = "#cc0000"}
        >
          More News →
        </Link>
      </div>

      <style jsx global>{`
        @keyframes brkTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
