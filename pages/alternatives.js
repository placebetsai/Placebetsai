// pages/alternatives.js
import Link from "next/link";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";

const PATHS = [
  {
    emoji: "🔌",
    title: "Electrician",
    type: "Trade / Apprenticeship",
    cost: "$0–$15k",
    time: "4–5 years (paid apprenticeship)",
    salary: "$60k–$100k+",
    ceiling: "$120k+ (journeyman/master)",
    highlight: true,
    links: [
      { label: "Find apprenticeships →", href: "https://www.apprenticeship.gov/apprenticeship-job-finder" },
      { label: "IBEW Union Info →", href: "https://www.ibew.org/Apprenticeship" },
    ],
  },
  {
    emoji: "❄️",
    title: "HVAC Technician",
    type: "Trade / Cert Program",
    cost: "$1k–$15k",
    time: "6 months – 2 years",
    salary: "$50k–$80k",
    ceiling: "$100k+ with overtime",
    highlight: false,
    links: [
      { label: "Penn Foster HVAC →", href: "https://www.pennfoster.edu/programs-and-degrees/construction/hvac-technician-career-diploma" },
      { label: "Apprenticeships.gov →", href: "https://www.apprenticeship.gov/apprenticeship-job-finder" },
    ],
  },
  {
    emoji: "🚛",
    title: "CDL Truck Driver",
    type: "License / Company-Paid",
    cost: "$0 (company-sponsored) – $8k",
    time: "3–6 weeks for CDL",
    salary: "$65k–$95k OTR",
    ceiling: "$110k+ (owner-operator)",
    highlight: false,
    links: [
      { label: "Company CDL training →", href: "https://www.truckingtruth.com/trucking-companies/company-sponsored-cdl-training" },
      { label: "FMCSA CDL Info →", href: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license" },
    ],
  },
  {
    emoji: "💻",
    title: "Tech Certifications (IT / Cyber / Cloud)",
    type: "Self-Study / Online",
    cost: "$300–$2k",
    time: "3–6 months",
    salary: "$55k–$90k",
    ceiling: "$130k+ (cloud architect, CISO)",
    highlight: true,
    links: [
      { label: "Google Career Certs →", href: "https://grow.google/certificates/" },
      { label: "CompTIA A+, Security+ →", href: "https://www.comptia.org/certifications" },
      { label: "AWS Certifications →", href: "https://aws.amazon.com/certification/" },
    ],
  },
  {
    emoji: "🏠",
    title: "Real Estate Agent",
    type: "State License",
    cost: "$500–$1,500 for license",
    time: "1–3 months",
    salary: "$50k–$100k (commission)",
    ceiling: "$200k+ (top producers)",
    highlight: false,
    links: [
      { label: "Colibri Real Estate →", href: "https://www.colibrigroup.com/real-estate/" },
      { label: "Find your state exam →", href: "https://www.nar.realtor/education/realtors-educational-content" },
    ],
  },
  {
    emoji: "💉",
    title: "Healthcare Trades (CNA, Phlebotomy, X-Ray)",
    type: "Certificate Program",
    cost: "$1k–$8k",
    time: "4–12 months",
    salary: "$36k–$65k",
    ceiling: "$80k+ (with specializations)",
    highlight: false,
    links: [
      { label: "CareerStep Programs →", href: "https://www.careerstep.com/healthcare-training/" },
      { label: "Penn Foster Health →", href: "https://www.pennfoster.edu/healthcare" },
    ],
  },
  {
    emoji: "⚖️",
    title: "Insurance / Financial Services",
    type: "State License",
    cost: "$200–$500",
    time: "1–3 months",
    salary: "$45k–$80k base",
    ceiling: "$150k+ (commissions)",
    highlight: false,
    links: [
      { label: "ExamFX (License Prep) →", href: "https://www.examfx.com/" },
      { label: "Kaplan Financial →", href: "https://www.kaplanfinancial.com/" },
    ],
  },
  {
    emoji: "🪖",
    title: "Military Service + GI Bill",
    type: "Service / Education Benefit",
    cost: "$0 (you get PAID to serve)",
    time: "4 years active duty",
    salary: "$40k–$60k base + housing allowance",
    ceiling: "$100k+ education benefit + veteran hiring",
    highlight: false,
    links: [
      { label: "GI Bill Benefits →", href: "https://www.va.gov/education/about-gi-bill-benefits/" },
      { label: "Military OneSource →", href: "https://www.militaryonesource.mil/" },
    ],
  },
  {
    emoji: "👨‍💻",
    title: "Coding Bootcamp",
    type: "Intensive Program",
    cost: "$10k–$20k (ISA available)",
    time: "3–6 months",
    salary: "$70k–$100k",
    ceiling: "$150k+ (senior engineer)",
    highlight: false,
    links: [
      { label: "Course Report (compare schools) →", href: "https://www.coursereport.com/" },
      { label: "App Academy →", href: "https://www.appacademy.io/" },
    ],
  },
  {
    emoji: "🔧",
    title: "Plumber",
    type: "Trade / Apprenticeship",
    cost: "$0–$5k",
    time: "4–5 years (apprenticeship)",
    salary: "$60k–$90k",
    ceiling: "$120k+ (master plumber / own business)",
    highlight: false,
    links: [
      { label: "UA Plumbers Union →", href: "https://www.ua.org/apprenticeship" },
      { label: "Apprenticeship Finder →", href: "https://www.apprenticeship.gov/apprenticeship-job-finder" },
    ],
  },
];

const STATS = [
  { value: "65%", label: "of jobs don't require a 4-year degree (BLS)" },
  { value: "$0", label: "cost of a paid trade apprenticeship" },
  { value: "$88k", label: "median electrician salary with 5 years experience" },
];

export default function AlternativesPage() {
  const highlighted = PATHS.filter((p) => p.highlight);
  const rest = PATHS.filter((p) => !p.highlight);

  return (
    <Layout>
      <SEO
        title="10 Real College Alternatives in 2025 – Salary, Cost & Where to Start"
        description="Electrician, HVAC, CDL, coding bootcamp, real estate — 10 career paths with real BLS salary data, real costs, and direct links to get started. No degree needed."
      />

      {/* HERO */}
      <section className="hero text-center">
        <p className="eyebrow">YOU DON'T NEED THEIR PERMISSION</p>
        <h1 className="hero-title">
          10 real alternatives to the{" "}
          <span className="text-yellow-300">4-year degree</span>
        </h1>
        <p className="hero-subtitle">
          Real salary data. Real costs. Real links to get started this week —
          not "research it more."
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="px-5 py-3 rounded-xl bg-slate-800/70 border border-sky-400/20 text-center"
            >
              <div className="text-2xl font-black text-yellow-300">{s.value}</div>
              <div className="text-xs text-slate-400 mt-1 max-w-[140px]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section max-w-4xl mx-auto px-4">
        <h2 className="section-title">Degree vs. Alternative — Side by Side</h2>
        <div className="overflow-x-auto rounded-xl border border-sky-400/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 text-slate-300">
                <th className="text-left px-4 py-3 font-semibold">Path</th>
                <th className="text-left px-4 py-3 font-semibold">Cost</th>
                <th className="text-left px-4 py-3 font-semibold">Time to Income</th>
                <th className="text-left px-4 py-3 font-semibold">Starting Salary</th>
                <th className="text-left px-4 py-3 font-semibold">Debt?</th>
              </tr>
            </thead>
            <tbody>
              {[
                { path: "4-Year Degree", cost: "$80k–$200k+", time: "4 years", salary: "$45k–$60k avg", debt: "🔴 Yes", bad: true },
                { path: "Electrician Apprenticeship", cost: "$0–$5k", time: "Day 1 (paid)", salary: "$55k–$70k", debt: "🟢 No" },
                { path: "HVAC Certificate", cost: "$2k–$15k", time: "6–12 months", salary: "$50k–$65k", debt: "🟢 Minimal" },
                { path: "CDL (Company-Sponsored)", cost: "$0", time: "6 weeks", salary: "$65k–$85k", debt: "🟢 No" },
                { path: "Google IT Certificate", cost: "$300", time: "3–6 months", salary: "$55k–$75k", debt: "🟢 No" },
                { path: "Real Estate License", cost: "$500–$1,500", time: "1–3 months", salary: "$50k–$100k", debt: "🟢 No" },
                { path: "Coding Bootcamp", cost: "$10k–$20k", time: "3–6 months", salary: "$70k–$100k", debt: "🟡 ISA" },
              ].map((row) => (
                <tr
                  key={row.path}
                  className={`border-t border-slate-700/50 ${row.bad ? "bg-red-950/20 text-red-300" : "hover:bg-slate-800/40"}`}
                >
                  <td className="px-4 py-3 font-semibold">{row.path}</td>
                  <td className="px-4 py-3 text-slate-300">{row.cost}</td>
                  <td className="px-4 py-3 text-slate-300">{row.time}</td>
                  <td className="px-4 py-3 text-slate-300">{row.salary}</td>
                  <td className="px-4 py-3">{row.debt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Salary data: BLS Occupational Outlook Handbook 2024–25
        </p>
      </section>

      {/* TOP PICKS */}
      <section className="section max-w-5xl mx-auto px-4">
        <h2 className="section-title">⚡ Highest ROI paths right now</h2>
        <div className="path-grid">
          {highlighted.map((p) => (
            <div key={p.title} className="glow-card border-yellow-400/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <span className="text-xs text-sky-400 font-mono uppercase tracking-wider">{p.type}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="bg-slate-800/60 rounded-lg p-2">
                  <div className="text-slate-400">Cost</div>
                  <div className="text-white font-bold">{p.cost}</div>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-2">
                  <div className="text-slate-400">Time</div>
                  <div className="text-white font-bold">{p.time}</div>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-2">
                  <div className="text-slate-400">Starting</div>
                  <div className="text-yellow-300 font-bold">{p.salary}</div>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-2">
                  <div className="text-slate-400">Ceiling</div>
                  <div className="text-green-400 font-bold">{p.ceiling}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-300 hover:text-white text-sm font-semibold hover:underline transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4">
        <AdUnit slot="6600722153" />
      </section>

      {/* ALL PATHS */}
      <section className="section max-w-5xl mx-auto px-4">
        <h2 className="section-title">All 10 no-degree career paths</h2>
        <div className="job-card-grid">
          {rest.map((p) => (
            <div key={p.title} className="glow-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <span className="text-xs text-sky-400 font-mono uppercase tracking-wider">{p.type}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="bg-slate-800/60 rounded-lg p-2">
                  <div className="text-slate-400">Cost</div>
                  <div className="text-white font-bold">{p.cost}</div>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-2">
                  <div className="text-slate-400">Time</div>
                  <div className="text-white font-bold">{p.time}</div>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-2">
                  <div className="text-slate-400">Starting Salary</div>
                  <div className="text-yellow-300 font-bold">{p.salary}</div>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-2">
                  <div className="text-slate-400">Ceiling</div>
                  <div className="text-green-400 font-bold">{p.ceiling}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-300 hover:text-white text-sm font-semibold hover:underline transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNAL CTA SECTION */}
      <section className="section max-w-4xl mx-auto px-4">
        <div className="glow-card text-center">
          <h2 className="text-2xl font-bold mb-2">Still weighing your options?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto text-sm">
            Use the debt calculator to see exactly what a degree will cost you — then decide if it's worth it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/debt-calculator"
              className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-colors"
            >
              💸 Run the debt calculator
            </Link>
            <Link
              href="/trade-schools"
              className="px-6 py-3 rounded-full border border-sky-400/40 text-sky-200 hover:bg-slate-800 font-bold text-sm transition-colors"
            >
              🔧 Browse trade schools
            </Link>
            <Link
              href="/civil-service"
              className="px-6 py-3 rounded-full border border-sky-400/40 text-sky-200 hover:bg-slate-800 font-bold text-sm transition-colors"
            >
              🏛️ Gov jobs (no degree)
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section max-w-4xl mx-auto px-4">
        <h2 className="section-title">Common questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "How much can an electrician really make?",
              a: "According to the BLS (2024), the median annual wage for electricians is $61,590. With overtime and union benefits, journeyman electricians in high-cost areas routinely clear $90k–$120k. Master electricians who own shops can make $200k+.",
            },
            {
              q: "What's the fastest path to $60k without a degree?",
              a: "CDL truck driving. Company-sponsored programs are 100% free, take 6–8 weeks, and OTR drivers frequently clear $65k–$90k in their first year. The downside: time away from home.",
            },
            {
              q: "Are trade apprenticeships really free?",
              a: "Yes. Union apprenticeships (IBEW for electricians, UA for plumbers) pay you a starting wage (usually $18–$25/hr) while you learn on the job. You don't pay tuition — they pay you.",
            },
            {
              q: "Is coding bootcamp worth it without a CS degree?",
              a: "For some people, yes. The key is job placement rates. Pick programs with verified 75%+ placement rates and an income-share agreement so you only pay if you land a job. Avoid for-profit schools with vague claims.",
            },
            {
              q: "What if I want job security — not the highest salary?",
              a: "Healthcare trades. CNA, medical assistant, and phlebotomy roles are projected to grow 14–22% through 2032 (BLS). Wages start lower ($35k–$50k) but the demand is essentially recession-proof.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="glow-card cursor-pointer group"
            >
              <summary className="font-semibold text-white text-sm list-none flex items-center justify-between">
                {item.q}
                <span className="text-sky-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section max-w-2xl mx-auto px-4">
        <AdUnit slot="6600722153" />
      </section>
    </Layout>
  );
}
