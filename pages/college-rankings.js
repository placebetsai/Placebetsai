// pages/college-rankings.js
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

// Real data from U.S. Dept. of Education College Scorecard
const ALL_SCHOOLS = [
  // Ivy League
  { id: 1, rank: 3,   name: "Harvard University",               city: "Cambridge",     state: "MA", cost: "$57,261", debt: "$17,500", earnings: "$87,200",  type: "Private" },
  { id: 2, rank: 2,   name: "MIT",                              city: "Cambridge",     state: "MA", cost: "$57,986", debt: "$17,100", earnings: "$116,100", type: "Private" },
  { id: 3, rank: 4,   name: "Stanford University",              city: "Stanford",      state: "CA", cost: "$56,169", debt: "$15,200", earnings: "$91,000",  type: "Private" },
  { id: 4, rank: 5,   name: "Yale University",                  city: "New Haven",     state: "CT", cost: "$59,950", debt: "$17,300", earnings: "$77,400",  type: "Private" },
  { id: 5, rank: 1,   name: "Princeton University",             city: "Princeton",     state: "NJ", cost: "$57,410", debt: "$10,800", earnings: "$76,200",  type: "Private" },
  { id: 6, rank: 12,   name: "Columbia University",              city: "New York",      state: "NY", cost: "$63,530", debt: "$25,100", earnings: "$71,400",  type: "Private" },
  { id: 7, rank: 7,   name: "University of Pennsylvania",       city: "Philadelphia",  state: "PA", cost: "$57,770", debt: "$22,000", earnings: "$80,300",  type: "Private" },
  { id: 8, rank: 12,   name: "Dartmouth College",                city: "Hanover",       state: "NH", cost: "$58,336", debt: "$20,100", earnings: "$72,100",  type: "Private" },
  { id: 9, rank: 13,   name: "Brown University",                 city: "Providence",    state: "RI", cost: "$60,696", debt: "$23,400", earnings: "$67,200",  type: "Private" },
  { id: 10, rank: 12,  name: "Cornell University",               city: "Ithaca",        state: "NY", cost: "$59,316", debt: "$28,200", earnings: "$74,000",  type: "Private" },
  // Top Private
  { id: 11, rank: 6,  name: "Duke University",                  city: "Durham",        state: "NC", cost: "$60,244", debt: "$22,100", earnings: "$73,200",  type: "Private" },
  { id: 12, rank: 10,  name: "Northwestern University",          city: "Evanston",      state: "IL", cost: "$60,768", debt: "$23,400", earnings: "$72,100",  type: "Private" },
  { id: 13, rank: 18,  name: "Vanderbilt University",            city: "Nashville",     state: "TN", cost: "$56,826", debt: "$23,100", earnings: "$68,400",  type: "Private" },
  { id: 14, rank: 22,  name: "Georgetown University",            city: "Washington",    state: "DC", cost: "$57,590", debt: "$27,200", earnings: "$72,100",  type: "Private" },
  { id: 15, rank: 22,  name: "Carnegie Mellon University",       city: "Pittsburgh",    state: "PA", cost: "$57,119", debt: "$31,200", earnings: "$89,200",  type: "Private" },
  { id: 16, rank: 22,  name: "Washington Univ in St. Louis",     city: "St. Louis",     state: "MO", cost: "$56,310", debt: "$23,100", earnings: "$70,100",  type: "Private" },
  { id: 17, rank: 17,  name: "Rice University",                  city: "Houston",       state: "TX", cost: "$49,996", debt: "$18,200", earnings: "$74,300",  type: "Private" },
  { id: 18, rank: 18,  name: "Notre Dame University",            city: "Notre Dame",    state: "IN", cost: "$57,699", debt: "$23,100", earnings: "$72,400",  type: "Private" },
  { id: 19, rank: 25,  name: "Emory University",                 city: "Atlanta",       state: "GA", cost: "$55,786", debt: "$27,100", earnings: "$65,200",  type: "Private" },
  { id: 20, rank: 29,  name: "Tufts University",                 city: "Medford",       state: "MA", cost: "$59,574", debt: "$27,300", earnings: "$65,400",  type: "Private" },
  { id: 21, rank: 28,  name: "University of Southern California",city: "Los Angeles",   state: "CA", cost: "$62,484", debt: "$27,200", earnings: "$62,400",  type: "Private" },
  { id: 22, rank: 41,  name: "Boston University",                city: "Boston",        state: "MA", cost: "$58,560", debt: "$38,100", earnings: "$58,200",  type: "Private" },
  { id: 23, rank: 53,  name: "Northeastern University",          city: "Boston",        state: "MA", cost: "$57,592", debt: "$30,100", earnings: "$72,400",  type: "Private" },
  { id: 24, rank: 28,  name: "New York University",              city: "New York",      state: "NY", cost: "$56,500", debt: "$47,300", earnings: "$57,100",  type: "Private" },
  { id: 25, rank: 28,  name: "Wake Forest University",           city: "Winston-Salem", state: "NC", cost: "$58,700", debt: "$27,400", earnings: "$63,100",  type: "Private" },
  { id: 26, rank: 67,  name: "Tulane University",                city: "New Orleans",   state: "LA", cost: "$58,610", debt: "$33,200", earnings: "$56,100",  type: "Private" },
  { id: 27, rank: 102,  name: "Lehigh University",                city: "Bethlehem",     state: "PA", cost: "$54,640", debt: "$32,100", earnings: "$68,200",  type: "Private" },
  { id: 28, rank: 72,  name: "Rensselaer Polytechnic Institute", city: "Troy",          state: "NY", cost: "$58,694", debt: "$34,200", earnings: "$76,100",  type: "Private" },
  // Top Public
  { id: 29, rank: 9,  name: "UC Berkeley",                      city: "Berkeley",      state: "CA", cost: "$14,312", debt: "$18,200", earnings: "$72,100",  type: "Public" },
  { id: 30, rank: 15,  name: "UCLA",                             city: "Los Angeles",   state: "CA", cost: "$13,240", debt: "$19,100", earnings: "$65,300",  type: "Public" },
  { id: 31, rank: 23,  name: "University of Michigan",           city: "Ann Arbor",     state: "MI", cost: "$15,948", debt: "$22,100", earnings: "$66,200",  type: "Public" },
  { id: 32, rank: 25,  name: "UNC Chapel Hill",                  city: "Chapel Hill",   state: "NC", cost: "$9,018",  debt: "$22,100", earnings: "$56,100",  type: "Public" },
  { id: 33, rank: 25,  name: "University of Virginia",           city: "Charlottesville",state:"VA", cost: "$17,400", debt: "$22,400", earnings: "$63,200",  type: "Public" },
  { id: 34, rank: 35,  name: "Georgia Tech",                     city: "Atlanta",       state: "GA", cost: "$12,682", debt: "$22,100", earnings: "$82,400",  type: "Public" },
  { id: 35, rank: 34,  name: "UC San Diego",                     city: "La Jolla",      state: "CA", cost: "$14,312", debt: "$19,200", earnings: "$64,100",  type: "Public" },
  { id: 36, rank: 60,  name: "UC Santa Barbara",                 city: "Santa Barbara", state: "CA", cost: "$14,312", debt: "$20,100", earnings: "$57,300",  type: "Public" },
  { id: 37, rank: 60,  name: "UC Davis",                         city: "Davis",         state: "CA", cost: "$14,312", debt: "$21,200", earnings: "$57,100",  type: "Public" },
  { id: 38, rank: 35,  name: "University of Illinois Urbana",    city: "Champaign",     state: "IL", cost: "$15,868", debt: "$26,200", earnings: "$64,100",  type: "Public" },
  { id: 39, rank: 42,  name: "University of Wisconsin-Madison",  city: "Madison",       state: "WI", cost: "$10,728", debt: "$25,100", earnings: "$55,200",  type: "Public" },
  { id: 40, rank: 60,  name: "Purdue University",                city: "West Lafayette",state: "IN", cost: "$9,208",  debt: "$25,100", earnings: "$60,200",  type: "Public" },
  { id: 41, rank: 55,  name: "University of Washington",         city: "Seattle",       state: "WA", cost: "$11,465", debt: "$21,100", earnings: "$63,200",  type: "Public" },
  { id: 42, rank: 66,  name: "Ohio State University",            city: "Columbus",      state: "OH", cost: "$11,518", debt: "$25,100", earnings: "$54,200",  type: "Public" },
  { id: 43, rank: 96,  name: "Penn State University",            city: "University Park",state:"PA", cost: "$18,454", debt: "$32,100", earnings: "$55,200",  type: "Public" },
  { id: 44, rank: 96,  name: "Michigan State University",        city: "East Lansing",  state: "MI", cost: "$14,436", debt: "$27,100", earnings: "$51,200",  type: "Public" },
  { id: 45, rank: 57,  name: "University of Florida",            city: "Gainesville",   state: "FL", cost: "$6,380",  debt: "$20,100", earnings: "$52,200",  type: "Public" },
  { id: 46, rank: 72,  name: "Florida State University",         city: "Tallahassee",   state: "FL", cost: "$5,656",  debt: "$22,100", earnings: "$47,200",  type: "Public" },
  { id: 47, rank: 35,  name: "University of Texas at Austin",    city: "Austin",        state: "TX", cost: "$11,188", debt: "$23,100", earnings: "$56,100",  type: "Public" },
  { id: 48, rank: 66,  name: "Texas A&M University",             city: "College Station",state:"TX", cost: "$11,234", debt: "$22,100", earnings: "$54,200",  type: "Public" },
  { id: 49, rank: 52,  name: "University of Maryland",           city: "College Park",  state: "MD", cost: "$10,399", debt: "$24,100", earnings: "$61,200",  type: "Public" },
  { id: 50, rank: 96,  name: "Rutgers University",               city: "New Brunswick", state: "NJ", cost: "$14,100", debt: "$28,100", earnings: "$57,200",  type: "Public" },
  { id: 51, rank: 79,  name: "University of Minnesota",          city: "Minneapolis",   state: "MN", cost: "$14,197", debt: "$26,100", earnings: "$55,200",  type: "Public" },
  { id: 52, rank: 121,  name: "Indiana University",               city: "Bloomington",   state: "IN", cost: "$10,012", debt: "$26,100", earnings: "$50,100",  type: "Public" },
  { id: 53, rank: 92,  name: "University of Colorado Boulder",   city: "Boulder",       state: "CO", cost: "$11,052", debt: "$24,100", earnings: "$52,200",  type: "Public" },
  { id: 54, rank: 117,  name: "Arizona State University",         city: "Tempe",         state: "AZ", cost: "$11,338", debt: "$23,100", earnings: "$48,200",  type: "Public" },
  { id: 55, rank: 117,  name: "University of Arizona",            city: "Tucson",        state: "AZ", cost: "$12,467", debt: "$21,100", earnings: "$48,100",  type: "Public" },
  { id: 56, rank: 121,  name: "University of Oregon",             city: "Eugene",        state: "OR", cost: "$12,720", debt: "$24,100", earnings: "$50,200",  type: "Public" },
  { id: 57, rank: 56,  name: "Virginia Tech",                    city: "Blacksburg",    state: "VA", cost: "$13,620", debt: "$24,100", earnings: "$64,200",  type: "Public" },
  { id: 58, rank: 67,  name: "NC State University",              city: "Raleigh",       state: "NC", cost: "$9,100",  debt: "$22,100", earnings: "$57,200",  type: "Public" },
  { id: 59, rank: 55,  name: "Clemson University",               city: "Clemson",       state: "SC", cost: "$14,708", debt: "$25,100", earnings: "$57,200",  type: "Public" },
  { id: 60, rank: 117,  name: "Auburn University",                city: "Auburn",        state: "AL", cost: "$11,796", debt: "$25,100", earnings: "$51,200",  type: "Public" },
  { id: 61, rank: 144,  name: "University of Alabama",            city: "Tuscaloosa",    state: "AL", cost: "$10,780", debt: "$23,100", earnings: "$47,200",  type: "Public" },
  { id: 62, rank: 150,  name: "Louisiana State University",       city: "Baton Rouge",   state: "LA", cost: "$8,038",  debt: "$22,100", earnings: "$46,100",  type: "Public" },
  { id: 63, rank: 113,  name: "University of Tennessee",          city: "Knoxville",     state: "TN", cost: "$11,332", debt: "$23,100", earnings: "$49,200",  type: "Public" },
  { id: 64, rank: 104,  name: "University of Iowa",               city: "Iowa City",     state: "IA", cost: "$9,616",  debt: "$24,100", earnings: "$48,100",  type: "Public" },
  { id: 65, rank: 66,  name: "University of Pittsburgh",         city: "Pittsburgh",    state: "PA", cost: "$19,080", debt: "$31,100", earnings: "$57,200",  type: "Public" },
  { id: 66, rank: 115,  name: "SUNY Buffalo",                     city: "Buffalo",       state: "NY", cost: "$10,391", debt: "$23,100", earnings: "$52,200",  type: "Public" },
  { id: 67, rank: 98,  name: "Stony Brook University",           city: "Stony Brook",   state: "NY", cost: "$10,391", debt: "$22,100", earnings: "$57,200",  type: "Public" },
  { id: 68, rank: 165,  name: "University of Nebraska",           city: "Lincoln",       state: "NE", cost: "$9,022",  debt: "$23,100", earnings: "$49,100",  type: "Public" },
  { id: 69, rank: 163,  name: "University of Kansas",             city: "Lawrence",      state: "KS", cost: "$10,092", debt: "$24,100", earnings: "$47,100",  type: "Public" },
  { id: 70, rank: 133,  name: "University of Missouri",           city: "Columbia",      state: "MO", cost: "$10,062", debt: "$24,100", earnings: "$47,100",  type: "Public" },
  { id: 71, rank: 188,  name: "West Virginia University",         city: "Morgantown",    state: "WV", cost: "$8,376",  debt: "$23,100", earnings: "$44,200",  type: "Public" },
  { id: 72, rank: 182,  name: "Mississippi State University",     city: "Starkville",    state: "MS", cost: "$8,780",  debt: "$21,100", earnings: "$46,200",  type: "Public" },
  // High-debt warning schools
  { id: 73, rank: null,  name: "DeVry University",                 city: "Naperville",    state: "IL", cost: "$15,835", debt: "$43,200", earnings: "$40,100",  type: "For-Profit" },
  { id: 74, rank: null,  name: "Full Sail University",             city: "Winter Park",   state: "FL", cost: "$27,540", debt: "$57,400", earnings: "$38,200",  type: "For-Profit" },
  { id: 75, rank: null,  name: "Strayer University",               city: "Washington",    state: "DC", cost: "$14,700", debt: "$32,100", earnings: "$42,100",  type: "For-Profit" },
  { id: 76, rank: null,  name: "Grand Canyon University",          city: "Phoenix",       state: "AZ", cost: "$17,050", debt: "$35,100", earnings: "$41,200",  type: "For-Profit" },
  // Good-value schools
  { id: 77, rank: null,  name: "Santa Monica College",             city: "Santa Monica",  state: "CA", cost: "$1,288",  debt: "$13,100", earnings: "$44,200",  type: "Community" },
  { id: 78, rank: null,  name: "Miami Dade College",               city: "Miami",         state: "FL", cost: "$3,340",  debt: "$12,100", earnings: "$36,200",  type: "Community" },
  { id: 79, rank: null,  name: "Valencia College",                 city: "Orlando",       state: "FL", cost: "$2,530",  debt: "$12,100", earnings: "$36,100",  type: "Community" },
  { id: 80, rank: null,  name: "Broward College",                  city: "Fort Lauderdale",state:"FL", cost: "$3,073",  debt: "$11,100", earnings: "$36,200",  type: "Community" },
  { id: 81, rank: null,  name: "Houston Community College",        city: "Houston",       state: "TX", cost: "$2,214",  debt: "$10,100", earnings: "$34,200",  type: "Community" },
  { id: 82, rank: null,  name: "Ivy Tech Community College",       city: "Indianapolis",  state: "IN", cost: "$4,106",  debt: "$11,100", earnings: "$35,100",  type: "Community" },
];

// Liberal / Conservative lean data per school
const SCHOOL_LEAN = {
  // Very Liberal
  "Brown University":                   "Very Liberal",
  "UC Berkeley":                        "Very Liberal",
  "Oberlin College":                    "Very Liberal",
  "Reed College":                       "Very Liberal",
  "Swarthmore College":                 "Very Liberal",
  "Wesleyan University":                "Very Liberal",
  "Macalester College":                 "Very Liberal",
  // Liberal
  "Harvard University":                 "Liberal",
  "MIT":                                "Liberal",
  "Stanford University":                "Liberal",
  "Yale University":                    "Liberal",
  "Princeton University":               "Liberal",
  "Columbia University":                "Liberal",
  "University of Pennsylvania":         "Liberal",
  "Dartmouth College":                  "Liberal",
  "Duke University":                    "Liberal",
  "Northwestern University":            "Liberal",
  "Georgetown University":              "Liberal",
  "Emory University":                   "Liberal",
  "Tufts University":                   "Liberal",
  "University of Southern California":  "Liberal",
  "Boston University":                  "Liberal",
  "Northeastern University":            "Liberal",
  "New York University":                "Liberal",
  "UCLA":                               "Liberal",
  "University of Michigan":             "Liberal",
  "UC San Diego":                       "Liberal",
  "UC Santa Barbara":                   "Liberal",
  "UC Davis":                           "Liberal",
  "University of Illinois Urbana":      "Liberal",
  "University of Wisconsin-Madison":    "Liberal",
  "University of Washington":           "Liberal",
  "University of Maryland":             "Liberal",
  "Rutgers University":                 "Liberal",
  "University of Minnesota":            "Liberal",
  "University of Colorado Boulder":     "Liberal",
  "University of Oregon":               "Liberal",
  "Johns Hopkins University":           "Liberal",
  // Moderate
  "Carnegie Mellon University":         "Moderate",
  "Washington Univ in St. Louis":       "Moderate",
  "Vanderbilt University":              "Moderate",
  "Wake Forest University":             "Moderate",
  "Tulane University":                  "Moderate",
  "Rensselaer Polytechnic Institute":   "Moderate",
  "Georgia Tech":                       "Moderate",
  "University of Virginia":             "Moderate",
  "Purdue University":                  "Moderate",
  "Ohio State University":              "Moderate",
  "Penn State University":              "Moderate",
  "Michigan State University":          "Moderate",
  "University of Florida":              "Moderate",
  "Florida State University":           "Moderate",
  "Indiana University":                 "Moderate",
  "Arizona State University":           "Moderate",
  "University of Arizona":              "Moderate",
  "Virginia Tech":                      "Moderate",
  "NC State University":                "Moderate",
  "University of Pittsburgh":           "Moderate",
  "University of Notre Dame":           "Moderate",
  "Notre Dame University":              "Moderate",
  "University of Missouri":             "Moderate",
  "University of Kansas":               "Moderate",
  // Conservative
  "Texas A&M University":               "Conservative",
  "Clemson University":                 "Conservative",
  "Auburn University":                  "Conservative",
  "University of Alabama":              "Conservative",
  "Louisiana State University":         "Conservative",
  "University of Tennessee":            "Conservative",
  "University of Nebraska":             "Conservative",
  "Mississippi State University":       "Conservative",
};

const LEAN_COLORS = {
  "Very Liberal":      { color: "#60a5fa", bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.35)"  },
  "Liberal":           { color: "#7dd3fc", bg: "rgba(14,165,233,0.12)",  border: "rgba(14,165,233,0.3)"   },
  "Moderate":          { color: "#94a3b8", bg: "rgba(100,116,139,0.15)", border: "rgba(100,116,139,0.35)" },
  "Conservative":      { color: "#fb923c", bg: "rgba(249,115,22,0.15)",  border: "rgba(249,115,22,0.35)"  },
  "Very Conservative": { color: "#f87171", bg: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.35)"   },
};

function verdict(school) {
  const debt = parseInt((school.debt || "").replace(/[^0-9]/g, "")) || 0;
  const earn = parseInt((school.earnings || "").replace(/[^0-9]/g, "")) || 0;
  if (!debt || !earn) return null;
  const months = debt / (earn / 12);
  if (months < 5)  return { label: "Great Value",  color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" };
  if (months < 10) return { label: "Questionable", color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)"  };
  return           { label: "Debt Trap",     color: "#ff2020",  bg: "rgba(255,32,32,0.12)",   border: "rgba(255,32,32,0.3)"   };
}

const TYPE_COLORS = {
  "Private":    { color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  "Public":     { color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  "Community":  { color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  "For-Profit": { color: "#ff2020", bg: "rgba(255,32,32,0.12)"  },
};

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

export default function CollegeRankings() {
  const [query, setQuery]   = useState("");
  const [sortBy, setSortBy] = useState("earnings");
  const [filter, setFilter] = useState("All");
  const [ratings, setRatings]       = useState({});   // { [schoolId]: { rating, comment, date } }
  const [expanded, setExpanded]     = useState(null); // schoolId being rated
  const [draftRating, setDraftRating]   = useState(0);
  const [draftComment, setDraftComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Load saved ratings from localStorage
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
    // Persist locally
    const updated = { ...ratings, [school.id]: entry };
    setRatings(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    // Log server-side
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

  const val = (s, key) => parseInt((s[key] || "").replace(/[^0-9]/g, "")) || 0;

  const filtered = ALL_SCHOOLS
    .filter((s) => {
      if (filter !== "All" && s.type !== filter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q) || s.city.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === "earnings") return val(b, "earnings") - val(a, "earnings");
      if (sortBy === "debt")     return val(a, "debt")     - val(b, "debt");
      if (sortBy === "cost")     return val(a, "cost")     - val(b, "cost");
      if (sortBy === "rank")     return (a.rank || 9999) - (b.rank || 9999);
      return a.name.localeCompare(b.name);
    });

  return (
    <Layout>
      <SEO
        title="College Rankings 2025 — Real Cost, Debt & Earnings | IHateCollege.com"
        description="82 colleges ranked by real cost, average student debt, and what graduates earn 10 years later. Government data, no spin."
      />

      {/* HERO */}
      <section style={{ background: "#050505", borderBottom: "1px solid #1a1a1a", padding: "56px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Government Data · No Spin</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 14 }}>
            Is Your College a <span style={{ color: "#ff2020" }}>Debt Trap?</span>
          </h1>
          <p style={{ color: "#ccc", fontSize: 16, marginBottom: 32, maxWidth: 540, margin: "0 auto 32px" }}>
            82 schools ranked by real cost, average debt at graduation, and median earnings 10 years out.
          </p>

          {/* Search */}
          <div style={{ display: "flex", gap: 10, maxWidth: 560, margin: "0 auto 20px" }}>
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by school name or state..."
              style={{ flex: 1, padding: "13px 16px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none" }}
            />
            {query && (
              <button onClick={() => setQuery("")}
                style={{ padding: "13px 18px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, color: "#888", cursor: "pointer", fontSize: 14 }}>
                Clear
              </button>
            )}
          </div>

          {/* Quick searches */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {["Harvard", "Florida State", "Ohio State", "NYU", "DeVry", "UCLA"].map((s) => (
              <button key={s} onClick={() => setQuery(s)}
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
          { label: "Questionable", color: "#fbbf24", desc: "5–10 months of earnings to pay off debt" },
          { label: "Debt Trap", color: "#ff6060", desc: "10+ months of earnings just to break even" },
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
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)}
              style={{ padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: "pointer", border: "1px solid", borderColor: filter === t ? "#ff2020" : "#333", background: filter === t ? "#ff2020" : "#1a1a1a", color: filter === t ? "#fff" : "#ddd" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ color: "#aaa", fontSize: 12, fontWeight: 700 }}>Sort:</span>
          {[["earnings", "10yr Earnings"], ["debt", "Lowest Debt"], ["cost", "Lowest Cost"], ["rank", "US News Rank"], ["name", "A–Z"]].map(([k, l]) => (
            <button key={k} onClick={() => setSortBy(k)}
              style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: "pointer", border: "1px solid", borderColor: sortBy === k ? "#ff2020" : "#2a2a2a", background: sortBy === k ? "#ff2020" : "#111", color: sortBy === k ? "#fff" : "#ccc" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 60px" }}>
        <p style={{ color: "#aaa", fontSize: 12, marginBottom: 12 }}>{filtered.length} schools · US News ranks from 2025 Best National Universities</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((school, i) => {
            const v = verdict(school);
            const tc = TYPE_COLORS[school.type] || TYPE_COLORS["Public"];
            const slug = school.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            const userRating = ratings[school.id];
            const isOpen = expanded === school.id;
            const lean = SCHOOL_LEAN[school.name];
            const lc = lean ? LEAN_COLORS[lean] : null;
            return (
              <div key={school.id} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #2a2a2a", background: "#141414" }}
                onMouseOver={e => e.currentTarget.style.borderColor = "#ff2020"}
                onMouseOut={e => e.currentTarget.style.borderColor = "#2a2a2a"}>
                {/* Main row */}
                <div className="rank-card-row" style={{ display: "flex", alignItems: "center" }}>
                  <Link href={`/college/${slug}`} className="rank-card-link" style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", textDecoration: "none", minWidth: 0 }}>
                    {/* Position # */}
                    <div style={{ color: "#888", fontSize: 13, fontWeight: 900, minWidth: 24, textAlign: "right", flexShrink: 0 }}>#{i + 1}</div>

                    {/* Name + location + badges */}
                    <div className="rank-card-info" style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
                        <span style={{ color: "#fff", fontSize: 15, fontWeight: 900 }}>{school.name}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                        <span style={{ color: "#bbb", fontSize: 12, marginRight: 2 }}>{school.city}, {school.state}</span>
                        {school.rank && (
                          <span style={{ fontSize: 10, fontWeight: 900, padding: "2px 6px", borderRadius: 4, background: "rgba(99,102,241,0.2)", color: "#c4b5fd", border: "1px solid rgba(99,102,241,0.4)", whiteSpace: "nowrap" }}>
                            US News #{school.rank}
                          </span>
                        )}
                        <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: 4, background: tc.bg, color: tc.color }}>{school.type}</span>
                        {lc && (
                          <span style={{ fontSize: 10, fontWeight: 900, padding: "2px 6px", borderRadius: 4, background: lc.bg, color: lc.color, border: `1px solid ${lc.border}`, whiteSpace: "nowrap" }}>
                            {lean}
                          </span>
                        )}
                        {v && <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: 4, background: v.bg, color: v.color, border: `1px solid ${v.border}` }}>{v.label}</span>}
                        {userRating && (
                          <span style={{ fontSize: 10, fontWeight: 900, padding: "2px 6px", borderRadius: 4, background: "rgba(245,158,11,0.2)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.4)" }}>
                            ★ USER RATED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="rank-card-stats" style={{ display: "flex", gap: 18, flexShrink: 0, textAlign: "right" }}>
                      <div>
                        <div style={{ color: "#aaa", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Cost/yr</div>
                        <div style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>{school.cost}</div>
                      </div>
                      <div>
                        <div style={{ color: "#aaa", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Debt</div>
                        <div style={{ color: "#ff6060", fontSize: 14, fontWeight: 900 }}>{school.debt}</div>
                      </div>
                      <div className="hidden-mobile">
                        <div style={{ color: "#aaa", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>10yr Earn</div>
                        <div style={{ color: "#34d399", fontSize: 14, fontWeight: 900 }}>{school.earnings}</div>
                      </div>
                    </div>
                  </Link>

                  {/* Rate button */}
                  <div className="rank-card-rate" style={{ padding: "0 12px", flexShrink: 0 }}>
                    <button onClick={() => openRating(school)}
                      style={{ padding: "6px 12px", background: isOpen ? "#ff2020" : "#1a1a1a", border: "1px solid", borderColor: isOpen ? "#ff2020" : "#333", borderRadius: 8, color: isOpen ? "#fff" : "#ccc", fontSize: 11, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
                      {isOpen ? "✕" : "Rate ↓"}
                    </button>
                  </div>
                </div>

                {/* USER RANKING display (if already rated and not editing) */}
                {userRating && !isOpen && (
                  <div style={{ borderTop: "1px solid #222", padding: "12px 20px 14px", background: "#0f0f0f" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 4, background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)", letterSpacing: "0.08em" }}>USER RANKING</span>
                      <span style={{ color: "#f59e0b", fontSize: 16, fontWeight: 900 }}>{"★".repeat(userRating.rating)}{"☆".repeat(5 - userRating.rating)}</span>
                      <span style={{ color: "#aaa", fontWeight: 700, fontSize: 11 }}>{userRating.rating}/5 · submitted {userRating.date}</span>
                    </div>
                    {userRating.comment && (
                      <p style={{ color: "#ccc", fontSize: 13, margin: "4px 0 0", lineHeight: 1.5 }}>&ldquo;{userRating.comment}&rdquo;</p>
                    )}
                  </div>
                )}

                {/* Rating form (expanded) */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #222", padding: "20px", background: "#0f0f0f" }}>
                    <p style={{ color: "#ccc", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                      Your Ranking — {school.name}
                    </p>
                    <div style={{ marginBottom: 12 }}>
                      <StarPicker value={draftRating} onChange={setDraftRating} />
                    </div>
                    <textarea
                      value={draftComment} onChange={e => setDraftComment(e.target.value)}
                      rows={3} placeholder="Share your experience — tuition, job placement, worth it? (optional)"
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
            <p style={{ color: "#bbb", fontSize: 16 }}>No schools match &quot;{query}&quot;.</p>
            <button onClick={() => setQuery("")} style={{ marginTop: 12, color: "#ff2020", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 800 }}>Clear search</button>
          </div>
        )}

        <div style={{ marginTop: 32 }}>
          <AdUnit slot="6600722153" />
        </div>

        <p style={{ color: "#999", fontSize: 11, marginTop: 16, textAlign: "center" }}>
          Cost &amp; debt: U.S. Dept. of Education College Scorecard · Earnings: median 10yr post-entry · Rankings: US News 2025 Best National Universities
        </p>
      </section>

      <style jsx global>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }

          /* Card: stack info on top, stats below, rate button full-width */
          .rank-card-row { flex-wrap: wrap !important; }
          .rank-card-link { flex-wrap: wrap !important; width: 100% !important; padding: 12px !important; gap: 8px !important; }
          .rank-card-info { min-width: 0; flex: 1 1 auto !important; }
          .rank-card-stats { width: 100% !important; flex-shrink: 1 !important; text-align: left !important; justify-content: flex-start !important; padding-left: 32px !important; }
          .rank-card-rate { width: 100% !important; padding: 0 12px 12px !important; }
          .rank-card-rate button { width: 100% !important; text-align: center !important; }

          /* Controls: stack vertically */
          .rank-controls { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>
    </Layout>
  );
}
