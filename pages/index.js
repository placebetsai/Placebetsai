import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import DecisionWizard from "../components/DecisionWizard";
import NewsTicker from "../components/NewsTicker";
import AdUnit from "../components/AdUnit";
import EmailCapture from "../components/EmailCapture";
import dynamic from "next/dynamic";

const HOT_JOBS = [
  { title: "Software Developer", category: "Tech", salaryLow: 75000, salaryHigh: 140000, time: "6–12 months", color: "text-sky-400 bg-sky-900/30 border-sky-700" },
  { title: "Electrician", category: "Trades", salaryLow: 65000, salaryHigh: 110000, time: "Paid apprenticeship", color: "text-amber-400 bg-amber-900/30 border-amber-700" },
  { title: "Wind Turbine Tech", category: "Trades", salaryLow: 65000, salaryHigh: 105000, time: "2 years", color: "text-amber-400 bg-amber-900/30 border-amber-700" },
  { title: "Air Traffic Controller", category: "Government", salaryLow: 85000, salaryHigh: 140000, time: "FAA Academy (paid)", color: "text-violet-400 bg-violet-900/30 border-violet-700" },
  { title: "Cybersecurity Analyst", category: "Tech", salaryLow: 80000, salaryHigh: 130000, time: "6–9 months", color: "text-sky-400 bg-sky-900/30 border-sky-700" },
  { title: "Real Estate Agent", category: "Business", salaryLow: 50000, salaryHigh: 150000, time: "1–3 months (license)", color: "text-emerald-400 bg-emerald-900/30 border-emerald-700" },
];

function CollegeLookupPreview() {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => { fetchSchools("University"); }, []);

  const fetchSchools = async (term) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/college-rankings?search=${encodeURIComponent(term)}`);
      const data = await res.json();
      setSchools((data.results || []).slice(0, 5));
    } catch { setSchools([]); }
    finally { setLoading(false); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) fetchSchools(query);
  };

  return (
    <section className="rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-slate-800">
        <p className="text-xs uppercase tracking-widest text-red-400 font-bold mb-1">GOVERNMENT DATA · NO SPIN</p>
        <h2 className="text-2xl font-black text-white mb-1">Is Your College a Debt Trap?</h2>
        <p className="text-slate-400 text-sm mb-4">Real cost, avg debt, and what grads earn 10 years later.</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any college..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button type="submit" className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm transition-colors">
            Look It Up
          </button>
        </form>
      </div>

      <div className="divide-y divide-slate-800">
        {loading ? (
          <div className="flex items-center justify-center py-10 gap-3">
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-400 text-sm">Pulling government data...</span>
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">No results. Try a different name.</div>
        ) : schools.map((s) => {
          const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          return (
            <Link key={s.id} href={`/college/${slug}`} className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-slate-800/50 transition-colors group">
              <div>
                <div className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors">{s.name}</div>
                <div className="text-slate-500 text-xs">{s.city}, {s.state}</div>
              </div>
              <div className="flex gap-5 shrink-0 text-right">
                <div><div className="text-[10px] text-slate-500 uppercase">Cost/yr</div><div className="text-xs font-bold text-white">{s.cost}</div></div>
                <div><div className="text-[10px] text-slate-500 uppercase">Debt</div><div className="text-xs font-bold text-red-400">{s.debt}</div></div>
                <div><div className="text-[10px] text-slate-500 uppercase">10yr Earn</div><div className="text-xs font-bold text-green-400">{s.earnings}</div></div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="px-6 py-4 border-t border-slate-800 text-center">
        <Link href="/college-rankings" className="text-sm font-bold text-sky-400 hover:underline">
          Browse all college rankings →
        </Link>
      </div>
    </section>
  );
}

// Matches your GitHub screenshot exactly: TradeHero.js
const TradeHero = dynamic(() =>
  import("../components/TradeHero").catch(() => () => null)
);

export default function HomePage({ tradeData }) {
  return (
    <Layout>
      <SEO />

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16 space-y-12">
        <div className="w-full">
          <NewsTicker />
        </div>

        <div className="space-y-6">
          {/* --- SECTION 1: HERO --- */}
          <section className="hero">
            <p className="eyebrow text-slate-400 mb-4">
              YOU DON'T HAVE TO SIGN YOUR LIFE AWAY
            </p>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
              College is <span className="text-sky-400">Optional</span>.
              <br />
              Debt is <span className="text-red-500">Not</span>.
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Before you borrow{" "}
              <span className="text-white font-bold">$50k–$150k</span>, run the
              numbers. Compare trades, tech careers, apprenticeships, and real
              alternatives.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/alternatives"
                className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-sky-50 transition-colors"
              >
                Explore Alternatives
              </Link>
              <Link
                href="/debt-calculator"
                className="px-8 py-4 rounded-full border border-slate-600 text-white font-bold text-lg hover:border-white transition-colors"
              >
                See the Real Cost
              </Link>
            </div>

            {/* ✅ NEW: TRENDING BRIDGE ON HOMEPAGE (WHAT YOU ASKED FOR) */}
            <div className="mt-10 max-w-3xl mx-auto">
              <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-700">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">
                  TRENDING
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                  Searching for the “I Hate College” song?
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  People search that phrase for music — but the reason it goes
                  viral is bigger than a track. Here’s why it hits, what it
                  really means, and what to do if college isn’t working for you.
                </p>
                <Link
                  href="/i-hate-college-song"
                  className="text-sky-400 font-bold hover:underline"
                >
                  Read the breakdown →
                </Link>
              </section>
            </div>
          </section>

          {/* --- RESTORED STATS BOXES --- */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* THE "TRAP" BOX */}
            <div className="group p-6 rounded-2xl bg-slate-900/80 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:border-red-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center gap-4">
              <div>
                <div className="text-3xl md:text-4xl font-black text-red-400 group-hover:text-red-300 transition-colors">
                  $37k+
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Avg Student Debt
                </div>
              </div>
              <div className="w-12 h-px bg-slate-800 group-hover:bg-red-500/50 transition-colors"></div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-white">
                  4 Years
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Time in Class
                </div>
              </div>
            </div>

            {/* THE "ESCAPE" BOX */}
            <div className="group p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center gap-4">
              <div>
                <div className="text-3xl md:text-4xl font-black text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  6–12 Mos
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Typical Cert Path
                </div>
              </div>
              <div className="w-12 h-px bg-slate-800 group-hover:bg-emerald-500/50 transition-colors"></div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-white">
                  Paid
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Apprenticeships
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- COLLEGE LOOKUP PREVIEW --- */}
        <CollegeLookupPreview />

        {/* --- JOBS TEASER --- */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">NO DEGREE REQUIRED</p>
              <h2 className="text-2xl font-black text-white">Jobs That Pay Without College</h2>
            </div>
            <Link href="/jobs" className="text-sm font-bold text-sky-400 hover:underline shrink-0">
              Browse all jobs →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {HOT_JOBS.map((job) => (
              <Link key={job.title} href="/jobs"
                className="flex flex-col justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all group">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors leading-snug">{job.title}</div>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${job.color}`}>{job.category}</span>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div className="text-emerald-400 font-black text-sm">${(job.salaryLow/1000).toFixed(0)}k–${(job.salaryHigh/1000).toFixed(0)}k</div>
                  <div className="text-slate-500 text-xs">{job.time}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- TRADE OF THE MONTH SECTION --- */}
        {tradeData && <TradeHero trade={tradeData} />}

        <section>
          <DecisionWizard />
        </section>

        {/* --- HIGH INCOME PATHS --- */}
        <section className="section">
          <h2 className="section-title text-3xl mb-8">
            High-Income Paths (No Degree)
          </h2>
          <div className="path-grid grid md:grid-cols-3 gap-6">
            <div className="glow-card p-6 bg-slate-900 border border-slate-700 rounded-xl group">
              <h3 className="text-xl font-bold mb-2 text-white">Tech & Cyber</h3>
              <p className="text-sm text-slate-400 mb-4">
                Cloud, cybersecurity, IT support.
              </p>
              <Link
                href="/cheat-sheets"
                className="text-sky-400 group-hover:translate-x-1 transition-transform inline-block"
              >
                View Tech Cheat Sheet →
              </Link>
            </div>

            <div className="glow-card p-6 bg-slate-900 border border-slate-700 rounded-xl group">
              <h3 className="text-xl font-bold mb-2 text-white">
                Skilled Trades
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                HVAC, electrician, welding.
              </p>
              <Link
                href="/trade-schools"
                className="text-sky-400 group-hover:translate-x-1 transition-transform inline-block"
              >
                Trade School Breakdown →
              </Link>
            </div>

            <div className="glow-card p-6 bg-slate-900 border border-slate-700 rounded-xl group">
              <h3 className="text-xl font-bold mb-2 text-white">
                Gov & Civil Service
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Jobs that don't require degrees.
              </p>
              <Link
                href="/civil-service"
                className="text-sky-400 group-hover:translate-x-1 transition-transform inline-block"
              >
                Civil Service Guide →
              </Link>
            </div>
          </div>
        </section>

        {/* --- LATEST FROM THE BLOG --- */}
        <section className="section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-white">Latest Articles</h2>
            <Link href="/blog" className="text-sky-400 text-sm font-bold hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { href: "/blog/electrician-salary-2025", tag: "Trades", title: "Electrician Salary 2025: What They Really Make by State", color: "text-amber-400" },
              { href: "/blog/student-loan-debt-crisis-2025", tag: "Student Debt", title: "Student Loan Debt Crisis 2025: The Numbers Are Getting Worse", color: "text-red-400" },
              { href: "/blog/google-career-certificates-worth-it", tag: "Certifications", title: "Are Google Career Certificates Worth It in 2025?", color: "text-emerald-400" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="block group">
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-sky-500/50 transition-all h-full">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${a.color}`}>{a.tag}</p>
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors leading-snug">
                    {a.title}
                  </h3>
                  <div className="mt-3 text-sky-400 text-xs font-bold group-hover:translate-x-1 transition-transform inline-block">
                    Read →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- AD UNIT --- */}
        <AdUnit slot="6600722153" />
      </div>

      {/* --- EMAIL CAPTURE BANNER --- */}
      <EmailCapture variant="banner" />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    // FIX: Match filename from screenshot (tradeAI.js)
    const { getTradeOfTheMonth } = require("../lib/tradeAI");
    const tradeData = await getTradeOfTheMonth();
    return {
      props: { tradeData: tradeData || null },
      revalidate: 86400,
    };
  } catch (error) {
    console.error("Trade loading failed:", error);
    return {
      props: { tradeData: null },
      revalidate: 60,
    };
  }
}
