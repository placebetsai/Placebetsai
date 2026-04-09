import { NextResponse } from "next/server";

export const runtime = "edge";

const KALSHI_API = "https://api.elections.kalshi.com/trade-api/v2";

// Sports-related keywords to filter markets
const SPORTS_KEYWORDS = [
  "nfl", "nba", "mlb", "nhl", "mls", "soccer", "football", "basketball",
  "baseball", "hockey", "tennis", "golf", "ufc", "mma", "boxing",
  "super bowl", "world series", "stanley cup", "march madness",
  "championship", "playoff", "finals", "mvp", "touchdown", "home run",
  "grand slam", "olympic", "f1", "formula", "nascar", "pga",
  "college football", "college basketball", "ncaa", "premier league",
  "champions league", "world cup",
];

function isSportsRelated(market) {
  const text = `${market.title || ""} ${market.subtitle || ""} ${market.category || ""} ${market.event_ticker || ""}`.toLowerCase();
  return SPORTS_KEYWORDS.some((kw) => text.includes(kw));
}

// Fallback markets when API is unreachable
const FALLBACK_MARKETS = [
  {
    ticker: "FALLBACK-NFL-MVP",
    title: "Who will win NFL MVP 2026?",
    category: "Sports",
    yesPrice: 0.35,
    noPrice: 0.65,
    volume: 12400,
  },
  {
    ticker: "FALLBACK-NBA-CHAMP",
    title: "Will the Celtics win the 2026 NBA Championship?",
    category: "Sports",
    yesPrice: 0.22,
    noPrice: 0.78,
    volume: 8900,
  },
  {
    ticker: "FALLBACK-SUPERBOWL",
    title: "Will the Super Bowl have over 100M viewers?",
    category: "Sports",
    yesPrice: 0.72,
    noPrice: 0.28,
    volume: 5200,
  },
  {
    ticker: "FALLBACK-MLB-HR",
    title: "Will anyone hit 60+ home runs in 2026?",
    category: "Sports",
    yesPrice: 0.08,
    noPrice: 0.92,
    volume: 3100,
  },
  {
    ticker: "FALLBACK-SOCCER-WC",
    title: "Will USA advance past World Cup group stage?",
    category: "Sports",
    yesPrice: 0.61,
    noPrice: 0.39,
    volume: 7800,
  },
  {
    ticker: "FALLBACK-UFC",
    title: "Will there be a new UFC heavyweight champion in 2026?",
    category: "Sports",
    yesPrice: 0.45,
    noPrice: 0.55,
    volume: 2900,
  },
];

export async function GET() {
  try {
    // Try fetching events first (broader), then markets
    const res = await fetch(`${KALSHI_API}/markets?limit=200&status=open`, {
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Kalshi API returned:", res.status);
      return NextResponse.json({ markets: FALLBACK_MARKETS });
    }

    const data = await res.json();
    const allMarkets = data.markets || [];

    // Filter to sports-related markets
    const sportsMarkets = allMarkets.filter(isSportsRelated);

    // Format the response
    const formatted = sportsMarkets.slice(0, 20).map((m) => ({
      ticker: m.ticker,
      title: m.title || m.subtitle || "Untitled Market",
      category: m.category || "Sports",
      yesPrice: m.yes_ask != null ? m.yes_ask / 100 : (m.last_price != null ? m.last_price / 100 : null),
      noPrice: m.no_ask != null ? m.no_ask / 100 : (m.last_price != null ? (100 - m.last_price) / 100 : null),
      volume: m.volume || m.open_interest || 0,
      closeDate: m.close_time || m.expiration_time || null,
    }));

    // If no sports markets found, return fallbacks
    if (formatted.length === 0) {
      return NextResponse.json({ markets: FALLBACK_MARKETS });
    }

    return NextResponse.json({ markets: formatted });
  } catch (err) {
    console.error("Kalshi API error:", err);
    return NextResponse.json({ markets: FALLBACK_MARKETS });
  }
}
