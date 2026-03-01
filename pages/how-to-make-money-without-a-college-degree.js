import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const paths = [
  {
    title: "Electrician Apprenticeship",
    timeline: "4–5 years",
    startingSalary: "$35,000–$42,000",
    fullSalary: "$76,000–$100,000+",
    upfrontCost: "$0 (paid apprenticeship)",
    description: "Get paid to learn from day one. After completing your journeyman license, you can earn six figures in most metro areas. Master electricians who start their own shops often earn $120,000–$200,000+.",
    href: "/trade-schools",
  },
  {
    title: "HVAC Technician",
    timeline: "6 months–2 years",
    startingSalary: "$38,000–$48,000",
    fullSalary: "$65,000–$90,000",
    upfrontCost: "$5,000–$20,000",
    description: "HVAC is one of the most in-demand trades in the country. Climate considerations are driving massive retrofitting demand. EPA 608 certification is the key credential, and it can be earned in weeks.",
    href: "/trade-schools",
  },
  {
    title: "Google / AWS / CompTIA Certs",
    timeline: "3–6 months",
    startingSalary: "$55,000–$75,000",
    fullSalary: "$80,000–$130,000+",
    upfrontCost: "$200–$1,000",
    description: "The Google IT Support Certificate, AWS Cloud Practitioner, and CompTIA A+ and Security+ are employer-recognized credentials that open doors to IT, cloud, and cybersecurity roles at major companies — no degree required.",
    href: "/cheat-sheets",
  },
  {
    title: "Freelance Web Development",
    timeline: "6–18 months self-study",
    startingSalary: "$25–$75/hour",
    fullSalary: "$80,000–$150,000+",
    upfrontCost: "$0–$500 (free resources available)",
    description: "70% of developers are self-taught. With free resources like The Odin Project, freeCodeCamp, and YouTube, you can build portfolio-worthy projects in months. Upwork and Fiverr let you start earning before you're even 'ready.'",
    href: "/cheat-sheets",
  },
  {
    title: "Sales (Tech / Real Estate / Insurance)",
    timeline: "1–3 months",
    startingSalary: "$35,000 base + commission",
    fullSalary: "$80,000–$300,000+",
    upfrontCost: "$0–$200 for licensing",
    description: "Sales has always been the great equalizer. A top-performing sales rep at a SaaS company can earn $200,000+ per year with no degree. Real estate agents in competitive markets regularly clear six figures within two years.",
    href: "/alternatives",
  },
  {
    title: "Plumbing",
    timeline: "4–5 years",
    startingSalary: "$40,000–$54,000",
    fullSalary: "$72,000–$95,000+",
    upfrontCost: "$0 (apprenticeship) or $5k–$15k (trade school)",
    description: "Master plumbers are in short supply everywhere. With a license, you can work independently and charge $100–$200 per hour for service calls. Running your own plumbing business is a path to well over six figures.",
    href: "/trade-schools",
  },
  {
    title: "UX/UI Design (Self-Taught)",
    timeline: "6–12 months",
    startingSalary: "$55,000–$70,000",
    fullSalary: "$99,000–$140,000",
    upfrontCost: "$500–$2,000",
    description: "UX/UI designers earn an average of $99,230 annually. Many are self-taught using Figma, free YouTube tutorials, and practice projects. A strong portfolio matters more than credentials in this field.",
    href: "/cheat-sheets",
  },
  {
    title: "Civil Service / Government Jobs",
    timeline: "1–3 months (application process)",
    startingSalary: "$40,000–$65,000",
    fullSalary: "$65,000–$110,000",
    upfrontCost: "$0",
    description: "Federal, state, and local governments have eliminated degree requirements for hundreds of job classifications. The benefits — health insurance, pension, job security — are unmatched in the private sector.",
    href: "/civil-service",
  },
];

export default function HowToMakeMoneyWithoutCollegeDegree() {
  return (
    <Layout>
      <SEO
        title="How to Make Money Without a College Degree in 2025 (Real Paths)"
        description="How to make money without a college degree in 2025 — 8 proven paths with real salary data, including trades, tech certs, freelancing, and more. No debt required."
      />

      <article className="max-w-3xl mx-auto px-4 py-12 text-slate-200">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">
            Career Guide · Updated 2025
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            How to Make Money Without a College Degree in 2025
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            The degree requirement is collapsing. IBM, Apple, Google, and
            hundreds of other employers have dropped it. Here are 8 proven paths
            to real income — no $150,000 tuition bill required.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900 border border-sky-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-sky-400">70%</div>
            <div className="text-xs text-slate-500 mt-1">of developers are self-taught</div>
          </div>
          <div className="bg-slate-900 border border-sky-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-sky-400">$100k+</div>
            <div className="text-xs text-slate-500 mt-1">reachable in trades without a degree</div>
          </div>
          <div className="bg-slate-900 border border-sky-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-sky-400">$0</div>
            <div className="text-xs text-slate-500 mt-1">debt on apprenticeship tracks</div>
          </div>
        </div>

        <AdUnit slot="2951831702" />

        {/* Intro section */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Degree Wall Is Crumbling
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            For decades, the four-year college degree acted as a gatekeeper.
            You couldn&apos;t get past HR at most major companies without one.
            That era is ending — fast.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            IBM has removed degree requirements from over 50% of its job
            postings, focusing instead on demonstrated skills. Apple, Google,
            Accenture, and hundreds of other major employers have followed. A
            2023 analysis found that{" "}
            <strong className="text-white">
              45% of employers dropped degree requirements
            </strong>{" "}
            for roles that previously required them — a shift driven by talent
            shortages and growing evidence that degrees don&apos;t predict job
            performance.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Meanwhile, the skilled trades are facing a generational crisis.
            America&apos;s tradespeople are aging out. Electricians, plumbers,
            and HVAC technicians are retiring faster than young people are
            entering the fields. The result: wages are climbing, and employers
            are desperate for qualified workers.
          </p>
          <p className="text-slate-300 leading-relaxed">
            This is the best time in a generation to build a high income without
            a college degree. Here&apos;s how.
          </p>
        </section>

        {/* Path cards */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-6">
            8 Real Paths to $60,000–$150,000+ Without a Degree
          </h2>
          <div className="space-y-6">
            {paths.map((path, i) => (
              <div key={path.title}>
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-sky-500/50 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-black text-white">{path.title}</h3>
                    <span className="text-xs font-bold bg-sky-500/20 text-sky-400 px-2 py-1 rounded-full shrink-0">
                      #{i + 1}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Timeline</div>
                      <div className="text-sm font-bold text-slate-300">{path.timeline}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Starting Pay</div>
                      <div className="text-sm font-bold text-emerald-400">{path.startingSalary}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Full Earning</div>
                      <div className="text-sm font-bold text-emerald-300">{path.fullSalary}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Upfront Cost</div>
                      <div className="text-sm font-bold text-sky-400">{path.upfrontCost}</div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    {path.description}
                  </p>
                  <Link href={path.href} className="text-sky-400 text-sm font-bold hover:underline">
                    Learn more →
                  </Link>
                </div>
                {/* Insert ad after paths 2, 4, 6 */}
                {(i === 1 || i === 3 || i === 5) && (
                  <AdUnit slot="2951831702" />
                )}
              </div>
            ))}
          </div>
        </section>

        <AdUnit slot="2951831702" format="rectangle" />

        {/* Section: How to pick */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            How to Choose Your Path: A Framework
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            With so many options, how do you pick? Here&apos;s a simple decision
            framework:
          </p>

          <div className="space-y-4">
            <div className="p-5 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="font-bold text-white mb-2">
                1. Do you like working with your hands?
              </h3>
              <p className="text-slate-400 text-sm">
                If yes: skilled trades (electrician, plumber, HVAC, welder).
                These offer apprenticeship pay from day one, zero debt, and
                exceptional long-term income. The physical nature of the work
                also means zero AI displacement risk.
              </p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="font-bold text-white mb-2">
                2. Are you drawn to tech and computers?
              </h3>
              <p className="text-slate-400 text-sm">
                If yes: certifications and self-teaching. Google IT, AWS,
                CompTIA Security+, or learning to code via freeCodeCamp or The
                Odin Project. Build a portfolio, apply for junior roles, and
                level up from there. Many developers hit $100k+ within 3–5
                years.
              </p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="font-bold text-white mb-2">
                3. Are you comfortable talking to people?
              </h3>
              <p className="text-slate-400 text-sm">
                If yes: sales, real estate, or insurance. The upside is
                uncapped. Top performers in SaaS sales regularly earn
                $150,000–$300,000 per year. Real estate agents in major cities
                can clear $100,000–$200,000 once established. The barrier to
                entry is low; the ceiling is not.
              </p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="font-bold text-white mb-2">
                4. Do you value stability above all?
              </h3>
              <p className="text-slate-400 text-sm">
                If yes: civil service and government jobs. Federal agencies have
                eliminated degree requirements for hundreds of roles. The pay
                is competitive, benefits are exceptional, and job security is
                among the best in any sector. This path is slow but bulletproof.
              </p>
            </div>
          </div>
        </section>

        {/* Section: The self-teaching revolution */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Self-Teaching Revolution
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            One of the most significant shifts in the 2020s labor market is
            that self-teaching has become genuinely viable in ways it never was
            before. Consider:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              "Stack Overflow's annual survey consistently finds that 70%+ of professional developers are self-taught or learned through online resources",
              "Coursera, edX, and YouTube have made world-class instruction free or nearly free — MIT OpenCourseWare publishes full course materials at no cost",
              "GitHub portfolios and freelance platforms like Upwork let you demonstrate skills without credentials — employers can see your actual work",
              "Certifications from Google, Amazon, Microsoft, and CompTIA are increasingly treated as equivalents to degree-level hiring filters for tech roles",
              "The AI tools available in 2025 — ChatGPT, Claude, GitHub Copilot — accelerate self-learning dramatically, helping beginners debug code, understand concepts, and build projects faster than ever",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-300 text-sm">
                <span className="text-sky-400 mt-0.5 shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-300 leading-relaxed">
            The bottleneck is no longer access to knowledge. It&apos;s discipline,
            consistency, and building proof of your skills. A focused 12 months
            of self-study can produce a developer competitive with graduates
            from many mid-tier university programs — without the debt.
          </p>
        </section>

        <AdUnit slot="2951831702" />

        {/* Section: Freelancing */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            Freelancing: The Fastest Path to Income Proof
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            One of the most powerful aspects of non-degree career paths in 2025
            is the ability to start generating income before you&apos;re "qualified"
            by any traditional measure. Freelancing makes this possible.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            A beginner web developer can land their first Upwork contract while
            still learning. A junior graphic designer can charge $25/hour on
            Fiverr while building skills. A new copywriter can start a Substack
            or pitch articles to pay-per-word publications.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            These early gigs do three things simultaneously: they generate cash,
            they build a portfolio, and they build the professional confidence
            that comes from delivering real work to real clients. By the time
            you&apos;re applying for full-time roles, you have receipts — clients,
            testimonials, and deliverables that a degree simply cannot provide.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The timeline: most freelancers start generating some income within
            1–3 months of consistent effort. A full-time freelance income
            typically takes 6–18 months to establish. The upside is uncapped —
            experienced freelancers in high-demand niches (SEO, paid media,
            software development, UX/UI) regularly earn $80,000–$150,000+ per
            year working for themselves.
          </p>
        </section>

        {/* Section: What doesn't work */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            What Doesn&apos;t Work: Honest Warnings
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Not every "no degree required" opportunity is worth your time.
            Here&apos;s what to avoid:
          </p>
          <ul className="space-y-3">
            {[
              {
                bad: "Dropshipping and Amazon FBA \"courses\" for $997",
                why: "Saturated markets, thin margins, and most courses teach you to sell courses — not to actually build a business.",
              },
              {
                bad: "MLM / network marketing",
                why: "Less than 1% of participants make meaningful income. This is not a viable career path.",
              },
              {
                bad: "Bootcamps that cost $15,000–$25,000 for 3-month programs",
                why: "Expensive bootcamps rarely justify their cost when free alternatives like The Odin Project and freeCodeCamp produce comparable developers.",
              },
              {
                bad: "Gig economy as a career (not a bridge)",
                why: "DoorDash and Uber are useful for earning while you build skills. They are not scalable careers — the ceiling is too low and the costs (vehicle, insurance) too high.",
              },
            ].map((item) => (
              <li key={item.bad} className="p-4 bg-slate-900 border border-red-500/20 rounded-xl">
                <div className="font-bold text-red-400 text-sm mb-1">✗ {item.bad}</div>
                <div className="text-slate-400 text-sm">{item.why}</div>
              </li>
            ))}
          </ul>
        </section>

        <AdUnit slot="2951831702" format="rectangle" />

        {/* Section: The mindset */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            The Mindset Shift That Makes Everything Work
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Here&apos;s the hardest part of building income without a degree: nobody
            hands you a path. College gives you a clear four-year sequence of
            steps — show up, take these classes, get this piece of paper, apply
            to jobs. Without that structure, you have to provide your own.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            The people who succeed at non-traditional paths share a few common
            traits: they pick one path and go deep instead of dabbling in
            everything, they build proof of their work publicly (GitHub repos,
            portfolios, client testimonials), they treat skill-building as a
            job with set hours, and they find community with others on the same
            path — Discord servers, subreddits, local trade unions, or
            professional groups.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The system is no longer designed to exclude you. The degree wall is
            falling. But it&apos;s also not designed to hand you anything. That
            gap — between an open door and knowing how to walk through it — is
            exactly what sites like this one exist to help close.
          </p>
        </section>

        {/* Section: Quick start */}
        <section className="mb-10 p-6 bg-slate-900 border border-sky-500/30 rounded-2xl">
          <h2 className="text-xl font-black text-white mb-4">
            Your 30-Day Quick Start Plan
          </h2>
          <ol className="space-y-3">
            {[
              "Pick ONE path from the list above. Just one. Indecision kills more careers than bad decisions.",
              "Spend 5 hours researching that path specifically — Reddit communities, YouTube channels, forums. Find people already doing it.",
              "Identify the first credential, program, or deliverable you need to produce.",
              "Set a daily practice schedule — 1–2 hours minimum. Treat it like a shift, not a hobby.",
              "Within 30 days, produce something real: one completed project, one certification exam booked, one apprenticeship application submitted.",
            ].map((step, i) => (
              <li key={step} className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-300">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <AdUnit slot="2951831702" />

        {/* CTA */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <Link href="/trade-schools" className="p-4 bg-slate-900 border border-slate-700 rounded-xl hover:border-emerald-500/50 transition-colors group text-center">
            <div className="text-2xl mb-2">🔧</div>
            <div className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">Trade Schools</div>
            <div className="text-slate-500 text-xs mt-1">Find programs near you</div>
          </Link>
          <Link href="/cheat-sheets" className="p-4 bg-slate-900 border border-slate-700 rounded-xl hover:border-sky-500/50 transition-colors group text-center">
            <div className="text-2xl mb-2">💻</div>
            <div className="font-bold text-white text-sm group-hover:text-sky-400 transition-colors">Tech Cert Guide</div>
            <div className="text-slate-500 text-xs mt-1">Google, AWS, CompTIA paths</div>
          </Link>
          <Link href="/debt-calculator" className="p-4 bg-slate-900 border border-slate-700 rounded-xl hover:border-red-500/50 transition-colors group text-center">
            <div className="text-2xl mb-2">🧮</div>
            <div className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">Debt Calculator</div>
            <div className="text-slate-500 text-xs mt-1">See what college really costs</div>
          </Link>
        </div>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a href="https://www.nichepursuits.com/how-to-make-money-without-a-degree/" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                Niche Pursuits — How To Make Money Without College: 39+ Awesome Ways in 2025
              </a>
            </li>
            <li>
              <a href="https://www.salarytransparentstreet.com/resource-hub/high-income-skills" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                Salary Transparent Street — 10 High-Income Skills to Learn Without a Degree in 2025
              </a>
            </li>
            <li>
              <a href="https://www.techtimes.com/articles/314271/20260126/7-high-income-tech-skills-you-can-learn-without-degree.htm" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                TechTimes — 7 High-Income Tech Skills You Can Learn Without a Degree
              </a>
            </li>
            <li>
              <a href="https://www.upwork.com/resources/online-jobs-without-degree-requirements" className="hover:text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                Upwork — 19 High-Paying Online Jobs With No Degree Required
              </a>
            </li>
            <li>Stack Overflow Developer Survey 2024</li>
            <li>U.S. Bureau of Labor Statistics — Occupational Outlook Handbook 2024–2025</li>
            <li>McKinsey Global Institute — The Future of Work, 2025</li>
          </ul>
        </section>
      </article>
    </Layout>
  );
}
