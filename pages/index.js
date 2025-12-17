import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import DecisionWizard from "../components/DecisionWizard";
import NewsTicker from "../components/NewsTicker";
// --- NEW IMPORTS ---
import TradeHero from "../components/TradeHero"; 
import { getTradeOfTheMonth } from "../lib/tradeAi"; 

// 1. ACCEPT THE DATA
export default function HomePage({ tradeData }) {
  return (
    <Layout>
      <SEO />

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16 space-y-12">

        {/* --- NEWS TICKER (ABOVE HERO) --- */}
        <div className="w-full">
          <NewsTicker />
        </div>

        {/* --- SECTION 1: HERO & STATS --- */}
        <div className="space-y-6">
          
          {/* MAIN HERO CARD (Patriotic Animation) */}
          <section className="hero">
            <p className="eyebrow text-slate-400 mb-4">YOU DON'T HAVE TO SIGN YOUR LIFE AWAY</p>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
              College is <span className="text-sky-400">Optional</span>.<br />
              Debt is <span className="text-red-500">Not</span>.
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Before you borrow <span className="text-white font-bold">$50k–$150k</span>, run the numbers.
              Compare trades, tech careers, apprenticeships, and real alternatives.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/alternatives" className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-sky-50 transition-colors">
                Explore Alternatives
              </Link>
              <Link href="/debt-calculator" className="px-8 py-4 rounded-full border border-slate-600 text-white font-bold text-lg hover:border-white transition-colors">
                See the Real Cost
              </Link>
            </div>
          </section>

          {/* STATS ROW (Trap vs Escape) */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* THE "TRAP" BOX (Red Glow + Hover Animation) */}
            <div className="group p-6 rounded-2xl bg-slate-900/80 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:border-red-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center gap-4">
              <div>
                <div className="text-3xl md:text-4xl font-black text-red-400 group-hover:text-red-300 transition-colors">$37k+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Avg Student Debt</div>
              </div>
              <div className="w-12 h-px bg-slate-800 group-hover:bg-red-500/50 transition-colors"></div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-white">4 Years</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Time in Class</div>
              </div>
            </div>

            {/* THE "ESCAPE" BOX (Green Glow + Hover Animation) */}
            <div className="group p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center gap-4">
              <div>
                <div className="text-3xl md:text-4xl font-black text-emerald-400 group-hover:text-emerald-300 transition-colors">6–12 Mos</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Typical Cert Path</div>
              </div>
              <div className="w-12 h-px bg-slate-800 group-hover:bg-emerald-500/50 transition-colors"></div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-white">Paid</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Apprenticeships</div>
              </div>
            </div>

          </div>
        </div>
        
        {/* --- NEW SECTION: TRADE OF THE MONTH --- */}
        <TradeHero trade={tradeData} />

        {/* --- SECTION 2: DECISION WIZARD --- */}
        <section>
           <DecisionWizard />
        </section>

        {/* --- SECTION 3: HIGH INCOME PATHS --- */}
        <section className="section">
          <h2 className="section-title text-3xl mb-8">High-Income Paths (No Degree)</h2>

          <div className="path-grid">
            {/* Tech Card */}
            <div className="glow-card group">
              <h3>Tech &amp; Cyber</h3>
              <p className="text-sm text-slate-400 mb-4">Cloud, cybersecurity, IT support. Remote-friendly, high demand.</p>
              <ul className="text-sm text-slate-300 list-disc pl-4 space-y-2 mb-4">
                <li>Google IT Support / Cyber</li>
                <li>CompTIA A+ / Security+</li>
                <li>Cloud certs (AWS, Azure)</li>
              </ul>
              <Link href="/cheat-sheets" className="path-link inline-block group-hover:translate-x-1 transition-transform">
                View Tech Cheat Sheet →
              </Link>
            </div>

            {/* Trades Card */}
            <div className="glow-card group">
              <h3>Skilled Trades</h3>
              <p className="text-sm text-slate-400 mb-4">HVAC, electrician, welding. Paid apprenticeships = earn while you learn.</p>
              <ul className="text-sm text-slate-300 list-disc pl-4 space-y-2 mb-4">
                <li>Paid Apprenticeships</li>
                <li>Union Protection</li>
                <li>Overtime Potential</li>
              </ul>
              <Link href="/trade-schools" className="path-link inline-block group-hover:translate-x-1 transition-transform">
                Trade School Breakdown →
              </Link>
            </div>

            {/* Gov Card */}
            <div className="glow-card group">
              <h3>Gov &amp; Civil Service</h3>
              <p className="text-sm text-slate-400 mb-4">Federal, state, and city jobs. Many don't require degrees, just exams.</p>
              <ul className="text-sm text-slate-300 list-disc pl-4 space-y-2 mb-4">
                <li>USPS & Logistics</li>
                <li>Fire & Police</li>
                <li>TSA / Border Control</li>
              </ul>
              <Link href="/civil-service" className="path-link inline-block group-hover:translate-x-1 transition-transform">
                Civil Service Guide →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

// 2. DATA FETCHING AND ISR (The auto-refresh mechanism)
export async function getStaticProps() {
  const tradeData = await getTradeOfTheMonth();

  return {
    props: {
      tradeData,
    },
    // The page regenerates the 'Trade of the Month' in the background every 24 hours (86400 seconds).
    revalidate: 86400, 
  };
}
