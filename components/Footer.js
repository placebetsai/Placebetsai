// components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer border-t border-slate-800 mt-12 pt-6 pb-8 text-sm text-slate-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-4 items-center text-center">
        
        {/* EXISTING TEXT — UNCHANGED */}
        <p>
          © {new Date().getFullYear()} IHateCollege.com — No brochure fluff. Just
          reality.
        </p>

        {/* 🔒 NEW: CRAWLABLE TRUST + BRAND LINKS */}
        <nav className="flex flex-wrap gap-4 justify-center">
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition">
            Terms
          </Link>
          <Link
            href="/i-hate-college-song"
            className="font-semibold text-sky-400 hover:text-sky-300 transition"
          >
            “I Hate College” (Song)
          </Link>
        </nav>

      </div>
    </footer>
  );
}
