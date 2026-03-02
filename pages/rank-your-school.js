// pages/rank-your-school.js
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import RatingForm from "../components/RatingForm";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

export default function RankYourSchool() {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchools("University");
  }, []);

  const fetchSchools = async (searchTerm) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/college-rankings?search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      setSchools(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchSchools(query);
  };

  return (
    <Layout>
      <SEO
        title="Rank Your College | Real Debt & Earnings Data + Student Reviews"
        description="Search real government data on cost, debt, and earnings for any college. Then submit your own rating and tell students what they won't find in the brochure."
      />

      {/* HERO */}
      <section className="site-main">
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center", paddingTop: "2rem" }}>
          <h1 className="hero-title">Is your school a <span className="accent">scam?</span></h1>
          <p className="hero-subtitle" style={{ margin: "0 auto 2rem" }}>
            Search real government data — cost, average debt, and what graduates actually earn.
            Then tell other students what the brochure won't.
          </p>
        </div>
      </section>

      {/* GOVERNMENT DATA SEARCH */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1rem 3rem" }}>
        <h2 className="text-2xl font-black text-white mb-2">Search Government Data</h2>
        <p className="text-slate-400 text-sm mb-4">Official numbers from the U.S. Department of Education. Click any school for full details.</p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Harvard, Florida State, your local community college..."
            className="flex-1 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg">
            Search
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-400 text-xl">Loading...</p>
        ) : schools.length > 0 ? (
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {schools.map((school) => {
              const slug = school.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              return (
                <Link
                  key={school.id}
                  href={`/college/${slug}`}
                  className="path-card hover:bg-gray-700 transition-all duration-300"
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: "1rem", background: "#1e293b",
                    padding: "1rem", borderRadius: "0.5rem", cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, color: "white", fontSize: "1.1rem" }}>{school.name}</h3>
                    <p style={{ margin: 0, color: "#9ca3af", fontSize: "0.85rem" }}>{school.city}, {school.state}</p>
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem", textAlign: "right" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase" }}>Avg Cost/yr</div>
                      <div style={{ fontWeight: "bold", color: "#e5e7eb" }}>{school.cost}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase" }}>Avg Debt</div>
                      <div style={{ fontWeight: "bold", color: "#f87171" }}>{school.debt}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase" }}>10yr Earnings</div>
                      <div style={{ fontWeight: "bold", color: "#4ade80" }}>{school.earnings}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-400">No results. Try a different name.</p>
        )}
      </section>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1rem" }}>
        <AdUnit slot="6600722153" />
      </div>

      {/* RATING FORM */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "1rem 1rem 4rem" }}>
        <div className="p-6 rounded-2xl bg-slate-900 border border-red-500/30">
          <h2 className="text-3xl font-black text-white mb-1">Rate Your School</h2>
          <p className="text-slate-400 mb-6">
            Went there? Tell incoming students the truth — debt load, mental health, worth it or not.
            No login. No BS. Anonymous.
          </p>
          <RatingForm />
        </div>
      </section>

    </Layout>
  );
}
