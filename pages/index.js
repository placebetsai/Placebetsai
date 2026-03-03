import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import AdUnit from "../components/AdUnit";
import EmailCapture from "../components/EmailCapture";

// ── College lookup widget ─────────────────────────────────────────────────────
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
    } catch {
      setSchools([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section aria-labelledby="lookup-heading" className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
      <div className="px-5 pt-5 pb-4 border-b border-slate-800">
        <p className="text-[11px] uppercase tracking-widest text-red-400 font-bold mb-1">U.S. Department of Education · Real Data</p>
        <h2 id="lookup-heading" className="text-2xl font-black text-white mb-1">Is Your College Worth the Debt?</h2>
        <p className="text-slate-400 text-sm mb-4">Real cost, average debt, and graduate earnings for 6,000+ schools.</p>
        <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) load(query); }} className="flex gap-2" role="search">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any college or university..."
            aria-label="Search colleges by name"
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button type="submit" className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm transition-colors whitespace-nowrap">
            Look It Up
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-10">
          <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-sm">Loading data…</span>
        </div>
      ) : schools.length === 0 ? (
        <p className="text-center py-10 text-slate-500 text-sm">No results. Try a different name.</p>
      ) : (
        <ul className="divide-y divide-slate-800">
          {schools.map((s) => {
            const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            return (
              <li key={s.id}>
                <Link href={`/college/${slug}`} className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-800/60 transition-colors group">
                  <div className="min-w-0">
                    <div className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors truncate">{s.name}</div>
                    <div className="text-slate-500 text-xs">{s.city}, {s.state}</div>
                  </div>
                  <div className="flex gap-5 shrink-0 text-right">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">Cost/yr</div>
                      <div className="text-xs font-bold text-white">{s.cost}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">Avg Debt</div>
                      <div className="text-xs font-bold text-red-400">{s.debt}</div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">10yr Earnings</div>
                      <div className="text-xs font-bold text-emerald-400">{s.earnings}</div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
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
        description="Is college worth the debt? Compare 6,000+ schools by cost vs. earnings. Explore trade schools, tech certifications, and high-paying careers that don't require a 4-year degree."
        keywords="college alternatives, is college worth it, student debt, trade school vs college, no degree jobs, high paying careers without degree"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "IHateCollege.com",
          "url": "https://ihatecollege.com",
          "description": "Compare college costs vs. earnings and explore alternatives to a 4-year degree.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://ihatecollege.com/college-rankings?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />

      {/* Impact verification */}
      <p style={{ display: "none" }}>Impact-Site-Verification: 7a99b8bc-6d3b-4c9c-9f76-ce1301771cc1</p>

      <div className="max-w-5xl mx-auto px-4 pt-14 pb-24 space-y-16">

        {/* ── HERO ── */}
        <section className="text-center max-w-3xl mx-auto" aria-labelledby="hero-heading">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-5">The truth they don&apos;t tell you at orientation</p>
          <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.0]">
            College is <span className="text-sky-400">Optional</span>.<br />
            Debt is <span className="text-red-500">Not</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            The average grad leaves with <strong className="text-white">$37,000 in debt</strong> and a job that doesn&apos;t require their degree.
            There&apos;s a better way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/college-rankings" className="px-8 py-4 rounded-full bg-white text-slate-900 font-black text-base hover:bg-sky-50 transition-colors">
              Is My School Worth It?
            </Link>
            <Link href="/alternatives" className="px-8 py-4 rounded-full border border-slate-600 text-white font-black text-base hover:border-white transition-colors">
              Show Me Alternatives
            </Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-3 text-center" role="region" aria-label="College debt statistics">
          {[
            { num: "$37,338", label: "Average student debt at graduation", color: "text-red-400" },
            { num: "44%",     label: "College grads underemployed",        color: "text-yellow-400" },
            { num: "$100k+",  label: "What skilled trades can pay",         color: "text-emerald-400" },
          ].map(({ num, label, color }) => (
            <div key={label} className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className={`text-2xl sm:text-3xl font-black ${color} mb-1`}>{num}</div>
              <div className="text-xs text-slate-500 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* ── COLLEGE LOOKUP ── */}
        <CollegeLookup />

        {/* ── 3 PATHS ── */}
        <section aria-labelledby="paths-heading">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Skip the debt, keep the income</p>
            <h2 id="paths-heading" className="text-3xl font-black text-white">3 Paths That Pay Without a Degree</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                href: "/trade-schools",
                label: "Skilled Trades",
                eyebrow: "Electrician · HVAC · Plumbing · Welding",
                salary: "$65k – $110k",
                time: "Paid apprenticeship",
                color: "text-amber-400",
                border: "hover:border-amber-500/50",
                dot: "bg-amber-400",
              },
              {
                href: "/alternatives",
                label: "Tech Certifications",
                eyebrow: "Google · AWS · CompTIA · Cybersecurity",
                salary: "$75k – $130k",
                time: "6–12 month programs",
                color: "text-sky-400",
                border: "hover:border-sky-500/50",
                dot: "bg-sky-400",
              },
              {
                href: "/civil-service",
                label: "Government Jobs",
                eyebrow: "USPS · Parks · FAA · Law Enforcement",
                salary: "$50k – $140k",
                time: "Benefits + pension",
                color: "text-violet-400",
                border: "hover:border-violet-500/50",
                dot: "bg-violet-400",
              },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={`group flex flex-col justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800 ${p.border} transition-all`}
              >
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${p.color}`}>{p.eyebrow}</p>
                  <h3 className={`text-xl font-black text-white mb-4 group-hover:${p.color} transition-colors`}>{p.label}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className={`text-2xl font-black ${p.color}`}>{p.salary}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{p.time}</div>
                  </div>
                  <span className={`text-xs font-bold ${p.color} group-hover:translate-x-1 transition-transform inline-block`}>
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── AD ── */}
        <AdUnit slot="6600722153" />

        {/* ── JOB BOARD CTA ── */}
        <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-sky-500/20 p-8 sm:p-10 text-center">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">No degree required</p>
          <h2 className="text-3xl font-black text-white mb-3">Find a Job That Doesn&apos;t Need Your Diploma</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Federal jobs, law enforcement, skilled trades, and tech — filter by state, sector, and salary.
            Real listings. No resume padding needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/job-board" className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-xl transition-colors">
              Browse Jobs by State →
            </Link>
            <Link href="/job-board" className="px-8 py-4 border border-slate-600 hover:border-white text-white font-black rounded-xl transition-colors">
              Post a Job — Free
            </Link>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-2xl font-black text-white mb-5">Free Tools</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/debt-calculator", label: "Student Debt Calculator", desc: "See exactly what $30k, $60k, or $100k in loans will actually cost you monthly." },
              { href: "/college-rankings", label: "College ROI Rankings", desc: "Every U.S. college ranked by debt-to-earnings ratio using federal data." },
              { href: "/rank-your-school", label: "Rate Your College", desc: "Look up any school's real cost, average debt, and what grads actually earn." },
              { href: "/alternatives", label: "College Alternatives", desc: "Bootcamps, apprenticeships, certifications — paths that pay without loans." },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all">
                <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0" />
                <div>
                  <h3 className="text-white font-black mb-1 group-hover:text-sky-400 transition-colors">{t.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* ── EMAIL ── */}
      <EmailCapture variant="banner" />

    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 3600 };
}
