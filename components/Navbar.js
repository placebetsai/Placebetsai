"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Tools" },
  { href: "/ev-betting", label: "+EV Strategy" },
  { href: "/bankroll", label: "Bankroll" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/glossary", label: "Glossary" },
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
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mobile-link ${pathname === link.href ? "active" : ""}`}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
