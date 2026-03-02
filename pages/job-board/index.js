// pages/job-board/index.js — Craigslist-style job board
import { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Link from "next/link";
import AdUnit from "../../components/AdUnit";

const CATEGORIES = ["All", "Tech", "Trades", "Healthcare", "Business", "Government", "Other"];

const CAT_COLORS = {
  Tech:       "text-sky-400 bg-sky-900/30 border-sky-700/50",
  Trades:     "text-amber-400 bg-amber-900/30 border-amber-700/50",
  Healthcare: "text-pink-400 bg-pink-900/30 border-pink-700/50",
  Business:   "text-emerald-400 bg-emerald-900/30 border-emerald-700/50",
  Government: "text-violet-400 bg-violet-900/30 border-violet-700/50",
  Other:      "text-slate-300 bg-slate-800/50 border-slate-600",
};

function fmtSalary(min, max) {
  if (!min && !max) return null;
  const fmt = (n) => n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;
  if (min && max) return `${fmt(min)}–${fmt(max)}`;
  if (min) return `${fmt(min)}+`;
  return `Up to ${fmt(max)}`;
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function JobBoard() {
  const [jobs, setJobs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [configured, setConfigured] = useState(true);
  const [category, setCategory]   = useState("All");
  const [q, setQ]                 = useState("");
  const [search, setSearch]       = useState("");

  const fetchJobs = useCallback(async (cat, query) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat && cat !== "All") params.set("category", cat);
      if (query) params.set("q", query);
      const r = await fetch(`/api/jobs/list?${params}`);
      const d = await r.json();
      setJobs(d.jobs || []);
      setConfigured(d.configured !== false);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(category, search); }, [category, search, fetchJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(q);
  };

  return (
    <Layout>
      <SEO
        title="No-Degree Job Board 2026 | Post & Find Jobs Without College | IHateCollege.com"
        description="Browse and post real job listings that don't require a 4-year degree. Tech, trades, healthcare, government — find your path without student debt."
        keywords="no degree jobs 2026, jobs without college, trade jobs near me, post job listing, entry level no degree"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "No-Degree Job Board",
          "description": "Browse and post jobs that don't require a college degree.",
          "url": "https://ihatecollege.com/job-board",
        }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">NO DEGREE REQUIRED</p>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">Job Board</h1>
              <p className="text-slate-400 text-sm mt-1">
                Real jobs posted by real employers. No degree needed.
              </p>
            </div>
            <Link
              href="/job-board/post"
              className="shrink-0 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-colors text-sm"
            >
              + Post a Job — Free
            </Link>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2" role="search">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search job title, company, or location..."
              aria-label="Search jobs"
              className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-xs px-4 py-2 rounded-full border font-bold transition-all ${
                category === c
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Job listings */}
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20">
            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            <span className="text-slate-400">Loading jobs…</span>
          </div>
        ) : !configured ? (
          // DB not set up yet — show coming-soon state
          <div className="text-center py-20 px-4">
            <div className="text-5xl mb-4">🚧</div>
            <h2 className="text-2xl font-black text-white mb-3">Job Board Coming Soon</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-6 text-sm leading-relaxed">
              We&apos;re setting up the job board database. Be the first to post when it goes live.
            </p>
            <Link
              href="/job-board/post"
              className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors"
            >
              Preview the Post Form
            </Link>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-black text-white mb-2">No jobs found</h2>
            <p className="text-slate-400 text-sm mb-6">
              {search || category !== "All"
                ? "Try clearing your filters or search terms."
                : "Be the first to post a job here!"}
            </p>
            <Link
              href="/job-board/post"
              className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Post a Job — Free
            </Link>
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-xs mb-4">{jobs.length} job{jobs.length !== 1 ? "s" : ""} found</p>
            <div className="space-y-3">
              {jobs.map((job) => {
                const salary = fmtSalary(job.salary_min, job.salary_max);
                const color  = CAT_COLORS[job.category] || CAT_COLORS.Other;
                return (
                  <article
                    key={job.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h2 className="text-white font-bold text-base leading-snug">{job.title}</h2>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
                            {job.category}
                          </span>
                        </div>
                        <div className="text-slate-400 text-sm">
                          {job.company && <span className="font-semibold text-slate-300">{job.company}</span>}
                          {job.company && job.location && <span className="text-slate-600 mx-1">·</span>}
                          {job.location && <span>{job.location}</span>}
                        </div>
                        {job.description && (
                          <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-2">
                            {job.description}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 text-right space-y-2">
                        {salary && (
                          <div className="text-emerald-400 font-black text-sm">{salary}</div>
                        )}
                        <div className="text-slate-600 text-xs">{timeAgo(job.created_at)}</div>
                        {(job.apply_url || job.contact_email) && (
                          <a
                            href={job.apply_url || `mailto:${job.contact_email}`}
                            target={job.apply_url ? "_blank" : undefined}
                            rel={job.apply_url ? "noopener noreferrer" : undefined}
                            className="inline-block px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg text-xs transition-colors"
                          >
                            Apply →
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {/* Ad */}
        <div className="mt-10">
          <AdUnit slot="6600722153" />
        </div>

        {/* Post CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900 border border-emerald-500/20 text-center">
          <h3 className="text-xl font-black text-white mb-2">Hiring without degree requirements?</h3>
          <p className="text-slate-400 text-sm mb-4">
            Post your job listing free. Reach thousands of motivated, debt-free candidates.
          </p>
          <Link
            href="/job-board/post"
            className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-colors"
          >
            Post a Job — Free →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
