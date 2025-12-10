export const metadata = {
  title: "About PlaceBets.ai",
  description:
    "Learn the mission behind PlaceBets.ai — turning gambling into investing through data, tools, and real-time tournament intelligence.",
};

export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px",
        color: "#f9fafb",
      }}
    >
      <h1
        style={{
          fontSize: "2.4rem",
          fontWeight: "800",
          marginBottom: "20px",
        }}
      >
        About <span style={{ color: "#00e676" }}>PlaceBets.ai</span>
      </h1>

      <p style={{ fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "20px" }}>
        PlaceBets.ai was built for one purpose:
        <strong> to turn gamblers into investors.</strong>
      </p>

      <div
        style={{
          background: "#0b1018",
          border: "1px solid #1f2937",
          borderRadius: "14px",
          padding: "24px",
          marginBottom: "24px",
          lineHeight: 1.7,
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          🎯 Our Mission
        </h2>
        <p>
          Betting isn’t about luck — it’s about expected value, discipline, data
          modeling, and bankroll management. The pros win because they calculate.
          You lose because you guess.
        </p>
        <p style={{ marginTop: "10px" }}>
          PlaceBets.ai gives you the tools, calculators, and real-time
          information to flip the script and take the edge back.
        </p>
      </div>

      <div
        style={{
          background: "#0b1018",
          border: "1px solid #1f2937",
          borderRadius: "14px",
          padding: "24px",
          marginBottom: "24px",
          lineHeight: 1.7,
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          💡 What PlaceBets.ai Offers
        </h2>
        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
          <li>EV+ betting calculators</li>
          <li>Bankroll unit sizing tools</li>
          <li>Live tournament feeds (poker, blackjack, slots, baccarat)</li>
          <li>Real-time betting news ticker</li>
          <li>Educational breakdowns of sports betting and casino systems</li>
          <li>Risk management strategies used by professionals</li>
        </ul>
      </div>

      <div
        style={{
          background: "#0b1018",
          border: "1px solid #1f2937",
          borderRadius: "14px",
          padding: "24px",
          marginBottom: "24px",
          lineHeight: 1.7,
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          🚀 The Future of Betting Starts Here
        </h2>
        <p>
          We’re building the first fully automated betting-intelligence engine —
          from tournament scrapers to live odds insights to AI-driven bankroll
          advice.
        </p>
        <p style={{ marginTop: "10px" }}>
          If traditional gambling is a casino game, PlaceBets.ai is a trading
          platform.
        </p>
      </div>

      <p style={{ opacity: 0.8, marginTop: "20px" }}>
        © {new Date().getFullYear()} PlaceBets.ai — Built for smart bettors.
      </p>
    </div>
  );
}
