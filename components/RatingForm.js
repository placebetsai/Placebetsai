// components/RatingForm.js
import { useState, useRef } from "react";

export default function RatingForm() {
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [debtScore, setDebtScore] = useState(5);
  const [mentalHealthScore, setMentalHealthScore] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSugg, setLoadingSugg] = useState(false);
  const searchTimeout = useRef(null);
  const wrapperRef = useRef(null);

  const handleSchoolChange = (e) => {
    const val = e.target.value;
    setSchool(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (val.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    searchTimeout.current = setTimeout(async () => {
      setLoadingSugg(true);
      try {
        const res = await fetch(`/api/college-rankings?search=${encodeURIComponent(val)}`);
        const data = await res.json();
        const results = (data.results || []).slice(0, 8);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setLoadingSugg(false);
      }
    }, 300);
  };

  const selectSuggestion = (s) => {
    setSchool(s.name);
    setCity(s.city || "");
    setState(s.state || "");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending…");
    try {
      const res = await fetch("/api/submit-rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school, city, state, debtScore, mentalHealthScore, comment }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setSchool(""); setCity(""); setState("");
      setDebtScore(5); setMentalHealthScore(5); setComment("");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "mt-1 w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-sm";
  const labelClass = "block text-sm font-semibold text-slate-300";

  const debtColor = debtScore >= 8 ? "#f87171" : debtScore >= 5 ? "#fbbf24" : "#4ade80";
  const mhColor = mentalHealthScore >= 8 ? "#f87171" : mentalHealthScore >= 5 ? "#fbbf24" : "#4ade80";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-2">
      <p className="text-slate-400 text-sm">
        Tell incoming students what the brochure won't —{" "}
        <span className="text-white font-semibold">debt load, mental health, worth it or not.</span>{" "}
        No login. Anonymous.
      </p>

      {/* School name with autocomplete */}
      <div ref={wrapperRef} className="relative">
        <label className={labelClass}>
          School Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            className={inputClass}
            value={school}
            onChange={handleSchoolChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Start typing your school name..."
            required
          />
          {loadingSugg && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5">
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 left-0 right-0 mt-1 rounded-xl border border-slate-700 bg-slate-900 shadow-xl overflow-hidden">
            {suggestions.map((s) => (
              <button
                key={s.id || s.name}
                type="button"
                onMouseDown={() => selectSuggestion(s)}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-white text-sm font-semibold">{s.name}</div>
                  <div className="text-slate-500 text-xs">{s.city}, {s.state}</div>
                </div>
                {s.cost && (
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-slate-500">Cost/yr</div>
                    <div className="text-xs font-bold text-white">{s.cost}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
        <p className="text-[11px] text-slate-600 mt-1">Type 3+ characters to search 6,000+ colleges</p>
      </div>

      {/* City + State */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>City</label>
          <input
            className={inputClass}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Tallahassee"
          />
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input
            className={inputClass}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="FL"
            maxLength={2}
          />
        </div>
      </div>

      {/* Debt Score */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className={labelClass}>Debt Pain Level</label>
          <span className="text-lg font-black" style={{ color: debtColor }}>{debtScore}/10</span>
        </div>
        <p className="text-xs text-slate-500 mb-2">1 = barely felt it · 10 = destroyed my life</p>
        <input
          type="range" min="1" max="10"
          value={debtScore}
          onChange={(e) => setDebtScore(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-700 accent-red-500"
        />
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>1 — No problem</span><span>10 — Nightmare</span>
        </div>
      </div>

      {/* Mental Health Score */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className={labelClass}>Mental Health Impact</label>
          <span className="text-lg font-black" style={{ color: mhColor }}>{mentalHealthScore}/10</span>
        </div>
        <p className="text-xs text-slate-500 mb-2">1 = thrived · 10 = full meltdown</p>
        <input
          type="range" min="1" max="10"
          value={mentalHealthScore}
          onChange={(e) => setMentalHealthScore(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-700 accent-red-500"
        />
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>1 — Thrived</span><span>10 — Meltdown</span>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className={labelClass}>What students should know <span className="text-slate-500 font-normal">(optional)</span></label>
        <textarea
          className={inputClass}
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Dorms? Professors? Hidden fees? Any bait-and-switch? Be specific."
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 px-6 bg-red-600 hover:bg-red-500 text-white font-black text-lg rounded-xl transition-all duration-200 shadow-lg shadow-red-900/40 active:scale-95"
      >
        Submit My Rating
      </button>

      {status === "success" && (
        <div className="p-4 rounded-lg bg-green-900/40 border border-green-500/40 text-green-400 text-sm font-semibold text-center">
          ✅ Rating submitted. Thanks for keeping it real.
        </div>
      )}
      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-900/40 border border-red-500/40 text-red-400 text-sm font-semibold text-center">
          ❌ Something went wrong. Try again in a bit.
        </div>
      )}
    </form>
  );
}
