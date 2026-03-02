// components/Footer.js
import Link from “next/link”;

export default function Footer() {
  return (
    <footer className=”site-footer border-t border-slate-800 mt-12 pt-6 pb-8 text-sm text-slate-400”>
      <div className=”max-w-6xl mx-auto px-4 flex flex-col gap-6 items-center text-center”>

        {/* SOCIAL LINKS */}
        <div className=”flex items-center gap-5”>
          <a href=”https://twitter.com/ihatecollege4u” target=”_blank” rel=”noreferrer”
            className=”flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-semibold”>
            <svg width=”18” height=”18” viewBox=”0 0 24 24” fill=”currentColor”><path d=”M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z”/></svg>
            @ihatecollege4u
          </a>
          <a href=”https://www.tiktok.com/@_ihatecollege” target=”_blank” rel=”noreferrer”
            className=”flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-semibold”>
            <svg width=”18” height=”18” viewBox=”0 0 24 24” fill=”currentColor”><path d=”M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z”/></svg>
            @_ihatecollege
          </a>
          <a href=”https://www.youtube.com/@IHateCollege79” target=”_blank” rel=”noreferrer”
            className=”flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-semibold”>
            <svg width=”18” height=”18” viewBox=”0 0 24 24” fill=”currentColor”><path d=”M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z”/></svg>
            YouTube
          </a>
        </div>

        {/* NAV LINKS */}
        <nav className=”flex flex-wrap gap-4 justify-center”>
          <Link href=”/about” className=”hover:text-white transition”>About</Link>
          <Link href=”/contact” className=”hover:text-white transition”>Contact</Link>
          <Link href=”/privacy” className=”hover:text-white transition”>Privacy</Link>
          <Link href=”/terms” className=”hover:text-white transition”>Terms</Link>
          <Link href=”/i-hate-college-song” className=”font-semibold text-sky-400 hover:text-sky-300 transition”>
            “I Hate College” (Song)
          </Link>
        </nav>

        <p>© {new Date().getFullYear()} IHateCollege.com — No brochure fluff. Just reality.</p>
      </div>
    </footer>
  );
}
