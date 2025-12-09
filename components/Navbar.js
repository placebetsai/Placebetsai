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

function useLockBodyScroll(isOpen) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useLockBodyScroll(open);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <Link href="/" className="navbar-brand" onClick={handleNavClick}>
          PLACEBETS<span className="navbar-brand-accent">.AI</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          {LINKS.map((link) => (
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
        </div>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button
          type="button"
          className={"hamburger" + (open ? " hamburger-open" : "")}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <div className={"mobile-menu" + (open ? " mobile-menu-show" : "")}>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              "mobile-nav-link" +
              (pathname === link.href ? " mobile-nav-link-active" : "")
            }
            onClick={handleNavClick}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
