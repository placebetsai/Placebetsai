"use client";

import { useEffect, useMemo, useState } from "react";

const FALLBACK_NEWS = [
  {
    id: 1,
    title: "Live odds shift fast – always shop the best number.",
    url: "#",
  },
  {
    id: 2,
    title: "Don’t chase losses. Stick to your bankroll strategy.",
    url: "#",
  },
  {
    id: 3,
    title: "Books are rolling out fresh bonuses for new users.",
    url: "#",
  },
];

export default function NewsTicker() {
  const [items, setItems] = useState(FALLBACK_NEWS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // later: fetch real RSS / API here, then setItems(...)
  }, []);

  const trackItems = useMemo(
    () => [...items, ...items, ...items],
    [items]
  );

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
                  color: "#22c55e",
                  marginRight: "8px",
                  fontWeight: 700,
                }}
              >
                •
              </span>
              {item.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
