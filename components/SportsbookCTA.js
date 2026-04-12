"use client";

const SPORTSBOOKS = [
  {
    name: "DraftKings",
    bonus: "Bet $5, Get $200 in Bonus Bets",
    href: "https://sportsbook.draftkings.com/?utm_source=placebetsai",
    color: "#00b94a",
  },
  {
    name: "FanDuel",
    bonus: "Bet $5, Get $150 in Bonus Bets",
    href: "https://sportsbook.fanduel.com/?utm_source=placebetsai",
    color: "#1493ff",
  },
  {
    name: "BetMGM",
    bonus: "Up to $1,500 First Bet Offer",
    href: "https://sports.betmgm.com/?utm_source=placebetsai",
    color: "#c4a44a",
  },
];

export default function SportsbookCTA() {
  return (
    <section
      style={{
        margin: "40px 0",
        padding: "28px 24px",
        background: "var(--bg-card, #0f172a)",
        border: "1px solid var(--border, #1f2937)",
        borderRadius: "16px",
      }}
    >
      <h3
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          marginBottom: "4px",
          color: "var(--text-main, #e5e7eb)",
        }}
      >
        Ready to place real bets? Sign up and get a bonus:
      </h3>
      <p
        style={{
          fontSize: "0.82rem",
          color: "var(--text-dim, #6b7280)",
          marginBottom: "20px",
        }}
      >
        Compare lines across books to find the best odds on every bet.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
        }}
      >
        {SPORTSBOOKS.map((book) => (
          <a
            key={book.name}
            href={book.href}
            target="_blank"
            rel="noopener noreferrer"
            data-affiliate="pending"
            style={{
              display: "block",
              padding: "18px 20px",
              background: "#020617",
              border: `1px solid ${book.color}33`,
              borderRadius: "12px",
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = book.color;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${book.color}33`;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: book.color,
                marginBottom: "6px",
              }}
            >
              {book.name}
            </div>
            <div
              style={{
                fontSize: "0.82rem",
                color: "var(--text-muted, #9ca3af)",
                marginBottom: "10px",
              }}
            >
              {book.bonus}
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--text-main, #e5e7eb)",
              }}
            >
              Sign Up &rarr;
            </div>
          </a>
        ))}
      </div>

      <p
        style={{
          fontSize: "0.7rem",
          color: "var(--text-dim, #6b7280)",
          marginTop: "16px",
          marginBottom: 0,
          lineHeight: 1.5,
        }}
      >
        This page may contain affiliate links. We may earn a commission when you
        sign up through our links. 21+ | Gambling Problem? Call 1-800-GAMBLER
      </p>
    </section>
  );
}
