import HomePageClient from "../components/HomePageClient";

const SITE_URL = "https://placebets.ai";

export const metadata = {
  title: "PlaceBets.ai - Live Sports Prediction Markets & Betting Tools",
  description:
    "Live prediction market data from Kalshi, +EV calculators, bankroll management tools, and real-time tournament info. The professional sports betting toolkit.",
  openGraph: {
    title: "PlaceBets.ai - Live Sports Prediction Markets & Betting Tools",
    description:
      "Real-time prediction market prices, +EV calculators, bankroll tools, and live tournament data for sharp sports bettors.",
    url: SITE_URL,
    siteName: "PlaceBets.ai",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaceBets.ai - Live Sports Prediction Markets & Betting Tools",
    description:
      "Real-time prediction market prices, +EV calculators, bankroll tools, and live tournament data for sharp sports bettors.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  keywords: [
    "sports prediction markets",
    "Kalshi sports",
    "sports betting tools",
    "EV calculator",
    "bankroll management",
    "live betting odds",
    "prediction market data",
    "sharp betting",
  ],
};

async function fetchKalshiMarkets() {
  try {
    const res = await fetch(
      "https://api.elections.kalshi.com/trade-api/v2/markets?limit=200&status=open",
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 120 }, // cache for 2 minutes on the server
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const allMarkets = data.markets || [];

    const SPORTS_KEYWORDS = [
      "nfl", "nba", "mlb", "nhl", "mls", "soccer", "football", "basketball",
      "baseball", "hockey", "tennis", "golf", "ufc", "mma", "boxing",
      "super bowl", "world series", "stanley cup", "march madness",
      "championship", "playoff", "finals", "mvp", "touchdown", "home run",
      "grand slam", "olympic", "f1", "formula", "nascar", "pga",
      "college football", "college basketball", "ncaa", "premier league",
      "champions league", "world cup",
    ];

    const sportsMarkets = allMarkets.filter((m) => {
      const text = `${m.title || ""} ${m.subtitle || ""} ${m.category || ""} ${m.event_ticker || ""}`.toLowerCase();
      return SPORTS_KEYWORDS.some((kw) => text.includes(kw));
    });

    return sportsMarkets.slice(0, 20).map((m) => ({
      ticker: m.ticker,
      title: m.title || m.subtitle || "Untitled Market",
      category: m.category || "Sports",
      yesPrice: m.yes_ask != null ? m.yes_ask / 100 : (m.last_price != null ? m.last_price / 100 : null),
      noPrice: m.no_ask != null ? m.no_ask / 100 : (m.last_price != null ? (100 - m.last_price) / 100 : null),
      volume: m.volume || m.open_interest || 0,
    }));
  } catch (err) {
    console.error("Server-side Kalshi fetch failed:", err);
    return [];
  }
}

export default async function HomePage() {
  const initialMarkets = await fetchKalshiMarkets();

  return <HomePageClient initialMarkets={initialMarkets} />;
}
