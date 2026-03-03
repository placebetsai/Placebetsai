import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/",                        label: "Home",          mobileLabel: "Home" },
  { href: "/college-rankings",        label: "Rankings",      mobileLabel: "College Rankings" },
  { href: "/liberal-vs-conservative", label: "Political",     mobileLabel: "Liberal vs Conservative" },
  { href: "/rank-your-school",        label: "Rate My School", mobileLabel: "Rate My School" },
  { href: "/alternatives",            label: "Alternatives",  mobileLabel: "Alternatives" },
  { href: "/trade-schools",           label: "Trade Schools", mobileLabel: "Trade Schools" },
  { href: "/civil-service",           label: "Gov Jobs",      mobileLabel: "Gov Jobs" },
  { href: "/debt-calculator",         label: "Debt Calc",     mobileLabel: "Debt Calculator" },
  { href: "/job-board",               label: "Job Board",     mobileLabel: "Job Board" },
  { href: "/blog",                    label: "Blog",          mobileLabel: "Blog" },
  { href: "/news",                    label: "News",          mobileLabel: "News" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  const isActive = (href) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">

      {/* ── ROW 1: Logo + Social + Hamburger ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-2">

        {/* LOGO */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-1 group z-50">
          <span className="text-lg font-black italic tracking-tighter text-white group-hover:text-slate-200 transition-colors">
            IHATECOLLEGE
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 text-[9px] font-extrabold tracking-tight shadow-[0_0_12px_rgba(250,204,21,0.5)]">
            .COM
          </span>
        </Link>

        {/* RIGHT: Social icons + hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a href="https://twitter.com/ihatecollege4u" target="_blank" rel="noreferrer" aria-label="Twitter/X" className="hidden sm:block text-slate-500 hover:text-white transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@_ihatecollege" target="_blank" rel="noreferrer" aria-label="TikTok" className="hidden sm:block text-slate-500 hover:text-white transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/></svg>
          </a>
          <a href="https://www.youtube.com/@IHateCollege79" target="_blank" rel="noreferrer" aria-label="YouTube" className="hidden sm:block text-slate-500 hover:text-white transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>

          {/* HAMBURGER */}
          <button
            className="p-1.5 text-slate-300 hover:text-white z-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── ROW 2: Scrollable pill nav (desktop) ─────────────────────── */}
      <div className="border-t border-slate-800/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav
            className="flex items-center gap-1 overflow-x-auto py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-all ${
                  isActive(link.href)
                    ? "bg-yellow-400 text-slate-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── MOBILE FULL-SCREEN MENU ───────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full h-screen bg-slate-950 flex flex-col items-center justify-center gap-5 transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ zIndex: 40 }}
      >
        {links.map((link) => (
          <Link
            key={link.href + "mobile"}
            href={link.href}
            className={`text-xl font-bold transition-colors ${
              isActive(link.href) ? "text-yellow-400" : "text-slate-300 hover:text-white"
            }`}
          >
            {link.mobileLabel}
          </Link>
        ))}
        {/* Social in mobile menu */}
        <div className="flex gap-6 mt-4 pt-4 border-t border-slate-800">
          <a href="https://twitter.com/ihatecollege4u" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@_ihatecollege" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/></svg>
          </a>
          <a href="https://www.youtube.com/@IHateCollege79" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
