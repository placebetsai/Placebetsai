export const metadata = {
  title: "Expected Value (+EV) Betting – The Math That Beats the Sportsbook",
  description:
    "Learn how to calculate Expected Value (+EV) in sports betting. Understand implied probability, line shopping, and why sharp bettors profit long-term using EV math.",
  alternates: { canonical: "https://placebets.ai/ev-betting" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Expected Value (EV) in sports betting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Expected Value (EV) measures the gap between the true probability of an outcome and the implied probability in the odds. A positive EV (+EV) bet is mathematically profitable long-term. The formula is: EV = (Probability of Winning x Profit) - (Probability of Losing x Stake).",
      },
    },
    {
      "@type": "Question",
      name: "How do you find +EV bets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The main methods are: line shopping across multiple sportsbooks, beating the closing line (CLV), building or using projection models, and exploiting sportsbook promotions and odds boosts that cross into positive expected value territory.",
      },
    },
    {
      "@type": "Question",
      name: "How do you convert American odds to implied probability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For favorites (negative odds): Implied Probability = |Odds| / (|Odds| + 100). For underdogs (positive odds): Implied Probability = 100 / (Odds + 100). Example: -110 implies 52.38% probability.",
      },
    },
    {
      "@type": "Question",
      name: "How many bets do you need to prove an edge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You should run at least 500 bets before drawing conclusions about your edge. Professional sports bettors operate on margins of 2-5% ROI over large sample sizes. Short-term variance can mask a real edge.",
      },
    },
  ],
};

export default function EVPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1>Expected Value (+EV) Betting</h1>
      <p className="highlight">
        The only math that actually separates winners from losers over time.
      </p>

      <section className="card mt-4">
        <h2>What Is Expected Value?</h2>
        <p>
          Expected Value (EV) is a mathematical concept borrowed from probability
          theory. In sports betting, it measures the gap between{" "}
          <strong>the true probability of an outcome</strong> and{" "}
          <strong>the implied probability embedded in the odds you&apos;re offered.</strong>
        </p>
        <p>
          When your true edge exceeds what the book is pricing in, you have a{" "}
          <strong>positive expected value (+EV) bet</strong>. When the book has
          the edge over you, the bet is <strong>negative EV (–EV)</strong>.
        </p>
        <p>
          The formula is simple:{" "}
          <strong>EV = (Probability of Winning × Profit) − (Probability of Losing × Stake)</strong>
        </p>
        <p>
          Example: A coin flip at even money. True odds = 50%. The book prices it
          at -110 (implied probability = 52.4%). You&apos;re paying more than you
          should—this is a –EV bet. But if they post +110 on the same flip, your
          EV is positive and you should bet every time.
        </p>
      </section>

      <section className="card mt-4">
        <h2>How to Find +EV Bets</h2>
        <p>
          +EV spots don&apos;t announce themselves. You have to hunt for them
          systematically using three core methods:
        </p>
        <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
          <li>
            <strong>1. Line Shopping:</strong> The most underrated edge in betting.
            Different books post different prices on the same game. If DraftKings has
            the Chiefs at -3 (-110) and FanDuel posts -2.5 (-110), those are
            meaningfully different bets. Always compare prices before placing.
            Opening accounts at 4–6 sportsbooks is the single highest-EV action most
            recreational bettors can take.
          </li>
          <li>
            <strong>2. Beating the Closing Line:</strong> The closing line—the final
            price before a game starts—is the most accurate market consensus.
            Professional bettors consistently get better prices than the closing line.
            If you bet a team at -2.5 and the line closes at -4.5, you beat the
            market. That&apos;s CLV (Closing Line Value), and it&apos;s one of the
            best proxies for long-term EV.
          </li>
          <li>
            <strong>3. Building or Using Models:</strong> Quantitative bettors build
            their own power ratings or use projection models. If your model says a
            team should be priced at -150 but a book is hanging -115, that gap is
            your edge. The model has to be right more often than not—and you&apos;ll
            know it is when you consistently beat the closing line.
          </li>
          <li>
            <strong>4. Exploiting Promos and Boosts:</strong> Many sportsbooks offer
            odds boosts (e.g., Patriots ML goes from -130 to +100). When a boost
            crosses zero into positive territory on a likely outcome, you have a
            mathematical +EV spot regardless of your handicapping.
          </li>
        </ul>
      </section>

      <section className="card mt-4">
        <h2>Implied Probability: The Critical Conversion</h2>
        <p>
          Every set of American odds implies a probability. Understanding this
          conversion is foundational.
        </p>
        <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.95rem" }}>
          <li><strong>Favorite (negative odds):</strong> Implied Prob = |Odds| ÷ (|Odds| + 100)</li>
          <li><strong>Underdog (positive odds):</strong> Implied Prob = 100 ÷ (Odds + 100)</li>
        </ul>
        <p>
          Example: -110 → 110 ÷ 210 = 52.38%. You need to win{" "}
          <strong>more than 52.38% of -110 bets</strong> to profit long-term.
          At +110 → 100 ÷ 210 = 47.62%. You only need to win 47.63% to profit.
        </p>
        <p>
          The gap between -110 and +110 on the same bet is the vig (juice)—the
          book&apos;s built-in margin. Reducing that margin is core to +EV betting.
        </p>
      </section>

      <section className="card mt-4">
        <h2>The Law of Large Numbers: Why EV Works Over Time</h2>
        <p>
          EV is not a guarantee on any single bet. It&apos;s a prediction over
          hundreds or thousands of bets. A coin flip at +110 has positive EV—but
          you can still lose 7 in a row. This is variance. It&apos;s real and it
          hurts. What you can do:
        </p>
        <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8 }}>
          <li>Track every bet (odds, stake, result, CLV).</li>
          <li>Size bets consistently—2% of bankroll or less per play.</li>
          <li>Never deviate from your process because of short-term results.</li>
          <li>Run at least 500 bets before drawing conclusions about your edge.</li>
        </ul>
        <p>
          Professional sports bettors operate on margins of 2–5% ROI over large
          sample sizes. That sounds small—but it compounds. A 3% ROI on $1,000
          per week in action is $30/week, $1,560/year. Scale up and the numbers
          become serious.
        </p>
      </section>

      <section className="card mt-4" style={{ borderColor: "#22c55e" }}>
        <h2>Key Rules for +EV Bettors</h2>
        <ul style={{ paddingLeft: 20, color: "#d1d5db", lineHeight: 1.8, fontSize: "0.96rem" }}>
          <li>EV is about the next 1,000 bets—not the next one.</li>
          <li>You can lose 8 +EV bets in a row and still be playing correctly.</li>
          <li>Closing line value (CLV) is your most reliable performance metric.</li>
          <li>Never bet more than 2–3% of bankroll on any single game.</li>
          <li>Tracking results is not optional—it&apos;s how you know if your edge is real.</li>
          <li>Shop lines before every bet. The few minutes save real money at scale.</li>
          <li>Beware of books that limit or ban winners. It&apos;s a backhanded compliment.</li>
        </ul>
      </section>

      <section className="card mt-4">
        <h2>Common +EV Mistakes</h2>
        <p>
          Most bettors who understand EV still make these errors:
        </p>
        <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8 }}>
          <li>
            <strong>Betting –EV for entertainment:</strong> There&apos;s nothing wrong
            with recreational betting. But don&apos;t confuse it with investment. Pick
            a small bankroll for fun bets and a separate one for +EV plays.
          </li>
          <li>
            <strong>Overconfidence in your model:</strong> Your projection model can be
            wrong. The market is often smarter. Validate your model vs. CLV before
            betting real money.
          </li>
          <li>
            <strong>Ignoring the vig:</strong> Every –110 bet costs you money over time.
            Even if you&apos;re right 51% of the time at –110, you&apos;re roughly
            breaking even—not winning.
          </li>
          <li>
            <strong>Parlaying +EV plays:</strong> Combining +EV legs into a parlay reduces
            your actual EV (the book&apos;s margin compounds). Bet +EV plays straight.
          </li>
        </ul>
      </section>
    </div>
  );
}
