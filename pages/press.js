import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";

const COVERAGE_TOPICS = [
  {
    topic: "The Student Debt Crisis",
    summary: "IHateCollege.com publishes data-driven analysis of U.S. student loan debt using the Department of Education's College Scorecard API. Our college ROI rankings compare average debt load vs. post-graduation earnings by institution.",
  },
  {
    topic: "Trade School vs. College",
    summary: "Our salary comparison tools and trade school guides have helped thousands of students understand the financial difference between a 4-year degree and a 2-year vocational program or apprenticeship.",
  },
  {
    topic: "The No-Degree Job Market",
    summary: "We track and publish data on high-paying careers that don't require a bachelor's degree — from government jobs to tech certifications — as the labor market shifts toward skills-based hiring.",
  },
  {
    topic: "Higher Education Reform",
    summary: "As states debate student loan forgiveness, income-share agreements, and alternative credentials, IHateCollege.com provides a consumer-focused perspective on what the data actually shows.",
  },
];

const FAST_FACTS = [
  { label: "Founded", value: "2024" },
  { label: "Monthly Visitors", value: "50,000+" },
  { label: "Monthly Pageviews", value: "120,000+" },
  { label: "Primary Audience", value: "Ages 18–34, U.S." },
  { label: "Data Source", value: "U.S. Dept. of Education College Scorecard" },
  { label: "Content Focus", value: "College ROI, Trade Careers, Debt" },
  { label: "Headquarters", value: "United States" },
  { label: "Contact", value: "contact@ihatecollege.com" },
];

const TOOLS = [
  { name: "College ROI Rankings", path: "/college-rankings", desc: "Rank 6,000+ U.S. colleges by debt-to-earnings ratio using federal data." },
  { name: "Student Debt Calculator", path: "/debt-calculator", desc: "Calculate real monthly payments and total interest on any loan amount." },
  { name: "Rank Your School", path: "/rank-your-school", desc: "Look up any school's average debt and median earnings for graduates." },
  { name: "Job Board", path: "/job-board", desc: "Browse and post jobs that don't require a 4-year degree." },
  { name: "Trade School Guide", path: "/trade-schools", desc: "Compare trade and vocational programs by salary outcomes." },
  { name: "College Alternatives", path: "/alternatives", desc: "Explore paths including bootcamps, apprenticeships, and military." },
];

export default function Press() {
  return (
    <Layout>
      <SEO
        title="Press & Media | IHateCollege.com"
        description="Press information, fast facts, and media resources for IHateCollege.com — the leading site for college alternative research and student debt data."
      />

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-10">
        <p className="text-sky-400 text-sm font-bold uppercase tracking-widest mb-4">Press & Media</p>
        <h1 className="text-5xl font-black text-white mb-6 leading-tight max-w-3xl">
          Media Resources &<br /> Press Information
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
          IHateCollege.com is a data-driven media property covering the student debt crisis,
          college alternatives, and the future of work in America. We welcome press inquiries
          and are available for comment, data requests, and interviews.
        </p>
        <a
          href="mailto:contact@ihatecollege.com"
          className="inline-block px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl transition-colors"
        >
          Press Contact: contact@ihatecollege.com
        </a>
      </div>

      {/* Fast Facts */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-6">Fast Facts</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
          {FAST_FACTS.map((f, i) => (
            <div
              key={f.label}
              className={`flex justify-between items-center px-6 py-4 ${i !== FAST_FACTS.length - 1 ? "border-b border-slate-800" : ""}`}
            >
              <span className="text-slate-400 text-sm">{f.label}</span>
              <span className="text-white font-bold text-sm text-right">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What We Cover */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-8">Topics We Cover</h2>
        <div className="space-y-4">
          {COVERAGE_TOPICS.map((t) => (
            <div key={t.topic} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-white font-black text-lg mb-2">{t.topic}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data & Tools */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-4">Our Data Tools</h2>
        <p className="text-slate-400 mb-8">
          All college cost and earnings data is sourced from the{" "}
          <a
            href="https://collegescorecard.ed.gov"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline"
          >
            U.S. Department of Education College Scorecard API
          </a>
          . Our tools are freely available to the public and to journalists.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.name}
              href={tool.path}
              className="bg-slate-900 border border-slate-700 hover:border-sky-500 rounded-2xl p-5 transition-colors block"
            >
              <h3 className="text-white font-black mb-2">{tool.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl font-black text-white mb-6">Editorial Mission</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              IHateCollege.com does not take the position that college is universally bad.
              Our position is that <strong className="text-white">students deserve accurate data</strong> before
              taking on tens of thousands of dollars in debt.
            </p>
            <p>
              We use publicly available federal data to show — transparently — which schools
              produce graduates who earn enough to repay their loans and which schools do not.
              We believe this information should be easy to find and understand.
            </p>
            <p>
              We also believe the skilled trades, technical certifications, and apprenticeship
              programs are systematically undervalued in American culture, and we work to
              correct that perception with real earnings data.
            </p>
          </div>
        </div>
      </div>

      {/* Social + Contact */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-white mb-8">Find Us Online</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <a href="https://twitter.com/ihatecollege4u" target="_blank" rel="noreferrer"
            className="bg-slate-900 border border-slate-700 hover:border-sky-500 rounded-2xl p-6 transition-colors">
            <p className="text-slate-400 text-sm mb-1">X (Twitter)</p>
            <p className="text-white font-black text-lg">@ihatecollege4u</p>
          </a>
          <a href="https://www.tiktok.com/@_ihatecollege" target="_blank" rel="noreferrer"
            className="bg-slate-900 border border-slate-700 hover:border-sky-500 rounded-2xl p-6 transition-colors">
            <p className="text-slate-400 text-sm mb-1">TikTok</p>
            <p className="text-white font-black text-lg">@_ihatecollege</p>
          </a>
          <a href="https://www.youtube.com/@IHateCollege79" target="_blank" rel="noreferrer"
            className="bg-slate-900 border border-slate-700 hover:border-sky-500 rounded-2xl p-6 transition-colors">
            <p className="text-slate-400 text-sm mb-1">YouTube</p>
            <p className="text-white font-black text-lg">@IHateCollege79</p>
          </a>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center">
          <h3 className="text-white font-black text-xl mb-3">Press Inquiries</h3>
          <p className="text-slate-400 mb-6">
            For interview requests, data questions, or media partnerships, email us directly.
            We typically respond within 24 hours.
          </p>
          <a
            href="mailto:contact@ihatecollege.com"
            className="inline-block px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl transition-colors"
          >
            contact@ihatecollege.com
          </a>
        </div>
      </div>

    </Layout>
  );
}
