"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Tools" },
  { href: "/ev-betting", label: "+EV Strategy" },
  { href: "/bankroll", label: "Bankroll" },
  { href: "/glossary", label: "Glossary" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        background: "rgba(3,7,18,0.9)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(15,23,42,0.9)",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 20px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#f9fafb",
            textDecoration: "none",
            letterSpacing: "-0.03em",
          }}
        >
          PLACEBETS<span style={{ color: "#22c55e" }}>.AI</span>
        </Link>

        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: "0.9rem",
          }}
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: active ? "#f9fafb" : "#9ca3af",
                  textDecoration: "none",
                  fontWeight: active ? 600 : 400,
                  borderBottom: active
                    ? "1px solid rgba(34,197,94,0.7)"
                    : "1px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.15s ease, border-color 0.15s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
