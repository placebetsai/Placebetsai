import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import AdUnit from "../components/AdUnit";
import EmailCapture from "../components/EmailCapture";

// ── College lookup ────────────────────────────────────────────────────────────
function CollegeLookup() {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load("University"); }, []);

  async function load(term) {
    setLoading(true);
    try {
      const r = await fetch(`/api/college-rankings?search=${encodeURIComponent(term)}`);
      const d = await r.json();
      setSchools((d.results || []).slice(0, 6));
    } catch { setSchools([]); }
    finally { setLoading(false); }
  }

  return (
    <section aria-labelledby="lookup-heading" className="rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/80 backdrop-blur">
      <div className="px-5 pt-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🎓</span>
          <p className="text-[11px] uppercase tracking-widest text-red-400 font-bold">U.S. Dept. of Education · Real Data</p>
        </div>
        <h2 id="lookup-heading" className="text-xl sm:text-2xl font-black text-white mb-1">Is Your College Worth the Debt?</h2>
        <p className="text-slate-400 text-sm mb-4">Real cost, average debt, and graduate earnings for 6,000+ schools.</p>
        <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) load(query); }} className="flex gap-2" role="search">
          <input
            type="search" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any college or university..."
            aria-label="Search colleges by name"
            className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button type="submit" className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm transition-colors whitespace-nowrap">
            Look It Up
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-8">
          <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-sm">Loading data…</span>
        </div>
      ) : schools.length === 0 ? (
        <p className="text-center py-8 text-slate-500 text-sm">No results. Try a different name.</p>
      ) : (
        <ul className="divide-y divide-slate-800">
          {schools.map((s) => {
            const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            return (
              <li key={s.id}>
                <Link href={`/college/${slug}`} className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-800/60 transition-colors group">
                  <div className="min-w-0">
                    <div className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors truncate">{s.name}</div>
                    <div className="text-slate-500 text-xs">{s.city}, {s.state}</div>
                  </div>
                  <div className="flex gap-4 sm:gap-5 shrink-0 text-right">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">Cost/yr</div>
                      <div className="text-xs font-bold text-white">{s.cost}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">Avg Debt</div>
                      <div className="text-xs font-bold text-red-400">{s.debt}</div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">10yr Earn</div>
                      <div className="text-xs font-bold text-emerald-400">{s.earnings}</div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs text-slate-500">Source: U.S. Dept. of Education College Scorecard</span>
        <Link href="/college-rankings" className="text-xs font-bold text-sky-400 hover:underline">View full rankings →</Link>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="IHateCollege.com — College Alternatives, Debt Data & No-Degree Careers"
        description="Is college worth the debt? Compare 6,000+ schools by cost vs. earnings. Find government jobs, trade apprenticeships, and tech certs that pay without a 4-year degree."
        keywords="college alternatives, is college worth it, student debt, trade school vs college, no degree jobs, government jobs no degree, high paying careers without degree"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "IHateCollege.com",
          "url": "https://ihatecollege.com",
          "description": "Compare college costs vs. earnings and find high-paying careers that don't require a 4-year degree.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://ihatecollege.com/college-rankings?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />

      <p style={{ display: "none" }}>Impact-Site-Verification: 7a99b8bc-6d3b-4c9c-9f76-ce1301771cc1</p>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            The truth they don&apos;t tell you at orientation
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.0]">
            College is{" "}
            <span className="relative">
              <span className="text-sky-400">Optional</span>
            </span>
            .<br />
            Debt is{" "}
            <span className="text-red-500">Not</span>.
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            The average grad leaves with <strong className="text-white font-black">$37,000 in debt</strong> and a job that doesn&apos;t need their degree.
            There&apos;s a smarter way.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
            <Link href="/college-rankings"
              className="px-8 py-4 rounded-xl bg-white text-slate-900 font-black text-base hover:bg-sky-50 transition-colors shadow-lg">
              🎓 Is My School Worth It?
            </Link>
            <Link href="/job-board"
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base transition-colors shadow-lg">
              💼 Find a Job Without a Degree
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {[
              { icon: "💸", num: "$37k+", label: "Avg student debt", color: "text-red-400" },
              { icon: "📉", num: "44%",   label: "Grads underemployed", color: "text-yellow-400" },
              { icon: "🔧", num: "$100k+", label: "Skilled trades pay", color: "text-emerald-400" },
            ].map(({ icon, num, label, color }) => (
              <div key={label} className="p-3 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl sm:text-2xl mb-1">{icon}</div>
                <div className={`text-xl sm:text-2xl font-black ${color}`}>{num}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 leading-tight mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── JOB BOARD CTA ────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="grid sm:grid-cols-2 gap-3">
          {/* Find a Job */}
          <Link href="/job-board"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 p-6 sm:p-8 hover:from-sky-500 hover:to-blue-600 transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="text-3xl sm:text-4xl mb-3">🔍</div>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">Find a Job</h2>
              <p className="text-sky-200 text-sm mb-4 leading-relaxed">Federal, state, law enforcement, trades, tech — filter by state and sector. No degree needed.</p>
              <span className="inline-flex items-center gap-2 text-sm font-black text-white bg-white/20 px-4 py-2 rounded-xl group-hover:bg-white/30 transition-colors">
                Browse Jobs →
              </span>
            </div>
          </Link>

          {/* Post a Job */}
          <Link href="/job-board#post"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 sm:p-8 hover:from-emerald-500 hover:to-teal-600 transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="text-3xl sm:text-4xl mb-3">📢</div>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">Post a Job</h2>
              <p className="text-emerald-200 text-sm mb-4 leading-relaxed">Hiring without degree requirements? Reach motivated, debt-free candidates. Always free.</p>
              <span className="inline-flex items-center gap-2 text-sm font-black text-white bg-white/20 px-4 py-2 rounded-xl group-hover:bg-white/30 transition-colors">
                Post Free →
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">

        {/* ── COLLEGE LOOKUP ─────────────────────────────────────────────────── */}
        <CollegeLookup />

        {/* ── 3 PATHS ────────────────────────────────────────────────────────── */}
        <section aria-labelledby="paths-heading">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Skip the debt, keep the income</p>
            <h2 id="paths-heading" className="text-2xl sm:text-3xl font-black text-white">3 Paths That Pay Without a Degree</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                href: "/trade-schools",
                icon: "🔧",
                label: "Skilled Trades",
                examples: "Electrician · HVAC · Plumbing · Welding",
                salary: "$65k – $110k",
                time: "Paid apprenticeship",
                gradient: "from-amber-500/10 to-orange-500/5",
                border: "border-amber-700/30 hover:border-amber-500/60",
                badge: "text-amber-400",
              },
              {
                href: "/alternatives",
                icon: "💻",
                label: "Tech Certs",
                examples: "Google · AWS · CompTIA · Cybersecurity",
                salary: "$75k – $130k",
                time: "6–12 month programs",
                gradient: "from-sky-500/10 to-blue-500/5",
                border: "border-sky-700/30 hover:border-sky-500/60",
                badge: "text-sky-400",
              },
              {
                href: "/civil-service",
                icon: "🏛️",
                label: "Government Jobs",
                examples: "Federal · Police · USPS · Park Service",
                salary: "$50k – $140k",
                time: "Benefits + pension",
                gradient: "from-violet-500/10 to-purple-500/5",
                border: "border-violet-700/30 hover:border-violet-500/60",
                badge: "text-violet-400",
              },
            ].map((p) => (
              <Link key={p.href} href={p.href}
                className={`group flex flex-col p-6 rounded-2xl bg-gradient-to-br ${p.gradient} border ${p.border} transition-all`}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="text-xl font-black text-white mb-1">{p.label}</h3>
                <p className={`text-xs font-bold ${p.badge} mb-3`}>{p.examples}</p>
                <div className="mt-auto">
                  <div className={`text-2xl font-black ${p.badge}`}>{p.salary}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{p.time}</div>
                </div>
                <span className={`text-xs font-bold ${p.badge} mt-4 group-hover:translate-x-1 transition-transform inline-block`}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── AD ─────────────────────────────────────────────────────────────── */}
        <AdUnit slot="6600722153" />

        {/* ── FREE TOOLS ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="tools-heading">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Make an informed decision</p>
            <h2 id="tools-heading" className="text-2xl sm:text-3xl font-black text-white">Free Tools</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/debt-calculator",  icon: "🧮", label: "Debt Calculator",      desc: "See exactly what $30k, $60k, or $100k in loans costs you monthly over 10 years." },
              { href: "/college-rankings", icon: "📊", label: "College ROI Rankings", desc: "Every U.S. college ranked by debt-to-earnings ratio using federal data." },
              { href: "/rank-your-school", icon: "🔍", label: "Rate Your School",     desc: "Look up any school's real cost, average debt, and what grads actually earn." },
              { href: "/alternatives",     icon: "🚀", label: "Alternatives Guide",   desc: "Bootcamps, apprenticeships, certifications — every path that pays without loans." },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all">
                <span className="text-2xl shrink-0 mt-0.5">{t.icon}</span>
                <div>
                  <h3 className="text-white font-black mb-1 group-hover:text-sky-400 transition-colors">{t.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <EmailCapture variant="banner" />
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 3600 };
}
