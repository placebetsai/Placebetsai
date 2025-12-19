import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";

export default function RankYourSchool() {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  // Auto-search on load so the page isn't empty
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
        title="Rank Your College | Real Debt & Earnings Data" 
        description="Search the government database to see the real cost, debt, and earnings for any college in America."
      />
      
      <section className="page-section text-center">
        <p className="hero-eyebrow">THE REAL NUMBERS</p>
        <h1 className="hero-title">Search the official government database</h1>
        <p className="hero-subtitle max-w-2xl mx-auto">
          See the real cost, average debt, and alumni earnings.
        </p>
      </section>

      <section className="page-section">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-4 mb-12">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Harvard, Stanford, your local state school..."
              className="flex-1 px-6 py-4 rounded-full bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold">
              Search
            </button>
          </form>

          {loading ? (
            <p className="text-center text-xl">Loading...</p>
          ) : schools.length === 0 ? (
            <p className="text-center text-xl">No results. Try a different search.</p>
          ) : (
            <div className="space-y-6">
              {schools.map((school) => (
                <div key={school.id} className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                  <Link href={`/college/${school.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <a className="text-2xl font-bold text-blue-400 hover:text-blue-300">
                      {school.name}
                    </a>
                  </Link>
                  <p className="text-slate-400 mb-4">{school.city}, {school.state}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-slate-400 uppercase text-sm">Avg Cost</p>
                      <p className="text-2xl font-bold">{school.cost}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase text-sm">Avg Debt</p>
                      <p className="text-2xl font-bold text-red-400">{school.debt}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase text-sm">Earnings</p>
                      <p className="text-2xl font-bold text-green-400">{school.earnings}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
