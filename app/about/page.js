export const metadata = {
  title: "About PlaceBets.ai",
  description:
    "Learn what PlaceBets.ai is, why it exists, and what it offers to data-driven bettors and sports fans.",
};

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <h1>About PlaceBets.ai</h1>
      <p>
        PlaceBets.ai is a modern betting analytics hub built for people who
        actually care about edges, probabilities, and bankroll health – not
        just vibes and parlays.
      </p>

      <h2>What We Do</h2>
      <ul>
        <li>+EV and implied probability calculators</li>
        <li>Bankroll management tools and education</li>
        <li>Live tournament and event discovery</li>
        <li>Strategy content built around long-term discipline</li>
      </ul>

      <h2>What We Are Not</h2>
      <p>
        We are <strong>not</strong> a sportsbook. We do not take bets, hold
        balances, or provide personalized gambling advice.
      </p>

      <h2>Our Philosophy</h2>
      <p>
        Treat betting like an investment with risk you can afford to lose.
        Understand the math, respect variance, and never chase.
      </p>

      <h2>Contact</h2>
      <p>
        Business & support:{" "}
        <strong>placebetsai@gmail.com</strong>
      </p>
    </div>
  );
}
