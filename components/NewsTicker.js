"use client";

import { useEffect, useMemo, useState } from "react";

const FALLBACK_NEWS = [
  {
    id: 1,
    title: "Live odds move fast – always shop the best number.",
    url: "https://www.actionnetwork.com",
    source: "Action Network",
  },
  {
    id: 2,
    title: "Bankroll management matters more than any one bet.",
    url: "https://www.espn.com",
    source: "ESPN",
  },
];

export default function NewsTicker() {
  const [items, setItems] = useState(FALLBACK_NEWS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setItems(data);
        }
      } catch (err) {
        console.error("Failed to load news:", err);
        // keep fallback
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // duplicate the list so the track loops smoothly
  const trackItems = useMemo(() => {
    const base = items.slice(0, 15);
    return [...base, ...base];
  }, [items]);

  if (!items.length) return null;

  return (
    <div className="news-ticker-wrapper">
      <div className="news-ticker-inner">
        <span className="news-label">
          {loading ? "Loading News…" : "Live Betting News"}
        </span>
        <div className="news-ticker">
          <div className="news-track">
            {trackItems.map((item, idx) => (
              <span key={`${item.id}-${idx}`} className="news-item">
                <a
                  className="news-link"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.source ? `${item.source}: ` : ""}
                  {item.title}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
