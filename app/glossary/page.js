const TERMS = [
  { t: "Action", d: "Any wager that has been placed and accepted." },
  {
    t: "Bad Beat",
    d: "A bet that was ahead most of the game but loses at the end.",
  },
  { t: "Chalk", d: "The favorite in a game or market." },
  { t: "Dog", d: "The underdog." },
  {
    t: "Handle",
    d: "The total amount of money wagered on a specific event or at a book.",
  },
  {
    t: "Hook",
    d: 'The half point in a spread (ex: -3.5). That .5 is the "hook".',
  },
  {
    t: "Juice / Vig",
    d: "The commission the book charges, usually built into odds like -110.",
  },
  {
    t: "Parlay",
    d: "A bet combining multiple legs. All must win for you to be paid.",
  },
  {
    t: "Prop",
    d: "A proposition bet. Wagers on stats, players, or events within a game.",
  },
  {
    t: "Sharp",
    d: "A sophisticated / professional bettor who regularly beats the line.",
  },
  {
    t: "Square",
    d: "A casual public bettor. Usually on favorites and overs.",
  },
  {
    t: "Steam",
    d: "A sudden strong move in the line often caused by sharp money.",
  },
];

export default function GlossaryPage() {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <h1>Betting Glossary</h1>
      <p>Learn the vocabulary so you don&apos;t sound like free money.</p>

      <div
        style={{
          display: "grid",
          gap: 14,
          marginTop: 30,
        }}
      >
        {TERMS.map((item) => (
          <div
            key={item.t}
            style={{
              background: "#020617",
              borderRadius: 12,
              padding: 16,
              borderLeft: "4px solid #22c55e",
              borderRight: "1px solid #111827",
              borderTop: "1px solid #111827",
              borderBottom: "1px solid #111827",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: 4,
                color: "#e5e7eb",
              }}
            >
              {item.t}
            </div>
            <div style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
              {item.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
