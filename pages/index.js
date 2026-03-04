import { useState, useEffect, useRef } from "react";
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
        {/* School type */}
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

        {/* Years */}
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

        {/* Living */}
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

      {/* Results side by side */}
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

const ARTICLES = [
  { slug: "highest-paying-trade-jobs-2025",              category: "TRADES",  author: "Marcus Bell",    readTime: "6 min", title: "The 8 Highest-Paying Trade Jobs in 2025 (Real Salary Data)" },
  { slug: "electrician-salary-2025",                     category: "TRADES",  author: "Jake Callahan",  readTime: "5 min", title: "Electrician Salary in 2025: What You Actually Make" },
  { slug: "student-loan-debt-crisis-2025",               category: "DATA",    author: "Sara Whitfield", readTime: "7 min", title: "The Student Loan Crisis Is Worse Than You Think" },
  { slug: "should-i-go-to-college-or-work",              category: "GUIDE",   author: "Tyler Okafor",   readTime: "8 min", title: "Should I Go to College or Work? The Honest Answer" },
  { slug: "how-to-become-an-electrician-without-college", category: "HOW-TO", author: "Derek Pham",     readTime: "6 min", title: "How to Become an Electrician Without College" },
  { slug: "community-college-vs-university",             category: "DATA",    author: "Megan Torres",   readTime: "5 min", title: "Community College vs University: The Financial Reality" },
  { slug: "google-career-certificates-worth-it",         category: "CERTS",   author: "Jordan Reese",   readTime: "5 min", title: "Are Google Career Certificates Worth It in 2025?" },
];

const TRADE_PATHS = [
  { title: "Electrician",   emoji: "⚡", salary: "$75k–$115k", time: "4yr apprentice", debt: "$0",    earn10: "$850k", color: "#f59e0b" },
  { title: "Plumber",       emoji: "🔧", salary: "$68k–$105k", time: "4yr apprentice", debt: "$0",    earn10: "$780k", color: "#3b82f6" },
  { title: "HVAC Tech",     emoji: "❄️", salary: "$62k–$95k",  time: "3yr apprentice", debt: "$5k",   earn10: "$720k", color: "#06b6d4" },
  { title: "Welder",        emoji: "🔥", salary: "$55k–$90k",  time: "6mo cert",       debt: "$5k",   earn10: "$660k", color: "#f97316" },
  { title: "Coder",         emoji: "💻", salary: "$85k–$140k", time: "6–12mo bootcamp", debt: "$15k", earn10: "$1.1M", color: "#8b5cf6" },
  { title: "Real Estate",   emoji: "🏠", salary: "$65k–$130k", time: "3mo license",    debt: "$500",  earn10: "$950k", color: "#10b981" },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");

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
      <section style={{ minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(255,32,32,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 860, width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 999, padding: "6px 14px", marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff2020", flexShrink: 0 }} />
            <span style={{ color: "#888", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>The truth they don&apos;t teach at orientation</span>
          </div>

          <h1 style={{ fontSize: "clamp(38px, 8vw, 86px)", fontWeight: 900, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 24 }}>
            College Is A Scam.<br />
            <span style={{ color: "#ff2020" }}>We Have The Receipts.</span>
          </h1>

          <p style={{ color: "#888", fontSize: "clamp(16px,2.5vw,20px)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.5 }}>
            Join the generation that said no to debt.
          </p>

          <div style={{ marginBottom: 56 }}>
            <DebtCounter />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link href="/college-rankings" style={{ background: "#ff2020", color: "#fff", fontWeight: 900, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none", transition: "background 0.2s" }}>
              Is My School Worth It? →
            </Link>
            <Link href="/debt-calculator" style={{ background: "#1a1a1a", color: "#fff", fontWeight: 900, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid #2a2a2a" }}>
              Calculate My Debt
            </Link>
            <Link href="/job-board" style={{ background: "#1a1a1a", color: "#fff", fontWeight: 900, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid #2a2a2a" }}>
              Jobs Without Degrees
            </Link>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1fr)", gap: 16 }}>
            {/* Featured */}
            <Link href={`/blog/${ARTICLES[0].slug}`} style={{ textDecoration: "none", display: "block", background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#ff2020"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#2a2a2a"}
            >
              <div style={{ background: "#1a1a1a", height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 48 }}>📚</span>
              </div>
              <div style={{ padding: "20px 22px 22px" }}>
                <span style={{ background: "#ff2020", color: "#fff", fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 4 }}>{ARTICLES[0].category}</span>
                <h3 style={{ color: "#fff", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 900, margin: "12px 0 10px", lineHeight: 1.2 }}>{ARTICLES[0].title}</h3>
                <div style={{ color: "#555", fontSize: 12, display: "flex", gap: 12 }}>
                  <span>{ARTICLES[0].author}</span>
                  <span>·</span>
                  <span>{ARTICLES[0].readTime} read</span>
                </div>
              </div>
            </Link>

            {/* Side stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ARTICLES.slice(1, 4).map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "block", background: "#111", border: "1px solid #2a2a2a", borderRadius: 10, padding: "16px 18px", flex: 1, transition: "border-color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.borderColor = "#ff2020"}
                  onMouseOut={e => e.currentTarget.style.borderColor = "#2a2a2a"}
                >
                  <span style={{ background: "rgba(255,32,32,0.15)", color: "#ff2020", fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 3 }}>{a.category}</span>
                  <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 800, margin: "8px 0 6px", lineHeight: 1.3 }}>{a.title}</h3>
                  <div style={{ color: "#555", fontSize: 11 }}>{a.author} · {a.readTime} read</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {ARTICLES.slice(4).map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "block", background: "#111", border: "1px solid #2a2a2a", borderRadius: 10, padding: "20px", transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#ff2020"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#2a2a2a"}
            >
              <span style={{ background: "rgba(255,32,32,0.15)", color: "#ff2020", fontSize: 9, fontWeight: 900, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 3 }}>{a.category}</span>
              <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 800, margin: "10px 0 8px", lineHeight: 1.3 }}>{a.title}</h3>
              <div style={{ color: "#555", fontSize: 12 }}>{a.author} · {a.readTime} read</div>
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

      {/* ── TRADE PATHS ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "60px 0" }}>
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
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 3600 };
}
