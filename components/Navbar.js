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
