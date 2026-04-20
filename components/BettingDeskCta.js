import Link from "next/link";

const PICKS = [
  {
    label: "Desk Setup",
    title: "Phone stands, lamps, and market-study gear",
    desc: "Low-cost upgrades for the workspace serious bettors actually use every day.",
    href: "https://fashionistas.ai/bettor-desk",
  },
  {
    label: "Study Tools",
    title: "Organizers, notebooks, and daily workflow basics",
    desc: "Built for people tracking lines, CLV, tournaments, and bankroll decisions over long sessions.",
    href: "https://fashionistas.ai/bettor-desk",
  },
  {
    label: "Setup Upgrades",
    title: "Functional accessories for a cleaner betting station",
    desc: "A lightweight commerce lane for the PlaceBets audience without polluting the core product experience.",
    href: "https://fashionistas.ai/bettor-desk",
  },
];

export default function BettingDeskCta() {
  return (
    <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px 40px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(10,15,28,0.98) 100%)",
          border: "1px solid var(--border, #1f2937)",
          borderRadius: 16,
          padding: "28px 24px",
        }}
      >
        <div style={{ maxWidth: 760, marginBottom: 20 }}>
          <p style={{ color: "#10b981", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>
            Bettor Setup
          </p>
          <h2 style={{ color: "var(--text-main, #e5e7eb)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 10 }}>
            A cleaner desk is part of a sharper betting workflow.
          </h2>
          <p style={{ color: "var(--text-muted, #9ca3af)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
            This keeps commerce lightweight and relevant: setup gear, organizers, lamps, and study tools that fit the PlaceBets audience instead of random generic products.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {PICKS.map((pick) => (
            <Link
              key={pick.title}
              href={pick.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "rgba(15,23,42,0.75)",
                border: "1px solid rgba(99,102,241,0.16)",
                borderRadius: 14,
                padding: "18px 16px",
                textDecoration: "none",
              }}
            >
              <div style={{ color: "#34d399", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>
                {pick.label}
              </div>
              <div style={{ color: "var(--text-main, #e5e7eb)", fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>
                {pick.title}
              </div>
              <p style={{ color: "var(--text-muted, #9ca3af)", fontSize: "0.86rem", lineHeight: 1.6, marginBottom: 14 }}>
                {pick.desc}
              </p>
              <span style={{ color: "#6366f1", fontWeight: 700, fontSize: "0.86rem" }}>
                Browse Fashionistas.ai →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
