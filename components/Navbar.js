"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Tools" },
  { href: "/ev-betting", label: "+EV Strategy" },
  { href: "/bankroll", label: "Bankroll" },
  { href: "/glossary", label: "Glossary" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* LOGO */}
          <Link href="/" className="navbar-brand" onClick={() => setOpen(false)}>
            PLACEBETS<span className="navbar-brand-accent">.AI</span>
          </Link>

          {/* DESKTOP LINKS (Hidden on Mobile) */}
          <div className="nav-links">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* HAMBURGER BUTTON (Visible on Mobile) */}
          <button
            className={`hamburger ${open ? "hamburger-open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="line-1"></span>
            <span className="line-2"></span>
            <span className="line-3"></span>
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <div className={`mobile-menu ${open ? "mobile-menu-open" : ""}`}>
        <div className="mobile-links-container">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-link ${pathname === link.href ? "mobile-link-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
