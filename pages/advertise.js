import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useState } from "react";

const AUDIENCE_STATS = [
  { value: "50,000+", label: "Monthly Unique Visitors" },
  { value: "120,000+", label: "Monthly Pageviews" },
  { value: "72%", label: "U.S.-Based Audience" },
  { value: "18–34", label: "Primary Age Demographic" },
];

const CATEGORIES = [
  "Student Loan Refinancing",
  "Trade & Vocational Schools",
  "Tech Bootcamps & Certifications",
  "Career Coaching & Job Platforms",
  "Financial Products (HYSA, investing)",
  "Online Education & Courses",
  "Employer Job Listings",
  "Government & Military Careers",
];

const AD_OPTIONS = [
  {
    name: "Sponsored Article",
    price: "Contact for pricing",
    desc: "A native article written by our team or yours, published on IHateCollege.com. Stays live permanently. Includes social promotion.",
    tags: ["Native Content", "SEO Backlink", "Social Promo"],
  },
  {
    name: "Display Advertising",
    price: "Contact for pricing",
    desc: "Banner placements across high-traffic pages including college rankings, job board, and debt calculator.",
    tags: ["Homepage", "College Rankings", "Job Board"],
  },
  {
    name: "Job Board Listing",
    price: "Free (30 days)",
    desc: "Post a job listing directly on our job board. Visible to thousands of candidates actively looking for non-degree careers.",
    tags: ["30-Day Listing", "All Categories"],
  },
  {
    name: "Affiliate Partnership",
    price: "Revenue Share",
    desc: "We promote your product or service to our audience via dedicated content, sidebar links, and email. Performance-based.",
    tags: ["CPA / CPL", "Email Included", "Long-Term"],
  },
];

export default function Advertise() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", interest: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch("https://formspree.io/f/contact@ihatecollege.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _subject: "Advertising Inquiry — IHateCollege.com" }),
      });
    } catch {}
    setSubmitted(true);
  }

  return (
    <Layout>
      <SEO
        title="Advertise on IHateCollege.com | Reach 50,000+ Monthly Visitors"
        description="Reach 50,000+ monthly visitors who are actively researching college alternatives, student loans, and career paths. Advertising and partnership opportunities on IHateCollege.com."
      />

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-10 text-center">
        <p className="text-sky-400 text-sm font-bold uppercase tracking-widest mb-4">Advertising & Partnerships</p>
        <h1 className="text-5xl font-black text-white mb-6 leading-tight">
          Reach Students Actively<br className="hidden sm:block" /> Searching for Alternatives
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Our audience is high-intent — they're researching student loans, trade schools, certifications,
          and careers. If your product helps them, we want to work with you.
        </p>
      </div>

      {/* Stats Strip */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {AUDIENCE_STATS.map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-white mb-1">{s.value}</p>
              <p className="text-slate-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who We Work With */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-6">Who Advertises Here</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {CATEGORIES.map((c) => (
            <div key={c} className="bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 flex items-center gap-3">
              <span className="text-sky-400 font-black text-lg">✓</span>
              <span className="text-slate-300">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Advertising Options */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-black text-white mb-8">Advertising Options</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {AD_OPTIONS.map((opt) => (
            <div key={opt.name} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-black text-xl">{opt.name}</h3>
                <span className="text-sky-400 font-bold text-sm whitespace-nowrap ml-4">{opt.price}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{opt.desc}</p>
              <div className="flex flex-wrap gap-2">
                {opt.tags.map((t) => (
                  <span key={t} className="text-xs bg-slate-800 border border-slate-600 text-slate-300 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Intent */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl font-black text-white mb-6">Why Our Audience Converts</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-slate-300">
            <ul className="space-y-3 text-sm leading-relaxed">
              <li>✓ Actively comparing student loan refinancing options</li>
              <li>✓ Researching trade schools and bootcamps right now</li>
              <li>✓ Browsing job listings for non-degree careers</li>
              <li>✓ Looking for financial tools (budgeting, investing, HYSA)</li>
            </ul>
            <ul className="space-y-3 text-sm leading-relaxed">
              <li>✓ 68% mobile users — high social sharing rate</li>
              <li>✓ Organic search traffic (high purchase intent)</li>
              <li>✓ Content ranks for high-value finance and education keywords</li>
              <li>✓ Email list with engaged subscribers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-white mb-3 text-center">Get in Touch</h2>
        <p className="text-slate-400 text-center mb-10">Tell us about your brand and we'll get back to you within 1 business day.</p>

        {submitted ? (
          <div className="bg-slate-900 border border-emerald-700 rounded-2xl p-10 text-center">
            <p className="text-3xl mb-4">✓</p>
            <h3 className="text-white font-black text-xl mb-2">Message Received</h3>
            <p className="text-slate-400">We'll be in touch within 1 business day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 rounded-2xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Your Name *</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Company *</label>
                <input
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  placeholder="Acme Financial"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Email *</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                placeholder="jane@company.com"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">I'm interested in</label>
              <select
                name="interest"
                value={form.interest}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="">Select an option</option>
                <option>Sponsored Article</option>
                <option>Display Advertising</option>
                <option>Affiliate Partnership</option>
                <option>Job Board Listing</option>
                <option>Other / Multiple</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Tell us about your product or campaign</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
                placeholder="What are you promoting? What's your target audience? Any budget range?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl transition-colors"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </div>

    </Layout>
  );
}
