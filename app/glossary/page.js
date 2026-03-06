export const metadata = {
  title: "Sports Betting Glossary – Complete Dictionary of Betting Terms",
  description:
    "Full glossary of sports betting terminology: juice, vig, sharp, square, CLV, steam, parlay, prop, middling, and 40+ more terms explained clearly.",
};

const TERMS = [
  {
    t: "Action",
    d: "Any wager that has been placed and is officially accepted by the sportsbook. A bet has action once confirmed.",
  },
  {
    t: "ATS (Against the Spread)",
    d: "A team's record when the point spread is applied. A team can go 10-2 straight up but 4-8 ATS if they consistently fail to cover.",
  },
  {
    t: "Bad Beat",
    d: "A bet that was winning with a high probability—usually late in the game—but loses due to a late score or statistical quirk. Bad beats hurt more than regular losses because you had it.",
  },
  {
    t: "Book / Sportsbook",
    d: "The entity (DraftKings, FanDuel, BetMGM, etc.) that accepts sports wagers and sets the lines.",
  },
  {
    t: "Buying Points",
    d: "Paying extra vig to move the point spread or total in your favor. Common example: buying a key number like 3 in football by moving from -3 to -2.5.",
  },
  {
    t: "Chalk",
    d: "The favorite in a game. Betting the chalk means betting the most likely winner. Public bettors heavily favor chalk, which is why books shade lines toward it.",
  },
  {
    t: "Closing Line Value (CLV)",
    d: "The difference between the odds you got and where the line closed (final price before game time). Getting better than the closing price consistently is the gold standard of sharp betting—it means you beat the market.",
  },
  {
    t: "Cover",
    d: "Winning against the spread. A -7 favorite 'covers' by winning by 8 or more. A +7 underdog covers by losing by 6 or fewer, or winning outright.",
  },
  {
    t: "Dog",
    d: "Short for underdog. The side expected to lose. Often has positive American odds (+150, +200, etc.).",
  },
  {
    t: "Double Chance",
    d: "A bet type (common in soccer) where you can back two of three possible outcomes: home win/draw, away win/draw, or home/away win. Reduces risk but lowers payout.",
  },
  {
    t: "Edge",
    d: "Your mathematical advantage over the sportsbook on a given bet. A positive edge means the true probability of an outcome is higher than the probability implied by the odds.",
  },
  {
    t: "Expected Value (EV)",
    d: "+EV means the bet is mathematically profitable in the long run. –EV means you're giving up edge to the book. See our EV guide for the full calculation.",
  },
  {
    t: "Flat Betting",
    d: "Wagering the same dollar amount on every bet regardless of perceived edge or confidence. Popular among recreational bettors for its simplicity.",
  },
  {
    t: "Futures",
    d: "Bets placed on outcomes determined far in the future, like Super Bowl winner, championship odds, or award winners. Books hold significant vig on futures.",
  },
  {
    t: "Grading",
    d: "The process of settling a bet after the event concludes. Bets are graded as wins, losses, pushes, or voids.",
  },
  {
    t: "Handle",
    d: "The total amount of money wagered on a specific event or at a sportsbook over a given period. High handle games attract the sharpest action.",
  },
  {
    t: "Hedge",
    d: "Placing a second bet on the opposite side of an original bet to reduce risk or lock in profit. Often used on futures bets that have moved significantly in your favor.",
  },
  {
    t: "Hook",
    d: 'The half-point in a spread (e.g., -3.5). Laying -3 and winning by exactly 3 is a push. Laying -3.5 and winning by 3 is a loss. That .5 is the "hook."',
  },
  {
    t: "Juice / Vig",
    d: "The commission the sportsbook charges, built into odds. Standard US juice is -110 on both sides of a spread bet. The book keeps the vig whether you win or lose.",
  },
  {
    t: "Kelly Criterion",
    d: "A mathematical formula for sizing bets based on your edge and odds. Full Kelly maximizes bankroll growth but causes large swings. Most sharp bettors use Half Kelly.",
  },
  {
    t: "Key Numbers",
    d: "In football, scores often land on specific margins due to the point structure (3-point FG, 7-point TD+PAT). Key numbers are 3, 7, 10, 14, 6, 4. Getting -3 vs -3.5 is a huge difference.",
  },
  {
    t: "Layoff",
    d: "When a sportsbook bets with another book to reduce its own exposure on a lopsided event. Retail books lay off risk to balance their books.",
  },
  {
    t: "Limit",
    d: "The maximum amount a sportsbook will accept on a given bet. Sharp bettors often find their limits reduced when they win consistently.",
  },
  {
    t: "Line",
    d: "The odds or point spread set by the sportsbook for a given game or event. Lines move in response to betting action and new information (injuries, weather, etc.).",
  },
  {
    t: "Line Shopping",
    d: "Comparing odds across multiple sportsbooks before placing a bet to get the best available price. The difference between -110 and +100 on the same side is significant over hundreds of bets.",
  },
  {
    t: "Live Betting (In-Game)",
    d: "Wagering on a game while it is in progress. Lines update in real time based on game state. Offers opportunities when books move lines slower than the game situation warrants.",
  },
  {
    t: "Middling",
    d: "When a line moves significantly, you can bet both sides at prices that create a window where you win both bets. A middle occurs if the final score lands in that window. Example: bet home team -3 early, then +7 later—any score where home wins by 4-6 wins both bets.",
  },
  {
    t: "Moneyline (ML)",
    d: "A straight bet on who wins the game with no point spread. Favorites have negative odds (-200 = risk $200 to win $100). Underdogs have positive odds (+175 = risk $100 to win $175).",
  },
  {
    t: "No Action",
    d: "A bet is declared no action when a game is cancelled, postponed, or a player doesn't play. Stake is returned in full.",
  },
  {
    t: "Off the Board (OTB)",
    d: "When a sportsbook stops accepting bets on a game due to uncertainty (injury news, weather, etc.). The game is temporarily unavailable.",
  },
  {
    t: "Opening Line",
    d: "The initial odds posted for a game before significant betting action. Often set by sharp-facing books (Circa, Pinnacle) and then adopted by recreational books.",
  },
  {
    t: "Over/Under (Total)",
    d: "A bet on whether the combined score of both teams will be over or under a number set by the book. Example: Total 47.5 in an NFL game.",
  },
  {
    t: "Parlay",
    d: "A single bet combining two or more individual picks. All legs must win for the parlay to pay. Payouts grow exponentially but the book's edge compounds with each leg.",
  },
  {
    t: "Pick'em",
    d: "A game with no favorite—both teams are evenly matched. Usually priced at -110 on both sides with no spread (or PK).",
  },
  {
    t: "Player Props",
    d: "Bets on individual player statistics rather than game outcomes. Examples: Patrick Mahomes passing yards over/under, LeBron James points over/under. Props typically carry higher vig.",
  },
  {
    t: "Position",
    d: "A book's net exposure on one side of a game. If too many bettors take one side, the book has a risky position and will move the line to attract action on the other side.",
  },
  {
    t: "Prop Bet",
    d: "Any proposition bet on a specific outcome within a game that isn't tied to the final score. Includes player props, game props (first to score, total penalties), and novelty props.",
  },
  {
    t: "Push",
    d: "A tie between the bettor and the sportsbook. Stakes are returned. Example: betting -3 and the game ends with the favorite winning by exactly 3.",
  },
  {
    t: "Reverse Line Movement (RLM)",
    d: "When the line moves opposite to the public betting percentages. Example: 80% of bets on Team A, but the line moves in favor of Team B. Sharp money is on Team B.",
  },
  {
    t: "ROI (Return on Investment)",
    d: "Your total profit divided by total amount wagered, expressed as a percentage. A 5% ROI means for every $100 wagered, you net $5 profit on average.",
  },
  {
    t: "Scalping / Arbitrage",
    d: "Betting both sides of a market at different books to guarantee a profit regardless of outcome. Requires multiple accounts and fast execution. Books restrict or ban arbitrage bettors aggressively.",
  },
  {
    t: "Sharp",
    d: "A sophisticated, professional bettor who consistently beats the closing line and shows long-term profit. Sharp money moves lines. Sharps are the people sportsbooks try to limit.",
  },
  {
    t: "Square",
    d: "A casual, recreational bettor. Squares typically bet based on popularity, media narrative, or gut feel. They generally favor favorites, home teams, and big-market franchises.",
  },
  {
    t: "Steam",
    d: "A sudden, sharp line movement caused by coordinated action from a sharp syndicate or large professional betting group. If you see a line move 2–3 points quickly with no obvious news, it's steam.",
  },
  {
    t: "Teaser",
    d: "A parlay where you move the spread in your favor in exchange for reduced odds. Common NFL teasers move the line 6 points on 2+ teams at around -120 odds.",
  },
  {
    t: "Totals Betting",
    d: "Betting on the combined score of a game (over or under). Books often have a slight edge on totals due to the difficulty of predicting scoring.",
  },
  {
    t: "Two-Way Market",
    d: "A market with only two outcomes (moneyline with no draw option). Opposite of a three-way market used in soccer.",
  },
  {
    t: "Unit",
    d: "The standard bet size for a given bettor. Usually 1–2% of bankroll. Expressing bets in units (rather than dollars) allows tracking relative performance across different bankroll sizes.",
  },
  {
    t: "Value",
    d: "When the true probability of an outcome is higher than the probability implied by the odds. A bet has value when you're getting paid more than the risk warrants. Same as +EV.",
  },
  {
    t: "Wiseguy / Wise Guy",
    d: "Another term for a sharp bettor. A professional who has demonstrated a long-term edge over the sportsbook.",
  },
];

export default function GlossaryPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <h1>Sports Betting Glossary</h1>
      <p>
        Every term you&apos;ll encounter at the sportsbook—defined clearly so
        you know exactly what you&apos;re betting into.
      </p>
      <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: 30 }}>
        {TERMS.length} terms covered, from basics to sharp-level vocabulary.
      </p>

      <div style={{ display: "grid", gap: 14 }}>
        {TERMS.map((item) => (
          <div
            key={item.t}
            style={{
              background: "#020617",
              borderRadius: 12,
              padding: 18,
              borderLeft: "4px solid #22c55e",
              borderRight: "1px solid #111827",
              borderTop: "1px solid #111827",
              borderBottom: "1px solid #111827",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6, color: "#e5e7eb", fontSize: "1rem" }}>
              {item.t}
            </div>
            <div style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.65 }}>
              {item.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
