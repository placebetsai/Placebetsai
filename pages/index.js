import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import NewsTicker from "../components/NewsTicker";
import AdUnit from "../components/AdUnit";
import EmailCapture from "../components/EmailCapture";

// ── Featured jobs shown on homepage ──────────────────────────────────────────
const FEATURED_JOBS = [
  { title: "Software Developer",     category: "Tech",     lo: 75,  hi: 140, time: "6–12 months",          color: "sky" },
  { title: "Electrician",            category: "Trades",   lo: 65,  hi: 110, time: "Paid apprenticeship",   color: "amber" },
  { title: "Wind Turbine Tech",      category: "Trades",   lo: 65,  hi: 105, time: "2 years",               color: "amber" },
  { title: "Air Traffic Controller", category: "Gov",      lo: 85,  hi: 140, time: "FAA Academy (paid)",    color: "violet" },
  { title: "Cybersecurity Analyst",  category: "Tech",     lo: 80,  hi: 130, time: "6–9 months",            color: "sky" },
  { title: "Real Estate Agent",      category: "Business", lo: 50,  hi: 150, time: "1–3 mo (license)",      color: "emerald" },
];

const JOB_COLORS = {
  sky:     "text-sky-400 bg-sky-900/30 border-sky-700/50",
  amber:   "text-amber-400 bg-amber-900/30 border-amber-700/50",
  violet:  "text-violet-400 bg-violet-900/30 border-violet-700/50",
  emerald: "text-emerald-400 bg-emerald-900/30 border-emerald-700/50",
};

// ── College lookup widget ─────────────────────────────────────────────────────
function CollegeLookup() {
  const [query, setQuery]   = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load("University"); }, []);

  async function load(term) {
    setLoading(true);
    try {
      const r = await fetch(`/api/college-rankings?search=${encodeURIComponent(term)}`);
      const d = await r.json();
      setSchools((d.results || []).slice(0, 5));
    } catch {
      setSchools([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section aria-labelledby="lookup-heading" className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
      {/* header + search */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-800">
        <p className="text-[11px] uppercase tracking-widest text-red-400 font-bold mb-1">GOVERNMENT DATA · NO SPIN</p>
        <h2 id="lookup-heading" className="text-xl md:text-2xl font-black text-white mb-1">
          Is Your College a Debt Trap?
        </h2>
        <p className="text-slate-400 text-sm mb-3">
          Real cost, avg debt, and grad earnings — straight from the U.S. Dept. of Education.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); if (query.trim()) load(query); }}
          className="flex gap-2"
          role="search"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any college..."
            aria-label="Search colleges by name"
            className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            Look It Up
          </button>
        </form>
      </div>

      {/* results */}
      {loading ? (
        <div className="flex items-center justify-center gap-3 py-8">
          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          <span className="text-slate-400 text-sm">Pulling government data…</span>
        </div>
      ) : schools.length === 0 ? (
        <p className="text-center py-8 text-slate-500 text-sm">No results. Try a different name.</p>
      ) : (
        <ul className="divide-y divide-slate-800">
          {schools.map((s) => {
            const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            return (
              <li key={s.id}>
                <Link
                  href={`/college/${slug}`}
                  className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="min-w-0">
                    <div className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors truncate">
                      {s.name}
                    </div>
                    <div className="text-slate-500 text-xs">{s.city}, {s.state}</div>
                  </div>
                  <div className="flex gap-4 shrink-0 text-right">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">Cost/yr</div>
                      <div className="text-xs font-bold text-white">{s.cost}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">Debt</div>
                      <div className="text-xs font-bold text-red-400">{s.debt}</div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">10yr Earn</div>
                      <div className="text-xs font-bold text-green-400">{s.earnings}</div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {/* footer row */}
      <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-slate-500">Source: U.S. Dept. of Education College Scorecard</span>
        <Link href="/college-rankings" className="text-xs font-bold text-sky-400 hover:underline shrink-0">
          Browse all rankings →
        </Link>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="IHateCollege.com — Skip Debt, Stack Cash 2026"
        description="College is optional. Debt isn't. Real alternatives to a 4-year degree: trades, tech certs, apprenticeships, and careers that pay without loans."
        keywords="skip college 2026, college alternatives, trade school vs college, no degree jobs, student debt, ihatecollege"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "IHateCollege.com",
          "url": "https://ihatecollege.com",
          "description": "Real alternatives to a 4-year degree — trades, certs, and careers that pay without student loans.",
        }}
      />

      {/* NEWS TICKER */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <NewsTicker />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-20 space-y-14">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="text-center max-w-3xl mx-auto" aria-labelledby="hero-heading">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">
            YOU DON&apos;T HAVE TO SIGN YOUR LIFE AWAY
          </p>
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-5 leading-[1.05]"
          >
            College is <span className="text-sky-400">Optional</span>.<br />
            Debt is <span className="text-red-500">Not</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Before you borrow <span className="text-white font-bold">$50k–$150k</span>, run the
            numbers. Trades, tech certs, and apprenticeships that actually pay.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/alternatives"
              className="px-7 py-3.5 rounded-full bg-white text-slate-900 font-black text-base hover:bg-sky-50 transition-colors"
            >
              Explore Alternatives
            </Link>
            <Link
              href="/debt-calculator"
              className="px-7 py-3.5 rounded-full border border-slate-600 text-white font-black text-base hover:border-white transition-colors"
            >
              See the Real Cost
            </Link>
          </div>
        </section>

        {/* ── STATS STRIP ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 text-center" role="region" aria-label="Key statistics about college debt">
          {[
            { num: "$37k+",  label: "Avg Student Debt",      color: "text-red-400" },
            { num: "44%",    label: "Grads Underemployed",   color: "text-yellow-400" },
            { num: "$100k+", label: "Trades Can Pay",        color: "text-emerald-400" },
          ].map(({ num, label, color }) => (
            <div key={label} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className={`text-2xl md:text-3xl font-black ${color}`}>{num}</div>
              <div className="text-[11px] md:text-xs text-slate-500 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* ── COLLEGE LOOKUP ───────────────────────────────────────────── */}
        <CollegeLookup />

        {/* ── JOBS TEASER ──────────────────────────────────────────────── */}
        <section aria-labelledby="jobs-heading">
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold mb-1">NO DEGREE REQUIRED</p>
              <h2 id="jobs-heading" className="text-2xl font-black text-white">Jobs That Pay Without College</h2>
            </div>
            <div className="flex gap-3">
              <Link href="/job-board/post" className="text-sm font-bold text-emerald-400 hover:underline">
                Post a job →
              </Link>
              <Link href="/jobs" className="text-sm font-bold text-sky-400 hover:underline">
                Browse all →
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURED_JOBS.map((j) => (
              <Link
                key={j.title}
                href="/jobs"
                className="flex flex-col justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors leading-snug">
                    {j.title}
                  </h3>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${JOB_COLORS[j.color]}`}>
                    {j.category}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-emerald-400 font-black text-sm">${j.lo}k–${j.hi}k</span>
                  <span className="text-slate-500 text-xs">{j.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── AFFILIATE MONETIZATION ───────────────────────────────────── */}
        {/*
          TODO: Replace href="#" below with your affiliate links.
          Recommended programs (high CPA):
            1. Credible student loan refi  → credible.com/partners      ($200–400/lead)
            2. SoFi student loans          → sofi.com/affiliates        ($100–150/lead)
            3. Coursera / Google certs     → coursera.org/affiliates    ($45/sale)
            4. UTI / TradeSchools.net      → tradeschools.net/partners  (per lead)
        */}
        <section aria-label="Sponsored resources" className="grid sm:grid-cols-3 gap-3">
          <a
            href="#"
            rel="noopener sponsored"
            target="_blank"
            className="flex flex-col gap-2 p-5 rounded-xl bg-slate-900 border border-sky-700/30 hover:border-sky-500/60 transition-all group"
          >
            <p className="text-[10px] uppercase tracking-widest text-sky-400 font-bold">Sponsored</p>
            <p className="text-white font-black text-base leading-snug group-hover:text-sky-300 transition-colors">
              Refinance Your Student Debt
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Compare rates and cut your monthly payment. Takes 2 minutes.
            </p>
            <p className="text-sky-400 text-xs font-bold mt-auto">Check your rate →</p>
          </a>
          <a
            href="#"
            rel="noopener sponsored"
            target="_blank"
            className="flex flex-col gap-2 p-5 rounded-xl bg-slate-900 border border-emerald-700/30 hover:border-emerald-500/60 transition-all group"
          >
            <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Sponsored</p>
            <p className="text-white font-black text-base leading-snug group-hover:text-emerald-300 transition-colors">
              Get Tech Certified in 6 Months
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Google, AWS, CompTIA certs. No degree. Jobs that actually hire.
            </p>
            <p className="text-emerald-400 text-xs font-bold mt-auto">Explore programs →</p>
          </a>
          <a
            href="#"
            rel="noopener sponsored"
            target="_blank"
            className="flex flex-col gap-2 p-5 rounded-xl bg-slate-900 border border-amber-700/30 hover:border-amber-500/60 transition-all group"
          >
            <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Sponsored</p>
            <p className="text-white font-black text-base leading-snug group-hover:text-amber-300 transition-colors">
              Find a Trade School Near You
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Electrician, HVAC, welding programs. Paid apprenticeships available.
            </p>
            <p className="text-amber-400 text-xs font-bold mt-auto">Browse trade schools →</p>
          </a>
        </section>

        {/* ── LATEST ARTICLES ──────────────────────────────────────────── */}
        <section aria-labelledby="blog-heading">
          <div className="flex items-center justify-between mb-5">
            <h2 id="blog-heading" className="text-2xl font-black text-white">Latest Articles</h2>
            <Link href="/blog" className="text-sm font-bold text-sky-400 hover:underline">View all →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                href: "/blog/electrician-salary-2025",
                tag: "Trades", color: "text-amber-400",
                title: "Electrician Salary 2025: What They Really Make by State",
              },
              {
                href: "/blog/student-loan-debt-crisis-2025",
                tag: "Student Debt", color: "text-red-400",
                title: "Student Loan Debt Crisis 2025: The Numbers Are Getting Worse",
              },
              {
                href: "/blog/google-career-certificates-worth-it",
                tag: "Certs", color: "text-emerald-400",
                title: "Are Google Career Certificates Worth It in 2025?",
              },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="block group">
                <article className="p-5 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500/40 transition-all h-full flex flex-col">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${a.color}`}>{a.tag}</p>
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors leading-snug flex-1">
                    {a.title}
                  </h3>
                  <p className="text-sky-400 text-xs font-bold mt-3 group-hover:translate-x-1 transition-transform inline-block">
                    Read →
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ── AD ───────────────────────────────────────────────────────── */}
        <AdUnit slot="6600722153" />

      </div>

      {/* ── EMAIL CAPTURE ────────────────────────────────────────────── */}
      <EmailCapture variant="banner" />
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 3600 };
}
