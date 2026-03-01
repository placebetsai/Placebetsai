import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

export default function IsCollegeWorthIt2025() {
  return (
    <Layout>
      <SEO
        title="Is College Worth It in 2025? Real Stats, Debt, and ROI Breakdown"
        description="Is college worth it in 2025? We break down the real numbers — student debt, earnings premiums, ROI by major, and what 63% of Americans actually think now."
      />

      <article className="max-w-3xl mx-auto px-4 py-12 text-slate-200">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">
            Deep Dive · Updated March 2025
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Is College Worth It in 2025?
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            The honest answer: it depends. But the data is more damning than
            your guidance counselor ever let on. Here&apos;s every number you
            need to make the decision yourself.
          </p>
        </div>

        {/* Author bio */}
        <div className="flex items-center gap-4 mb-10 p-4 bg-slate-900/60 border border-slate-700 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-black text-lg shrink-0">
            JM
          </div>
          <div>
            <div className="font-bold text-white text-sm">Jake Morrison</div>
            <div className="text-slate-400 text-xs leading-relaxed">
              Jake spent 6 years in higher education administration before leaving to write about the economics of college. He holds a master&apos;s in education policy and has been quoted in Forbes, MarketWatch, and The Atlantic on student debt reform.
            </div>
          </div>
        </div>

        {/* Stat callout */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900 border border-red-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-red-400">63%</div>
            <div className="text-xs text-slate-500 mt-1">of voters say degree not worth cost</div>
          </div>
          <div className="bg-slate-900 border border-red-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-red-400">$1.83T</div>
            <div className="text-xs text-slate-500 mt-1">total US student loan debt</div>
          </div>
          <div className="bg-slate-900 border border-red-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-red-400">25%</div>
            <div className="text-xs text-slate-500 mt-1">of grads never achieve positive ROI</div>
          </div>
        </div>

        <AdUnit slot="6600722153" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Public Has Made Up Its Mind
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            For decades, "go to college" was as close to universal advice as
            America got. Not anymore. A 2024 NBC News poll found that{" "}
            <strong className="text-white">63% of registered voters</strong>{" "}
            now agree that a four-year degree is "not worth the cost" — up
            dramatically from 47% in 2017 and 40% in 2013. That isn&apos;t a
            fringe opinion. That&apos;s a majority.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            A separate Gallup poll found that only{" "}
            <strong className="text-white">35% of Americans</strong> say going
            to college is "very important" — a record low. In 2010, that number
            was 75%. In less than 15 years, the share of Americans who consider
            college essential to success has been cut in half.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Even degree holders are skeptical. Only{" "}
            <strong className="text-white">46% of college graduates</strong>{" "}
            now say getting a degree was worth the cost — down from 63% in
            2013. These aren&apos;t high school dropouts bad-mouthing higher
            education. These are people who lived it and are having second
            thoughts.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Earnings Premium Is Real — But Complicated
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Let&apos;s be honest: college graduates do earn more on average.
            Bachelor&apos;s degree holders earn about{" "}
            <strong className="text-white">66% more over their lifetimes</strong>{" "}
            than high school graduates — roughly $1.2 million in additional
            lifetime earnings. Weekly, a bachelor&apos;s degree holder brings
            home around $1,541 versus $916 for someone with just a diploma.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            The average starting salary for 2025 college graduates is
            projected at{" "}
            <strong className="text-white">$68,680 across all majors</strong>.
            College graduates are also half as likely to be unemployed — in May
            2025, unemployment among recent graduates ran at 4.8% versus 7.4%
            for young workers without a bachelor&apos;s degree.
          </p>
          <p className="text-slate-300 leading-relaxed">
            So the earnings premium is real. The question is whether it
            justifies the cost — and for a growing number of people, it
            doesn&apos;t.
          </p>
        </section>

        <AdUnit slot="6600722153" format="rectangle" />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Debt Problem Changes Everything
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Here&apos;s the number your university&apos;s brochure won&apos;t
            show you: total US student loan debt now stands at{" "}
            <strong className="text-white">$1.833 trillion</strong>, held by{" "}
            <strong className="text-white">42.8 million borrowers</strong>. The
            average federal student loan balance is $39,547 — but when you
            include private loans, the total average climbs to $43,333.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Tuition has{" "}
            <strong className="text-white">
              doubled at public colleges since 1995
            </strong>{" "}
            and surged 75% at private schools. The borrowers paying for that
            inflation often spend decades digging out.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            When researchers at Washington University accounted for debt
            payments, they found that degree holders still out-earn non-degree
            holders by about{" "}
            <strong className="text-white">$8,000 per year</strong> (after
            subtracting loan payments). That sounds good — until you realize
            that gap disappears entirely if you chose the wrong major, didn&apos;t
            graduate, or attended a high-cost private school.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Bachelor&apos;s degree holders spend roughly{" "}
            <strong className="text-white">19% of their earnings premium</strong>{" "}
            on student loan payments. Master&apos;s degree holders? A staggering{" "}
            <strong className="text-white">57%</strong>. Associate&apos;s
            degree graduates get the best deal, spending just 9% of their
            premium on loan payments.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            ROI by Major: Winners and Losers
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The average ROI for a college degree is estimated at{" "}
            <strong className="text-white">12.5%</strong> — which sounds great.
            But that average conceals enormous variation. Engineering majors can
            see ROIs up to{" "}
            <strong className="text-white">326.6% within five years</strong>.
            Computer science and healthcare follow closely behind. These are the
            degrees that actually deliver on the promise.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            On the other end, roughly{" "}
            <strong className="text-white">25% of college graduates</strong>{" "}
            never achieve a positive ROI on their degree. Fine arts, liberal
            arts, social work, education — these fields often leave graduates
            earning less than skilled tradespeople who spent far less money and
            time getting certified.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Additionally, about{" "}
            <strong className="text-white">43% of all college graduates</strong>{" "}
            are working in jobs that don&apos;t require their degree at all.
            That means nearly half of all graduates are taking on massive debt
            to end up in jobs that never required the credential in the first
            place.
          </p>
        </section>

        <AdUnit slot="6600722153" />

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Most Dangerous Group: Debt Without a Degree
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The worst financial outcome isn&apos;t going to college and
            graduating with debt. It&apos;s going to college, not finishing,
            and still having all the debt. Students who drop out carry the
            financial burden of loans without the earnings boost that justifies
            them.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            About{" "}
            <strong className="text-white">40% of students</strong> who enroll
            in four-year programs don&apos;t finish within six years. Many
            leave with $10,000 to $30,000 in debt and no credential to show for
            it. For these students, college was an unambiguous financial
            disaster.
          </p>
          <p className="text-slate-300 leading-relaxed">
            If you&apos;re going to college, you need to be confident you&apos;ll
            finish — and that your major will pay off. If either of those is in
            doubt, the calculus changes dramatically.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            What the Job Market Is Actually Saying
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Here&apos;s a stat the higher education lobby doesn&apos;t love: by{" "}
            <strong className="text-white">2031, 72% of all jobs</strong> will
            require some form of postsecondary education or training — but that
            includes certifications, apprenticeships, associate&apos;s degrees,
            and trade credentials. It doesn&apos;t mean a four-year bachelor&apos;s
            degree is required.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Major employers including Google, Apple, IBM, Accenture, and
            hundreds of others have already dropped degree requirements for most
            roles. They care about what you can do — not where you went. IBM has
            removed degree requirements from over 50% of its job postings. Apple
            has done the same for a growing share of its workforce.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Meanwhile, skilled trades face a massive labor shortage. The
            Department of Labor projects that demand for electricians, plumbers,
            HVAC technicians, and welders will outpace supply through at least
            2032. These aren&apos;t low-wage dead ends — experienced tradespeople
            routinely earn $70,000 to $100,000+ per year, often with zero
            student debt.
          </p>
        </section>

        <AdUnit slot="6600722153" format="rectangle" />

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            So Is College Worth It in 2025? The Honest Verdict
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            College is worth it{" "}
            <strong className="text-white">if</strong>: you&apos;re pursuing a
            high-ROI field (engineering, nursing, computer science, accounting),
            you can graduate with debt under $30,000, you&apos;re confident you&apos;ll
            finish, and you&apos;re attending an in-state public school or have
            significant scholarship support.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            College is <strong className="text-white">not</strong> worth it if:
            you&apos;re going because you don&apos;t know what else to do, your
            major has weak salary prospects, you&apos;d need to borrow $50,000+,
            or you&apos;re counting on a degree to impress employers who no longer
            require one.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            The old binary — college or bust — is gone. Trade school,
            bootcamps, apprenticeships, certifications, and self-taught skill
            paths now lead to genuinely excellent careers. The question
            isn&apos;t "should I go to college?" The right question is "what&apos;s
            the most efficient path to financial independence?"
          </p>
          <p className="text-slate-300 leading-relaxed">
            For millions of people in 2025, that path doesn&apos;t run through a
            $150,000 four-year degree. And the data is finally starting to
            reflect that reality.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            Alternatives Worth Considering Right Now
          </h2>
          <ul className="space-y-4">
            {[
              {
                title: "Trade School",
                desc: "6–18 months. $5,000–$30,000 total cost. Electricians, HVAC techs, and plumbers earn $60,000–$100,000+ with zero four-year debt.",
                href: "/trade-schools",
              },
              {
                title: "Google / AWS / CompTIA Certifications",
                desc: "3–6 months. Under $1,000. Entry-level IT and cloud roles start at $55,000–$80,000 and top out far higher.",
                href: "/cheat-sheets",
              },
              {
                title: "Registered Apprenticeships",
                desc: "Get paid to learn. Earn $15–$30/hour while training, then step into a full salary. No debt.",
                href: "/alternatives",
              },
              {
                title: "Civil Service & Government Jobs",
                desc: "Many federal and state roles don't require degrees. Excellent benefits, job security, and pension.",
                href: "/civil-service",
              },
            ].map((alt) => (
              <li
                key={alt.title}
                className="p-5 bg-slate-900 border border-slate-700 rounded-xl"
              >
                <h3 className="font-bold text-white mb-1">{alt.title}</h3>
                <p className="text-slate-400 text-sm mb-2">{alt.desc}</p>
                <Link href={alt.href} className="text-sky-400 text-sm hover:underline">
                  Learn more →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <AdUnit slot="6600722153" />

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a href="https://educationdata.org/student-loan-debt-statistics" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                Education Data Initiative — Student Loan Debt Statistics 2025
              </a>
            </li>
            <li>
              <a href="https://www.brookings.edu/articles/college-is-still-worth-it-even-with-student-debt-but-we-can-do-better/" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                Brookings Institution — College ROI and Debt Analysis
              </a>
            </li>
            <li>
              <a href="https://fortune.com/2025/11/30/is-college-worth-it-four-year-degree-cost-graduates-student-debt-ai-skills-unemployment/" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                Fortune — Even College Graduates No Longer Think a Degree Is Worth the Cost
              </a>
            </li>
            <li>
              <a href="https://www.aplu.org/our-work/4-policy-and-advocacy/publicuvalues/key-figures-on-cost-student-debt-amp-roi-of-public-universities/" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                APLU — Key Figures on Cost, Student Debt & ROI at Public Universities
              </a>
            </li>
            <li>U.S. Bureau of Labor Statistics — Employment Situation, 2025</li>
            <li>Gallup — Value of College Poll, 2024</li>
            <li>NBC News — Registered Voter Survey on College Value, 2024</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 border border-sky-500/30 text-center">
          <h3 className="text-xl font-black text-white mb-2">
            Run Your Own Numbers
          </h3>
          <p className="text-slate-400 text-sm mb-4">
            See exactly how much your degree will actually cost — and what it
            would take to make it worth it.
          </p>
          <Link
            href="/debt-calculator"
            className="inline-block px-6 py-3 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-400 transition-colors"
          >
            Use the Debt Calculator
          </Link>
        </div>
      </article>
    </Layout>
  );
}
