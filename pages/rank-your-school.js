// pages/rank-your-school.js
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";

export default function RankYourSchool() {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchools("University"); // Auto-loads schools
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
        title="Rank Your College | Real Debt & Earnings Data" 
        description="Search the government database to see the real cost, debt, and earnings for any college in America."
      />
      
      <section className="site-main">
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", paddingTop: "2rem" }}>
          <h1 className="hero-title">Is your school a <span className="accent">scam?</span></h1>
          <p className="hero-subtitle" style={{ margin: "0 auto 2rem" }}>
            Search the official government database. See the real cost, average debt, and alumni earnings.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Harvard, Stanford, your local state school..."
              className="flex-1 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg">
              Search
            </button>
          </form>

          {loading ? (
            <p className="text-center text-gray-400 text-xl">Loading schools...</p>
          ) : schools.length > 0 ? (
            <div style={{ display: "grid", gap: "1rem" }}>
              {schools.map((school) => {
                // FIXED SLUG: Matches your /college/[slug] detail page exactly
                const slug = school.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, '');

                return (
                  <Link
                    key={school.id}
                    href={`/college/${slug}`}
                    className="path-card hover:bg-gray-700 transition-all duration-300 ease-in-out"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem",
                      background: "#1e293b",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0, color: "white", fontSize: "1.2rem" }}>{school.name}</h3>
                      <p style={{ margin: 0, color: "#9ca3af", fontSize: "0.9rem" }}>{school.city}, {school.state}</p>
                    </div>
                    <div style={{ display: "flex", gap: "2rem", textAlign: "right" }}>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "#9ca3af", textTransform: "uppercase" }}>Avg Cost</div>
                        <div style={{ fontWeight: "bold", color: "#e5e7eb" }}>{school.cost}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "#9ca3af", textTransform: "uppercase" }}>Avg Debt</div>
                        <div style={{ fontWeight: "bold", color: "#f87171" }}>{school.debt}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "#9ca3af", textTransform: "uppercase" }}>Earnings</div>
                        <div style={{ fontWeight: "bold", color: "#4ade80" }}>{school.earnings}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-xl">
              No results found. Try searching for a school name.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
