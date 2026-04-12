import SportsbookCTA from "../../components/SportsbookCTA";

export const metadata = {
  title: "What is EV Betting? A Complete Beginner\'s Guide to Expected Value",
  description:
    "Learn what Expected Value (EV) betting means, how to calculate EV, find +EV bets, and start making smarter sports bets. A complete beginner\'s guide with examples.",
  alternates: { canonical: "https://placebets.ai/what-is-ev-betting" },
  openGraph: {
    title: "What is EV Betting? A Complete Beginner\'s Guide to Expected Value",
    description: "Learn what Expected Value (EV) betting means, how to calculate EV, find +EV bets, and start making smarter sports bets. A complete beginner\'s guide with examples.",
    url: "https://placebets.ai/what-is-ev-betting",
    siteName: "PlaceBets.ai",
    type: "article",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the main difference between EV betting and traditional betting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional betting often relies on gut feelings, team loyalty, or basic analysis. EV betting, however, is a mathematical approach focused on finding bets where the true probability of an outcome is higher than what the sportsbook's odds imply, aiming for long-term profitability rather than just picking winners."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be a math genius to do EV betting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not at all! While it involves calculations, the core math is basic arithmetic and percentages. The most challenging part is accurately estimating probabilities, which comes from research and analytical skills, not advanced mathematics. Calculators and spreadsheets make the actual calculations easy."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate do my probability estimates need to be for EV betting to work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They need to be as accurate as possible. Even a small difference between your estimated probability and the true probability can turn a positive EV bet into a negative one. This is the hardest part of EV betting and requires thorough research, unbiased analysis, and potentially statistical modeling over time."
      }
    },
    {
      "@type": "Question",
      "name": "Can EV betting guarantee profits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, EV betting does not guarantee profits on any single bet or even in the short term. It's a long-term strategy. Due to variance, you will still experience losing streaks. However, consistently placing positive EV bets increases your mathematical expectation of profitability over a large sample size of wagers."
      }
    },
    {
      "@type": "Question",
      "name": "What's the single most important thing a beginner can do to start EV betting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The single most important thing is to consistently line shop across multiple sportsbooks (like DraftKings, FanDuel, BetMGM) and to diligently track every single bet you make, including your estimated probability, the odds taken, and the closing line value. This provides the data you need to learn, refine your strategy, and find the best value."
      }
    }
  ]
};

export default function Page() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1>What is EV Betting? A Complete Beginner&apos;s Guide</h1>

      <section className="card mt-4">
          <p>Welcome to PlaceBets.ai! If you&apos;ve ever placed a sports bet, you know the thrill of a win and the sting of a loss. But what if there was a way to move beyond just guessing and actually make more informed, profitable decisions in the long run? That&apos;s exactly what "Expected Value" or "EV" betting is all about, and it&apos;s the closest thing to a superpower you can get in the world of sports wagering.</p>
          <p>Forget what you think you know about picking winners based on gut feelings or team loyalty. EV betting is a strategic approach that focuses on finding bets where the true probability of an outcome is <em>higher</em> than what the sportsbooks are implying with their odds. In simple terms, you&apos;re looking for situations where you&apos;re getting a better deal than you should be.</p>
          <p>This guide is designed for absolute beginners. We&apos;re going to break down EV betting into easy-to-understand chunks, give you real-world examples, and show you exactly how to start applying these principles to your own betting strategy. By the end of this article, you&apos;ll have a solid foundation to approach sports betting like a sharp, not just a casual fan.</p>
      </section>

      <section className="card mt-4">
        <h2>What Exactly is Expected Value (EV) in Sports Betting?</h2>
          <p>Let&apos;s start with the core concept. Expected Value (EV) represents the average amount of money you can expect to win or lose per bet if you were to place that same bet an infinite number of times. It&apos;s a long-term mathematical expectation, not a guarantee for any single bet.</p>
          <p>Think of it like this: Imagine a casino game where you bet $10 on a coin flip. If it lands heads, you win $11. If it lands tails, you lose your $10. The true probability of heads is 50%. Your payout if you win is $11. Your loss if you lose is $10.</p>
          <p>If you played this game 100 times, you&apos;d expect to win 50 times and lose 50 times. 50 wins x $11 = $550 50 losses x $10 = -$500 Total profit = $50 Average profit per bet = $50 / 100 bets = $0.50</p>
          <p>In this scenario, your Expected Value (EV) is +$0.50 per bet. This is a positive EV (+EV) bet, meaning over the long run, you&apos;re expected to make money. If the casino offered you only $9 for a win, your EV would be negative (-EV), and you&apos;d be expected to lose money over time.</p>
          <p>In sports betting, we&apos;re doing the same thing: trying to identify bets where our estimated probability of an outcome, combined with the sportsbook&apos;s odds, gives us a positive expected return.</p>
      </section>

      <section className="card mt-4">
        <h2>The EV Formula: Your Secret Weapon</h2>
          <p>The formula for calculating Expected Value might look a little intimidating at first, but we&apos;ll break it down.</p>
          <p>EV = (Probability of Winning <em> Payout if You Win) - (Probability of Losing </em> Amount You Risk)</p>
          <p>Let&apos;s look at each part of this:</p>
          <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
            <li><strong>Probability of Winning:</strong> This is <em>your</em> estimated probability that your bet will hit. This is the crucial part where your research, analysis, and possibly statistical models come into play. This is <em>not</em> what the sportsbook implies, but what <em>you</em> believe the true chance is.</li>
            <li><strong>Payout if You Win:</strong> This is how much money you get back (your original stake plus your winnings) if your bet is successful, based on the sportsbook&apos;s odds.</li>
            <li><strong>Probability of Losing:</strong> This is simply 1 minus your Probability of Winning (1 - Probability of Winning).</li>
            <li><strong>Amount You Risk:</strong> This is your initial stake, the amount of money you put down on the bet.</li>
          </ul>
          <p>Don&apos;t worry, we&apos;ll walk through an example.</p>
      </section>

      <section className="card mt-4">
        <h2>Implied Probability: What the Sportsbook Thinks</h2>
          <p>Before we can calculate EV, you need to understand "Implied Probability." This is what the sportsbook&apos;s odds suggest the likelihood of an event happening is. It&apos;s the probability that would make the bet a "fair" bet (with no edge for the sportsbook, also known as the "vig" or "juice").</p>
          <p>Let&apos;s use an example with American odds:</p>
          <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
            <li><strong>Positive Odds (+):</strong> These indicate how much profit you&apos;d make on a $100 bet.</li>
            <li>Example: +150 odds.</li>
            <li>Formula: Implied Probability = 100 / (Odds + 100)</li>
            <li>So, for +150: 100 / (150 + 100) = 100 / 250 = 0.40 or 40%</li>
          </ul>
          <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
            <li><strong>Negative Odds (-):</strong> These indicate how much you&apos;d need to bet to win $100 profit.</li>
            <li>Example: -120 odds.</li>
            <li>Formula: Implied Probability = Odds / (Odds + 100) (Note: use the absolute value of the negative odds here)</li>
            <li>So, for -120: 120 / (120 + 100) = 120 / 220 = 0.5454 or 54.54%</li>
          </ul>
          <p>Why is this important? Because EV betting is all about finding situations where <em>your</em> estimated probability is higher than the sportsbook&apos;s implied probability.</p>
      </section>

      <section className="card mt-4">
        <h2>How to Calculate EV: A Step-by-Step Example</h2>
          <p>Let&apos;s put it all together with a hypothetical NFL game.</p>
          <p>Imagine the Kansas City Chiefs are playing the Buffalo Bills. You&apos;re looking at the moneyline for the Bills to win.</p>
          <p>Step 1: Find the Odds You check DraftKings and see the Bills are +180 to win. You decide to bet $100 on the Bills.</p>
          <p>Step 2: Calculate Your Potential Payout If the Bills win, you get your $100 stake back plus $180 profit. Total payout = $280.</p>
          <p>Step 3: Determine Your Estimated Probability This is the hardest and most critical step. This is where your research comes in. You&apos;ve analyzed the teams, injuries, matchups, historical data, weather, etc. After all your analysis, <em>you</em> believe the Bills actually have a 40% chance of winning this game.</p>
          <p>Step 4: Plug into the EV Formula</p>
          <p>EV = (Probability of Winning <em> Payout if You Win) - (Probability of Losing </em> Amount You Risk)</p>
          <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
            <li>Probability of Winning (your estimate) = 0.40 (40%)</li>
            <li>Payout if You Win = $280 (your $100 stake + $180 profit)</li>
            <li>Probability of Losing = 1 - 0.40 = 0.60 (60%)</li>
            <li>Amount You Risk = $100</li>
          </ul>
          <p>Let&apos;s calculate: EV = (0.40 <em> $280) - (0.60 </em> $100) EV = $112 - $60 EV = +$52</p>
          <p>In this scenario, your Expected Value is +$52. This means that if you could place this exact bet an infinite number of times, you&apos;d expect to make $52 for every $100 you bet, on average. This is a positive EV bet, and it&apos;s exactly what you&apos;re looking for.</p>
          <p>What if your estimated probability was only 30%? EV = (0.30 <em> $280) - (0.70 </em> $100) EV = $84 - $70 EV = +$14</p>
          <p>Still positive, but less so.</p>
          <p>What if your estimated probability was 25%? EV = (0.25 <em> $280) - (0.75 </em> $100) EV = $70 - $75 EV = -$5</p>
          <p>Now it&apos;s a negative EV bet. Even though you might win the bet, over the long run, you&apos;re expected to lose money.</p>
          <p>The key takeaway here is that EV betting isn&apos;t just about picking winners; it&apos;s about picking winners when the odds offered are <em>better</em> than the true probability of that outcome.</p>
      </section>

      <section className="card mt-4">
        <h2>Line Shopping: The Easiest Way to Find Value</h2>
          <p>One of the simplest and most effective ways to find positive EV bets is through "line shopping." This means checking different sportsbooks for the best odds on the same event. Sportsbooks like DraftKings, FanDuel, and BetMGM often have slightly different odds for the same game because they have different models, different risk tolerances, and different betting volumes from their users.</p>
          <p>Let&apos;s revisit our Chiefs vs. Bills example.</p>
          <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
            <li>You&apos;ve done your analysis and still believe the Bills have a 40% chance to win.</li>
            <li>You check DraftKings and see Bills at +180. (EV = +$52 for a $100 bet)</li>
            <li>You then check FanDuel and see Bills at +175.</li>
            <li>You then check BetMGM and see Bills at +190.</li>
          </ul>
          <p>If you bet $100 on the Bills at BetMGM with +190 odds: <em>   Payout if you win = $100 stake + $190 profit = $290 </em>   EV = (0.40 <em> $290) - (0.60 </em> $100) <em>   EV = $116 - $60 </em>   EV = +$56</p>
          <p>By simply checking BetMGM, you increased your expected value from +$52 to +$56 on the exact same bet! This is why having accounts with multiple sportsbooks is crucial for EV bettors. It allows you to always get the best price, which directly increases your long-term profitability.</p>
      </section>

      <section className="card mt-4">
        <h2>Closing Line Value (CLV): A Sign You&apos;re Doing It Right</h2>
          <p>"Closing Line Value" (CLV) is a concept that helps you evaluate whether your pre-game analysis and bet selection were good. The "closing line" is the final odds offered by the sportsbook just before a game starts. These odds are considered the most efficient because they reflect the collective wisdom of all bettors, sharp money, and the sportsbook&apos;s own adjustments.</p>
          <p>You have positive CLV if the odds you got when you placed your bet were better than the closing line odds.</p>
          <p>Example: <em>   You bet on the Los Angeles Lakers at +200 against the Phoenix Suns early in the day. </em>   Later, closer to game time, news breaks about a Suns&apos; key player being injured, and the Lakers&apos; odds move to +180. <em>   The closing line for the Lakers is +180. </em>   Since you got +200, and the line moved in your favor (meaning the Lakers are now considered more likely to win than when you bet them), you have positive CLV.</p>
          <p>Why is CLV important for EV betting? Consistently achieving positive CLV is a strong indicator that your initial assessment of value was accurate. It suggests that you&apos;re identifying good bets before the market fully corrects itself. Even if your specific bet doesn&apos;t win, if you consistently get positive CLV, you&apos;re making good EV decisions, and profitability will follow in the long run.</p>
          <p>Think of it as a feedback loop. If you often have positive CLV, it means your probabilities are likely better than the market&apos;s initial assessment. If you consistently have negative CLV (meaning the line moves against you), it might be a sign that your probabilities are off, or you&apos;re not getting good value.</p>
      </section>

      <section className="card mt-4">
        <h2>Why Variance Matters: The Rollercoaster Ride</h2>
          <p>Even with a positive EV strategy, you won&apos;t win every bet. In fact, you&apos;ll still lose plenty of bets. This is where "variance" comes in. Variance refers to the natural ups and downs, the swings in your bankroll, that occur in the short term, even when you have a long-term edge.</p>
          <p>Imagine our coin flip game with a +$0.50 EV. If you play it 10 times, you might win 3, lose 7. That&apos;s a -$2.50 loss over those 10 flips. Does that mean the EV was wrong? No! It just means that in a small sample size, random chance can lead to outcomes that don&apos;t reflect the long-term expectation.</p>
          <p>Sports betting is exactly the same. You might place five +EV bets, and only one hits. That&apos;s a losing session. It can be frustrating, and it can make you doubt your strategy. But it&apos;s crucial to understand that EV is a long-term game. You need a large sample size of bets for your positive EV to materialize into actual profit.</p>
          <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
            <li><strong>Embrace the swings:</strong> Don&apos;t get too high on a winning streak or too low on a losing streak. Stick to your process.</li>
            <li><strong>Bankroll management:</strong> This is paramount. Never bet more than you can afford to lose on any single wager. Your bankroll needs to be large enough to withstand the inevitable losing streaks that come with variance. A common rule of thumb is to risk only 1-2% of your total bankroll per bet.</li>
          </ul>
          <p>Variance is why EV betting requires patience, discipline, and a strong understanding that short-term results are not indicative of long-term success or failure.</p>
      </section>

      <section className="card mt-4">
        <h2>Common Mistakes Beginners Make in EV Betting</h2>
          <p>While EV betting offers a clear path to smarter wagering, there are several pitfalls beginners often fall into. Knowing these can help you avoid them:</p>
          <ul style={{ paddingLeft: 20, color: "#e5e7eb", lineHeight: 1.8, fontSize: "0.98rem" }}>
            <li><strong>Overestimating Your Probability:</strong> This is the biggest one. It&apos;s easy to be biased towards a team you like or to see value where none truly exists. Your estimated probability needs to be as objective and accurate as possible. Don&apos;t let emotion or wishful thinking inflate your win probability. This is where robust research and potentially statistical models are invaluable.</li>
            <li><strong>Ignoring the Vig (Juice):</strong> Sportsbooks aren&apos;t charities; they build in a commission (the vig or juice) into their odds, ensuring they profit in the long run. When you calculate implied probability from the odds, you&apos;re seeing the book&apos;s probability <em>plus</em> their commission. True EV calculations account for this indirectly by comparing your probability to the payout structure. Just be aware that the market itself is against you before you even start, making positive EV harder to find.</li>
            <li><strong>Not Line Shopping:</strong> As discussed, this is free money left on the table. If you&apos;re only betting at one sportsbook, you&apos;re almost certainly missing out on better odds and higher EV opportunities.</li>
            <li><strong>Chasing Losses:</strong> This is a classic gambling mistake that is amplified in EV betting if you don&apos;t understand variance. A losing streak doesn&apos;t mean your EV strategy is wrong; it&apos;s often just variance. Trying to "get back" losses by placing more bets, larger bets, or bets on events you haven&apos;t properly analyzed is a recipe for disaster. Stick to your unit sizing and your process.</li>
            <li><strong>Lack of Discipline:</strong> EV betting is a long-term strategy. It requires consistent effort in research, line shopping, and disciplined bankroll management. Getting lazy with any of these steps will undermine your efforts.</li>
            <li><strong>Not Tracking Results:</strong> How do you know if your estimated probabilities are accurate or if your strategy is working if you don&apos;t track your bets? Keep a detailed record of every bet: the event, the odds, your stake, your estimated probability, the actual outcome, your profit/loss, and especially your CLV. This data is invaluable for refining your approach.</li>
            <li><strong>Betting Too Many Games:</strong> Quality over quantity. It&apos;s better to find a few truly positive EV spots after thorough research than to bet on dozens of games with only superficial analysis.</li>
            <li><strong>Misunderstanding Long-Term vs. Short-Term:</strong> Beginners often expect immediate results. If you place 10 EV bets and are down, it&apos;s easy to get discouraged. Remember, EV plays out over hundreds, even thousands, of bets.</li>
          </ul>
      </section>

      <section className="card mt-4">
        <h2>How to Get Started with EV Betting Today</h2>
          <p>Ready to put these concepts into action? Here&apos;s a practical roadmap to begin your EV betting journey:</p>
          <p>1.  <strong>Educate Yourself Continuously:</strong> You&apos;ve started with this guide, which is great! Keep learning about sports analytics, different betting markets, and advanced EV tools. There are many resources online, including articles, forums, and communities dedicated to sharp betting. 2.  <strong>Open Accounts at Multiple Sportsbooks:</strong> This is non-negotiable for line shopping. Sign up for DraftKings, FanDuel, BetMGM, Caesars, PointsBet, etc., that are legal in your state. Take advantage of sign-up bonuses, but remember to read the terms and conditions carefully. 3.  <strong>Learn to Calculate Implied Probability and EV Manually:</strong> Practice with different odds. Use a calculator, a spreadsheet, or even just pen and paper until you&apos;re comfortable with the numbers. This builds a foundational understanding. 4.  <strong>Develop Your Own Probability Estimation Method:</strong> This is the core of your edge. <em>   <strong>Start Simple:</strong> Don&apos;t try to build a complex statistical model overnight. Begin by focusing on one sport (e.g., NFL or NBA) and a few key factors you think influence outcomes (e.g., injuries, home-field advantage, recent performance, specific matchups). </em>   <strong>Use Public Resources:</strong> Read detailed game previews, listen to expert analysis (but form your own opinions!), and look at advanced stats sites. <em>   <strong>Be Objective:</strong> Try to remove personal bias. Imagine you have no rooting interest and are purely trying to predict the outcome. 5.  <strong>Start Small with Your Bankroll:</strong> Begin with an amount you are absolutely comfortable losing. This isn&apos;t just a suggestion; it&apos;s a critical rule for responsible gambling and learning without undue financial pressure. 6.  <strong>Practice Bankroll Management:</strong> Decide on a fixed "unit size" (e.g., 1% or 2% of your total bankroll). Stick to this unit size for every bet, regardless of how confident you feel. This protects you from variance. 7.  <strong>Track Every Single Bet Diligently:</strong> Use a spreadsheet (Google Sheets or Excel works great) to record: </em>   Date <em>   Sport/Event </em>   Bet Type (Moneyline, Spread, Over/Under) <em>   Team/Player </em>   Odds Taken <em>   Stake Amount </em>   Your Estimated Probability <em>   Sportsbook Used </em>   Closing Line Odds (if you can find them later) <em>   Actual Outcome (Win/Loss) </em>   Profit/Loss <em>   CLV (Positive/Negative) Tracking is how you learn, identify patterns, and refine your approach. 8.  <strong>Review and Adjust:</strong> Regularly review your tracked bets. </em>   Are you consistently getting positive CLV? If not, why? <em>   Are your estimated probabilities generally accurate compared to outcomes? </em>   Where are you finding your edge? What types of bets or sports are you most successful with? *   What mistakes are you making? Learn from them.</p>
          <p>EV betting is a journey, not a destination. It requires continuous learning, discipline, and a commitment to data-driven decision-making. But for those willing to put in the work, it can transform sports betting from a game of chance into a strategic endeavor.</p>
          <p>Remember, the goal isn&apos;t to win every bet; it&apos;s to make bets that are profitable in the long run, even if they don&apos;t always hit in the short term.</p>
      </section>

      <section className="card mt-4">
        <h2>Responsible Gambling Reminder</h2>
          <p>While EV betting provides a strategic edge, it&apos;s crucial to remember that sports betting should always be approached responsibly. Never bet more than you can comfortably afford to lose. If you ever feel that gambling is becoming a problem or is negatively impacting your life, please seek help. Resources are available, such as the National Problem Gambling Helpline (1-800-GAMBLER). Bet smart, but bet safely.</p>
      </section>

      <SportsbookCTA />

      <section className="card mt-4">
        <h2>Frequently Asked Questions</h2>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "8px" }}>
              What&apos;s the main difference between EV betting and traditional betting?
            </h3>
            <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Traditional betting often relies on gut feelings, team loyalty, or basic analysis. EV betting, however, is a mathematical approach focused on finding bets where the true probability of an outcome is higher than what the sportsbook&apos;s odds imply, aiming for long-term profitability rather than just picking winners.
            </p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "8px" }}>
              Do I need to be a math genius to do EV betting?
            </h3>
            <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Not at all! While it involves calculations, the core math is basic arithmetic and percentages. The most challenging part is accurately estimating probabilities, which comes from research and analytical skills, not advanced mathematics. Calculators and spreadsheets make the actual calculations easy.
            </p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "8px" }}>
              How accurate do my probability estimates need to be for EV betting to work?
            </h3>
            <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
              They need to be as accurate as possible. Even a small difference between your estimated probability and the true probability can turn a positive EV bet into a negative one. This is the hardest part of EV betting and requires thorough research, unbiased analysis, and potentially statistical modeling over time.
            </p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "8px" }}>
              Can EV betting guarantee profits?
            </h3>
            <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
              No, EV betting does not guarantee profits on any single bet or even in the short term. It&apos;s a long-term strategy. Due to variance, you will still experience losing streaks. However, consistently placing positive EV bets increases your mathematical expectation of profitability over a large sample size of wagers.
            </p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "8px" }}>
              What&apos;s the single most important thing a beginner can do to start EV betting?
            </h3>
            <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
              The single most important thing is to consistently line shop across multiple sportsbooks (like DraftKings, FanDuel, BetMGM) and to diligently track every single bet you make, including your estimated probability, the odds taken, and the closing line value. This provides the data you need to learn, refine your strategy, and find the best value.
            </p>
          </div>
      </section>

      <section className="card mt-4" style={{ borderColor: "#ef4444", background: "#0c0a09" }}>
        <h2>Responsible Gambling Reminder</h2>
        <p>
          Sports betting should be entertaining, not a source of financial stress. Never bet more
          than you can afford to lose. Set limits on your deposits, wagers, and time spent betting.
          If you or someone you know has a gambling problem, call <strong>1-800-GAMBLER</strong> or
          visit the National Council on Problem Gambling at{" "}
          <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" style={{ color: "#00e676" }}>
            ncpgambling.org
          </a>.
          You must be 21+ to place bets. Available where legally permitted.
        </p>
      </section>
    </div>
  );
}
