"use client";

import { useEffect, useState } from "react";

export default function NewsTicker() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          setErrorMsg("Live news unavailable.");
        }
      } catch (err) {
        console.error("News ticker error:", err);
        setErrorMsg("Live news unavailable.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="news-ticker-wrapper">
        <div className="news-ticker-inner">
          <span className="news-label">LIVE FEED</span>
          <span className="news-status">Loading latest headlines…</span>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="news-ticker-wrapper">
        <div className="news-ticker-inner">
          <span className="news-label">LIVE FEED</span>
          <span className="news-status">{errorMsg || "No headlines available."}</span>
        </div>
      </div>
    );
  }

  // Duplicate items to create seamless loop
  const loopItems = [...items, ...items];

  return (
    <div className="news-ticker-wrapper">
      <div className="news-ticker-inner">
        <span className="news-label">LIVE FEED</span>
        <div className="news-ticker-viewport">
          <div className="news-ticker-track">
            {loopItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="news-item"
              >
                <span className="news-source">{item.source}</span>
                <span className="news-title"> {item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
