// pages/rank-your-school.js
import { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import RatingForm from "../components/RatingForm";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

function CollegeDataSearch() {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchSchools = async (term) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/college-rankings?search=${encodeURIComponent(term)}`);
      const data = await res.json();
      setSchools(data.results || []);
    } catch {
      setSchools([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => { e.preventDefault(); if (query.trim()) fetchSchools(query); }}
        className="flex gap-2 mb-4"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any college — Harvard, FSU, community college..."
          className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm transition-colors whitespace-nowrap"
        >
          Look It Up
        </button>
      </form>

      {loading && (
        <div className="flex items-center gap-2 py-6 justify-center text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          Loading…
        </div>
      )}

      {!loading && searched && schools.length === 0 && (
        <p className="text-center text-slate-500 text-sm py-4">No results. Try a different name.</p>
      )}

      {!loading && schools.length > 0 && (
        <div className="divide-y divide-slate-800 rounded-xl overflow-hidden border border-slate-800">
          {schools.map((school) => {
            const slug = school.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            return (
              <Link
                key={school.id}
                href={`/college/${slug}`}
                className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-900 hover:bg-slate-800/80 transition-colors group"
              >
                <div className="min-w-0">
                  <div className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors truncate">{school.name}</div>
                  <div className="text-slate-500 text-xs">{school.city}, {school.state}</div>
                </div>
                <div className="flex gap-4 shrink-0 text-right">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">Cost/yr</div>
                    <div className="text-xs font-bold text-white">{school.cost}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">Avg Debt</div>
                    <div className="text-xs font-bold text-red-400">{school.debt}</div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">10yr Earn</div>
                    <div className="text-xs font-bold text-emerald-400">{school.earnings}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function RateMySchool() {
  return (
    <Layout>
      <SEO
        title="Rate My School | Real Student Reviews + Debt Data | IHateCollege.com"
        description="Rate your college anonymously. Tell incoming students the truth about debt, mental health, and whether it was worth it."
      />

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* ── RATING FORM — top and center ──────────────────────────── */}
        <div className="mb-3 text-center">
          <p className="text-xs font-bold tracking-widest text-red-400 uppercase mb-2">Anonymous · No Login · 100% Real</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
            Rate My School 🔥
          </h1>
          <p className="text-slate-400 text-base">
            Went there? Tell the next generation what the brochure won&apos;t.
          </p>
        </div>

        <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-6 sm:p-8 shadow-xl shadow-red-950/20 mb-10">
          <RatingForm />
        </div>

        {/* ── DIVIDER ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Also Look Up Real Numbers</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* ── GOV DATA SEARCH — below the fold ──────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🎓</span>
            <h2 className="text-xl font-black text-white">Is It Worth the Debt?</h2>
          </div>
          <p className="text-slate-500 text-xs mb-4">
            Official cost, average debt, and 10-year earnings from the U.S. Dept. of Education.
          </p>
          <CollegeDataSearch />
        </div>

        <AdUnit slot="6600722153" />

      </div>
    </Layout>
  );
}
