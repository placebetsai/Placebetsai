import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home", mobileLabel: "Home" },
  { href: "/alternatives", label: "Alternatives", mobileLabel: "Alternatives" },
  { href: "/debt-calculator", label: <div className="text-center leading-tight">Debt<br/>Calculator</div>, mobileLabel: "Debt Calculator" },
  { href: "/cheat-sheets", label: <div className="text-center leading-tight">Cheat<br/>Sheets</div>, mobileLabel: "Cheat Sheets" },
  { href: "/rank-your-school", label: <div className="text-center leading-tight">Rank<br/>Your<br/>College</div>, mobileLabel: "Rank Your College" },
  {
    href: "/liberal-vs-conservative",
    label: (
      <div className="flex flex-col items-center leading-none">
        <span>Conservative</span>
        <span className="text-[10px] opacity-60 my-[1px]">or</span>
        <span>Liberal</span>
      </div>
    ),
    mobileLabel: "Conservative or Liberal"
  },
  { href: "/trade-schools", label: <div className="text-center leading-tight">Trade<br/>School</div>, mobileLabel: "Trade Schools" },
  { href: "/civil-service", label: <div className="text-center leading-tight">Gov<br/>Jobs</div>, mobileLabel: "Gov Jobs" },
  { href: "/contact", label: "Contact", mobileLabel: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO: Sexy Bold Text + Bubble .COM */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-1 group z-50 mr-4 lg:mr-8">
          <span className="text-xl md:text-2xl font-black italic tracking-tighter text-white group-hover:text-slate-200 transition-colors">
            IHATECOLLEGE
          </span>
          <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950 text-[10px] md:text-xs font-extrabold tracking-tight shadow-[0_0_12px_rgba(250,204,21,0.6)]">
            .COM
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-bold hover:text-white transition-colors h-full flex items-center ${
                router.pathname === link.href ? "text-yellow-400" : "text-slate-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* SOCIAL ICONS — desktop only */}
        <div className="hidden lg:flex items-center gap-3 ml-4">
          <a href="https://twitter.com/ihatecollege4u" target="_blank" rel="noreferrer" aria-label="Twitter/X" className="text-slate-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@_ihatecollege" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-slate-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/></svg>
          </a>
          <a href="https://www.youtube.com/@IHateCollege79" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-slate-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="lg:hidden p-2 text-slate-200 hover:text-white z-50"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <nav 
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-slate-950 flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ zIndex: 40 }}
      >
        {links.map((link) => (
          <Link
            key={link.href + "mobile"}
            href={link.href}
            className={`text-2xl font-bold ${
              router.pathname === link.href ? "text-yellow-400" : "text-slate-300"
            }`}
          >
            {link.mobileLabel}
          </Link>
        ))}
      </nav>
    </header>
  );
}
