import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import DecisionWizard from "../components/DecisionWizard";
import NewsTicker from "../components/NewsTicker";
import dynamic from 'next/dynamic';

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
            <p className="eyebrow text-slate-400 mb-4">YOU DON'T HAVE TO SIGN YOUR LIFE AWAY</p>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
              College is <span className="text-sky-400">Optional</span>.<br />
              Debt is <span className="text-red-500">Not</span>.
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              College is stupid expensive, insanely political, and way more stress than the brochures admit.
              ihatecollege.com is the dashboard for reality: campus vibes, cost pressure, and actual escape routes so you don't end up buried in loans and burnout.
            </p>

            <div className="hero-buttons flex justify-center gap-4">
              <a href="#vibes" className="btn btn-primary">
                🔍 Check campus vibes
              </a>
              <a href="#alt" className="btn btn-secondary">
                🛠️ See alternatives
              </a>
            </div>
          </section>

          {/* NEW COLLEGE SEARCH CTA – Added Here */}
          <div className="text-center py-12 bg-slate-900 rounded-xl border border-slate-700">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Search Any College</h2>
            <p className="text-xl text-slate-300 mb-6">See real debt, earnings, and if it's a scam – no bullshit.</p>
            <Link href="/rank-your-school">
              <a className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xl rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
                Search Colleges Now →
              </a>
            </Link>
          </div>

          {/* Trade Hero */}
          {tradeData && <TradeHero trade={tradeData} />}

          {/* --- SECTION 2: DECISION WIZARD --- */}
          <DecisionWizard />

          {/* --- SECTION 3: ALTERNATIVES --- */}
          <section className="section">
            <h2 className="section-heading text-3xl font-bold text-white mb-8 text-center">Real Alternatives to College</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glow-card p-6">
                <h3 className="text-xl font-bold mb-2">Tech & Cyber</h3>
                <p className="text-slate-300">Google certs, bootcamps, self-taught – $100k+ in 1–2 years.</p>
                <Link href="/cheat-sheets" className="text-cyan-300 font-bold block mt-4">
                  See Cheat Sheets →
                </Link>
              </div>

              <div className="glow-card p-6">
                <h3 className="text-xl font-bold mb-2">Skilled Trades</h3>
                <p className="text-slate-300">HVAC, electrician, welding – $70k–$150k with no debt.</p>
                <Link href="/trade-schools" className="text-cyan-300 font-bold block mt-4">
                  Trade School Breakdown →
                </Link>
              </div>

              <div className="glow-card p-6">
                <h3 className="text-xl font-bold mb-2">Gov & Civil Service</h3>
                <p className="text-slate-300">Jobs that don't require degrees.</p>
                <Link href="/civil-service" className="text-cyan-300 font-bold block mt-4">
                  Civil Service Guide →
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
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
