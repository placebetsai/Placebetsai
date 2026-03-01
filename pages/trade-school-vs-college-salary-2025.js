import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const trades = [
  { trade: "Electrician", entry: "$60,600", mid: "$76,600", senior: "$100,000+", time: "4–5 yr apprenticeship", debt: "$0–$5k" },
  { trade: "Plumber", entry: "$53,900", mid: "$72,000", senior: "$95,000+", time: "4–5 yr apprenticeship", debt: "$0–$5k" },
  { trade: "HVAC Tech", entry: "$48,000", mid: "$65,000", senior: "$85,000+", time: "6 mo–2 yr program", debt: "$5k–$15k" },
  { trade: "Welder", entry: "$42,000", mid: "$58,000", senior: "$80,000+", time: "6–18 mo program", debt: "$5k–$20k" },
  { trade: "Elevator Installer", entry: "$75,000", mid: "$97,000", senior: "$120,000+", time: "4 yr apprenticeship", debt: "$0" },
  { trade: "Aircraft Mechanic", entry: "$62,000", mid: "$80,000", senior: "$100,000+", time: "18–24 mo program", debt: "$10k–$30k" },
];

export default function TradeSchoolVsCollegeSalary2025() {
  return (
    <Layout>
      <SEO
        title="Trade School vs College Salary 2025: Who Actually Earns More?"
        description="Trade school vs college salary in 2025 — real numbers on electrician, plumber, and HVAC earnings vs bachelor's degree holders. The answer will surprise you."
      />

      <article className="max-w-3xl mx-auto px-4 py-12 text-slate-200">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">
            Salary Breakdown · 2025 Data
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Trade School vs College Salary 2025
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            The old story was: get a degree, earn more money. The 2025 data
            tells a different story — especially when you factor in debt, time,
            and early-career earnings.
          </p>
        </div>

        {/* Stat callout */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-emerald-400">$76,600</div>
            <div className="text-xs text-slate-500 mt-1">median senior electrician salary</div>
          </div>
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-emerald-400">$0</div>
            <div className="text-xs text-slate-500 mt-1">debt for apprenticeship grads</div>
          </div>
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-emerald-400">$43k</div>
            <div className="text-xs text-slate-500 mt-1">avg college grad debt burden</div>
          </div>
        </div>

        <AdUnit slot="2951831702" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Setup: Why This Comparison Matters Now
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            For decades, the college premium was so large it was almost
            impossible to argue against. The average bachelor&apos;s degree holder
            earned dramatically more than anyone without one — and that was
            that. Case closed. Go to college.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            But something shifted. Tuition exploded. Trade wages climbed.
            Skilled labor shortages drove pay higher in the trades. And the
            average college graduate started entering the workforce carrying
            over $43,000 in debt — a debt that takes years, sometimes decades,
            to pay off.
          </p>
          <p className="text-slate-300 leading-relaxed">
            When you run the actual numbers — not just gross salary, but
            wealth accumulation over a 10-year career — the trades often win.
            Here&apos;s why.
          </p>
        </section>

        {/* Section 2 - The 10-year race */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The 10-Year Career Race: Trades vs. College Grad
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Consider two 18-year-olds graduating high school in 2025. One goes
            into an electrician apprenticeship. One goes to a four-year public
            university.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-5">
              <h3 className="font-bold text-emerald-400 mb-3">The Electrician</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Year 1: Earns $35,000–$42,000 as apprentice</li>
                <li>• Years 1–4: Earning while learning, zero tuition</li>
                <li>• Year 5: Journeyman license, $60,600–$70,000</li>
                <li>• Year 8–10: Senior electrician, $76,600–$100,000+</li>
                <li className="text-emerald-400 font-bold">• Debt at year 10: $0</li>
                <li className="text-emerald-400 font-bold">• Net wealth built: $200,000–$400,000+</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-red-500/30 rounded-xl p-5">
              <h3 className="font-bold text-red-400 mb-3">The College Grad</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Years 1–4: Paying tuition, earning little to nothing</li>
                <li>• Year 5: Entry job, average $50,000–$68,000</li>
                <li>• Debt: $43,000 average, often $500–$700/month payment</li>
                <li>• Years 5–10: Paying down debt while building career</li>
                <li className="text-red-400 font-bold">• Net wealth at year 10: Often negative or minimal</li>
                <li className="text-red-400 font-bold">• Still owes $20,000–$35,000 in many cases</li>
              </ul>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed">
            The college grad might out-earn the electrician by year 15 or 20 —
            especially in a high-ROI field. But the tradespeople have a 4-year
            head start earning money, zero debt, and often own a home before
            their college peers have paid off their student loans.
          </p>
        </section>

        <AdUnit slot="2951831702" format="rectangle" />

        {/* Salary table */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            2025 Trade Salaries: The Full Breakdown
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            Here&apos;s the most current salary data for top trade careers,
            based on 2024–2025 Bureau of Labor Statistics data and industry
            surveys:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="text-left p-3">Trade</th>
                  <th className="text-right p-3">Entry</th>
                  <th className="text-right p-3">Mid</th>
                  <th className="text-right p-3">Senior</th>
                  <th className="text-right p-3 hidden md:table-cell">Training</th>
                  <th className="text-right p-3 hidden md:table-cell">Debt</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((t, i) => (
                  <tr
                    key={t.trade}
                    className={
                      i % 2 === 0
                        ? "bg-slate-900/60 border-t border-slate-800"
                        : "bg-slate-900/30 border-t border-slate-800"
                    }
                  >
                    <td className="p-3 font-bold text-white">{t.trade}</td>
                    <td className="p-3 text-right text-slate-300">{t.entry}</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">{t.mid}</td>
                    <td className="p-3 text-right text-emerald-300 font-bold">{t.senior}</td>
                    <td className="p-3 text-right text-slate-400 hidden md:table-cell">{t.time}</td>
                    <td className="p-3 text-right text-sky-400 hidden md:table-cell">{t.debt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Sources: BLS Occupational Outlook Handbook 2024–2025, TradeCareerPath.com, ServiceTitan industry data
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            What Does the Average College Grad Actually Earn?
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The average starting salary for a 2025 bachelor&apos;s degree graduate
            is{" "}
            <strong className="text-white">$68,680 across all majors</strong>.
            But that number is heavily skewed by engineering, computer science,
            and nursing graduates.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Strip those out, and the median college grad enters the workforce
            earning{" "}
            <strong className="text-white">$45,000–$55,000</strong> — often
            less than a mid-level HVAC tech or experienced welder. And they&apos;re
            doing it with $43,000 in debt and monthly loan payments that eat
            hundreds of dollars from every paycheck.
          </p>
          <p className="text-slate-300 leading-relaxed">
            About 43% of college graduates are working in jobs that don&apos;t
            require their degree. These workers paid college prices for jobs
            that never needed the credential — and they&apos;re competing against
            skilled tradespeople who entered those income brackets years earlier
            with far less financial damage.
          </p>
        </section>

        <AdUnit slot="2951831702" />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Skilled Trades Shortage Is Driving Wages Higher
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            There&apos;s a structural force pushing trade wages higher that won&apos;t
            go away anytime soon: America is running out of skilled tradespeople.
            The average age of a licensed electrician in the United States is
            over 50. Millions of tradespeople will retire in the next decade,
            and there aren&apos;t enough young people entering the trades to
            replace them.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            The Bureau of Labor Statistics projects{" "}
            <strong className="text-white">
              11% growth in electrician employment
            </strong>{" "}
            through 2032 — faster than average for all occupations. Plumber
            demand is expected to grow similarly. HVAC technicians are in
            particularly high demand as buildings modernize and climate
            considerations drive retrofitting projects.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Supply and demand are working in the trades&apos; favor. When labor is
            scarce, wages go up. Electricians who might have earned $55,000
            five years ago are now clearing $70,000–$80,000, and master
            electricians running their own shops routinely earn six figures.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            When College Wins: The Honest Cases
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            This isn&apos;t an anti-college screed. College absolutely wins in
            specific scenarios:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              "Engineering or computer science at an in-state public school with scholarships — ROI can hit 300%+ within 5 years",
              "Nursing and allied health fields — high demand, strong salaries, and often employer-assisted tuition",
              "Pre-med / medicine — the investment is massive but the salary ceiling is uncapped",
              "Law and finance — high ceiling, but requires elite-tier schools to justify the debt",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-300 text-sm">
                <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-300 leading-relaxed">
            The pattern is clear: college pays off when you pick a field with
            strong salary outcomes, keep debt low, and actually finish. When
            those conditions aren&apos;t met, the trades win by default.
          </p>
        </section>

        <AdUnit slot="2951831702" format="rectangle" />

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The AI Wildcard: Which Jobs Are Actually Safe?
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Here&apos;s an uncomfortable conversation happening in HR departments
            right now: white-collar, degree-required jobs are more exposed to
            AI automation than skilled trades. A language model can draft a
            legal brief, analyze financial reports, and generate marketing copy.
            It cannot install electrical panels, repair HVAC systems, or lay
            pipe underground.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            McKinsey projects that up to{" "}
            <strong className="text-white">30% of current knowledge work</strong>{" "}
            could be automated by 2030. Entry-level analyst positions, legal
            support, junior marketing roles — these are exactly the kinds of
            jobs where 22-year-old college grads end up.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Meanwhile, the job that involves crawling through an attic to
            replace ductwork isn&apos;t getting automated in 2025, 2030, or
            probably ever. Physical, skilled, hands-on work has a durability
            that looks more and more attractive as AI reshapes the white-collar
            economy.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Real Verdict: Stop Thinking in Tiers
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The old American caste system placed four-year college above trade
            school above "just working." That system was always wrong, and the
            data in 2025 makes it impossible to defend.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            An elevator installer earning $97,000 with no debt and a pension
            has a better financial future than a marketing degree holder earning
            $52,000 with $45,000 in loans. An experienced master plumber
            running her own business and earning $140,000 a year has
            outperformed most law graduates.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The question was never "which path is more prestigious?" It was
            always "which path will actually build the life you want?" In 2025,
            the honest answer for a huge number of people is: trade school.
          </p>
        </section>

        <AdUnit slot="2951831702" />

        {/* CTA links */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <Link
            href="/trade-schools"
            className="p-5 bg-slate-900 border border-emerald-500/30 rounded-xl hover:border-emerald-500 transition-colors group"
          >
            <h3 className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
              Find Trade Schools Near You →
            </h3>
            <p className="text-slate-500 text-sm">Programs, costs, and outcomes by trade.</p>
          </Link>
          <Link
            href="/debt-calculator"
            className="p-5 bg-slate-900 border border-sky-500/30 rounded-xl hover:border-sky-500 transition-colors group"
          >
            <h3 className="font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">
              Run Your College ROI →
            </h3>
            <p className="text-slate-500 text-sm">See the real cost and break-even timeline.</p>
          </Link>
        </div>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a href="https://www.bls.gov/ooh/construction-and-extraction/electricians.htm" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                U.S. Bureau of Labor Statistics — Electricians Occupational Outlook
              </a>
            </li>
            <li>
              <a href="https://tradeschooldudes.com/skilled-trades-that-earn-more-than-college-degrees-in-2025/" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                TradeSchoolDudes — Skilled Trades That Earn More Than College Degrees in 2025
              </a>
            </li>
            <li>
              <a href="https://tradecareerpath.com/guides/national-trade-salaries/" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                TradeCareerPath — 2026 National Trade Salaries Guide
              </a>
            </li>
            <li>
              <a href="https://thebirmgroup.com/why-skilled-trades-are-out-earning-college-graduates-in-2026/" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                The Birm Group — Why Skilled Trades Are Out-Earning College Graduates
              </a>
            </li>
            <li>BLS Occupational Employment and Wage Statistics, 2024</li>
            <li>National Center for Education Statistics, 2025</li>
          </ul>
        </section>
      </article>
    </Layout>
  );
}
