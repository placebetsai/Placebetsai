"use client";

import { useEffect, useMemo, useState } from "react";

// Real, simple links that won't 404
const FALLBACK_NEWS = [
  {
    id: 1,
    title: "ESPN: Live odds shift after late injuries shake up NFL lines.",
    url: "https://www.espn.com/nfl/",
  },
  {
    id: 2,
    title: "Action Network: How pros manage bankroll on long losing streaks.",
    url: "https://www.actionnetwork.com/",
  },
  {
    id: 3,
    title: "Covers: Books rolling out fresh signup bonuses for new users.",
    url: "https://www.covers.com/betting-news",
  },
  {
    id: 4,
    title: "VSiN: Live betting edges during primetime games.",
    url: "https://www.vsin.com/",
  },
];

export default function NewsTicker() {
  const [items, setItems] = useState(FALLBACK_NEWS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // later you can swap this to a real API fetch for headlines
  }, []);

  // Duplicate items for seamless loop
  const trackItems = useMemo(() => {
    return [...items, ...items];
  }, [items]);

  if (!mounted) return null;

  return (
    <div className="news-ticker-wrapper">
      <div className="news-label-pill">Live Betting News</div>
      <div className="news-ticker-inner">
        <div className="news-track">
          {trackItems.map((item, idx) => (
            <span key={`${item.id}-${idx}`} className="news-item">
              <span
                style={{
                  color: "#00e676",
                  marginRight: "8px",
                  fontSize: "1rem",
                }}
              >
                •
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#e5e7eb",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
