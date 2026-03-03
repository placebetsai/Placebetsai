import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";

const STATS = [
  { value: "50,000+", label: "Monthly Visitors" },
  { value: "120,000+", label: "Monthly Pageviews" },
  { value: "18–34", label: "Core Age Range" },
  { value: "72%", label: "U.S. Audience" },
];

const CATEGORIES = [
  { icon: "🎓", title: "College ROI Analysis", desc: "Data-driven breakdowns of whether specific degrees and schools are worth the cost." },
  { icon: "🔧", title: "Trade & Vocational Paths", desc: "Electricians, HVAC, plumbing, welding — careers that pay six figures without a degree." },
  { icon: "💻", title: "Tech Without a Degree", desc: "Bootcamps, certifications, and self-taught paths into software, cybersecurity, and IT." },
  { icon: "💼", title: "Job Board", desc: "Real listings for jobs that don't require a 4-year degree, including government and trade roles." },
  { icon: "📊", title: "Salary & Debt Data", desc: "Real earnings vs. real debt data from the U.S. Department of Education College Scorecard." },
  { icon: "📰", title: "News & Commentary", desc: "Weekly takes on higher education policy, student debt, and the future of work." },
];

const SOCIALS = [
  { platform: "X (Twitter)", handle: "@ihatecollege4u", url: "https://twitter.com/ihatecollege4u", color: "bg-slate-800 border-slate-600" },
  { platform: "TikTok", handle: "@_ihatecollege", url: "https://www.tiktok.com/@_ihatecollege", color: "bg-slate-800 border-slate-600" },
  { platform: "YouTube", handle: "@IHateCollege79", url: "https://www.youtube.com/@IHateCollege79", color: "bg-slate-800 border-slate-600" },
];

export default function About() {
  return (
    <Layout>
      <SEO
        title="About IHateCollege.com | Media Kit & Audience"
        description="IHateCollege.com is the leading destination for students and young adults exploring alternatives to a 4-year college degree. Learn about our audience, content, and mission."
      />

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-10 text-center">
        <p className="text-sky-400 text-sm font-bold uppercase tracking-widest mb-4">About & Media Kit</p>
        <h1 className="text-5xl font-black text-white mb-6 leading-tight">
          The #1 Site for Students<br className="hidden sm:block" /> Questioning College
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          IHateCollege.com helps high school graduates, current students, and career changers
          make smarter decisions about education — using real data, not admissions office spin.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/advertise" className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl transition-colors">
            Advertise With Us
          </Link>
          <a href="mailto:contact@ihatecollege.com" className="px-6 py-3 border border-slate-600 hover:border-white text-white font-black rounded-xl transition-colors">
            Contact Us
          </a>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-white mb-1">{s.value}</p>
              <p className="text-slate-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-6">Our Mission</h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
          <p>
            For decades, students were told one thing: go to college or you'll fail. That narrative
            costs the average graduate <strong className="text-white">$37,000 in student debt</strong> — often for degrees
            with poor earnings outcomes.
          </p>
          <p>
            IHateCollege.com was built to show the other side. We publish data on college ROI,
            trade school salaries, tech certification paths, and government careers — so young
            people can make decisions based on facts, not fear.
          </p>
          <p>
            We are not anti-education. We are anti-bad-decisions.
          </p>
        </div>
      </div>

      {/* Content Categories */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-8">Content We Cover</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => (
            <div key={c.title} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">{c.icon}</span>
              <h3 className="text-white font-black text-lg mb-2">{c.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Demographics */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-8">Our Audience</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-white font-black text-lg mb-4">Demographics</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex justify-between"><span>Age 18–24</span><span className="text-white font-bold">48%</span></li>
              <li className="flex justify-between"><span>Age 25–34</span><span className="text-white font-bold">24%</span></li>
              <li className="flex justify-between"><span>Age 35+</span><span className="text-white font-bold">28%</span></li>
              <li className="flex justify-between border-t border-slate-700 pt-3 mt-3"><span>United States</span><span className="text-white font-bold">72%</span></li>
              <li className="flex justify-between"><span>Mobile Users</span><span className="text-white font-bold">68%</span></li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-white font-black text-lg mb-4">Intent & Behavior</h3>
            <ul className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <li>✓ Actively researching education and career alternatives</li>
              <li>✓ Comparing college costs vs. trade school ROI</li>
              <li>✓ Searching for jobs that don't require a 4-year degree</li>
              <li>✓ Exploring student loan refinancing options</li>
              <li>✓ High purchase intent for financial and career products</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-8">Social Media Presence</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className={`${s.color} border rounded-2xl p-6 hover:border-sky-500 transition-colors block`}
            >
              <p className="text-slate-400 text-sm mb-1">{s.platform}</p>
              <p className="text-white font-black text-xl">{s.handle}</p>
            </a>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-12">
          <h2 className="text-3xl font-black text-white mb-4">Want to Reach Our Audience?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            We work with financial services, trade schools, certification programs, and employers
            who want to reach students and career changers.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/advertise" className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl transition-colors">
              View Advertising Options
            </Link>
            <Link href="/press" className="px-6 py-3 border border-slate-600 hover:border-white text-white font-black rounded-xl transition-colors">
              Press & Media
            </Link>
          </div>
        </div>
      </div>

    </Layout>
  );
}
