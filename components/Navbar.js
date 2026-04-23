"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Tools" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/ev-betting", label: "Strategy" },
  { href: "/shop", label: "Shop" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link href="/" className="logo" onClick={closeMenu}>
          PLACEBETS<span className="logo-accent">.AI</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="desktop-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${
                pathname === link.href ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <form
            role="search"
            className="nav-search-inline"
            onSubmit={(e) => {
              e.preventDefault();
              const q = e.currentTarget.q.value.trim();
              if (!q) return;
              window.open(`https://www.google.com/search?q=${encodeURIComponent("site:placebets.ai " + q)}`, "_blank", "noopener");
            }}
          >
            <input name="q" type="search" placeholder="Search…" aria-label="Search site" autoComplete="off" />
            <button type="submit" aria-label="Search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </button>
          </form>
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mobile-link ${
              pathname === link.href ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
