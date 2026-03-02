// components/RatingForm.js
import { useState } from "react";

export default function RatingForm() {
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [debtScore, setDebtScore] = useState(5);
  const [mentalHealthScore, setMentalHealthScore] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

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

      {/* School name */}
      <div>
        <label className={labelClass}>
          School Name <span className="text-red-500">*</span>
        </label>
        <input
          className={inputClass}
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="e.g. Florida State University"
          required
        />
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
