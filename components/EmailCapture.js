import { useState } from "react";

export default function EmailCapture({ variant = "default" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (variant === "banner") {
    return (
      <section className="w-full bg-gradient-to-r from-sky-900/60 to-slate-900/80 border-y border-sky-500/20 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-2">FREE DOWNLOAD</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
            The No-Degree Income Cheat Sheet
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            8 paths, real salary ranges, and exact first steps. Free PDF — no spam.
          </p>
          {status === "success" ? (
            <div className="text-emerald-400 font-bold text-lg">
              ✓ Check your inbox! PDF is on its way.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 max-w-sm px-4 py-3 rounded-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-400 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Get Free PDF →"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
          )}
        </div>
      </section>
    );
  }

  // Default card variant
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-900/40 to-slate-900/80 border border-sky-500/30">
      <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-2">FREE PDF</p>
      <h3 className="text-xl font-black text-white mb-1">
        No-Degree Income Cheat Sheet
      </h3>
      <p className="text-slate-400 text-sm mb-4">
        8 proven paths with real salary data. Free — takes 10 seconds.
      </p>
      {status === "success" ? (
        <div className="text-emerald-400 font-bold">✓ Check your inbox!</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 rounded-lg bg-sky-500 text-white font-bold text-sm hover:bg-sky-400 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Me the PDF →"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
