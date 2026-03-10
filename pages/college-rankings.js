// pages/college-rankings.js
import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

// Liberal / Conservative lean by school name
const SCHOOL_LEAN = {
  "Brown University": "Very Liberal", "UC Berkeley": "Very Liberal",
  "Oberlin College": "Very Liberal", "Reed College": "Very Liberal",
  "Swarthmore College": "Very Liberal", "Wesleyan University": "Very Liberal",
  "Macalester College": "Very Liberal", "Evergreen State College": "Very Liberal",
  "Hampshire College": "Very Liberal", "Antioch College": "Very Liberal",
  "Bard College": "Very Liberal", "Sarah Lawrence College": "Very Liberal",
  "Vassar College": "Very Liberal", "Smith College": "Very Liberal",
  "Wellesley College": "Very Liberal", "Mount Holyoke College": "Very Liberal",
  "Bryn Mawr College": "Very Liberal", "Bennington College": "Very Liberal",
  "Haverford College": "Very Liberal", "Lewis & Clark College": "Very Liberal",
  "SUNY Purchase": "Very Liberal", "Pitzer College": "Very Liberal",
  "New College of Florida": "Very Liberal", "UC Santa Cruz": "Very Liberal",
  "The New School": "Very Liberal", "Whitman College": "Very Liberal",
  "Warren Wilson College": "Very Liberal", "Grinnell College": "Very Liberal",
  "Colorado College": "Very Liberal", "Knox College": "Very Liberal",
  "Earlham College": "Very Liberal", "Goddard College": "Very Liberal",
  "Barnard College": "Very Liberal", "Occidental College": "Very Liberal",
  "Harvard University": "Liberal", "MIT": "Liberal",
  "Stanford University": "Liberal", "Yale University": "Liberal",
  "Princeton University": "Liberal", "Columbia University": "Liberal",
  "University of Pennsylvania": "Liberal", "Dartmouth College": "Liberal",
  "Duke University": "Liberal", "Northwestern University": "Liberal",
  "Georgetown University": "Liberal", "Emory University": "Liberal",
  "Tufts University": "Liberal", "University of Southern California": "Liberal",
  "Boston University": "Liberal", "Northeastern University": "Liberal",
  "New York University": "Liberal", "UCLA": "Liberal",
  "University of Michigan": "Liberal", "UC San Diego": "Liberal",
  "UC Santa Barbara": "Liberal", "UC Davis": "Liberal",
  "University of California-Irvine": "Liberal",
  "University of Illinois Urbana-Champaign": "Liberal",
  "University of Wisconsin-Madison": "Liberal", "University of Washington": "Liberal",
  "University of Maryland-College Park": "Liberal",
  "Rutgers University-New Brunswick": "Liberal",
  "University of Minnesota-Twin Cities": "Liberal",
  "University of Colorado Boulder": "Liberal", "University of Oregon": "Liberal",
  "Johns Hopkins University": "Liberal", "American University": "Liberal",
  "Fordham University": "Liberal", "Howard University": "Liberal",
  "Ithaca College": "Liberal", "Portland State University": "Liberal",
  "Spelman College": "Liberal", "Morehouse College": "Liberal",
  "San Francisco State University": "Liberal", "UMass Amherst": "Liberal",
  "University of Vermont": "Liberal", "University of Maryland": "Liberal",
  "Rutgers University": "Liberal", "University of Minnesota": "Liberal",
  "Carnegie Mellon University": "Moderate", "Washington University in St Louis": "Moderate",
  "Vanderbilt University": "Moderate", "Wake Forest University": "Moderate",
  "Tulane University": "Moderate", "Rensselaer Polytechnic Institute": "Moderate",
  "Georgia Institute of Technology-Main Campus": "Moderate",
  "University of Virginia-Main Campus": "Moderate",
  "Purdue University-Main Campus": "Moderate", "Ohio State University-Main Campus": "Moderate",
  "Pennsylvania State University-Main Campus": "Moderate",
  "Michigan State University": "Moderate", "University of Florida": "Moderate",
  "Florida State University": "Moderate", "Indiana University-Bloomington": "Moderate",
  "Arizona State University-Tempe": "Moderate", "University of Arizona": "Moderate",
  "Virginia Polytechnic Institute and State University": "Moderate",
  "North Carolina State University at Raleigh": "Moderate",
  "University of Pittsburgh-Pittsburgh Campus": "Moderate",
  "University of Notre Dame": "Moderate", "University of Missouri-Columbia": "Moderate",
  "University of Kansas": "Moderate", "George Mason University": "Moderate",
  "Iowa State University": "Moderate", "Colorado State University-Fort Collins": "Moderate",
  "Southern Methodist University": "Moderate", "Texas Christian University": "Moderate",
  "Case Western Reserve University": "Moderate", "University of Chicago": "Moderate",
  "University of Miami": "Moderate", "Boston College": "Moderate",
  "University of Kentucky": "Moderate",
  "Georgia Tech": "Moderate", "Virginia Tech": "Moderate",
  "NC State University": "Moderate", "Penn State University": "Moderate",
  "Indiana University": "Moderate", "Notre Dame University": "Moderate",
  "Washington Univ in St. Louis": "Moderate", "Notre Dame": "Moderate",
  "Texas A&M University-College Station": "Conservative",
  "Clemson University": "Conservative", "Auburn University": "Conservative",
  "University of Alabama": "Conservative", "Louisiana State University": "Conservative",
  "University of Tennessee": "Conservative",
  "University of Nebraska-Lincoln": "Conservative",
  "Mississippi State University": "Conservative",
  "Oklahoma State University-Main Campus": "Conservative",
  "University of Arkansas": "Conservative", "Baylor University": "Conservative",
  "Texas A&M University": "Conservative", "Pepperdine University": "Conservative",
  "University of Georgia": "Conservative", "University of Oklahoma": "Conservative",
  "University of South Carolina-Columbia": "Conservative",
  "University of Mississippi": "Conservative", "University of Utah": "Conservative",
  "Wheaton College": "Conservative", "Brigham Young University-Provo": "Conservative",
  "Samford University": "Conservative", "Benedictine College": "Conservative",
  "Liberty University": "Very Conservative", "Bob Jones University": "Very Conservative",
  "Oral Roberts University": "Very Conservative", "Patrick Henry College": "Very Conservative",
  "Regent University": "Very Conservative", "Thomas Aquinas College": "Very Conservative",
  "Christendom College": "Very Conservative", "Ave Maria University": "Very Conservative",
  "Franciscan University of Steubenville": "Very Conservative",
  "Dallas Baptist University": "Very Conservative", "Lee University": "Very Conservative",
  "Cedarville University": "Very Conservative", "Grove City College": "Very Conservative",
  "Gordon College": "Very Conservative", "Hillsdale College": "Very Conservative",
  "Belmont Abbey College": "Very Conservative", "Union University": "Very Conservative",
  "University of Dallas": "Very Conservative", "Wyoming Catholic College": "Very Conservative",
};

const LEAN_COLORS = {
  "Very Liberal":      { color: "#60a5fa", bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.35)"  },
  "Liberal":           { color: "#7dd3fc", bg: "rgba(14,165,233,0.12)",  border: "rgba(14,165,233,0.3)"   },
  "Moderate":          { color: "#94a3b8", bg: "rgba(100,116,139,0.15)", border: "rgba(100,116,139,0.35)" },
  "Conservative":      { color: "#fb923c", bg: "rgba(249,115,22,0.15)",  border: "rgba(249,115,22,0.35)"  },
  "Very Conservative": { color: "#f87171", bg: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.35)"   },
};

const LEAN_OPTIONS = ["All", "Very Liberal", "Liberal", "Moderate", "Conservative", "Very Conservative"];

function verdict(debt, earnings) {
  if (!debt || !earnings) return null;
  const months = debt / (earnings / 12);
  if (months < 5)  return { label: "Great Value",  color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" };
  if (months < 10) return { label: "Questionable", color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)"  };
  return           { label: "Debt Trap",     color: "#ff2020",  bg: "rgba(255,32,32,0.12)",   border: "rgba(255,32,32,0.3)"   };
}

const TYPE_COLORS = {
  "Private":    { color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  "Public":     { color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  "Community":  { color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  "For-Profit": { color: "#ff2020", bg: "rgba(255,32,32,0.12)"  },
  "Other":      { color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
};

function numVal(str) {
  if (!str) return 0;
  return parseInt(String(str).replace(/[^0-9]/g, "")) || 0;
}

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}
          onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          style={{ cursor: "pointer", fontSize: 22, color: n <= (hover || value) ? "#f59e0b" : "#333", transition: "color 0.1s" }}>
          ★
        </span>
      ))}
    </div>
  );
}

const STORAGE_KEY = "ihc_ratings_v1";
const PAGE_SIZE = 100;

export default function CollegeRankings({ colleges }) {
  const [query, setQuery]   = useState("");
  const [sortBy, setSortBy] = useState("earnings");
  const [typeFilter, setTypeFilter] = useState("All");
  const [leanFilter, setLeanFilter] = useState("All");
  const [page, setPage]     = useState(1);
  const [ratings, setRatings]       = useState({});
  const [expanded, setExpanded]     = useState(null);
  const [draftRating, setDraftRating]   = useState(0);
  const [draftComment, setDraftComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setRatings(saved);
    } catch {}
  }, []);

  function openRating(school) {
    const existing = ratings[school.id];
    setDraftRating(existing?.rating || 0);
    setDraftComment(existing?.comment || "");
    setExpanded(expanded === school.id ? null : school.id);
  }

  async function submitRating(school) {
    if (!draftRating) return;
    setSubmitting(true);
    const entry = { rating: draftRating, comment: draftComment.trim(), date: new Date().toLocaleDateString() };
    const updated = { ...ratings, [school.id]: entry };
    setRatings(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    try {
      await fetch("/api/submit-rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId: school.id, schoolName: school.name, ...entry }),
      });
    } catch {}
    setExpanded(null);
    setSubmitting(false);
  }

  const types = ["All", "Public", "Private", "Community", "For-Profit"];

  const filtered = (colleges || [])
    .map((s) => ({ ...s, lean: SCHOOL_LEAN[s.name] || null }))
    .filter((s) => {
      if (typeFilter !== "All" && s.type !== typeFilter) return false;
      if (leanFilter !== "All" && s.lean !== leanFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return s.name.toLowerCase().includes(q) ||
             (s.state || "").toLowerCase().includes(q) ||
             (s.city || "").toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === "earnings") return numVal(b.earnings) - numVal(a.earnings);
      if (sortBy === "debt")     return numVal(a.debt)     - numVal(b.debt);
      if (sortBy === "cost")     return numVal(a.cost)     - numVal(b.cost);
      return a.name.localeCompare(b.name);
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(0, page * PAGE_SIZE);

  // Reset to page 1 on filter/sort change
  const resetPage = () => setPage(1);

  return (
    <Layout>
      <SEO
        title="College Rankings — Real Cost, Debt & Earnings | IHateCollege.com"
        description={`${(colleges || []).length}+ colleges ranked by real cost, average student debt, and what graduates earn. Government data, no spin.`}
      />

      {/* HERO */}
      <section style={{ background: "#050505", borderBottom: "1px solid #1a1a1a", padding: "56px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Government Data · No Spin</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 14 }}>
            Is Your College a <span style={{ color: "#ff2020" }}>Debt Trap?</span>
          </h1>
          <p style={{ color: "#ccc", fontSize: 16, marginBottom: 32, maxWidth: 540, margin: "0 auto 32px" }}>
            Every U.S. college ranked by real cost, average debt, and median earnings 10 years out.
          </p>

          {/* Search */}
          <div style={{ display: "flex", gap: 10, maxWidth: 560, margin: "0 auto 20px" }}>
            <input
              type="text" value={query}
              onChange={(e) => { setQuery(e.target.value); resetPage(); }}
              placeholder="Search any college by name, city, or state..."
              style={{ flex: 1, padding: "13px 16px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none" }}
            />
            {query && (
              <button onClick={() => { setQuery(""); resetPage(); }}
                style={{ padding: "13px 18px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, color: "#888", cursor: "pointer", fontSize: 14 }}>
                Clear
              </button>
            )}
          </div>

          {/* Quick searches */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {["Hofstra", "Adelphi", "Harvard", "NYU", "Florida State", "DeVry", "UCLA", "Liberty"].map((s) => (
              <button key={s} onClick={() => { setQuery(s); resetPage(); }}
                style={{ padding: "5px 12px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 999, color: "#888", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Legend */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 0", display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[
          { label: "Great Value", color: "#34d399", desc: "Debt paid off in <5 months of earnings" },
          { label: "Questionable", color: "#fbbf24", desc: "5–10 months to pay off debt" },
          { label: "Debt Trap", color: "#ff6060", desc: "10+ months of earnings to break even" },
        ].map((v) => (
          <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: v.color, flexShrink: 0 }} />
            <span style={{ color: v.color, fontWeight: 800 }}>{v.label}</span>
            <span style={{ color: "#ccc" }}>{v.desc}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="rank-controls" style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        {/* Type filter */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "#aaa", fontSize: 12, fontWeight: 700 }}>Type:</span>
          {types.map((t) => (
            <button key={t} onClick={() => { setTypeFilter(t); resetPage(); }}
              style={{ padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: "pointer", border: "1px solid", borderColor: typeFilter === t ? "#ff2020" : "#333", background: typeFilter === t ? "#ff2020" : "#1a1a1a", color: typeFilter === t ? "#fff" : "#ddd" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Lean filter */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "#aaa", fontSize: 12, fontWeight: 700 }}>Politics:</span>
          {LEAN_OPTIONS.map((l) => {
            const lc = l !== "All" ? LEAN_COLORS[l] : null;
            const isActive = leanFilter === l;
            return (
              <button key={l} onClick={() => { setLeanFilter(l); resetPage(); }}
                style={{
                  padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: "pointer", border: "1px solid",
                  borderColor: isActive ? (lc?.color || "#888") : "#333",
                  background: isActive ? (lc?.bg || "#1a1a1a") : "#1a1a1a",
                  color: isActive ? (lc?.color || "#fff") : "#ddd",
                }}>
                {l === "All" ? "Any Lean" : l}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ color: "#aaa", fontSize: 12, fontWeight: 700 }}>Sort:</span>
          {[["earnings", "10yr Earnings"], ["debt", "Lowest Debt"], ["cost", "Lowest Cost"], ["name", "A–Z"]].map(([k, l]) => (
            <button key={k} onClick={() => { setSortBy(k); resetPage(); }}
              style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: "pointer", border: "1px solid", borderColor: sortBy === k ? "#ff2020" : "#2a2a2a", background: sortBy === k ? "#ff2020" : "#111", color: sortBy === k ? "#fff" : "#ccc" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 60px" }}>
        <p style={{ color: "#aaa", fontSize: 12, marginBottom: 12 }}>
          Showing <strong style={{ color: "#fff" }}>{Math.min(visible.length, filtered.length)}</strong> of <strong style={{ color: "#fff" }}>{filtered.length.toLocaleString()}</strong> schools
          {typeFilter !== "All" && <> · Type: <strong style={{ color: "#fff" }}>{typeFilter}</strong></>}
          {leanFilter !== "All" && <> · Politics: <strong style={{ color: LEAN_COLORS[leanFilter]?.color }}>{leanFilter}</strong></>}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {visible.map((school, i) => {
            const debtNum = numVal(school.debt);
            const earnNum = numVal(school.earnings);
            const v = verdict(debtNum, earnNum);
            const tc = TYPE_COLORS[school.type] || TYPE_COLORS["Other"];
            const slug = school.slug || school.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            const userRating = ratings[school.id];
            const isOpen = expanded === school.id;
            const lean = school.lean;
            const lc = lean ? LEAN_COLORS[lean] : null;

            return (
              <div key={school.id || i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #2a2a2a", background: "#141414" }}
                onMouseOver={e => e.currentTarget.style.borderColor = "#ff2020"}
                onMouseOut={e => e.currentTarget.style.borderColor = "#2a2a2a"}>
                <div className="rank-card-row" style={{ display: "flex", alignItems: "center" }}>
                  <Link href={`/college/${slug}`} className="rank-card-link" style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", textDecoration: "none", minWidth: 0 }}>
                    <div style={{ color: "#888", fontSize: 13, fontWeight: 900, minWidth: 32, textAlign: "right", flexShrink: 0 }}>#{i + 1}</div>
                    <div className="rank-card-info" style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "#fff", fontSize: 15, fontWeight: 900, marginBottom: 4 }}>{school.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                        <span style={{ color: "#bbb", fontSize: 12 }}>{[school.city, school.state].filter(Boolean).join(", ")}</span>
                        <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: 4, background: tc.bg, color: tc.color }}>{school.type}</span>
                        {lc && (
                          <span style={{ fontSize: 10, fontWeight: 900, padding: "2px 6px", borderRadius: 4, background: lc.bg, color: lc.color, border: `1px solid ${lc.border}`, whiteSpace: "nowrap" }}>
                            {lean}
                          </span>
                        )}
                        {v && <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: 4, background: v.bg, color: v.color, border: `1px solid ${v.border}` }}>{v.label}</span>}
                        {userRating && (
                          <span style={{ fontSize: 10, fontWeight: 900, padding: "2px 6px", borderRadius: 4, background: "rgba(245,158,11,0.2)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.4)" }}>★ RATED</span>
                        )}
                      </div>
                    </div>
                    <div className="rank-card-stats" style={{ display: "flex", gap: 18, flexShrink: 0, textAlign: "right" }}>
                      <div>
                        <div style={{ color: "#aaa", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Cost/yr</div>
                        <div style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>{school.cost || "N/A"}</div>
                      </div>
                      <div>
                        <div style={{ color: "#aaa", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Debt</div>
                        <div style={{ color: "#ff6060", fontSize: 14, fontWeight: 900 }}>{school.debt || "N/A"}</div>
                      </div>
                      <div className="hidden-mobile">
                        <div style={{ color: "#aaa", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>10yr Earn</div>
                        <div style={{ color: "#34d399", fontSize: 14, fontWeight: 900 }}>{school.earnings || "N/A"}</div>
                      </div>
                    </div>
                  </Link>
                  <div className="rank-card-rate" style={{ padding: "0 12px", flexShrink: 0 }}>
                    <button onClick={() => openRating(school)}
                      style={{ padding: "6px 12px", background: isOpen ? "#ff2020" : "#1a1a1a", border: "1px solid", borderColor: isOpen ? "#ff2020" : "#333", borderRadius: 8, color: isOpen ? "#fff" : "#ccc", fontSize: 11, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
                      {isOpen ? "✕" : "Rate ↓"}
                    </button>
                  </div>
                </div>

                {userRating && !isOpen && (
                  <div style={{ borderTop: "1px solid #222", padding: "12px 20px 14px", background: "#0f0f0f" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 4, background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }}>USER RATING</span>
                      <span style={{ color: "#f59e0b", fontSize: 16, fontWeight: 900 }}>{"★".repeat(userRating.rating)}{"☆".repeat(5 - userRating.rating)}</span>
                      <span style={{ color: "#aaa", fontWeight: 700, fontSize: 11 }}>{userRating.rating}/5 · {userRating.date}</span>
                    </div>
                    {userRating.comment && <p style={{ color: "#ccc", fontSize: 13, margin: "4px 0 0", lineHeight: 1.5 }}>&ldquo;{userRating.comment}&rdquo;</p>}
                  </div>
                )}

                {isOpen && (
                  <div style={{ borderTop: "1px solid #222", padding: "20px", background: "#0f0f0f" }}>
                    <p style={{ color: "#ccc", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                      Rate {school.name}
                    </p>
                    <div style={{ marginBottom: 12 }}>
                      <StarPicker value={draftRating} onChange={setDraftRating} />
                    </div>
                    <textarea value={draftComment} onChange={e => setDraftComment(e.target.value)}
                      rows={3} placeholder="Share your experience (optional)"
                      style={{ width: "100%", padding: "10px 14px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff", fontSize: 13, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5, boxSizing: "border-box", outline: "none" }}
                      onFocus={e => e.target.style.borderColor = "#ff2020"} onBlur={e => e.target.style.borderColor = "#2a2a2a"}
                    />
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <button onClick={() => submitRating(school)} disabled={!draftRating || submitting}
                        style={{ padding: "9px 20px", background: draftRating ? "#ff2020" : "#222", color: draftRating ? "#fff" : "#555", fontWeight: 900, fontSize: 13, borderRadius: 8, border: "none", cursor: draftRating ? "pointer" : "default", opacity: submitting ? 0.6 : 1 }}>
                        {submitting ? "Saving…" : "Submit Rating"}
                      </button>
                      <button onClick={() => setExpanded(null)}
                        style={{ padding: "9px 16px", background: "transparent", color: "#555", fontWeight: 700, fontSize: 13, borderRadius: 8, border: "1px solid #2a2a2a", cursor: "pointer" }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "#bbb", fontSize: 16 }}>No schools match your search.</p>
            <button onClick={() => { setQuery(""); setTypeFilter("All"); setLeanFilter("All"); resetPage(); }}
              style={{ marginTop: 12, color: "#ff2020", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 800 }}>
              Clear all filters
            </button>
          </div>
        )}

        {page < totalPages && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={() => setPage(p => p + 1)}
              style={{ padding: "12px 32px", background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
              Load more ({filtered.length - visible.length} remaining)
            </button>
          </div>
        )}

        <div style={{ marginTop: 32 }}>
          <AdUnit slot="6600722153" />
        </div>

        <p style={{ color: "#999", fontSize: 11, marginTop: 16, textAlign: "center" }}>
          Cost &amp; debt: U.S. Dept. of Education College Scorecard · Earnings: median 10yr post-entry
        </p>
      </section>

      <style jsx global>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .rank-card-row { flex-wrap: wrap !important; }
          .rank-card-link { flex-wrap: wrap !important; width: 100% !important; padding: 12px !important; gap: 8px !important; }
          .rank-card-info { min-width: 0; flex: 1 1 auto !important; }
          .rank-card-stats { width: 100% !important; flex-shrink: 1 !important; text-align: left !important; justify-content: flex-start !important; padding-left: 32px !important; }
          .rank-card-rate { width: 100% !important; padding: 0 12px 12px !important; }
          .rank-card-rate button { width: 100% !important; text-align: center !important; }
          .rank-controls { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  let colleges = [];
  try {
    const file = path.join(process.cwd(), "data", "colleges.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    colleges = (data.colleges || []).filter((c) => c.name && c.slug);
  } catch {}

  // Fallback to hardcoded top schools if JSON missing
  if (colleges.length === 0) {
    colleges = [
      { id: 1, name: "Harvard University", slug: "harvard-university", city: "Cambridge", state: "MA", type: "Private", cost: "$57,261", debt: "$17,500", earnings: "$87,200" },
      { id: 2, name: "MIT", slug: "mit", city: "Cambridge", state: "MA", type: "Private", cost: "$57,986", debt: "$17,100", earnings: "$116,100" },
      { id: 3, name: "Stanford University", slug: "stanford-university", city: "Stanford", state: "CA", type: "Private", cost: "$56,169", debt: "$15,200", earnings: "$91,000" },
      { id: 4, name: "Princeton University", slug: "princeton-university", city: "Princeton", state: "NJ", type: "Private", cost: "$57,410", debt: "$10,800", earnings: "$76,200" },
      { id: 5, name: "Yale University", slug: "yale-university", city: "New Haven", state: "CT", type: "Private", cost: "$59,950", debt: "$17,300", earnings: "$77,400" },
      { id: 6, name: "Columbia University", slug: "columbia-university", city: "New York", state: "NY", type: "Private", cost: "$63,530", debt: "$25,100", earnings: "$71,400" },
      { id: 7, name: "University of Pennsylvania", slug: "university-of-pennsylvania", city: "Philadelphia", state: "PA", type: "Private", cost: "$57,770", debt: "$22,000", earnings: "$80,300" },
      { id: 8, name: "Duke University", slug: "duke-university", city: "Durham", state: "NC", type: "Private", cost: "$60,244", debt: "$22,100", earnings: "$73,200" },
      { id: 9, name: "Northwestern University", slug: "northwestern-university", city: "Evanston", state: "IL", type: "Private", cost: "$60,768", debt: "$23,400", earnings: "$72,100" },
      { id: 10, name: "Dartmouth College", slug: "dartmouth-college", city: "Hanover", state: "NH", type: "Private", cost: "$58,336", debt: "$20,100", earnings: "$72,100" },
      { id: 11, name: "UC Berkeley", slug: "uc-berkeley", city: "Berkeley", state: "CA", type: "Public", cost: "$14,312", debt: "$18,200", earnings: "$72,100" },
      { id: 12, name: "UCLA", slug: "ucla", city: "Los Angeles", state: "CA", type: "Public", cost: "$13,240", debt: "$19,100", earnings: "$65,300" },
      { id: 13, name: "University of Michigan", slug: "university-of-michigan", city: "Ann Arbor", state: "MI", type: "Public", cost: "$15,948", debt: "$22,100", earnings: "$66,200" },
      { id: 14, name: "Georgia Tech", slug: "georgia-tech", city: "Atlanta", state: "GA", type: "Public", cost: "$12,682", debt: "$22,100", earnings: "$82,400" },
      { id: 15, name: "New York University", slug: "new-york-university", city: "New York", state: "NY", type: "Private", cost: "$56,500", debt: "$47,300", earnings: "$57,100" },
    ];
  }

  return { props: { colleges }, revalidate: 86400 };
}
