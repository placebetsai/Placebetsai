"use client";

import { useEffect, useMemo, useState } from "react";

// Tournament + betting news feed. Mix of evergreen tournaments + industry news.
const FEED = [
  { id: "t1", cat: "TOURNAMENT", title: "WSOP Main Event 2026 — Jun 28 – Jul 16 • $15M guarantee", url: "https://www.wsop.com/" },
  { id: "t2", cat: "TOURNAMENT", title: "NBA Finals 2026 — odds live at Kalshi, DraftKings, FanDuel", url: "https://www.nba.com/playoffs" },
  { id: "t3", cat: "TOURNAMENT", title: "FIFA World Cup 2026 — 48 teams, Jun 11 – Jul 19", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
  { id: "t4", cat: "TOURNAMENT", title: "Valorant Champions 2026 — $2M prize pool, Aug 2 – 24", url: "https://valorantesports.com" },
  { id: "t5", cat: "TOURNAMENT", title: "US Open Tennis — Aug 25 – Sep 7 • $65M total purse", url: "https://www.usopen.org" },
  { id: "n1", cat: "NEWS",       title: "ESPN: Live odds shift as late injuries reshape NFL lines", url: "https://www.espn.com/nfl/" },
  { id: "n2", cat: "NEWS",       title: "Action Network: How pros manage bankroll on losing streaks", url: "https://www.actionnetwork.com/" },
  { id: "n3", cat: "NEWS",       title: "Covers: Fresh signup bonuses rolling out for new users", url: "https://www.covers.com/betting-news" },
  { id: "n4", cat: "NEWS",       title: "VSiN: Live betting edges during primetime slots", url: "https://www.vsin.com/" },
  { id: "n5", cat: "MARKET",     title: "Kalshi markets now pricing 2026 election & sports contracts", url: "https://kalshi.com" },
];

export default function NewsTicker() {
  const [mounted, setMounted] = useState(false);
  const [pausedMobile, setPausedMobile] = useState(false);

  useEffect(() => setMounted(true), []);

  // Duplicate once for seamless loop — memoized
  const trackItems = useMemo(() => [...FEED, ...FEED], []);

  if (!mounted) return null;

  return (
    <div className="pb-ticker" aria-label="Live tournament and betting news">
      <div className="pb-ticker__label" aria-hidden="true">LIVE</div>
      <div className="pb-ticker__viewport" onClick={() => setPausedMobile((p) => !p)}>
        <div className={`pb-ticker__track ${pausedMobile ? "is-paused" : ""}`}>
          {trackItems.map((it, i) => (
            <a
              key={`${it.id}-${i}`}
              href={it.url}
              target="_blank"
              rel="noreferrer"
              className="pb-ticker__item"
              onClick={(e) => e.stopPropagation()}
            >
              <span className={`pb-ticker__cat pb-ticker__cat--${it.cat.toLowerCase()}`}>{it.cat}</span>
              <span className="pb-ticker__text">{it.title}</span>
              <span className="pb-ticker__dot" aria-hidden="true">•</span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pb-ticker {
          display: flex;
          align-items: stretch;
          width: 100%;
          background: #0a0e17;
          border-bottom: 1px solid #151d2e;
          font-family: var(--font-main, 'Inter', system-ui, sans-serif);
          position: sticky;
          top: 0;
          z-index: 50;
          overflow: hidden;
        }
        .pb-ticker__label {
          flex-shrink: 0;
          padding: 0 14px;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #ff3d57 0%, #ff6b6b 100%);
          color: #fff;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 2.5px;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
        }
        .pb-ticker__viewport {
          flex: 1;
          overflow: hidden;
          cursor: pointer;
          mask-image: linear-gradient(to right, transparent, #000 60px, #000 calc(100% - 60px), transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 60px, #000 calc(100% - 60px), transparent);
        }
        .pb-ticker__track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          padding: 10px 0;
          animation: pb-scroll 65s linear infinite;
          will-change: transform;
        }
        .pb-ticker__track.is-paused,
        .pb-ticker__viewport:hover .pb-ticker__track {
          animation-play-state: paused;
        }
        .pb-ticker__item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 18px;
          color: #f0f2f5;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: color 0.15s ease;
        }
        .pb-ticker__item:hover { color: #34d399; }
        .pb-ticker__cat {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 2px 6px;
          border-radius: 2px;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          flex-shrink: 0;
        }
        .pb-ticker__cat--tournament { color: #fbbf24; background: rgba(251, 191, 36, 0.1); }
        .pb-ticker__cat--news       { color: #38bdf8; background: rgba(56, 189, 248, 0.1); }
        .pb-ticker__cat--market     { color: #34d399; background: rgba(52, 211, 153, 0.1); }
        .pb-ticker__text { letter-spacing: 0.2px; }
        .pb-ticker__dot { color: #34d399; font-weight: 700; margin-left: 4px; }
        @keyframes pb-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pb-ticker__track { animation: none; }
        }
        @media (max-width: 640px) {
          .pb-ticker__label { padding: 0 10px; font-size: 10px; letter-spacing: 1.5px; }
          .pb-ticker__item { font-size: 12px; padding: 0 12px; gap: 8px; }
          .pb-ticker__cat { font-size: 9px; padding: 2px 5px; }
        }
      `}</style>
    </div>
  );
}
