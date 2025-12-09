"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Tools" },
  { href: "/ev-betting", label: "+EV Strategy" },
  { href: "/bankroll", label: "Bankroll" },
  { href: "/glossary", label: "Glossary" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* LOGO */}
        <Link href="/" className="logo">
          PLACEBETS<span className="logo-accent">.AI</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nav-links-desktop">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href ? "nav-link active-link" : "nav-link"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* HAMBURGER (MOBILE) */}
        <button
          className={`hamburger ${open ? "hamburger-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="nav-links-mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href ? "nav-link active-link" : "nav-link"
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
                }
