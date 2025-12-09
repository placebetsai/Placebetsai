"use client";

import { useEffect, useMemo, useState } from "react";

const GAME_LABELS = {
  poker: "Poker",
  slots: "Slots",
  blackjack: "Blackjack",
  baccarat: "Baccarat",
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [gameFilter, setGameFilter] = useState("all");
  const [upcomingOnly, setUpcomingOnly] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/tournaments");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setTournaments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load tournaments:", err);
        setNotice("Could not load live tournaments – showing backup list.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = [...tournaments];

    if (gameFilter !== "all") {
      list = list.filter(
        (t) => (t.gameType || "").toLowerCase() === gameFilter
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          (t.location || "").toLowerCase().includes(q) ||
          (t.casino || "").toLowerCase().includes(q)
      );
    }

    if (upcomingOnly) {
      list = list.filter((t) => {
        const d = new Date(t.date);
        if (Number.isNaN(d.getTime())) return true;
        return d >= new Date();
      });
    }

    list.sort((a, b) => {
      if (sortBy === "date") {
        const da = new Date(a.date);
        const db = new Date(b.date);
        if (Number.isNaN(da.getTime()) || Number.isNaN(db.getTime())) return 0;
        return da - db; // soonest first
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "buyin") {
        const parseBuyin = (val) => {
          if (!val) return 0;
          const n = val.replace(/[^0-9.]/g, "");
          return parseFloat(n || "0");
        };
        return parseBuyin(b.buyin) - parseBuyin(a.buyin); // high → low
      }
      return 0;
    });

    return list;
  }, [tournaments, search, sortBy, gameFilter, upcomingOnly]);

  const paginated = filtered.slice(0, page * perPage);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="page-wrap">
      <section style={{ marginBottom: "24px" }}>
        <h1>Live Tournaments & Events</h1>
        <p>
          Poker, slots, blackjack, and baccarat events worth traveling for. Always
          confirm details on the official site before you book flights.
        </p>
        {loading && (
          <p style={{ color: "#9ca3af" }}>Loading tournaments…</p>
        )}
        {!loading && notice && (
          <p style={{ color: "#facc15" }}>{notice}</p>
        )}
      </section>

      {/* Controls */}
      <section
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, location, casino, or game…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "230px",
            padding: "12px 14px",
            borderRadius: "12px",
            background: "#020617",
            border: "1px solid #1f2937",
            color: "#f9fafb",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
        <select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          style={{
            padding: "12px 14px",
            borderRadius: "12px",
            background: "#020617",
            border: "1px solid #1f2937",
            color: "#f9fafb",
            outline: "none",
          }}
        >
          <option value="all">All Games</option>
          <option value="poker">Poker</option>
          <option value="slots">Slots</option>
          <option value="blackjack">Blackjack</option>
          <option value="baccarat">Baccarat</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "12px 14px",
            borderRadius: "12px",
            background: "#020617",
            border: "1px solid #1f2937",
            color: "#f9fafb",
            outline: "none",
          }}
        >
          <option value="date">Sort by Date (Soonest)</option>
          <option value="name">Sort by Name (A–Z)</option>
          <option value="buyin">Sort by Buy-in (High → Low)</option>
        </select>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#f9fafb",
            fontSize: "0.95rem",
          }}
        >
          <input
            type="checkbox"
            checked={upcomingOnly}
            onChange={(e) => setUpcomingOnly(e.target.checked)}
            style={{
              accentColor: "var(--primary)",
            }}
          />
          Show upcoming only
        </label>
      </section>

      {/* Grid */}
      <section className="grid-3">
        {paginated.map((t) => (
          <div
            key={t.id}
            className="card"
            style={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              border: "1px solid #1f2937",
              background: "#020617",
            }}
          >
            {/* Image */}
            <div
              style={{
                height: "190px",
                width: "100%",
                overflow: "hidden",
                borderBottom: "1px solid #1f2937",
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>

            {/* Body */}
            <div
              style={{
                padding: "20px 20px 18px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    color: "#bbf7d0",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  {t.date || "Dates TBA"}
                </span>
                <span
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.9rem",
                  }}
                >
                  {t.location || "Location TBA"}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.35rem",
                  marginBottom: "4px",
                  color: "#f9fafb",
                }}
              >
                {t.name}
              </h3>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "0.9rem",
                  marginBottom: "10px",
                }}
              >
                {t.casino || ""}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <span
                  className="pill"
                  style={{ background: "#020617", color: "#e5e7eb" }}
                >
                  {GAME_LABELS[t.gameType] || "Tournament"}
                </span>
                {t.buyin && (
                  <span className="pill">Buy-in: {t.buyin}</span>
                )}
                <span className="pill green">
                  {t.guarantee || "Prize Pool TBA"}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                  flex: 1,
                  marginBottom: "16px",
                }}
              >
                {t.description}
              </p>

              <a
                href={t.link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "12px 0",
                  marginTop: "auto",
                }}
              >
                Official Schedule →
              </a>
            </div>
          </div>
        ))}

        {!loading && filtered.length === 0 && (
          <p style={{ color: "#9ca3af" }}>
            No tournaments match your filters. Loosen the search.
          </p>
        )}
      </section>

      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="btn btn-ghost"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
               }
