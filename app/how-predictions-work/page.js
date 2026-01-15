export const metadata = {
  title: "How Our Predictions Work | PlaceBets.ai",
  description:
    "Learn how PlaceBets.ai uses odds data, market movement, and historical patterns to generate AI-driven sports analysis.",
};

export default function HowPredictionsWorkPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "44px 20px" }}>
      <h1>How Our Predictions Work</h1>

      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        PlaceBets.ai provides AI-driven sports betting analysis by studying odds data, market
        movement, and historical patterns. We focus on explaining how lines are priced and why they
        move — not selling “guaranteed winners.”
      </p>

      <h2 style={{ marginTop: 26 }}>What We Analyze</h2>
      <ul style={{ color: "#9ca3af", lineHeight: 1.9 }}>
        <li>Sportsbook odds and pricing across markets</li>
        <li>Line movement (opening vs current pricing)</li>
        <li>Historical outcomes and variance patterns</li>
        <li>Basic market behavior (public bias and common pricing traps)</li>
      </ul>

      <h2 style={{ marginTop: 26 }}>What This Is (and Isn’t)</h2>
      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        This site is for educational and entertainment purposes. We do not operate a sportsbook,
        and we do not guarantee outcomes. Sports are unpredictable — injuries, officiating, game
        flow, and randomness all matter.
      </p>

      <h2 style={{ marginTop: 26 }}>How to Use This Responsibly</h2>
      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        Use analysis as one input alongside your own research. If you choose to bet, only wager
        what you can afford to lose and only where legal.
      </p>
    </main>
  );
}
