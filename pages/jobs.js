// pages/jobs.js
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import Link from "next/link";
import { useState } from "react";

const JOBS = [
  // TECH
  { title: "Software Developer", category: "Tech", salaryLow: 75000, salaryHigh: 140000, growth: "+25%", time: "6–12 months", description: "Build apps, websites, and software. Self-taught devs land $100k+ jobs routinely.", path: "/cheat-sheets", hot: true },
  { title: "Cybersecurity Analyst", category: "Tech", salaryLow: 80000, salaryHigh: 130000, growth: "+35%", time: "6–9 months", description: "Protect companies from hackers. CompTIA Security+ cert is the entry ticket.", path: "/cheat-sheets", hot: true },
  { title: "Cloud Engineer (AWS/Azure)", category: "Tech", salaryLow: 90000, salaryHigh: 150000, growth: "+30%", time: "6–12 months", description: "Run cloud infrastructure. AWS certs are universally recognized — no degree needed.", path: "/cheat-sheets" },
  { title: "IT Support Specialist", category: "Tech", salaryLow: 45000, salaryHigh: 75000, growth: "+9%", time: "3–6 months", description: "Entry-level tech role. CompTIA A+ gets you hired. Great stepping stone.", path: "/cheat-sheets" },
  { title: "Data Analyst", category: "Tech", salaryLow: 65000, salaryHigh: 110000, growth: "+20%", time: "6–12 months", description: "SQL + Excel + Python. Google Data Analytics cert is a real door-opener.", path: "/cheat-sheets" },

  // TRADES
  { title: "Electrician", category: "Trades", salaryLow: 65000, salaryHigh: 110000, growth: "+11%", time: "4-year apprenticeship (paid)", description: "Get paid while you train. Master electricians regularly clear $100k+.", path: "/trade-schools", hot: true },
  { title: "Plumber", category: "Trades", salaryLow: 60000, salaryHigh: 100000, growth: "+12%", time: "4-5 year apprenticeship (paid)", description: "Recession-proof. People always need plumbing fixed. Can't be outsourced.", path: "/trade-schools" },
  { title: "HVAC Technician", category: "Trades", salaryLow: 55000, salaryHigh: 95000, growth: "+9%", time: "6 months–2 years", description: "Heating and cooling. Climate change means this work only grows.", path: "/trade-schools" },
  { title: "Welder", category: "Trades", salaryLow: 50000, salaryHigh: 90000, growth: "+8%", time: "6 months–2 years", description: "Specialized welders (underwater, aerospace) make $100k+. High demand.", path: "/trade-schools" },
  { title: "Wind Turbine Technician", category: "Trades", salaryLow: 65000, salaryHigh: 105000, growth: "+60%", time: "2 years", description: "Fastest-growing job in the US. Green energy boom is just starting.", path: "/trade-schools", hot: true },

  // HEALTHCARE
  { title: "Surgical Technologist", category: "Healthcare", salaryLow: 55000, salaryHigh: 80000, growth: "+7%", time: "2 years", description: "Work in the OR. Surgical tech programs are 18–24 months at community colleges.", path: "/alternatives" },
  { title: "Dental Hygienist", category: "Healthcare", salaryLow: 70000, salaryHigh: 100000, growth: "+9%", time: "2 years", description: "Associate degree, not bachelor's. Clean teeth, make six figures.", path: "/alternatives" },
  { title: "Radiation Therapist", category: "Healthcare", salaryLow: 85000, salaryHigh: 115000, growth: "+6%", time: "2 years", description: "Operate radiation equipment for cancer treatment. High pay, community college path.", path: "/alternatives" },
  { title: "EMT / Paramedic", category: "Healthcare", salaryLow: 38000, salaryHigh: 70000, growth: "+5%", time: "6 months–2 years", description: "Start as EMT, advance to paramedic. Can launch a healthcare career without debt.", path: "/alternatives" },

  // SALES / BUSINESS
  { title: "Real Estate Agent", category: "Business", salaryLow: 50000, salaryHigh: 150000, growth: "+5%", time: "1–3 months (license)", description: "Commission-based upside is unlimited. License takes weeks. Top agents clear $200k+.", path: "/alternatives", hot: true },
  { title: "Insurance Sales Agent", category: "Business", salaryLow: 50000, salaryHigh: 120000, growth: "+6%", time: "1–2 months (license)", description: "State license required, no degree. Residual commission income compounds over time.", path: "/alternatives" },
  { title: "Sales Development Rep (SDR)", category: "Business", salaryLow: 55000, salaryHigh: 90000, growth: "+10%", time: "No training required", description: "Tech companies hire SDRs without degrees constantly. Get in, prove yourself, promote.", path: "/alternatives" },

  // GOVERNMENT
  { title: "Postal Service Worker", category: "Government", salaryLow: 45000, salaryHigh: 75000, growth: "+1%", time: "No degree required", description: "Federal job with pension and benefits. No degree. Stable for life.", path: "/civil-service" },
  { title: "Border Patrol Agent", category: "Government", salaryLow: 55000, salaryHigh: 95000, growth: "+5%", time: "No degree required", description: "Federal law enforcement. Full federal benefits, retirement, no degree needed.", path: "/civil-service" },
  { title: "Air Traffic Controller", category: "Government", salaryLow: 85000, salaryHigh: 140000, growth: "+3%", time: "FAA Academy (paid)", description: "High stress, extremely high pay, no degree required. Government trains you.", path: "/civil-service", hot: true },
  { title: "Firefighter", category: "Government", salaryLow: 52000, salaryHigh: 90000, growth: "+4%", time: "Fire academy (3–6 months)", description: "No degree needed. Pension, union, job security. OT pushes many past $100k.", path: "/civil-service" },
];

const CATEGORIES = ["All", "Tech", "Trades", "Healthcare", "Business", "Government"];
const CAT_COLORS = {
  Tech: "bg-sky-900/50 text-sky-300 border-sky-700",
  Trades: "bg-amber-900/50 text-amber-300 border-amber-700",
  Healthcare: "bg-pink-900/50 text-pink-300 border-pink-700",
  Business: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
  Government: "bg-violet-900/50 text-violet-300 border-violet-700",
};

function fmt(n) { return "$" + n.toLocaleString(); }

export default function JobsBoard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [minSalary, setMinSalary] = useState(0);

  const filtered = JOBS.filter(j =>
    (activeCategory === "All" || j.category === activeCategory) &&
    j.salaryHigh >= minSalary
  );

  return (
    <Layout>
      <SEO
        title="High-Paying Jobs Without a Degree 2025 | No College Required | IHateCollege.com"
        description="Browse 20+ high-income careers that don't require a 4-year degree. Real salary data, how to get started, and exact training paths."
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "High-Paying Jobs Without a Degree 2025",
          "description": "Careers that pay well and don't require a 4-year college degree",
          "numberOfItems": JOBS.length,
          "itemListElement": JOBS.slice(0,10).map((j,i) => ({
            "@type": "ListItem",
            "position": i+1,
            "name": j.title,
            "description": j.description
          }))
        }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">NO DEGREE REQUIRED</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Jobs That Pay Well <span className="text-emerald-400">Without College</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Real careers, real salary ranges, exact paths to get there. No $150k debt required.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-black text-emerald-400">{JOBS.length}+</div>
            <div className="text-xs text-slate-500">Career Paths</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-black text-white">$50k–$150k</div>
            <div className="text-xs text-slate-500">Salary Range</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-black text-sky-400">0</div>
            <div className="text-xs text-slate-500">Degrees Needed</div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <section className="max-w-5xl mx-auto px-4 pb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`text-sm px-4 py-2 rounded-full border font-semibold transition-all ${
                  activeCategory === c
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                }`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-500">Min salary:</span>
            <select value={minSalary} onChange={e => setMinSalary(Number(e.target.value))}
              className="text-sm bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2">
              <option value={0}>Any</option>
              <option value={50000}>$50k+</option>
              <option value={75000}>$75k+</option>
              <option value={100000}>$100k+</option>
            </select>
          </div>
        </div>
      </section>

      {/* JOB CARDS */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((job) => (
            <Link key={job.title} href={job.path}
              className="block p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">
                      {job.title}
                    </h2>
                    {job.hot && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-900/40 border border-red-700 text-red-400">
                        HOT
                      </span>
                    )}
                  </div>
                  <span className={`mt-1 inline-block text-xs font-bold px-2 py-0.5 rounded-full border ${CAT_COLORS[job.category]}`}>
                    {job.category}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-emerald-400 font-black text-sm">{fmt(job.salaryLow)}–{fmt(job.salaryHigh)}</div>
                  <div className="text-xs text-slate-500">per year</div>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{job.description}</p>

              <div className="flex gap-4 text-xs text-slate-500">
                <span>⚡ Growth: <span className="text-emerald-400 font-bold">{job.growth}</span></span>
                <span>⏱ Time in: <span className="text-white font-semibold">{job.time}</span></span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">No jobs match those filters.</div>
        )}

        <div className="mt-10">
          <AdUnit slot="6600722153" />
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-slate-900 border border-sky-500/30 text-center">
          <h3 className="text-xl font-black text-white mb-2">Want the step-by-step guide?</h3>
          <p className="text-slate-400 text-sm mb-4">
            Our cheat sheets break down exactly how to get into tech, trades, and certs with zero debt.
          </p>
          <Link href="/cheat-sheets"
            className="inline-block px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors">
            View Career Cheat Sheets →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
