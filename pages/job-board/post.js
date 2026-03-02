// pages/job-board/post.js — Post a job form
import { useState } from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Link from "next/link";

const CATEGORIES = ["Tech", "Trades", "Healthcare", "Business", "Government", "Other"];

export default function PostJob() {
  const [form, setForm]       = useState({
    title: "", company: "", location: "", category: "",
    salary_min: "", salary_max: "", description: "",
    apply_url: "", contact_email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const r = await fetch("/api/jobs/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "Something went wrong."); return; }
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <SEO title="Job Posted! | IHateCollege.com" description="Your job listing has been submitted." />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-black text-white mb-3">Job Posted!</h1>
          <p className="text-slate-400 mb-8">
            Your listing is live. Candidates who don&apos;t want $150k in debt will find it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/job-board" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
              View Job Board
            </Link>
            <button
              onClick={() => { setSuccess(false); setForm({ title:"",company:"",location:"",category:"",salary_min:"",salary_max:"",description:"",apply_url:"",contact_email:"" }); }}
              className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-white font-bold rounded-xl transition-colors"
            >
              Post Another
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Post a No-Degree Job — Free | IHateCollege.com Job Board"
        description="Post your job listing for free and reach candidates who don't need a 4-year degree. Tech, trades, healthcare, and more."
        keywords="post job no degree required, hire without college degree, no degree job listing"
      />

      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/job-board" className="text-xs text-slate-500 hover:text-slate-300 transition-colors mb-4 inline-block">
            ← Back to Job Board
          </Link>
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">FREE TO POST</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Post a Job</h1>
          <p className="text-slate-400 text-sm">
            Reach motivated candidates who skipped the debt. No degree required listings only.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* Title */}
          <div>
            <label htmlFor="jb-title" className="block text-sm font-bold text-slate-200 mb-1.5">
              Job Title <span className="text-red-400">*</span>
            </label>
            <input
              id="jb-title"
              type="text"
              required
              value={form.title}
              onChange={set("title")}
              placeholder="e.g. Electrician Apprentice, Junior Web Developer"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Company + Location row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="jb-company" className="block text-sm font-bold text-slate-200 mb-1.5">
                Company <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                id="jb-company"
                type="text"
                value={form.company}
                onChange={set("company")}
                placeholder="Your company name"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="jb-location" className="block text-sm font-bold text-slate-200 mb-1.5">
                Location <span className="text-red-400">*</span>
              </label>
              <input
                id="jb-location"
                type="text"
                required
                value={form.location}
                onChange={set("location")}
                placeholder="City, State or Remote"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="jb-category" className="block text-sm font-bold text-slate-200 mb-1.5">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              id="jb-category"
              required
              value={form.category}
              onChange={set("category")}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Salary range */}
          <div>
            <p className="text-sm font-bold text-slate-200 mb-1.5">
              Salary Range <span className="text-slate-500 font-normal">(optional but recommended)</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={form.salary_min}
                onChange={set("salary_min")}
                placeholder="Min (e.g. 50000)"
                min={0}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <input
                type="number"
                value={form.salary_max}
                onChange={set("salary_max")}
                placeholder="Max (e.g. 90000)"
                min={0}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Annual salary in USD. Jobs with salary listed get more applicants.</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="jb-desc" className="block text-sm font-bold text-slate-200 mb-1.5">
              Job Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="jb-desc"
              required
              rows={6}
              value={form.description}
              onChange={set("description")}
              placeholder="Describe the role, what skills are needed, what training is provided, why someone should apply..."
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none leading-relaxed"
            />
            <p className="text-xs text-slate-500 mt-1">Be specific. No degree-speak. Mention if training is provided.</p>
          </div>

          {/* Apply method */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-4">
            <p className="text-sm font-bold text-slate-200">How should candidates apply?</p>
            <div>
              <label htmlFor="jb-applyurl" className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                Apply URL
              </label>
              <input
                id="jb-applyurl"
                type="url"
                value={form.apply_url}
                onChange={set("apply_url")}
                placeholder="https://yourcompany.com/jobs/123"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-xs text-slate-500 font-bold">OR</span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>
            <div>
              <label htmlFor="jb-email" className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                Contact Email
              </label>
              <input
                id="jb-email"
                type="email"
                value={form.contact_email}
                onChange={set("contact_email")}
                placeholder="hiring@yourcompany.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-900/30 border border-red-700 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black rounded-xl transition-colors text-base"
          >
            {submitting ? "Posting…" : "Post Job — Free"}
          </button>

          <p className="text-xs text-slate-500 text-center">
            Free listings are live for 30 days. No account needed.
          </p>
        </form>
      </div>
    </Layout>
  );
}
