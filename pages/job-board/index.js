import { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import AdUnit from "../../components/AdUnit";
import Image from "next/image";

const US_STATES = [
  "All States","Remote / Nationwide","Alabama","Alaska","Arizona","Arkansas","California","Colorado",
  "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas",
  "Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York",
  "North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming","Washington D.C.",
];

const FILTERS = [
  { label: "All Jobs",        value: "All",             color: "emerald" },
  { label: "Federal Gov",     value: "Federal",         color: "violet" },
  { label: "Law Enforcement", value: "Law Enforcement", color: "blue" },
  { label: "State & Local",   value: "Municipal",       color: "indigo" },
  { label: "Trades",          value: "Trades",          color: "amber" },
  { label: "Tech",            value: "Tech",            color: "sky" },
  { label: "Healthcare",      value: "Healthcare",      color: "pink" },
  { label: "Business",        value: "Business",        color: "teal" },
];

const FILTER_STYLES = {
  emerald: { active: "bg-emerald-600 border-emerald-600 text-white", dot: "bg-emerald-400" },
  violet:  { active: "bg-violet-600 border-violet-600 text-white",   dot: "bg-violet-400" },
  blue:    { active: "bg-blue-600 border-blue-600 text-white",       dot: "bg-blue-400" },
  indigo:  { active: "bg-indigo-600 border-indigo-600 text-white",   dot: "bg-indigo-400" },
  amber:   { active: "bg-amber-600 border-amber-600 text-white",     dot: "bg-amber-400" },
  sky:     { active: "bg-sky-600 border-sky-600 text-white",         dot: "bg-sky-400" },
  pink:    { active: "bg-pink-600 border-pink-600 text-white",       dot: "bg-pink-400" },
  teal:    { active: "bg-teal-600 border-teal-600 text-white",       dot: "bg-teal-400" },
};

const CAT_BADGE = {
  Government:  "text-violet-400 bg-violet-900/40 border-violet-700/50",
  Trades:      "text-amber-400 bg-amber-900/40 border-amber-700/50",
  Tech:        "text-sky-400 bg-sky-900/40 border-sky-700/50",
  Healthcare:  "text-pink-400 bg-pink-900/40 border-pink-700/50",
  Business:    "text-teal-400 bg-teal-900/40 border-teal-700/50",
  Other:       "text-slate-300 bg-slate-800/50 border-slate-600",
};

const FEATURED = [
  {
    id: "f1", title: "Firefighter", company: "City of Phoenix Fire Department",
    location: "Phoenix, AZ", state: "Arizona", category: "Government", sector: "Municipal",
    salary_min: 52000, salary_max: 90000,
    description: "No degree required. Respond to fires, medical emergencies, and rescue operations. Full training at Fire Academy. Union job with pension, healthcare, and overtime regularly pushing total comp past $100k.",
    apply_url: "https://www.usajobs.gov/Search/Results?k=firefighter",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "f2", title: "Air Traffic Controller", company: "Federal Aviation Administration (FAA)",
    location: "Nationwide", state: "Nationwide", category: "Government", sector: "Federal",
    salary_min: 85000, salary_max: 140000,
    description: "One of the highest-paying government jobs with no degree required. FAA trains you at their academy in Oklahoma City — fully paid. High stress, extraordinary pay, federal benefits.",
    apply_url: "https://www.usajobs.gov/Search/Results?k=air+traffic+controller",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "f3", title: "Border Patrol Agent", company: "U.S. Customs & Border Protection",
    location: "TX · AZ · CA · NM", state: "Texas", category: "Government", sector: "Federal",
    salary_min: 55000, salary_max: 95000,
    description: "Federal law enforcement. No college degree required. Paid training at Border Patrol Academy in Artesia, NM. Retirement at 50, federal pension, full benefits. Thousands of openings.",
    apply_url: "https://www.cbp.gov/careers/frontline-careers/bpa",
    image: "https://images.unsplash.com/photo-1575089776834-ead55d821104?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "f4", title: "Police Officer", company: "Various Municipal Departments",
    location: "Nationwide — All 50 States", state: "Nationwide", category: "Government", sector: "Law Enforcement",
    salary_min: 50000, salary_max: 100000,
    description: "Most police departments require only a high school diploma or GED. Paid academy training, union protection, pension at 20 years, overtime, and hazard pay. Starting salaries often include housing and uniform allowances.",
    apply_url: "https://www.usajobs.gov/Search/Results?k=police+officer",
    image: "https://images.unsplash.com/photo-1617817546271-6e3c6f9413e6?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "f5", title: "Mail Carrier (City Letter Carrier)", company: "U.S. Postal Service",
    location: "Nationwide — All 50 States", state: "Nationwide", category: "Government", sector: "Federal",
    salary_min: 45000, salary_max: 72000,
    description: "Federal job with pension, full benefits, and job security. No degree required — just a valid driver's license. USPS is one of the largest employers in the U.S. and hires constantly across every state.",
    apply_url: "https://careers.usps.com/",
    image: "https://images.unsplash.com/photo-1568598035424-7070b67317d2?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "f6", title: "Electrician Apprentice", company: "IBEW (International Brotherhood of Electrical Workers)",
    location: "Nationwide — Local Unions Available", state: "Nationwide", category: "Trades", sector: "Trades",
    salary_min: 45000, salary_max: 110000,
    description: "Earn while you learn. IBEW apprenticeships are fully paid — no tuition, no debt. 5-year program leads to journeyman license. Union wages, full benefits, overtime. Journeymen commonly earn $80k–$110k.",
    apply_url: "https://www.ibewjatc.org/",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "f7", title: "HVAC Technician", company: "Various Contractors",
    location: "Nationwide", state: "Nationwide", category: "Trades", sector: "Trades",
    salary_min: 55000, salary_max: 95000,
    description: "Install, maintain, and repair heating and cooling systems. No degree required — certification takes 6 months to 2 years. Huge demand as older systems are replaced. Overtime in summer and winter is routine.",
    apply_url: "https://www.indeed.com/jobs?q=hvac+technician",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "f8", title: "IT Support Specialist", company: "Various Companies",
    location: "Nationwide · Remote Available", state: "Nationwide", category: "Tech", sector: "Tech",
    salary_min: 45000, salary_max: 80000,
    description: "Help desks and IT support roles often require only a CompTIA A+ certification (3 months to earn). No degree needed. Many are remote. Strong path to sysadmin, network admin, or cybersecurity roles.",
    apply_url: "https://www.indeed.com/jobs?q=it+support+no+degree",
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "f9", title: "National Park Ranger", company: "National Park Service",
    location: "Nationwide — National Parks", state: "Nationwide", category: "Government", sector: "Federal",
    salary_min: 42000, salary_max: 68000,
    description: "Work in the most beautiful places in the country. No 4-year degree required for many positions — experience counts. Law enforcement rangers carry a badge and firearm. Interpretive rangers lead tours and programs.",
    apply_url: "https://www.usajobs.gov/Search/Results?k=park+ranger",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&auto=format",
  },
];

function fmt(min, max) {
  if (!min && !max) return null;
  const f = (n) => `$${Math.round(n / 1000)}k`;
  if (min && max) return `${f(min)} – ${f(max)}`;
  if (min) return `${f(min)}+`;
  return `Up to ${f(max)}`;
}

function timeAgo(iso) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

// ─── Featured card ────────────────────────────────────────────────────────────
function FeaturedCard({ job }) {
  const salary = fmt(job.salary_min, job.salary_max);
  const badge = CAT_BADGE[job.category] || CAT_BADGE.Other;
  return (
    <article className="group rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 hover:border-sky-500/50 transition-all">
      <div className="relative w-full h-40 bg-slate-800">
        <Image src={job.image} alt={job.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        {salary && (
          <span className="absolute bottom-3 right-3 text-sm font-black text-emerald-400 bg-slate-900/90 px-2.5 py-1 rounded-lg">
            {salary}
          </span>
        )}
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-slate-900/80 text-emerald-400 border border-emerald-700/50">
          No Degree
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-white font-bold text-sm leading-snug group-hover:text-sky-400 transition-colors">{job.title}</h3>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge}`}>{job.category}</span>
        </div>
        <p className="text-slate-400 text-xs font-semibold mb-0.5">{job.company}</p>
        <p className="text-slate-500 text-xs mb-3">📍 {job.location}</p>
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">{job.description}</p>
        <a href={job.apply_url} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center py-2 bg-slate-800 hover:bg-sky-600 border border-slate-600 hover:border-sky-600 text-white text-xs font-bold rounded-lg transition-all">
          View & Apply →
        </a>
      </div>
    </article>
  );
}

// ─── Post form ────────────────────────────────────────────────────────────────
const POST_CATS = ["Government", "Trades", "Tech", "Healthcare", "Business", "Other"];

function JobPreview({ form }) {
  const salary = form.salary_min && form.salary_max
    ? `$${Math.round(form.salary_min / 1000)}k – $${Math.round(form.salary_max / 1000)}k`
    : form.salary_min ? `$${Math.round(form.salary_min / 1000)}k+` : null;
  const badge = CAT_BADGE[form.category] || CAT_BADGE.Other;

  return (
    <div className="rounded-2xl overflow-hidden bg-slate-900 border border-emerald-500/30">
      {form.image_url && (
        <div className="relative w-full h-40 bg-slate-800">
          <img src={form.image_url} alt={form.title} className="w-full h-full object-cover" onError={(e) => { e.target.parentElement.style.display = "none"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          {salary && <span className="absolute bottom-3 right-3 text-sm font-black text-emerald-400 bg-slate-900/90 px-2.5 py-1 rounded-lg">{salary}</span>}
          <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-slate-900/80 text-emerald-400 border border-emerald-700/50">No Degree</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-2">
          {form.logo_url && (
            <img src={form.logo_url} alt={form.company} className="w-10 h-10 rounded-lg object-contain bg-slate-800 border border-slate-700 shrink-0" onError={(e) => { e.target.style.display = "none"; }} />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-bold text-base">{form.title || "Job Title"}</h3>
              {form.category && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge}`}>{form.category}</span>}
            </div>
            <p className="text-slate-400 text-sm">
              {form.company && <span className="font-semibold text-slate-300">{form.company} · </span>}
              {form.location || "Location"}
            </p>
          </div>
          {salary && !form.image_url && <div className="text-emerald-400 font-black text-sm shrink-0">{salary}</div>}
        </div>
        {form.description && <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mt-2">{form.description}</p>}
        <div className="mt-4">
          <span className="inline-block px-4 py-2 bg-sky-700 text-white text-xs font-bold rounded-lg">Apply →</span>
        </div>
      </div>
    </div>
  );
}

function PostForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "", company: "", location: "", category: "",
    salary_min: "", salary_max: "", description: "",
    apply_url: "", contact_email: "", logo_url: "", image_url: "",
  });
  const [step, setStep] = useState("form"); // "form" | "preview"
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const canPreview = form.title && form.location && form.category && form.description;

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);
    try {
      const r = await fetch("/api/jobs/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "Something went wrong."); setStep("form"); return; }
      onSuccess();
    } catch {
      setError("Network error. Please try again.");
      setStep("form");
    } finally {
      setSubmitting(false);
    }
  };

  const input = "w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm transition-all";

  if (step === "preview") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep("form")} className="text-xs text-slate-400 hover:text-white font-bold">← Edit</button>
          <span className="text-sm font-black text-white uppercase tracking-widest">Preview your listing</span>
        </div>
        <JobPreview form={form} />
        {error && <div className="p-4 rounded-xl bg-red-900/30 border border-red-700 text-red-300 text-sm">{error}</div>}
        <button onClick={handleSubmit} disabled={submitting}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-black rounded-xl transition-colors text-base">
          {submitting ? "Posting…" : "Looks Good — Post It Free →"}
        </button>
        <p className="text-xs text-slate-500 text-center">Free · No account needed · We'll confirm by email</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Job Title <span className="text-red-400">*</span></label>
          <input type="text" required value={form.title} onChange={set("title")} placeholder="e.g. Electrician Apprentice" className={input} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Company</label>
          <input type="text" value={form.company} onChange={set("company")} placeholder="Your company name" className={input} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Location <span className="text-red-400">*</span></label>
          <input type="text" required value={form.location} onChange={set("location")} placeholder="City, State or Remote" className={input} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Category <span className="text-red-400">*</span></label>
          <select required value={form.category} onChange={set("category")} className={input}>
            <option value="" disabled>Select…</option>
            {POST_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Salary Range <span className="text-slate-500 font-normal normal-case">(optional — boosts applications)</span></label>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={form.salary_min} onChange={set("salary_min")} placeholder="Min e.g. 50000" min={0} className={input} />
          <input type="number" value={form.salary_max} onChange={set("salary_max")} placeholder="Max e.g. 90000" min={0} className={input} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Job Description <span className="text-red-400">*</span></label>
        <textarea required rows={5} value={form.description} onChange={set("description")}
          placeholder="Describe the role, pay, training provided, schedule. Mention no degree required." className={`${input} resize-none leading-relaxed`} />
      </div>

      {/* Photos — free, URL-based */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-4">
        <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Photos <span className="text-slate-500 font-normal normal-case">(optional — paste image URLs)</span></p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">Company Logo URL</label>
            <input type="url" value={form.logo_url} onChange={set("logo_url")} placeholder="https://yoursite.com/logo.png" className={input} />
            <p className="text-xs text-slate-500 mt-1">Shows next to your company name.</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">Job Banner / Photo URL</label>
            <input type="url" value={form.image_url} onChange={set("image_url")} placeholder="https://yoursite.com/photo.jpg" className={input} />
            <p className="text-xs text-slate-500 mt-1">Header image on your listing card.</p>
          </div>
        </div>
      </div>

      {/* Apply method */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-4">
        <p className="text-xs font-black text-slate-300 uppercase tracking-widest">How candidates apply <span className="text-red-400">*</span></p>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">Apply URL</label>
          <input type="url" value={form.apply_url} onChange={set("apply_url")} placeholder="https://yourcompany.com/apply" className={input} />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-xs text-slate-500 font-bold">OR</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">Contact Email</label>
          <input type="email" value={form.contact_email} onChange={set("contact_email")} placeholder="hiring@yourcompany.com" className={input} />
        </div>
      </div>

      {error && <div className="p-4 rounded-xl bg-red-900/30 border border-red-700 text-red-300 text-sm">{error}</div>}

      <button
        onClick={() => {
          if (!form.title || !form.location || !form.category || !form.description) {
            setError("Please fill in Title, Location, Category, and Description first.");
            return;
          }
          if (!form.apply_url && !form.contact_email) {
            setError("Add an Apply URL or Contact Email so candidates can reach you.");
            return;
          }
          setError("");
          setStep("preview");
        }}
        className={`w-full py-4 font-black rounded-xl transition-colors text-base ${canPreview ? "bg-sky-600 hover:bg-sky-500 text-white" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}>
        Preview My Listing →
      </button>
      <p className="text-xs text-slate-500 text-center">Free · 30 days · No account needed</p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function JobBoard() {
  const [view, setView]         = useState(
    typeof window !== "undefined" && window.location.hash === "#post" ? "post" : "browse"
  ); // 'browse' | 'post' | 'success'
  const [q, setQ]               = useState("");
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const [state, setState]       = useState("All States");
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);

  const fetchJobs = useCallback(async (cat, query, st) => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (cat && cat !== "All") p.set("category", cat);
      if (query) p.set("q", query);
      if (st && st !== "All States") p.set("state", st);
      const r = await fetch(`/api/jobs/list?${p}`);
      const d = await r.json();
      setJobs(d.jobs || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(category, search, state); }, [category, search, state, fetchJobs]);

  const handleSearch = (e) => { e.preventDefault(); setSearch(q); };

  // Filter featured jobs client-side
  const visibleFeatured = FEATURED.filter((j) => {
    const matchCat = category === "All" || j.category === category ||
      (category === "Federal" && j.sector === "Federal") ||
      (category === "Law Enforcement" && (j.sector === "Law Enforcement" || j.title.toLowerCase().includes("police") || j.title.toLowerCase().includes("patrol") || j.title.toLowerCase().includes("ranger"))) ||
      (category === "Municipal" && (j.sector === "Municipal" || j.title.toLowerCase().includes("fire")));
    const matchState = state === "All States" || j.state === "Nationwide" ||
      j.location.toLowerCase().includes(state.toLowerCase()) ||
      (state === "Remote / Nationwide" && j.state === "Nationwide");
    const matchQ = !search || j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase()) ||
      j.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchState && matchQ;
  });

  return (
    <Layout>
      <SEO
        title="No-Degree Jobs | Federal, Trade, Law Enforcement & Tech | IHateCollege.com"
        description="Browse thousands of jobs that don't require a college degree. Filter by state, federal, law enforcement, trades, tech, and more. Post a job free."
        keywords="jobs without college degree, i hate college jobs, no degree required jobs, government jobs no degree, federal jobs no college, trade jobs hiring, law enforcement jobs, no degree required jobs by state, college alternative careers, post a job no degree, employer job posting, skilled trades jobs, apprenticeship jobs, tech jobs no degree, conservative campus jobs, anti college careers"
        schema={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "No-Degree Job Board",
          "description": "Jobs that don't require a 4-year degree. Federal, state, law enforcement, trades, tech.",
          "url": "https://ihatecollege.com/job-board",
        }}
      />

      {/* ── HEADER ── */}
      <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-64 bg-sky-500/5 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-10">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-2">No degree required</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            Find a Job. Skip the Debt.
          </h1>
          <p className="text-slate-400 mb-8 max-w-xl text-sm sm:text-base">
            Federal jobs, law enforcement, skilled trades, and tech — careers that pay well without a 4-year degree.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => setView("browse")}
              className={`flex items-center gap-2 py-3 px-6 rounded-xl font-black text-sm transition-all ${
                view === "browse"
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-900/40"
                  : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-sky-600 hover:text-white"
              }`}>
              🔍 Search Jobs
            </button>
            <button onClick={() => setView("post")}
              className={`flex items-center gap-2 py-3 px-6 rounded-xl font-black text-sm transition-all ${
                view === "post"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                  : "bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-600"
              }`}>
              📢 Post a Job (Employers)
            </button>
          </div>

          {/* Search + State — browse mode only */}
          {view === "browse" && (
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <input
                type="search" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Job title, keyword, or company..."
                aria-label="Search jobs"
                className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
              <select
                value={state} onChange={(e) => setState(e.target.value)} aria-label="Filter by state"
                className="sm:w-52 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              >
                {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button type="submit" className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm transition-colors whitespace-nowrap">
                Search
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── BROWSE VIEW ── */}
      {view === "browse" && (
        <div className="max-w-5xl mx-auto px-4 py-8">

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((f) => {
              const s = FILTER_STYLES[f.color];
              const active = category === f.value;
              return (
                <button key={f.value} onClick={() => setCategory(f.value)}
                  className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-full border font-bold transition-all ${
                    active ? s.active : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                  }`}>
                  {!active && <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />}
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Featured jobs grid */}
          {visibleFeatured.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-black text-white uppercase tracking-widest">Featured Listings</h2>
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-slate-500 text-xs">{visibleFeatured.length} listings</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleFeatured.map((job) => <FeaturedCard key={job.id} job={job} />)}
              </div>
            </div>
          )}

          {/* Community listings from DB */}
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-12">
              <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-400 text-sm">Loading listings…</span>
            </div>
          ) : jobs.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-black text-white uppercase tracking-widest">Community Listings</h2>
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-slate-500 text-xs">{jobs.length} listing{jobs.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="space-y-3">
                {jobs.map((job) => {
                  const salary = fmt(job.salary_min, job.salary_max);
                  const badge = CAT_BADGE[job.category] || CAT_BADGE.Other;
                  return (
                    <article key={job.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0 flex gap-4">
                          {job.logo_url && (
                            <img src={job.logo_url} alt={job.company || job.title} className="w-12 h-12 rounded-xl object-contain bg-slate-800 border border-slate-700 shrink-0" onError={(e) => { e.target.style.display = "none"; }} />
                          )}
                          <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-white font-bold text-base">{job.title}</h3>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge}`}>{job.category}</span>
                          </div>
                          <p className="text-slate-400 text-sm">
                            {job.company && <span className="font-semibold text-slate-300">{job.company} · </span>}
                            {job.location}
                          </p>
                          {job.description && (
                            <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-2">{job.description}</p>
                          )}
                          </div>
                        </div>
                        <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
                          {salary && <div className="text-emerald-400 font-black text-sm">{salary}</div>}
                          <div className="text-slate-600 text-xs">{timeAgo(job.created_at)}</div>
                          {(job.apply_url || job.contact_email) && (
                            <a href={job.apply_url || `mailto:${job.contact_email}`}
                              target={job.apply_url ? "_blank" : undefined}
                              rel={job.apply_url ? "noopener noreferrer" : undefined}
                              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded-lg text-xs transition-colors">
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

          {/* No results */}
          {!loading && jobs.length === 0 && visibleFeatured.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 mb-2">No listings match your filters.</p>
              <button onClick={() => { setCategory("All"); setState("All States"); setSearch(""); setQ(""); }}
                className="text-sky-400 text-sm font-bold hover:underline">
                Clear filters
              </button>
            </div>
          )}

          <AdUnit slot="6600722153" />

          {/* Post CTA */}
          <div className="mt-10 p-8 rounded-2xl bg-slate-900 border border-sky-500/20 text-center">
            <h2 className="text-2xl font-black text-white mb-2">Hiring without degree requirements?</h2>
            <p className="text-slate-400 text-sm mb-5">Post your listing free. Reach motivated candidates who chose skills over debt.</p>
            <button onClick={() => setView("post")}
              className="inline-block px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-xl transition-colors">
              Post a Job — Free →
            </button>
          </div>
        </div>
      )}

      {/* ── POST VIEW ── */}
      {(view === "post" || view === "success") && (
        <div className="max-w-2xl mx-auto px-4 py-10">
          {view === "success" ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-5">✓</div>
              <h2 className="text-3xl font-black text-white mb-3">Job Posted!</h2>
              <p className="text-slate-400 mb-8">Your listing is live. Candidates who skipped the debt will find it.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => { setView("browse"); }}
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-colors">
                  Browse Job Board
                </button>
                <button onClick={() => setView("post")}
                  className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-white font-bold rounded-xl transition-colors">
                  Post Another
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <button onClick={() => setView("browse")} className="text-xs text-slate-500 hover:text-slate-300 mb-4 inline-block">
                  ← Back to listings
                </button>
                <h2 className="text-3xl font-black text-white mb-2">Post a Job</h2>
                <p className="text-slate-400 text-sm">Free · Live 30 days · No account needed. No degree requirements only.</p>
              </div>
              <PostForm onSuccess={() => setView("success")} />
            </>
          )}
        </div>
      )}
    </Layout>
  );
}
