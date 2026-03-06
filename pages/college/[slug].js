// pages/college/[slug].js
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

// Same dataset as college-rankings.js
const ALL_SCHOOLS = [
  { id: 1, rank: 3,  name: "Harvard University",               city: "Cambridge",      state: "MA", cost: "$57,261", debt: "$17,500", earnings: "$87,200",  type: "Private" },
  { id: 2, rank: 2,  name: "MIT",                              city: "Cambridge",      state: "MA", cost: "$57,986", debt: "$17,100", earnings: "$116,100", type: "Private" },
  { id: 3, rank: 4,  name: "Stanford University",              city: "Stanford",       state: "CA", cost: "$56,169", debt: "$15,200", earnings: "$91,000",  type: "Private" },
  { id: 4, rank: 5,  name: "Yale University",                  city: "New Haven",      state: "CT", cost: "$59,950", debt: "$17,300", earnings: "$77,400",  type: "Private" },
  { id: 5, rank: 1,  name: "Princeton University",             city: "Princeton",      state: "NJ", cost: "$57,410", debt: "$10,800", earnings: "$76,200",  type: "Private" },
  { id: 6, rank: 12,  name: "Columbia University",              city: "New York",       state: "NY", cost: "$63,530", debt: "$25,100", earnings: "$71,400",  type: "Private" },
  { id: 7, rank: 7,  name: "University of Pennsylvania",       city: "Philadelphia",   state: "PA", cost: "$57,770", debt: "$22,000", earnings: "$80,300",  type: "Private" },
  { id: 8, rank: 12,  name: "Dartmouth College",                city: "Hanover",        state: "NH", cost: "$58,336", debt: "$20,100", earnings: "$72,100",  type: "Private" },
  { id: 9, rank: 13,  name: "Brown University",                 city: "Providence",     state: "RI", cost: "$60,696", debt: "$23,400", earnings: "$67,200",  type: "Private" },
  { id: 10, rank: 12, name: "Cornell University",               city: "Ithaca",         state: "NY", cost: "$59,316", debt: "$28,200", earnings: "$74,000",  type: "Private" },
  { id: 11, rank: 6, name: "Duke University",                  city: "Durham",         state: "NC", cost: "$60,244", debt: "$22,100", earnings: "$73,200",  type: "Private" },
  { id: 12, rank: 10, name: "Northwestern University",          city: "Evanston",       state: "IL", cost: "$60,768", debt: "$23,400", earnings: "$72,100",  type: "Private" },
  { id: 13, rank: 18, name: "Vanderbilt University",            city: "Nashville",      state: "TN", cost: "$56,826", debt: "$23,100", earnings: "$68,400",  type: "Private" },
  { id: 14, rank: 22, name: "Georgetown University",            city: "Washington",     state: "DC", cost: "$57,590", debt: "$27,200", earnings: "$72,100",  type: "Private" },
  { id: 15, rank: 22, name: "Carnegie Mellon University",       city: "Pittsburgh",     state: "PA", cost: "$57,119", debt: "$31,200", earnings: "$89,200",  type: "Private" },
  { id: 16, rank: 22, name: "Washington Univ in St. Louis",     city: "St. Louis",      state: "MO", cost: "$56,310", debt: "$23,100", earnings: "$70,100",  type: "Private" },
  { id: 17, rank: 17, name: "Rice University",                  city: "Houston",        state: "TX", cost: "$49,996", debt: "$18,200", earnings: "$74,300",  type: "Private" },
  { id: 18, rank: 18, name: "Notre Dame University",            city: "Notre Dame",     state: "IN", cost: "$57,699", debt: "$23,100", earnings: "$72,400",  type: "Private" },
  { id: 19, rank: 25, name: "Emory University",                 city: "Atlanta",        state: "GA", cost: "$55,786", debt: "$27,100", earnings: "$65,200",  type: "Private" },
  { id: 20, rank: 29, name: "Tufts University",                 city: "Medford",        state: "MA", cost: "$59,574", debt: "$27,300", earnings: "$65,400",  type: "Private" },
  { id: 21, rank: 28, name: "University of Southern California",city: "Los Angeles",    state: "CA", cost: "$62,484", debt: "$27,200", earnings: "$62,400",  type: "Private" },
  { id: 22, rank: 41, name: "Boston University",                city: "Boston",         state: "MA", cost: "$58,560", debt: "$38,100", earnings: "$58,200",  type: "Private" },
  { id: 23, rank: 53, name: "Northeastern University",          city: "Boston",         state: "MA", cost: "$57,592", debt: "$30,100", earnings: "$72,400",  type: "Private" },
  { id: 24, rank: 28, name: "New York University",              city: "New York",       state: "NY", cost: "$56,500", debt: "$47,300", earnings: "$57,100",  type: "Private" },
  { id: 25, rank: 28, name: "Wake Forest University",           city: "Winston-Salem",  state: "NC", cost: "$58,700", debt: "$27,400", earnings: "$63,100",  type: "Private" },
  { id: 26, rank: 67, name: "Tulane University",                city: "New Orleans",    state: "LA", cost: "$58,610", debt: "$33,200", earnings: "$56,100",  type: "Private" },
  { id: 27, rank: 102, name: "Lehigh University",                city: "Bethlehem",      state: "PA", cost: "$54,640", debt: "$32,100", earnings: "$68,200",  type: "Private" },
  { id: 28, rank: 72, name: "Rensselaer Polytechnic Institute", city: "Troy",           state: "NY", cost: "$58,694", debt: "$34,200", earnings: "$76,100",  type: "Private" },
  { id: 29, rank: 9, name: "UC Berkeley",                      city: "Berkeley",       state: "CA", cost: "$14,312", debt: "$18,200", earnings: "$72,100",  type: "Public" },
  { id: 30, rank: 15, name: "UCLA",                             city: "Los Angeles",    state: "CA", cost: "$13,240", debt: "$19,100", earnings: "$65,300",  type: "Public" },
  { id: 31, rank: 23, name: "University of Michigan",           city: "Ann Arbor",      state: "MI", cost: "$15,948", debt: "$22,100", earnings: "$66,200",  type: "Public" },
  { id: 32, rank: 25, name: "UNC Chapel Hill",                  city: "Chapel Hill",    state: "NC", cost: "$9,018",  debt: "$22,100", earnings: "$56,100",  type: "Public" },
  { id: 33, rank: 25, name: "University of Virginia",           city: "Charlottesville",state: "VA", cost: "$17,400", debt: "$22,400", earnings: "$63,200",  type: "Public" },
  { id: 34, rank: 35, name: "Georgia Tech",                     city: "Atlanta",        state: "GA", cost: "$12,682", debt: "$22,100", earnings: "$82,400",  type: "Public" },
  { id: 35, rank: 34, name: "UC San Diego",                     city: "La Jolla",       state: "CA", cost: "$14,312", debt: "$19,200", earnings: "$64,100",  type: "Public" },
  { id: 36, rank: 60, name: "UC Santa Barbara",                 city: "Santa Barbara",  state: "CA", cost: "$14,312", debt: "$20,100", earnings: "$57,300",  type: "Public" },
  { id: 37, rank: 60, name: "UC Davis",                         city: "Davis",          state: "CA", cost: "$14,312", debt: "$21,200", earnings: "$57,100",  type: "Public" },
  { id: 38, rank: 35, name: "University of Illinois Urbana",    city: "Champaign",      state: "IL", cost: "$15,868", debt: "$26,200", earnings: "$64,100",  type: "Public" },
  { id: 39, rank: 42, name: "University of Wisconsin-Madison",  city: "Madison",        state: "WI", cost: "$10,728", debt: "$25,100", earnings: "$55,200",  type: "Public" },
  { id: 40, rank: 60, name: "Purdue University",                city: "West Lafayette", state: "IN", cost: "$9,208",  debt: "$25,100", earnings: "$60,200",  type: "Public" },
  { id: 41, rank: 55, name: "University of Washington",         city: "Seattle",        state: "WA", cost: "$11,465", debt: "$21,100", earnings: "$63,200",  type: "Public" },
  { id: 42, rank: 66, name: "Ohio State University",            city: "Columbus",       state: "OH", cost: "$11,518", debt: "$25,100", earnings: "$54,200",  type: "Public" },
  { id: 43, rank: 96, name: "Penn State University",            city: "University Park",state: "PA", cost: "$18,454", debt: "$32,100", earnings: "$55,200",  type: "Public" },
  { id: 44, rank: 96, name: "Michigan State University",        city: "East Lansing",   state: "MI", cost: "$14,436", debt: "$27,100", earnings: "$51,200",  type: "Public" },
  { id: 45, rank: 57, name: "University of Florida",            city: "Gainesville",    state: "FL", cost: "$6,380",  debt: "$20,100", earnings: "$52,200",  type: "Public" },
  { id: 46, rank: 72, name: "Florida State University",         city: "Tallahassee",    state: "FL", cost: "$5,656",  debt: "$22,100", earnings: "$47,200",  type: "Public" },
  { id: 47, rank: 35, name: "University of Texas at Austin",    city: "Austin",         state: "TX", cost: "$11,188", debt: "$23,100", earnings: "$56,100",  type: "Public" },
  { id: 48, rank: 66, name: "Texas A&M University",             city: "College Station",state: "TX", cost: "$11,234", debt: "$22,100", earnings: "$54,200",  type: "Public" },
  { id: 49, rank: 52, name: "University of Maryland",           city: "College Park",   state: "MD", cost: "$10,399", debt: "$24,100", earnings: "$61,200",  type: "Public" },
  { id: 50, rank: 96, name: "Rutgers University",               city: "New Brunswick",  state: "NJ", cost: "$14,100", debt: "$28,100", earnings: "$57,200",  type: "Public" },
  { id: 51, rank: 79, name: "University of Minnesota",          city: "Minneapolis",    state: "MN", cost: "$14,197", debt: "$26,100", earnings: "$55,200",  type: "Public" },
  { id: 52, rank: 121, name: "Indiana University",               city: "Bloomington",    state: "IN", cost: "$10,012", debt: "$26,100", earnings: "$50,100",  type: "Public" },
  { id: 53, rank: 92, name: "University of Colorado Boulder",   city: "Boulder",        state: "CO", cost: "$11,052", debt: "$24,100", earnings: "$52,200",  type: "Public" },
  { id: 54, rank: 117, name: "Arizona State University",         city: "Tempe",          state: "AZ", cost: "$11,338", debt: "$23,100", earnings: "$48,200",  type: "Public" },
  { id: 55, rank: 117, name: "University of Arizona",            city: "Tucson",         state: "AZ", cost: "$12,467", debt: "$21,100", earnings: "$48,100",  type: "Public" },
  { id: 56, rank: 121, name: "University of Oregon",             city: "Eugene",         state: "OR", cost: "$12,720", debt: "$24,100", earnings: "$50,200",  type: "Public" },
  { id: 57, rank: 56, name: "Virginia Tech",                    city: "Blacksburg",     state: "VA", cost: "$13,620", debt: "$24,100", earnings: "$64,200",  type: "Public" },
  { id: 58, rank: 67, name: "NC State University",              city: "Raleigh",        state: "NC", cost: "$9,100",  debt: "$22,100", earnings: "$57,200",  type: "Public" },
  { id: 59, rank: 55, name: "Clemson University",               city: "Clemson",        state: "SC", cost: "$14,708", debt: "$25,100", earnings: "$57,200",  type: "Public" },
  { id: 60, rank: 117, name: "Auburn University",                city: "Auburn",         state: "AL", cost: "$11,796", debt: "$25,100", earnings: "$51,200",  type: "Public" },
  { id: 61, rank: 144, name: "University of Alabama",            city: "Tuscaloosa",     state: "AL", cost: "$10,780", debt: "$23,100", earnings: "$47,200",  type: "Public" },
  { id: 62, rank: 150, name: "Louisiana State University",       city: "Baton Rouge",    state: "LA", cost: "$8,038",  debt: "$22,100", earnings: "$46,100",  type: "Public" },
  { id: 63, rank: 113, name: "University of Tennessee",          city: "Knoxville",      state: "TN", cost: "$11,332", debt: "$23,100", earnings: "$49,200",  type: "Public" },
  { id: 64, rank: 104, name: "University of Iowa",               city: "Iowa City",      state: "IA", cost: "$9,616",  debt: "$24,100", earnings: "$48,100",  type: "Public" },
  { id: 65, rank: 66, name: "University of Pittsburgh",         city: "Pittsburgh",     state: "PA", cost: "$19,080", debt: "$31,100", earnings: "$57,200",  type: "Public" },
  { id: 66, rank: 115, name: "SUNY Buffalo",                     city: "Buffalo",        state: "NY", cost: "$10,391", debt: "$23,100", earnings: "$52,200",  type: "Public" },
  { id: 67, rank: 98, name: "Stony Brook University",           city: "Stony Brook",    state: "NY", cost: "$10,391", debt: "$22,100", earnings: "$57,200",  type: "Public" },
  { id: 68, rank: 165, name: "University of Nebraska",           city: "Lincoln",        state: "NE", cost: "$9,022",  debt: "$23,100", earnings: "$49,100",  type: "Public" },
  { id: 69, rank: 163, name: "University of Kansas",             city: "Lawrence",       state: "KS", cost: "$10,092", debt: "$24,100", earnings: "$47,100",  type: "Public" },
  { id: 70, rank: 133, name: "University of Missouri",           city: "Columbia",       state: "MO", cost: "$10,062", debt: "$24,100", earnings: "$47,100",  type: "Public" },
  { id: 71, rank: 188, name: "West Virginia University",         city: "Morgantown",     state: "WV", cost: "$8,376",  debt: "$23,100", earnings: "$44,200",  type: "Public" },
  { id: 72, rank: 182, name: "Mississippi State University",     city: "Starkville",     state: "MS", cost: "$8,780",  debt: "$21,100", earnings: "$46,200",  type: "Public" },
  { id: 73, rank: null, name: "DeVry University",                 city: "Naperville",     state: "IL", cost: "$15,835", debt: "$43,200", earnings: "$40,100",  type: "For-Profit" },
  { id: 74, rank: null, name: "Full Sail University",             city: "Winter Park",    state: "FL", cost: "$27,540", debt: "$57,400", earnings: "$38,200",  type: "For-Profit" },
  { id: 75, rank: null, name: "Strayer University",               city: "Washington",     state: "DC", cost: "$14,700", debt: "$32,100", earnings: "$42,100",  type: "For-Profit" },
  { id: 76, rank: null, name: "Grand Canyon University",          city: "Phoenix",        state: "AZ", cost: "$17,050", debt: "$35,100", earnings: "$41,200",  type: "For-Profit" },
  { id: 77, rank: null, name: "Santa Monica College",             city: "Santa Monica",   state: "CA", cost: "$1,288",  debt: "$13,100", earnings: "$44,200",  type: "Community" },
  { id: 78, rank: null, name: "Miami Dade College",               city: "Miami",          state: "FL", cost: "$3,340",  debt: "$12,100", earnings: "$36,200",  type: "Community" },
  { id: 79, rank: null, name: "Valencia College",                 city: "Orlando",        state: "FL", cost: "$2,530",  debt: "$12,100", earnings: "$36,100",  type: "Community" },
  { id: 80, rank: null, name: "Broward College",                  city: "Fort Lauderdale",state: "FL", cost: "$3,073",  debt: "$11,100", earnings: "$36,200",  type: "Community" },
  { id: 81, rank: null, name: "Houston Community College",        city: "Houston",        state: "TX", cost: "$2,214",  debt: "$10,100", earnings: "$34,200",  type: "Community" },
  { id: 82, rank: null, name: "Ivy Tech Community College",       city: "Indianapolis",   state: "IN", cost: "$4,106",  debt: "$11,100", earnings: "$35,100",  type: "Community" },
];

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function getStaticPaths() {
  return {
    paths: ALL_SCHOOLS.map((s) => ({ params: { slug: toSlug(s.name) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const school = ALL_SCHOOLS.find((s) => toSlug(s.name) === params.slug);
  if (!school) return { notFound: true };
  return { props: { school } };
}

function verdict(school) {
  const debt = parseInt((school.debt || "").replace(/[^0-9]/g, "")) || 0;
  const earn = parseInt((school.earnings || "").replace(/[^0-9]/g, "")) || 0;
  if (!debt || !earn) return null;
  const months = debt / (earn / 12);
  if (months < 5)  return { label: "Great Value",  color: "#10b981" };
  if (months < 10) return { label: "Questionable", color: "#f59e0b" };
  return           { label: "Debt Trap",     color: "#ff2020" };
}

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}
          onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          style={{ cursor: "pointer", fontSize: 28, color: n <= (hover || value) ? "#f59e0b" : "#333", transition: "color 0.1s" }}>
          ★
        </span>
      ))}
    </div>
  );
}

const STORAGE_KEY = "ihc_ratings_v1";

export default function CollegePage({ school }) {
  const v = verdict(school);
  const [userRating, setUserRating] = useState(null);
  const [draftRating, setDraftRating]   = useState(0);
  const [draftComment, setDraftComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const r = saved[school.id];
      if (r) { setUserRating(r); setDraftRating(r.rating); setDraftComment(r.comment || ""); }
    } catch {}
  }, [school.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!draftRating) return;
    setSubmitting(true);
    const entry = { rating: draftRating, comment: draftComment.trim(), date: new Date().toLocaleDateString() };
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      saved[school.id] = entry;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {}
    setUserRating(entry);
    setSubmitted(true);
    try {
      await fetch("/api/submit-rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId: school.id, schoolName: school.name, ...entry }),
      });
    } catch {}
    setSubmitting(false);
  }

  const debt  = parseInt((school.debt || "").replace(/[^0-9]/g, "")) || 0;
  const earn  = parseInt((school.earnings || "").replace(/[^0-9]/g, "")) || 0;
  const payoffMonths = earn ? Math.round(debt / (earn / 12)) : null;

  const metaDesc = `Is ${school.name} worth it? Cost: ${school.cost}/yr, avg debt: ${school.debt}, median earnings 10yrs out: ${school.earnings}. Real government data.`;

  return (
    <Layout>
      <SEO
        title={`Is ${school.name} Worth It? Real Cost & Debt Data`}
        description={metaDesc}
      />

      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 20px 80px" }}>
        {/* Back */}
        <Link href="/college-rankings" style={{ color: "#555", fontSize: 13, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 28 }}>
          ← All Rankings
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 4, background: "rgba(255,32,32,0.12)", color: "#ff2020", letterSpacing: "0.08em", textTransform: "uppercase" }}>{school.type}</span>
            {v && <span style={{ fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 4, color: v.color, background: `${v.color}20` }}>{v.label}</span>}
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(26px,5vw,42px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 8px" }}>
            Is {school.name} Worth It?
          </h1>
          <p style={{ color: "#555", fontSize: 14 }}>{school.city}, {school.state}</p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
          {[
            { label: "Cost / Year", value: school.cost, color: "#fff" },
            { label: "Avg Debt at Graduation", value: school.debt, color: "#ff2020" },
            { label: "Median Earnings (10yr)", value: school.earnings, color: "#10b981" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ color: "#444", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{stat.label}</div>
              <div style={{ color: stat.color, fontSize: 22, fontWeight: 900 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Payoff alert */}
        {payoffMonths !== null && payoffMonths > 6 && (
          <div style={{ background: payoffMonths > 10 ? "rgba(255,32,32,0.08)" : "rgba(245,158,11,0.08)", border: `1px solid ${payoffMonths > 10 ? "rgba(255,32,32,0.3)" : "rgba(245,158,11,0.3)"}`, borderRadius: 12, padding: "16px 20px", marginBottom: 32 }}>
            <p style={{ color: payoffMonths > 10 ? "#ff2020" : "#f59e0b", fontSize: 14, fontWeight: 700, margin: 0 }}>
              At this debt load, it takes ~{payoffMonths} months of earnings just to pay off student loans.
              {payoffMonths > 10 && " That's a serious debt trap."}
            </p>
          </div>
        )}

        {/* User Rating Section */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "28px 24px", marginBottom: 32 }}>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 900, marginBottom: 4 }}>Rate {school.name}</h2>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 20 }}>Student, alum, or parent? Share what you know.</p>

          {/* Show existing rating */}
          {userRating && (
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ color: "#888", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Your Rating · {userRating.date}</div>
              <div style={{ color: "#f59e0b", fontSize: 20, fontWeight: 900, marginBottom: userRating.comment ? 8 : 0 }}>
                {"★".repeat(userRating.rating)}{"☆".repeat(5 - userRating.rating)}
                <span style={{ color: "#555", fontSize: 12, fontWeight: 700, marginLeft: 8 }}>{userRating.rating}/5</span>
              </div>
              {userRating.comment && (
                <p style={{ color: "#aaa", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{userRating.comment}</p>
              )}
            </div>
          )}

          {submitted ? (
            <p style={{ color: "#10b981", fontSize: 14, fontWeight: 700 }}>✓ Rating saved.</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ color: "#888", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  {userRating ? "Update your rating" : "Your rating"}
                </div>
                <StarPicker value={draftRating} onChange={setDraftRating} />
              </div>
              <div>
                <label style={{ color: "#888", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Your experience (optional)</label>
                <textarea value={draftComment} onChange={e => setDraftComment(e.target.value)} rows={4}
                  placeholder={`Tuition worth it? Job placement? Would you go to ${school.name} again?`}
                  style={{ width: "100%", padding: "12px 14px", background: "#0d0d0d", border: "1px solid #2a2a2a", borderRadius: 10, color: "#fff", fontSize: 14, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5, boxSizing: "border-box", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "#ff2020"} onBlur={e => e.target.style.borderColor = "#2a2a2a"}
                />
              </div>
              <button type="submit" disabled={!draftRating || submitting}
                style={{ alignSelf: "flex-start", padding: "12px 24px", background: draftRating ? "#ff2020" : "#1a1a1a", color: draftRating ? "#fff" : "#555", fontWeight: 900, fontSize: 14, borderRadius: 10, border: "none", cursor: draftRating ? "pointer" : "default", opacity: submitting ? 0.6 : 1 }}>
                {submitting ? "Saving…" : userRating ? "Update Rating" : "Submit Rating"}
              </button>
            </form>
          )}
        </div>

        {/* CTA */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "28px 24px", textAlign: "center" }}>
          <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Explore Alternatives</h3>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>Trade schools, certifications, and apprenticeships that pay without the debt.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/alternatives" style={{ padding: "11px 22px", background: "#ff2020", color: "#fff", fontWeight: 900, fontSize: 14, borderRadius: 10, textDecoration: "none" }}>
              Skip College →
            </Link>
            <Link href="/trade-schools" style={{ padding: "11px 22px", background: "#1a1a1a", color: "#fff", fontWeight: 900, fontSize: 14, borderRadius: 10, textDecoration: "none", border: "1px solid #2a2a2a" }}>
              Trade Schools
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
