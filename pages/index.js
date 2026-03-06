import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import AdUnit from "../components/AdUnit";

// ── Animated debt counter ───────────────────────────────────────────────────
const DEBT_BASE = 1_770_000_000_000;
const DEBT_PER_SEC = 2800;

function DebtCounter() {
  const [debt, setDebt] = useState(DEBT_BASE);
  const start = useRef(null);

  useEffect(() => {
    start.current = Date.now();
    const iv = setInterval(() => {
      const secs = (Date.now() - start.current) / 1000;
      setDebt(Math.floor(DEBT_BASE + secs * DEBT_PER_SEC));
    }, 100);
    return () => clearInterval(iv);
  }, []);

  const fmt = (n) => {
    const s = Math.floor(n).toString();
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff2020", display: "inline-block", animation: "pulse 1s ease-in-out infinite", boxShadow: "0 0 0 0 #ff2020" }} />
        <span style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase" }}>Live — U.S. Student Debt</span>
      </div>
      <div style={{ fontSize: "clamp(28px, 6vw, 58px)", fontWeight: 900, color: "#fff", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", lineHeight: 1 }}>
        ${fmt(debt)}
      </div>
      <div style={{ color: "#666", fontSize: 13, marginTop: 8 }}>Growing $2,800 every second · Source: Fed Reserve</div>
    </div>
  );
}

// ── Debt calculator ─────────────────────────────────────────────────────────
const SCHOOL_TYPES = [
  { label: "Community College", tuition: 8000 },
  { label: "State University",  tuition: 26000 },
  { label: "Private College",   tuition: 45000 },
  { label: "Ivy League",        tuition: 62000 },
];
const YEARS_OPTIONS = [2, 4, 6];
const LIVING_OPTIONS = [
  { label: "At Home", cost: 0 },
  { label: "Dorm",    cost: 12000 },
  { label: "Apt",     cost: 15000 },
];

function DebtCalculator() {
  const [si, setSi] = useState(1);
  const [yi, setYi] = useState(1);
  const [li, setLi] = useState(0);

  const school = SCHOOL_TYPES[si];
  const years  = YEARS_OPTIONS[yi];
  const living = LIVING_OPTIONS[li];

  const principal = (school.tuition + living.cost) * years;
  const rate = 0.065 / 12;
  const n = 120;
  const monthly = principal > 0 ? principal * rate / (1 - Math.pow(1 + rate, -n)) : 0;
  const totalPaid = monthly * n;
  const interest = totalPaid - principal;

  const tradeEarned = 35000 * Math.min(years, 4);
  const tradeCost = 5000;
  const advantage = principal + tradeEarned - tradeCost;

  const fmt = (v) => "$" + Math.round(v).toLocaleString("en-US");

  return (
    <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 16, padding: "32px 28px" }}>
      <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Interactive Calculator</p>
      <h2 style={{ color: "#fff", fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, marginBottom: 28, lineHeight: 1.1 }}>Your Real College Cost</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#888", fontSize: 13, fontWeight: 700 }}>School Type</span>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>{school.label} · {fmt(school.tuition)}/yr</span>
          </div>
          <input type="range" min={0} max={3} value={si} onChange={e => setSi(+e.target.value)} style={{ width: "100%", accentColor: "#ff2020" }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "#444", fontSize: 11, marginTop: 4 }}>
            <span>Community</span><span>State</span><span>Private</span><span>Ivy</span>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#888", fontSize: 13, fontWeight: 700 }}>Years Enrolled</span>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>{years} years</span>
          </div>
          <input type="range" min={0} max={2} value={yi} onChange={e => setYi(+e.target.value)} style={{ width: "100%", accentColor: "#ff2020" }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "#444", fontSize: 11, marginTop: 4 }}>
            <span>2 yrs</span><span>4 yrs</span><span>6 yrs</span>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#888", fontSize: 13, fontWeight: 700 }}>Living Situation</span>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>{living.label}</span>
          </div>
          <input type="range" min={0} max={2} value={li} onChange={e => setLi(+e.target.value)} style={{ width: "100%", accentColor: "#ff2020" }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "#444", fontSize: 11, marginTop: 4 }}>
            <span>At Home</span><span>Dorm</span><span>Apartment</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: "rgba(255,32,32,0.08)", border: "1px solid rgba(255,32,32,0.25)", borderRadius: 12, padding: "18px 16px" }}>
          <div style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>College Path</div>
          <div style={{ color: "#fff", fontSize: 32, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>{fmt(principal)}</div>
          <div style={{ color: "#555", fontSize: 11, marginBottom: 12 }}>total debt at graduation</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["Monthly (10yr)", fmt(monthly) + "/mo"],
              ["Total interest", fmt(interest)],
              ["Total repaid", fmt(totalPaid)],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#666" }}>{k}</span>
                <span style={{ color: "#ff2020", fontWeight: 800 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "18px 16px" }}>
          <div style={{ color: "#10b981", fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Trade Path</div>
          <div style={{ color: "#fff", fontSize: 32, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>{fmt(tradeCost)}</div>
          <div style={{ color: "#555", fontSize: 11, marginBottom: 12 }}>total program cost</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["Earned training", fmt(tradeEarned)],
              ["Monthly payment", "$0/mo"],
              ["Net advantage", fmt(advantage)],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#666" }}>{k}</span>
                <span style={{ color: "#10b981", fontWeight: 800 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          const txt = `College (${school.label}, ${years}yr): ${fmt(principal)} debt. Trade path: ${fmt(tradeCost)}. Net advantage: ${fmt(advantage)}. See yours: ihatecollege.com/debt-calculator`;
          if (typeof navigator !== "undefined") {
            if (navigator.share) navigator.share({ title: "My college debt estimate", text: txt });
            else if (navigator.clipboard) navigator.clipboard.writeText(txt);
          }
        }}
        style={{ width: "100%", padding: "14px", background: "#ff2020", color: "#fff", fontWeight: 900, fontSize: 14, borderRadius: 10, border: "none", cursor: "pointer", transition: "background 0.2s" }}
        onMouseOver={e => e.target.style.background = "#cc0000"}
        onMouseOut={e => e.target.style.background = "#ff2020"}
      >
        Share Your Result →
      </button>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { num: "$1.77T",   label: "Total student debt",         source: "Fed Reserve 2024" },
  { num: "44M",      label: "Borrowers in the US",         source: "Dept of Education" },
  { num: "$37,574",  label: "Avg debt per graduate",       source: "NCES 2024" },
  { num: "53%",      label: "Recent grads underemployed",  source: "Fed Reserve NY" },
];

const TRADE_PATHS = [
  { title: "Electrician",   emoji: "⚡", salary: "$75k–$115k", time: "4yr apprentice", debt: "$0",    earn10: "$850k", color: "#f59e0b" },
  { title: "Plumber",       emoji: "🔧", salary: "$68k–$105k", time: "4yr apprentice", debt: "$0",    earn10: "$780k", color: "#3b82f6" },
  { title: "HVAC Tech",     emoji: "❄️", salary: "$62k–$95k",  time: "3yr apprentice", debt: "$5k",   earn10: "$720k", color: "#06b6d4" },
  { title: "Welder",        emoji: "🔥", salary: "$55k–$90k",  time: "6mo cert",       debt: "$5k",   earn10: "$660k", color: "#f97316" },
  { title: "Coder",         emoji: "💻", salary: "$85k–$140k", time: "6–12mo bootcamp", debt: "$15k", earn10: "$1.1M", color: "#8b5cf6" },
  { title: "Real Estate",   emoji: "🏠", salary: "$65k–$130k", time: "3mo license",    debt: "$500",  earn10: "$950k", color: "#10b981" },
];

// ── Article image helper ─────────────────────────────────────────────────────
const ARTICLE_IMAGES = {
  "alternatives-to-college-2025":               "photo-1517694712202-14dd9538aa97",
  "apprenticeship-programs-near-me-2025":       "photo-1519085360753-af0119f7cbe7",
  "aws-certification-salary-2025":              "photo-1587440871875-191322ee64b0",
  "best-trade-schools-in-america-2025":         "photo-1556761175-5973dc0f32e7",
  "boilermaker-apprenticeship-pay":             "photo-1565008576549-57569a49371d",
  "cdl-truck-driver-salary-2025":               "photo-1601584115197-04ecc0da31d7",
  "cheapest-way-to-get-a-good-career":          "photo-1450101499163-c8848c66ca85",
  "civil-service-jobs-no-degree-required":      "photo-1529107386315-e1a2ed48a620",
  "coding-bootcamp-worth-it-2025":              "photo-1461749280684-dccba630e2f6",
  "college-debt-not-worth-it":                  "photo-1567427017947-545c5f8d16ad",
  "college-dropout-success-stories":            "photo-1542744173-8e7e53415bb0",
  "college-is-a-scam":                          "photo-1611974789855-9c2a0a7236a3",
  "college-is-a-waste-of-money":                "photo-1554224155-8d04cb21cd6c",
  "college-major-with-best-roi":                "photo-1532619187608-e5375cab36aa",
  "college-regret-statistics":                  "photo-1516979187457-637abb4f9353",
  "community-college-vs-university":            "photo-1562774053-701939374585",
  "comptia-a-certification-jobs":               "photo-1488590528505-98d2b5aba04b",
  "cybersecurity-certifications-worth-it-2025": "photo-1550751827-4bd374c3f58b",
  "drop-out-of-college-and-succeed":            "photo-1556742049-0cfed4f6a45d",
  "electrician-salary-2025":                    "photo-1621905251918-48416bd8575a",
  "elevator-mechanic-salary":                   "photo-1555680202-c86f0e12f086",
  "fiber-optic-technician-salary":              "photo-1519389950473-47ba0277781c",
  "free-online-courses-that-get-you-hired":     "photo-1498050108023-c5249f4df085",
  "google-career-certificates-worth-it":        "photo-1516321318423-f06f85e504b3",
  "highest-paying-trade-jobs-2025":             "photo-1504307651254-35680f356dfd",
  "how-to-become-an-electrician-without-college": "photo-1621905252507-b35492cc74b4",
  "how-to-make-money-without-a-degree":         "photo-1515378791036-0648a3ef77b2",
  "hvac-technician-salary-2025":                "photo-1609220136736-443140cfeaa6",
  "i-hate-college":                             "photo-1541339907198-a93c85da3c8e",
  "i-hate-college-so-much":                     "photo-1580582932707-520aed937b7b",
  "ironworker-apprenticeship":                  "photo-1590599145008-b2c79c4ce28c",
  "is-college-worth-it-2025":                   "photo-1523240795612-9a054b0db644",
  "lineman-apprenticeship-salary":              "photo-1473341304170-971dccb5ac1e",
  "millwright-trade-school-salary":             "photo-1581091226825-a6a2a5aee158",
  "offshore-oil-rig-jobs-no-degree":            "photo-1521737604893-d14cc237f11d",
  "pipe-fitter-salary-2025":                    "photo-1563013544-824ae1b704d3",
  "plumber-vs-lawyer-salary":                   "photo-1558618666-fcd25c85cd64",
  "sheet-metal-worker-salary":                  "photo-1516937941344-00b4e0337589",
  "should-i-drop-out-of-college":               "photo-1454165804606-c3d57bc86b40",
  "should-i-go-to-college-or-work":             "photo-1507003211169-0a1dd7228f2d",
  "skilled-trades-shortage-america":            "photo-1581094794329-c8112a89af12",
  "solar-panel-installer-salary-2025":          "photo-1509391366360-2e959784a276",
  "student-loan-debt-crisis-2025":              "photo-1579621970563-ebec7560ff3e",
  "trade-school-salary-vs-college-2025":        "photo-1565688534245-05d6b5be184a",
  "union-vs-non-union-trade-jobs":              "photo-1520863864565-c2ebcff09d5b",
  "welder-salary-2025":                         "photo-1504328345606-18bbc8c9d7d1",
  "why-college-is-not-worth-it":                "photo-1434030216411-0b793f4b6173",
  "wind-turbine-technician-salary":             "photo-1466611653911-95081537e5b7",
};

function getArticleImage(slug = "") {
  const id = ARTICLE_IMAGES[slug] || "photo-1523050854058";
  return `https://images.unsplash.com/${id}?w=800&h=450&fit=crop&auto=format`;
}

function getArticleCategory(slug = "", keyword = "") {
  const s = (slug + " " + keyword).toLowerCase();
  if (/electric|plumb|weld|hvac|boiler|iron|line|mill|sheet|pipe|rigg|fiber|cdl|truck|solar|wind|offshore|trade|skill|apprentice|union/.test(s)) return "TRADES";
  if (/cert|aws|google|comptia|cyber|coding|bootcamp|cloud/.test(s)) return "CERTS";
  if (/debt|loan|crisis|statistic|regret/.test(s)) return "DATA";
  if (/salary|pay|earn|income|wage/.test(s)) return "SALARY";
  if (/should|worth|vs|compare|better|scam|waste|hate|drop/.test(s)) return "GUIDE";
  return "FEATURED";
}

// ── Real Stories ─────────────────────────────────────────────────────────────
const STORIES = [
  {
    name: "Tyler M., 24",
    career: "Journeyman Electrician",
    location: "Dallas, TX",
    salary: "$94k/yr",
    debtAvoided: "$87,000",
    quote: "Turned down $87k in loans. Went IBEW union. Made $42k my first year as an apprentice. Four years in, I'm clearing six figures with zero debt and a pension.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=560&fit=crop&auto=format",
  },
  {
    name: "Kayla R., 26",
    career: "Licensed Master Plumber",
    location: "Phoenix, AZ",
    salary: "$88k/yr",
    debtAvoided: "$120,000",
    quote: "My college roommate took out $120k for a psych degree and is waiting tables. I own my van, set my own hours, bought a house at 25, and never sat through a single lecture.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&h=560&fit=crop&auto=format",
  },
  {
    name: "Marcus D., 23",
    career: "AWS Cloud Architect",
    location: "Remote",
    salary: "$112k/yr",
    debtAvoided: "$95,000",
    quote: "Spent $3,200 on AWS certs. Got hired at $95k after 6 months of self-study. My friend with a CS degree has $90k debt and makes less than me. Already been promoted twice.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=900&h=560&fit=crop&auto=format",
  },
];

// ── Fallback articles (if dynamic load fails) ────────────────────────────────
const FALLBACK_ARTICLES = [
  { slug: "highest-paying-trade-jobs-2025",              category: "TRADES",  author: "Marcus Bell",    readTime: "6 min", title: "The 8 Highest-Paying Trade Jobs in 2025 (Real Salary Data)" },
  { slug: "electrician-salary-2025",                     category: "TRADES",  author: "Jake Callahan",  readTime: "5 min", title: "Electrician Salary in 2025: What You Actually Make" },
  { slug: "student-loan-debt-crisis-2025",               category: "DATA",    author: "Sara Whitfield", readTime: "7 min", title: "The Student Loan Crisis Is Worse Than You Think" },
  { slug: "should-i-go-to-college-or-work",              category: "GUIDE",   author: "Tyler Okafor",   readTime: "8 min", title: "Should I Go to College or Work? The Honest Answer" },
  { slug: "how-to-become-an-electrician-without-college", category: "HOW-TO", author: "Derek Pham",     readTime: "6 min", title: "How to Become an Electrician Without College" },
  { slug: "community-college-vs-university",             category: "DATA",    author: "Megan Torres",   readTime: "5 min", title: "Community College vs University: The Financial Reality" },
  { slug: "google-career-certificates-worth-it",         category: "CERTS",   author: "Jordan Reese",   readTime: "5 min", title: "Are Google Career Certificates Worth It in 2025?" },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage({ articles = [] }) {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");

  const displayArticles = articles.length >= 4 ? articles : FALLBACK_ARTICLES;

  async function handleEmail(e) {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("loading");
    try {
      const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      setEmailStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch { setEmailStatus("error"); }
  }

  return (
    <Layout>
      <SEO
        title="IHateCollege.com — College Is A Scam. We Have The Receipts."
        description="$1.77 trillion in student debt. 44 million borrowers. 53% underemployed. Find high-paying careers without a degree — trades, certs, government jobs."
        keywords="college alternatives, is college worth it, student debt crisis, trade school vs college, no degree jobs, high paying careers without degree"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "IHateCollege.com",
          "url": "https://ihatecollege.com",
          "description": "The anti-college movement. Real data on student debt and high-paying alternatives.",
          "potentialAction": { "@type": "SearchAction", "target": "https://ihatecollege.com/college-rankings?q={search_term_string}", "query-input": "required name=search_term_string" }
        }}
      />

      <p style={{ display: "none" }}>Impact-Site-Verification: 7a99b8bc-6d3b-4c9c-9f76-ce1301771cc1</p>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="hero-section" style={{ minHeight: "92vh", display: "flex", alignItems: "center", padding: "60px 20px", position: "relative", overflow: "hidden" }}>
        {/* Subtle background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=900&fit=crop&auto=format"
            alt=""
            fill
            priority
            style={{ objectFit: "cover", opacity: 0.06 }}
            sizes="100vw"
          />
        </div>
        {/* Red glow */}
        <div style={{ position: "absolute", top: "20%", left: "30%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(255,32,32,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="hero-grid">
          {/* LEFT: text */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 999, padding: "6px 14px", marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff2020", flexShrink: 0 }} />
              <span style={{ color: "#888", fontSize: 15, fontWeight: 700, letterSpacing: "0.04em" }}>The truth they don&apos;t teach at orientation</span>
            </div>

            <h1 style={{ fontSize: "clamp(38px, 5vw, 76px)", fontWeight: 900, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 24 }}>
              College Is A Scam.<br />
              <span style={{ color: "#ff2020" }}>We Have The Receipts.</span>
            </h1>

            <p style={{ color: "#888", fontSize: "clamp(16px,2vw,18px)", maxWidth: 480, marginBottom: 40, lineHeight: 1.5 }}>
              Join the generation that said no to debt.
            </p>

            <div style={{ marginBottom: 48 }}>
              <DebtCounter />
            </div>

            <div className="hero-cta-row" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/college-rankings" style={{ background: "#ff2020", color: "#fff", fontWeight: 900, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none" }}>
                Is My School Worth It? →
              </Link>
              <Link href="/debt-calculator" style={{ background: "#1a1a1a", color: "#fff", fontWeight: 900, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid #2a2a2a" }}>
                Calculate My Debt
              </Link>
              <Link href="/job-board" style={{ background: "#1a1a1a", color: "#fff", fontWeight: 900, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid #2a2a2a" }}>
                Jobs Without Degrees
              </Link>
              <Link href="/job-board#post" style={{ background: "#1a1a1a", color: "#f59e0b", fontWeight: 900, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid #f59e0b33" }}>
                Post a Job (Employers) →
              </Link>
            </div>
          </div>

          {/* RIGHT: image mosaic */}
          <div className="hero-images" style={{ display: "grid", gridTemplateRows: "240px 200px", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {/* Top: full-width image */}
            <div style={{ gridColumn: "1 / -1", borderRadius: 16, overflow: "hidden", position: "relative" }}>
              <Image
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&h=500&fit=crop&auto=format"
                alt="College debt trap"
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 16, left: 18, right: 18 }}>
                <span style={{ background: "rgba(255,32,32,0.9)", color: "#fff", fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", padding: "3px 8px", borderRadius: 4, textTransform: "uppercase" }}>The Trap</span>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 800, marginTop: 5, lineHeight: 1.2 }}>4 years · $120k debt · no job guarantee</div>
              </div>
            </div>

            {/* Bottom left */}
            <div style={{ borderRadius: 14, overflow: "hidden", position: "relative" }}>
              <Image
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=400&fit=crop&auto=format"
                alt="Electrician earning six figures"
                fill
                style={{ objectFit: "cover" }}
                sizes="25vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
                <span style={{ background: "rgba(16,185,129,0.9)", color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 3, textTransform: "uppercase" }}>The Move</span>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 800, marginTop: 3 }}>Electrician · $94k/yr · $0 debt</div>
              </div>
            </div>

            {/* Bottom right */}
            <div style={{ borderRadius: 14, overflow: "hidden", position: "relative" }}>
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop&auto=format"
                alt="Trades worker outearning college grads"
                fill
                style={{ objectFit: "cover" }}
                sizes="25vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
                <span style={{ background: "rgba(16,185,129,0.9)", color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 3, textTransform: "uppercase" }}>The Move</span>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 800, marginTop: 3 }}>Plumber · $88k/yr · $0 debt</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ────────────────────────────────────────────────────── */}
      <section style={{ background: "#000", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "60px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ textAlign: "center", color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 40 }}>
            The Numbers Don&apos;t Lie
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
            {STATS.map((s) => (
              <div key={s.num} style={{ textAlign: "center", padding: "32px 20px", borderRight: "1px solid #1a1a1a" }}>
                <div style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: "#ff2020", lineHeight: 1, marginBottom: 10, letterSpacing: "-0.02em" }}>
                  {s.num}
                </div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.label}</div>
                <div style={{ color: "#444", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD ───────────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 20px" }}>
        <AdUnit slot="6600722153" />
      </div>

      {/* ── BLOG / MAGAZINE SECTION ──────────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28 }}>
          <div>
            <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Latest</p>
            <h2 style={{ color: "#fff", fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, margin: 0 }}>From The Files</h2>
          </div>
          <Link href="/blog" style={{ color: "#ff2020", fontSize: 13, fontWeight: 800, textDecoration: "none" }}>All Articles →</Link>
        </div>

        {/* Featured + side stack */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1fr)", gap: 16, marginBottom: 16 }} className="blog-main-grid">
          {/* Featured */}
          <Link href={`/blog/${displayArticles[0].slug}`} style={{ textDecoration: "none", display: "block", background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}
            onMouseOver={e => e.currentTarget.style.borderColor = "#ff2020"}
            onMouseOut={e => e.currentTarget.style.borderColor = "#2a2a2a"}
          >
            <div style={{ height: 240, position: "relative", overflow: "hidden" }}>
              <Image
                src={getArticleImage(displayArticles[0].slug)}
                alt={displayArticles[0].title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
            </div>
            <div style={{ padding: "20px 22px 22px" }}>
              <span style={{ background: "#ff2020", color: "#fff", fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 4 }}>{displayArticles[0].category || getArticleCategory(displayArticles[0].slug)}</span>
              <h3 style={{ color: "#fff", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 900, margin: "12px 0 10px", lineHeight: 1.2 }}>{displayArticles[0].title}</h3>
              <div style={{ color: "#555", fontSize: 12, display: "flex", gap: 12 }}>
                <span>{displayArticles[0].author}</span>
                {displayArticles[0].readTime && <><span>·</span><span>{displayArticles[0].readTime} read</span></>}
                {displayArticles[0].date && <><span>·</span><span>{displayArticles[0].date}</span></>}
              </div>
            </div>
          </Link>

          {/* Side stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {displayArticles.slice(1, 4).map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "block", background: "#111", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden", flex: 1, transition: "border-color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = "#ff2020"}
                onMouseOut={e => e.currentTarget.style.borderColor = "#2a2a2a"}
              >
                <div style={{ display: "flex", height: "100%" }}>
                  <div style={{ width: 90, flexShrink: 0, position: "relative", minHeight: 80 }}>
                    <Image
                      src={getArticleImage(a.slug)}
                      alt={a.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="90px"
                    />
                  </div>
                  <div style={{ padding: "12px 14px", flex: 1 }}>
                    <span style={{ background: "rgba(255,32,32,0.15)", color: "#ff2020", fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 3 }}>{a.category || getArticleCategory(a.slug)}</span>
                    <h3 style={{ color: "#fff", fontSize: 13, fontWeight: 800, margin: "6px 0 5px", lineHeight: 1.3 }}>{a.title}</h3>
                    <div style={{ color: "#555", fontSize: 11 }}>{a.author}{a.date ? ` · ${a.date}` : ""}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 3-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {displayArticles.slice(4).map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "block", background: "#111", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#ff2020"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#2a2a2a"}
            >
              <div style={{ height: 160, position: "relative" }}>
                <Image
                  src={getArticleImage(a.slug)}
                  alt={a.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: 18 }}>
                <span style={{ background: "rgba(255,32,32,0.15)", color: "#ff2020", fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 3 }}>{a.category || getArticleCategory(a.slug)}</span>
                <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 800, margin: "10px 0 8px", lineHeight: 1.3 }}>{a.title}</h3>
                <div style={{ color: "#555", fontSize: 12 }}>{a.author}{a.date ? ` · ${a.date}` : ""}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── DEBT CALCULATOR ──────────────────────────────────────────────────── */}
      <section style={{ background: "#050505", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "60px 20px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <DebtCalculator />
        </div>
      </section>

      {/* ── REAL STORIES ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "60px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Real People. Real Results.</p>
            <h2 style={{ color: "#fff", fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, margin: 0 }}>They Skipped College. Here&apos;s What Happened.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {STORIES.map((s) => (
              <div key={s.name} style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ height: 200, position: "relative" }}>
                  <Image
                    src={s.image}
                    alt={s.career}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ color: "#10b981", fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{s.salary}</div>
                      <div style={{ color: "#aaa", fontSize: 12 }}>{s.career} · {s.location}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#ff2020", fontSize: 11, fontWeight: 900 }}>DEBT AVOIDED</div>
                      <div style={{ color: "#fff", fontSize: 16, fontWeight: 900 }}>{s.debtAvoided}</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "18px 20px 20px" }}>
                  <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.6, margin: "0 0 14px", fontStyle: "italic" }}>&ldquo;{s.quote}&rdquo;</p>
                  <div style={{ color: "#666", fontSize: 12, fontWeight: 700 }}>— {s.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADE PATHS ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "60px 0", background: "#050505", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Skip The Debt, Keep The Income</p>
            <h2 style={{ color: "#fff", fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, margin: 0 }}>6 Paths That Pay Without A Degree</h2>
          </div>

          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12 }}>
            {TRADE_PATHS.map((t) => (
              <div key={t.title} style={{ background: "#111", border: `1px solid ${t.color}30`, borderRadius: 14, padding: "22px 20px", minWidth: 190, flexShrink: 0 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{t.emoji}</div>
                <div style={{ color: "#fff", fontSize: 17, fontWeight: 900, marginBottom: 4 }}>{t.title}</div>
                <div style={{ color: t.color, fontSize: 20, fontWeight: 900, marginBottom: 10 }}>{t.salary}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    ["Training", t.time],
                    ["Debt",     t.debt],
                    ["10yr earn", t.earn10],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "#555" }}>{k}</span>
                      <span style={{ color: "#ccc", fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "#444", fontSize: 11, marginTop: 10 }}>Scroll for more →</p>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ────────────────────────────────────────────────────── */}
      <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <p style={{ color: "#ff2020", fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Weekly Intelligence</p>
          <h2 style={{ color: "#fff", fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
            Get The Weekly<br />Anti-College Report
          </h2>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 28 }}>No spam. Just receipts.</p>

          {emailStatus === "success" ? (
            <div style={{ color: "#10b981", fontWeight: 800, fontSize: 16 }}>✓ You&apos;re in. Check your inbox.</div>
          ) : (
            <form onSubmit={handleEmail} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="your@email.com"
                style={{ flex: "1 1 220px", maxWidth: 300, padding: "13px 16px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff", fontSize: 14, outline: "none" }}
              />
              <button type="submit" disabled={emailStatus === "loading"}
                style={{ padding: "13px 24px", background: "#ff2020", color: "#fff", fontWeight: 900, fontSize: 14, borderRadius: 8, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {emailStatus === "loading" ? "..." : "Subscribe Free →"}
              </button>
            </form>
          )}
          {emailStatus === "error" && <p style={{ color: "#ff2020", fontSize: 12, marginTop: 8 }}>Something went wrong. Try again.</p>}
        </div>
      </section>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,32,32,0.7); }
          50% { opacity: 0.7; box-shadow: 0 0 0 8px rgba(255,32,32,0); }
        }
        @media (max-width: 768px) {
          /* Hero: single column, no image mosaic */
          .hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .hero-images { display: none !important; }
          /* Hero section: reduce padding on mobile */
          .hero-section { min-height: auto !important; padding: 40px 16px 48px !important; }
          /* Blog grid: single column */
          .blog-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          /* CTA buttons: full width on small phones */
          .hero-cta-row { flex-direction: column !important; }
          .hero-cta-row a { width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const path = require("path");

  let articles = [];

  try {
    const blogDir = path.join(process.cwd(), "pages", "blog");
    const files = fs.readdirSync(blogDir).filter(
      (f) => f.endsWith(".js") && f !== "index.js"
    );

    for (const file of files) {
      const slug = file.replace(".js", "");
      const content = fs.readFileSync(path.join(blogDir, file), "utf8");

      const titleMatch = content.match(/title="((?:[^"\\]|\\.)*)"/);
      const dateMatch = content.match(/\/\/ date: (\d{4}-\d{2}-\d{2})/);
      const authorMatch = content.match(/\/\/ author: ([^\n]+)/);
      const keywordMatch = content.match(/\/\/ keyword: ([^\n]+)/);

      const slug_ = slug;
      const keyword = keywordMatch ? keywordMatch[1].trim() : "";

      articles.push({
        slug: slug_,
        title: titleMatch
          ? titleMatch[1].replace(/\\"/g, '"')
          : slug_.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        date: dateMatch ? dateMatch[1] : "2025-01-01",
        author: authorMatch ? authorMatch[1].trim() : "Staff Writer",
        category: (() => {
          const s = (slug_ + " " + keyword).toLowerCase();
          if (/electric|plumb|weld|hvac|boiler|iron|line|mill|sheet|pipe|rigg|fiber|cdl|truck|solar|wind|offshore|trade|skill|apprentice|union/.test(s)) return "TRADES";
          if (/cert|aws|google|comptia|cyber|coding|bootcamp|cloud/.test(s)) return "CERTS";
          if (/debt|loan|crisis|statistic|regret/.test(s)) return "DATA";
          if (/salary|pay|earn|income|wage/.test(s)) return "SALARY";
          if (/should|worth|vs|compare|better|scam|waste|hate|drop/.test(s)) return "GUIDE";
          return "FEATURED";
        })(),
      });
    }

    articles.sort((a, b) => b.date.localeCompare(a.date));
    articles = articles.slice(0, 7);
  } catch (e) {
    console.error("getStaticProps blog load error:", e.message);
  }

  return { props: { articles }, revalidate: 3600 };
}
