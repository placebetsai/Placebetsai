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

  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* LOGO */}
        <Link href="/" className="nav-logo" onClick={close}>
          PLACEBETS<span>.AI</span>
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                "nav-link" + (pathname === link.href ? " nav-link-active" : "")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* HAMBURGER (MOBILE) */}
        <button
          className="nav-toggle"
          onClick={toggle}
          aria-label="Toggle navigation"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <nav className="nav-mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                "nav-link nav-link-mobile" +
                (pathname === link.href ? " nav-link-active" : "")
              }
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
