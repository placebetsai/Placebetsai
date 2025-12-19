import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home", mobileLabel: "Home" },
  { href: "/alternatives", label: "Alternatives", mobileLabel: "Alternatives" },
  { href: "/debt-calculator", label: <div className="text-center leading-tight">Debt<br/>Calculator</div>, mobileLabel: "Debt Calculator" },
  { href: "/cheat-sheets", label: <div className="text-center leading-tight">Cheat<br/>Sheets</div>, mobileLabel: "Cheat Sheets" },
  { href: "/rank-your-school", label: <div className="text-center leading-tight">College<br/>Search</div>, mobileLabel: "College Search" },
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
  { href: "/trade-schools", label: <div className="text-center leading-tight">Trade<br/>School</div>, mobileLabel: "Trade School" },
  { href: "/civil-service", label: <div className="text-center leading-tight">Gov<br/>Jobs</div>, mobileLabel: "Gov Jobs" },
  { href: "/contact", label: "Contact", mobileLabel: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => setOpen(false);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="text-2xl font-black text-yellow-400 hover:text-yellow-300 transition">
            IHateCollege
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-slate-300 hover:text-yellow-400 transition font-medium ${
                router.pathname === link.href ? "text-yellow-400" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-slate-300 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <div className="space-y-2">
            <span className={`block w-8 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block w-8 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-8 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
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
