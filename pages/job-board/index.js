// pages/job-board/index.js — Craigslist-style job board
import { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Link from "next/link";
import AdUnit from "../../components/AdUnit";
import Image from "next/image";

const CATEGORIES = ["All", "Tech", "Trades", "Healthcare", "Business", "Government", "Other"];

const CAT_COLORS = {
  Tech:       "text-sky-400 bg-sky-900/30 border-sky-700/50",
  Trades:     "text-amber-400 bg-amber-900/30 border-amber-700/50",
  Healthcare: "text-pink-400 bg-pink-900/30 border-pink-700/50",
  Business:   "text-emerald-400 bg-emerald-900/30 border-emerald-700/50",
  Government: "text-violet-400 bg-violet-900/30 border-violet-700/50",
  Other:      "text-slate-300 bg-slate-800/50 border-slate-600",
};

// Seeded featured government jobs — always shown at top
const FEATURED_JOBS = [
  {
    id: "featured-1",
    title: "Firefighter",
    company: "City of Phoenix Fire Department",
    location: "Phoenix, AZ",
    category: "Government",
    salary_min: 52000,
    salary_max: 90000,
    description: "No college degree required. Respond to fires, medical emergencies, and rescue operations. Full training provided at the Fire Academy. Union job with pension, healthcare, and overtime pay that regularly pushes total comp past $100k.",
    apply_url: "https://www.usajobs.gov",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=400&fit=crop&auto=format",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    featured: true,
  },
  {
    id: "featured-2",
    title: "Air Traffic Controller",
    company: "Federal Aviation Administration (FAA)",
    location: "Nationwide — Multiple Facilities",
    category: "Government",
    salary_min: 85000,
    salary_max: 140000,
    description: "One of the highest-paying government jobs that doesn't require a college degree. The FAA trains you at their academy in Oklahoma City — fully paid. Manage aircraft separation and ensure flight safety. High stress, high reward.",
    apply_url: "https://www.faa.gov/jobs",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop&auto=format",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    featured: true,
  },
  {
    id: "featured-3",
    title: "Mail Carrier (City Letter Carrier)",
    company: "U.S. Postal Service",
    location: "Nationwide — All 50 States",
    category: "Government",
    salary_min: 45000,
    salary_max: 72000,
    description: "Federal job with full benefits, pension, and job security. No degree required — just a valid driver's license and the ability to pass a drug test. USPS is one of the largest employers in the US and hires constantly.",
    apply_url: "https://about.usps.com/careers",
    image: "https://images.unsplash.com/photo-1568598035424-7070b67317d2?w=800&h=400&fit=crop&auto=format",
    created_at: new Date(Date.now() - 259200000).toISOString(),
    featured: true,
  },
  {
    id: "featured-4",
    title: "Border Patrol Agent",
    company: "U.S. Customs & Border Protection",
    location: "Southwest Border — TX, AZ, CA, NM",
    category: "Government",
    salary_min: 55000,
    salary_max: 95000,
    description: "Federal law enforcement with full federal benefits, retirement at 50, and no college degree required. CBP is actively hiring thousands of agents. Paid training at the Border Patrol Academy in Artesia, NM.",
    apply_url: "https://www.cbp.gov/careers",
    image: "https://images.unsplash.com/photo-1575089776834-ead55d821104?w=800&h=400&fit=crop&auto=format",
    created_at: new Date(Date.now() - 345600000).toISOString(),
    featured: true,
  },
  {
    id: "featured-5",
    title: "National Park Ranger",
    company: "National Park Service",
    location: "Nationwide — National Parks",
    category: "Government",
    salary_min: 42000,
    salary_max: 68000,
    description: "Work in some of the most beautiful locations in the country. Law enforcement rangers carry a badge and firearm. Interpretive rangers lead tours and programs. No 4-year degree required for many positions — experience counts.",
    apply_url: "https://www.usajobs.gov",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&auto=format",
    created_at: new Date(Date.now() - 432000000).toISOString(),
    featured: true,
  },
];

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

function FeaturedJobCard({ job }) {
  const salary = fmtSalary(job.salary_min, job.salary_max);
  const color = CAT_COLORS[job.category] || CAT_COLORS.Other;
  return (
    <article className="rounded-2xl bg-slate-900 border border-violet-500/20 overflow-hidden hover:border-violet-400/40 transition-all group">
      {/* Image */}
      <div className="relative w-full h-44 bg-slate-800 overflow-hidden">
        <Image
          src={job.image}
          alt={job.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-violet-600 text-white">
          Featured
        </span>
        {salary && (
          <span className="absolute bottom-3 right-3 text-sm font-black text-emerald-400 bg-slate-900/80 px-2 py-1 rounded-lg">
            {salary}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="text-white font-bold text-base leading-snug group-hover:text-violet-300 transition-colors">
            {job.title}
          </h2>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
            {job.category}
          </span>
        </div>
        <p className="text-slate-400 text-xs mb-1 font-semibold">{job.company}</p>
        <p className="text-slate-500 text-xs mb-3">📍 {job.location}</p>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">{job.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-slate-600 text-xs">{timeAgo(job.created_at)}</span>
          <a
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white font-bold rounded-lg text-xs transition-colors"
          >
            Apply on USAJobs →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function JobBoard() {
  const [jobs, setJobs]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [configured, setConfigured] = useState(true);
  const [category, setCategory]     = useState("All");
  const [q, setQ]                   = useState("");
  const [search, setSearch]         = useState("");

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

  const handleSearch = (e) => { e.preventDefault(); setSearch(q); };

  // Filter featured jobs by active category/search
  const visibleFeatured = FEATURED_JOBS.filter((j) => {
    const matchCat = category === "All" || j.category === category;
    const matchQ = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <Layout>
      <SEO
        title="No-Degree Job Board 2026 | Post & Find Jobs Without College | IHateCollege.com"
        description="Browse and post real job listings that don't require a 4-year degree. Government, tech, trades, healthcare — find your path without student debt."
        keywords="no degree jobs 2026, government jobs no degree, jobs without college, trade jobs near me, post job listing"
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
              <p className="text-slate-400 text-sm mt-1">Real jobs. No degree required. Post yours free.</p>
            </div>
            <Link
              href="/job-board/post"
              className="shrink-0 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-colors text-sm"
            >
              + Post a Job — Free
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2" role="search">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search job title, company, or location..."
              aria-label="Search jobs"
              className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button type="submit" className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors whitespace-nowrap">
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* Featured Government Jobs */}
        {visibleFeatured.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Featured Government Jobs</h2>
              <div className="flex-1 h-px bg-slate-800" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleFeatured.map((job) => (
                <FeaturedJobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {/* User-posted jobs from DB */}
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-10">
            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-400 text-sm">Loading listings…</span>
          </div>
        ) : jobs.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Community Listings</h2>
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-slate-500 text-xs">{jobs.length} listing{jobs.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-3">
              {jobs.map((job) => {
                const salary = fmtSalary(job.salary_min, job.salary_max);
                const color = CAT_COLORS[job.category] || CAT_COLORS.Other;
                return (
                  <article key={job.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-white font-bold text-base leading-snug">{job.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>{job.category}</span>
                        </div>
                        <p className="text-slate-400 text-sm">
                          {job.company && <span className="font-semibold text-slate-300">{job.company} · </span>}
                          {job.location}
                        </p>
                        {job.description && (
                          <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-2">{job.description}</p>
                        )}
                      </div>
                      <div className="shrink-0 text-right space-y-2">
                        {salary && <div className="text-emerald-400 font-black text-sm">{salary}</div>}
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
          </div>
        )}

        <div className="mt-10"><AdUnit slot="6600722153" /></div>

        {/* Post CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900 border border-emerald-500/20 text-center">
          <h3 className="text-xl font-black text-white mb-2">Hiring without degree requirements?</h3>
          <p className="text-slate-400 text-sm mb-4">Post your listing free. Reach motivated, debt-free candidates.</p>
          <Link href="/job-board/post" className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-colors">
            Post a Job — Free →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
