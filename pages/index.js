import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import DecisionWizard from "../components/DecisionWizard";
import NewsTicker from "../components/NewsTicker";
import dynamic from 'next/dynamic';

// 1. SAFE COMPONENT LOADING: 
// This won't crash the build if the file is missing or misnamed.
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

          <div className="grid md:grid-cols-2 gap-4">
            <div className="group p-6 rounded-2xl bg-slate-900/80 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:border-red-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center gap-4 text-white">
               <div>$37k+ Avg Debt</div>
            </div>
            <div className="group p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center gap-4 text-white">
               <div>6-12 Month Certs</div>
            </div>
          </div>
        </div>

        {/* 2. CONDITIONAL RENDER: 
            Only shows if the tradeData was successfully fetched */}
        {tradeData && <TradeHero trade={tradeData} />}

        <section>
           <DecisionWizard />
        </section>

        <section className="section">
          <h2 className="section-title text-3xl mb-8">High-Income Paths (No Degree)</h2>
          <div className="path-grid grid md:grid-cols-3 gap-6">
            <div className="glow-card p-6 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Tech & Cyber</h3>
              <Link href="/cheat-sheets" className="text-sky-400">View Cheat Sheet →</Link>
            </div>
            <div className="glow-card p-6 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Skilled Trades</h3>
              <Link href="/trade-schools" className="text-sky-400">Trade Breakdown →</Link>
            </div>
            <div className="glow-card p-6 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Civil Service</h3>
              <Link href="/civil-service" className="text-sky-400">Gov Guide →</Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

// 3. SAFE DATA FETCHING: 
// The try/catch block ensures the build finishes even if lib/tradeAi is missing.
export async function getStaticProps() {
  try {
    const { getTradeOfTheMonth } = require("../lib/tradeAi");
    const tradeData = await getTradeOfTheMonth();
    return {
      props: { tradeData: tradeData || null },
      revalidate: 86400, 
    };
  } catch (error) {
    console.error("Build Warning: Could not find tradeAi logic. Skipping section.");
    return {
      props: { tradeData: null },
      revalidate: 60, 
    };
  }
}