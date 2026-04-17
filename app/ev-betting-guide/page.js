import SportsbookCTA from "../../components/SportsbookCTA";

export const metadata = {
  title: "What is Expected Value (EV) in Sports Betting? A Beginner Guide",
  description:
    "Learn the EV formula, walk through a coin flip example at +120 odds, understand why +EV matters, and discover how to find value bets. A practical beginner guide.",
  alternates: { canonical: "https://placebets.ai/ev-betting-guide" },
  openGraph: {
    title: "What is Expected Value (EV) in Sports Betting? A Beginner Guide",
    description:
      "Learn the EV formula, walk through a coin flip example at +120 odds, understand why +EV matters, and discover how to find value bets.",
    url: "https://placebets.ai/ev-betting-guide",
    siteName: "PlaceBets.ai",
    type: "article",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Expected Value (EV) mean in sports betting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Expected Value (EV) is the average amount you expect to win or lose per bet over many repetitions. A positive EV (+EV) bet means you expect to profit long-term. The formula is: EV = (Win Probability x Profit if Win) - (Loss Probability x Stake).",
      },
    },
    {
      "@type": "Question",
      name: "What is a simple example of EV in betting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Imagine a fair coin flip where a sportsbook offers you +120 odds. The true probability of heads is 50%, but +120 implies only 45.5%. Since 50% > 45.5%, this is a +EV bet. On a $10 bet: EV = (0.50 x $12) - (0.50 x $10) = +$1.00 per bet on average.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find +EV bets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The main methods are: line shopping across multiple sportsbooks to find the best odds, exploiting promotions and odds boosts that cross into +EV territory, building or using projection models to estimate true probabilities, and tracking your closing line value (CLV) to verify your edge is real.",
      },
    },
    {
      "@type": "Question",
      name: "Does +EV betting guarantee I will make money?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. EV is a long-term mathematical expectation, not a guarantee on any single bet. You can lose many +EV bets in a row due to variance. The edge only materializes over hundreds or thousands of bets with consistent bankroll management.",
      },
    },
  ],
};

export default function EVBettingGuidePage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1>What is Expected Value (EV) in Sports Betting? A Beginner Guide</h1>
      <p className="highlight">
        The one concept that separates sharp bettors from everyone else&mdash;explained
        from scratch with a simple coin flip.
      </p>

      <section className="card mt-4">
        <h2>EV in Plain English</h2>
        <p>
          Expected Value (EV) answers a simple question:{" "}
          <strong>if I made this exact same bet a thousand times, would I come out ahead or behind?</strong>
        </p>
        <p>
          Every bet you place has an expected value. If the math says you&apos;ll make money
          over the long run, the bet is <strong>positive EV (+EV)</strong>. If the math says
          you&apos;ll lose money, the bet is <strong>negative EV (&ndash;EV)</strong>. Casinos
          and sportsbooks are profitable because the vast majority of bets they offer are
          &ndash;EV for the bettor. Your job as a sharp bettor is to find the rare +EV
          opportunities.
        </p>
      </section>

      <section className="card mt-4">
        <h2>The EV Formula</h2>
        <p>Here is the formula. It looks intimidating but it only uses basic arithmetic:</p>
        <div
          style={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "16px 20px",
            margin: "16px 0",
            fontFamily: "monospace",
            fontSize: "1.05rem",
            color: "#00e676",
            textAlign: "center",
          }}
        >
          EV = (P<sub>win</sub> &times; Profit) &minus; (P<sub>loss</sub> &times; Stake)
        </div>
        <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
          <li>
            <strong>P<sub>win</sub></strong> = your estimated probability that the bet wins
            (expressed as a decimal, e.g., 50% = 0.50)
          </li>
          <li>
            <strong>Profit</strong> = how much you pocket if you win (not including your
            original stake coming back)
          </li>
          <li>
            <strong>P<sub>loss</sub></strong> = 1 &minus; P<sub>win</sub> (the probability
            you lose)
          </li>
          <li>
            <strong>Stake</strong> = the amount of money you risk on the bet
          </li>
        </ul>
        <p>
          If EV is positive, the bet is +EV. If EV is negative, the bet is &ndash;EV. That is
          the entire concept. The hard part is estimating P<sub>win</sub> accurately&mdash;but
          we will get to that.
        </p>
      </section>

      <section className="card mt-4">
        <h2>The Coin Flip Example at +120 Odds</h2>
        <p>
          Let&apos;s make this concrete. Imagine a perfectly fair coin flip&mdash;50% heads,
          50% tails. No skill, no analysis, just pure probability. Now imagine a sportsbook
          posts odds on &quot;Heads&quot; at <strong>+120</strong>.
        </p>
        <h3>Step 1: What does +120 mean?</h3>
        <p>
          American odds of +120 mean: if you bet $10 and win, you get $12 profit (plus your
          $10 stake back). Your total payout would be $22.
        </p>
        <h3>Step 2: What does the sportsbook think?</h3>
        <p>
          The implied probability of +120 odds is: 100 &divide; (120 + 100) = 100 &divide; 220
          = <strong>45.45%</strong>.
        </p>
        <p>
          The sportsbook is pricing heads as if it only happens 45.45% of the time. But we know
          a fair coin lands heads <strong>50%</strong> of the time. There is a gap between
          reality (50%) and what the book is pricing (45.45%). That gap is your edge.
        </p>
        <h3>Step 3: Calculate the EV</h3>
        <div
          style={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "16px 20px",
            margin: "16px 0",
            fontFamily: "monospace",
            fontSize: "0.95rem",
            color: "#e5e7eb",
            lineHeight: 1.8,
          }}
        >
          <div>Stake = $10</div>
          <div>Profit if win = $12</div>
          <div>P<sub>win</sub> = 0.50 (50%)</div>
          <div>P<sub>loss</sub> = 0.50 (50%)</div>
          <br />
          <div style={{ color: "#00e676" }}>
            EV = (0.50 &times; $12) &minus; (0.50 &times; $10)
          </div>
          <div style={{ color: "#00e676" }}>EV = $6.00 &minus; $5.00</div>
          <div style={{ color: "#00e676", fontWeight: 700, fontSize: "1.1rem" }}>
            EV = +$1.00 per bet
          </div>
        </div>
        <p>
          On average, you make <strong>$1.00 every time you place this bet</strong>. Not every
          time&mdash;you will lose plenty of individual flips&mdash;but over hundreds of
          repetitions, you converge on +$1.00 per bet. This is a +EV bet, and you should take
          it every single time it is offered.
        </p>
        <h3>What if the odds were &ndash;120 instead?</h3>
        <p>
          At &ndash;120, you risk $12 to win $10 profit. The implied probability is 120 &divide;
          (120 + 100) = 54.55%. The book is pricing heads at 54.55%, but the true probability
          is only 50%. You are paying more than the bet is worth.
        </p>
        <div
          style={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "16px 20px",
            margin: "16px 0",
            fontFamily: "monospace",
            fontSize: "0.95rem",
            color: "#e5e7eb",
            lineHeight: 1.8,
          }}
        >
          <div style={{ color: "#ef4444" }}>
            EV = (0.50 &times; $10) &minus; (0.50 &times; $12)
          </div>
          <div style={{ color: "#ef4444" }}>EV = $5.00 &minus; $6.00</div>
          <div style={{ color: "#ef4444", fontWeight: 700 }}>EV = &ndash;$1.00 per bet</div>
        </div>
        <p>
          This is a &ndash;EV bet. Over time, you lose a dollar per bet on average. This is
          how sportsbooks make money: they set odds where the implied probability exceeds the
          true probability, giving themselves a built-in edge (the &quot;vig&quot; or
          &quot;juice&quot;).
        </p>
      </section>

      <section className="card mt-4">
        <h2>Why +EV Matters</h2>
        <p>
          Most recreational bettors think in terms of &quot;will this bet win?&quot; Sharp
          bettors think in terms of &quot;is this bet priced correctly?&quot; The difference
          is everything.
        </p>
        <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
          <li>
            <strong>You do not need to win most of your bets.</strong> A bettor who wins 48%
            of +150 bets is profitable. A bettor who wins 53% of &ndash;110 bets is barely
            breaking even. The odds matter more than the win rate.
          </li>
          <li>
            <strong>The edge compounds over time.</strong> A 3% ROI on $500/week in total
            action is $15/week, or $780/year. Not life-changing, but it is positive. Scale up
            your bankroll and volume and those numbers grow.
          </li>
          <li>
            <strong>You can be wrong on individual bets and still profit.</strong> EV is about
            the aggregate, not any single wager. This is why bankroll management and volume
            are critical&mdash;you need enough bets for the math to play out.
          </li>
          <li>
            <strong>The sportsbook&apos;s closing line is the benchmark.</strong> If you
            consistently get better odds than the closing line (positive CLV), your process
            is working even during losing streaks.
          </li>
        </ul>
      </section>

      <section className="card mt-4">
        <h2>How to Find Value Bets</h2>
        <p>
          Knowing the EV formula is the easy part. Finding real +EV opportunities is the
          actual skill. Here are the four practical methods:
        </p>

        <h3>1. Line Shopping</h3>
        <p>
          The single easiest way to improve your EV. Different sportsbooks post different
          odds on the same game. If DraftKings has the Lakers at +180 and FanDuel has them
          at +195, betting at FanDuel gives you better value on the identical outcome. Open
          accounts at 4&ndash;6 legal sportsbooks and compare prices before every bet. This
          costs nothing and immediately improves your results.
        </p>

        <h3>2. Exploiting Promotions and Odds Boosts</h3>
        <p>
          Sportsbooks regularly offer odds boosts (e.g., boosting a player prop from +200 to
          +280) as marketing promotions. Sometimes these boosts push a bet across the line
          from &ndash;EV to +EV. When they do, it is free money. You do not need a model or
          sophisticated analysis&mdash;just calculate whether the boosted odds imply a lower
          probability than the true likelihood of the event.
        </p>

        <h3>3. Building or Using a Model</h3>
        <p>
          More advanced bettors build projection models: statistical systems that estimate
          the true probability of outcomes based on data (team stats, player performance,
          injuries, weather, etc.). When your model says an event has a 55% chance of
          happening but the sportsbook is pricing it at 48% implied, you have found a +EV
          spot. Models require effort to build and maintain, but they are the most reliable
          path to a sustained edge.
        </p>

        <h3>4. Tracking Closing Line Value (CLV)</h3>
        <p>
          The closing line&mdash;the final odds before a game starts&mdash;is the sharpest
          price because it incorporates all market information. If you consistently bet at
          better odds than the closing line, you are beating the market. Track your CLV on
          every bet. Even during a losing stretch, positive CLV confirms your process is
          sound and profitability will follow over a larger sample.
        </p>
      </section>

      <section className="card mt-4" style={{ borderColor: "#22c55e" }}>
        <h2>Putting It All Together: Your Action Plan</h2>
        <ul style={{ paddingLeft: 20, color: "#d1d5db", lineHeight: 1.8, fontSize: "0.96rem" }}>
          <li>
            Open accounts at 4&ndash;6 sportsbooks (DraftKings, FanDuel, BetMGM, Caesars,
            etc.) for line shopping.
          </li>
          <li>
            Before every bet, calculate the implied probability of the odds and compare it
            to your estimated true probability.
          </li>
          <li>
            Only bet when your estimated probability exceeds the implied probability&mdash;that
            is, only bet +EV.
          </li>
          <li>
            Risk 1&ndash;2% of your bankroll per bet, never more. This protects you from
            variance.
          </li>
          <li>
            Track every bet: odds taken, stake, your estimated probability, the closing line,
            and the result.
          </li>
          <li>
            Review after 100+ bets. Are you getting positive CLV? If yes, keep going. If no,
            re-examine your probability estimates.
          </li>
          <li>
            Be patient. EV is a long-term game. You can lose 10 +EV bets in a row and still
            be doing everything right.
          </li>
        </ul>
      </section>

      <section className="card mt-4">
        <h2>Frequently Asked Questions</h2>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: 8 }}>
            What does Expected Value (EV) mean in sports betting?
          </h3>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
            EV is the average amount you expect to win or lose per bet over many repetitions.
            A +EV bet is one where the math says you profit long-term. The formula is:
            EV = (Win Probability x Profit) &minus; (Loss Probability x Stake).
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: 8 }}>
            Can you give a simple EV example?
          </h3>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
            A fair coin flip at +120 odds. True probability = 50%. Implied probability =
            45.45%. On a $10 bet: EV = (0.50 x $12) &minus; (0.50 x $10) = +$1.00. You
            make $1 per bet on average. That is a +EV bet.
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: 8 }}>
            How do I find +EV bets?
          </h3>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Line shop across multiple sportsbooks, exploit odds boosts that cross into +EV,
            build or use projection models to estimate true probabilities, and track your
            closing line value (CLV) to verify your edge is real.
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: 8 }}>
            Does +EV betting guarantee profits?
          </h3>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
            No. EV is a long-term expectation, not a guarantee on any single bet. Variance
            means you will have losing streaks. The edge only materializes over hundreds of
            bets with disciplined bankroll management.
          </p>
        </div>
      </section>

      <SportsbookCTA />

      <section className="card mt-4" style={{ borderColor: "#ef4444", background: "#0c0a09" }}>
        <h2>Responsible Gambling Reminder</h2>
        <p>
          Sports betting should be entertaining, not a source of financial stress. Never bet
          more than you can afford to lose. Set limits on your deposits, wagers, and time
          spent betting. If you or someone you know has a gambling problem, call{" "}
          <strong>1-800-GAMBLER</strong> or visit the National Council on Problem Gambling at{" "}
          <a
            href="https://www.ncpgambling.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00e676" }}
          >
            ncpgambling.org
          </a>
          . You must be 21+ to place bets. Available where legally permitted.
        </p>
      </section>
    </div>
  );
}
