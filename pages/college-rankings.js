// pages/college-rankings.js
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

function ScamScore({ cost, debt, earnings }) {
  const c = parseInt((cost || "").replace(/[^0-9]/g, "")) || 0;
  const d = parseInt((debt || "").replace(/[^0-9]/g, "")) || 0;
  const e = parseInt((earnings || "").replace(/[^0-9]/g, "")) || 0;
  if (!d || !e) return null;
  const ratio = d / (e / 12); // months of earnings to pay off debt
  if (ratio < 6) return { label: "Good Value", color: "text-green-400 bg-green-900/30 border-green-700" };
  if (ratio < 12) return { label: "Questionable", color: "text-yellow-400 bg-yellow-900/30 border-yellow-700" };
  return { label: "Debt Trap", color: "text-red-400 bg-red-900/30 border-red-700" };
}

export default function CollegeRankings() {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchSchools("University");
  }, []);

  const fetchSchools = async (searchTerm) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/college-rankings?search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      setSchools(data.results || []);
    } catch {
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchSchools(query);
  };

  const sorted = [...schools].sort((a, b) => {
    if (sortBy === "cost") return (parseInt(a.cost.replace(/\D/g,""))||999999) - (parseInt(b.cost.replace(/\D/g,""))||999999);
    if (sortBy === "debt") return (parseInt(a.debt.replace(/\D/g,""))||999999) - (parseInt(b.debt.replace(/\D/g,""))||999999);
    if (sortBy === "earnings") return (parseInt(b.earnings.replace(/\D/g,""))||0) - (parseInt(a.earnings.replace(/\D/g,""))||0);
    return a.name.localeCompare(b.name);
  });

  return (
    <Layout>
      <SEO
        title="College Rankings 2025 | Real Cost, Debt & Earnings Data | IHateCollege.com"
        description="Look up any US college's real cost, average student debt, and what graduates earn 10 years later. Government data — no marketing spin."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "College Rankings — Real Cost & Debt Data",
          "description": "Search government data on college costs, average debt, and graduate earnings for any US college.",
          "url": "https://ihatecollege.com/college-rankings"
        }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-red-400 font-bold mb-3">GOVERNMENT DATA · NO SPIN</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Is Your College a <span className="text-red-400">Debt Trap?</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Real numbers from the U.S. Dept. of Education. Cost, median debt, and what graduates actually earn 10 years later.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any college — Harvard, Florida State, your local CC..."
              className="flex-1 px-5 py-4 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition-all shadow-lg shadow-red-900/30"
            >
              Look It Up
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Harvard", "Florida State", "DeVry", "Ohio State", "Community College"].map((s) => (
              <button key={s} onClick={() => { setQuery(s); fetchSchools(s); }}
                className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO READ THIS */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-black text-sky-400 mb-1">Avg Cost</div>
            <div className="text-xs text-slate-500">In-state tuition per year</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-black text-red-400 mb-1">Avg Debt</div>
            <div className="text-xs text-slate-500">Median debt at graduation</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-black text-green-400 mb-1">10yr Earnings</div>
            <div className="text-xs text-slate-500">Median salary, 10 years out</div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Pulling government data...</p>
          </div>
        ) : schools.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <p className="text-slate-400 text-sm">{schools.length} schools found</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Sort by:</span>
                {["name","cost","debt","earnings"].map(s => (
                  <button key={s} onClick={() => setSortBy(s)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${sortBy === s ? "bg-red-600 border-red-600 text-white" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {sorted.map((school) => {
                const slug = school.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                const verdict = ScamScore(school);
                return (
                  <Link key={school.id} href={`/college/${slug}`}
                    className="block p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all group">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-white font-bold text-lg group-hover:text-sky-400 transition-colors">{school.name}</h2>
                          {verdict && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${verdict.color}`}>
                              {verdict.label}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-sm">{school.city}, {school.state}</p>
                      </div>
                      <div className="flex gap-6 text-right shrink-0">
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-wide">Cost/yr</div>
                          <div className="font-bold text-white">{school.cost}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-wide">Avg Debt</div>
                          <div className="font-bold text-red-400">{school.debt}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-wide">10yr Earn</div>
                          <div className="font-bold text-green-400">{school.earnings}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-slate-900 border border-yellow-500/30 text-center">
              <p className="text-slate-300 text-sm">
                Want to rate your experience at one of these schools?{" "}
                <Link href="/rank-your-school" className="text-yellow-400 font-bold hover:underline">
                  Submit your rating →
                </Link>
              </p>
            </div>
          </>
        ) : searched ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-xl mb-2">No results found.</p>
            <p className="text-slate-500 text-sm">Try a shorter name or different spelling.</p>
          </div>
        ) : null}

        <div className="mt-8">
          <AdUnit slot="6600722153" />
        </div>
      </section>
    </Layout>
  );
}
