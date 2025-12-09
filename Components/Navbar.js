"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/learn-betting", label: "Learn Betting" },
  { href: "/calculators", label: "Calculators" },
  { href: "/glossary", label: "Glossary" },
  { href: "/bankroll", label: "Bankroll" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-inner" style={{ position: "relative" }}>
      <Link href="/" className="logo-wrap">
        <span className="logo-main">PLACEBETS</span>
        <span className="logo-dot">.AI</span>
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav
        className="nav-links"
        style={{ display: open ? "flex" : undefined }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              "nav-link" + (pathname === link.href ? " active" : "")
            }
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
