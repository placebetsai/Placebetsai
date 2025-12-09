"use client";

import { useEffect, useState } from "react";

export default function NewsTicker() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  async function loadNews() {
    try {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
      setError("");
    } catch (e) {
      console.error("News fetch failed:", e);
      setError("News feed unavailable");
    }
  }

  useEffect(() => {
    loadNews();
    const id = setInterval(loadNews, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(id);
  }, []);

  if (!items.length && !error) return null;

  return (
    <div className="news-ticker-wrapper">
      <div className="news-ticker-inner">
        <span className="news-label">LIVE ACTION</span>
        {error && (
          <span className="news-item">
            {error}
          </span>
        )}
        {!error &&
          items.map((item, idx) => (
            <span className="news-item" key={idx}>
              <a
                className="news-link"
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                [{item.source}] {item.title}
              </a>
              {" \u2022 "}
            </span>
          ))}
      </div>
    </div>
  );
}
