// components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-12 pt-8 pb-10 text-sm text-slate-400">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

        {/* BRAND */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-lg font-black italic tracking-tighter text-white">IHATECOLLEGE</span>
            <span className="px-1.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 text-[9px] font-extrabold">.COM</span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            No brochure fluff. Just real data on college costs, debt, and alternatives that actually pay.
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com/ihatecollege4u" target="_blank" rel="noreferrer" aria-label="X/Twitter" className="text-slate-500 hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@_ihatecollege" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-slate-500 hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/></svg>
            </a>
            <a href="https://www.youtube.com/@IHateCollege79" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-slate-500 hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        {/* TOOLS */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Tools</h4>
          <ul className="space-y-2">
            <li><Link href="/college-rankings" className="hover:text-white transition">College Rankings</Link></li>
            <li><Link href="/rank-your-school" className="hover:text-white transition">Rate Your College</Link></li>
            <li><Link href="/debt-calculator" className="hover:text-white transition">Debt Calculator</Link></li>
            <li><Link href="/cheat-sheets" className="hover:text-white transition">Cheat Sheets</Link></li>
            <li><Link href="/liberal-vs-conservative" className="hover:text-white transition">Is Your School Liberal/Conservative?</Link></li>
          </ul>
        </div>

        {/* ALTERNATIVES */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Alternatives</h4>
          <ul className="space-y-2">
            <li><Link href="/job-board" className="hover:text-white transition">Post a Job</Link></li>
            <li><Link href="/jobs" className="hover:text-white transition">Jobs Board</Link></li>
            <li><Link href="/trade-schools" className="hover:text-white transition">Trade Schools</Link></li>
            <li><Link href="/civil-service" className="hover:text-white transition">Gov Jobs</Link></li>
            <li><Link href="/alternatives" className="hover:text-white transition">All Alternatives</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Use</Link></li>
            <li><Link href="/i-hate-college-song" className="text-sky-400 hover:text-sky-300 transition font-semibold">&quot;I Hate College&quot; Song</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
        <p>&copy; {new Date().getFullYear()} IHateCollege.com &mdash; Real data, no brochure fluff.</p>
        <p>Data sourced from U.S. Dept. of Education College Scorecard</p>
      </div>
    </footer>
  );
}
