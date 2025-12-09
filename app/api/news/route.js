import { NextResponse } from "next/server";

export const revalidate = 0; // always fresh on the server

// Fallback headlines in case ESPN endpoint dies
const FALLBACK_NEWS = [
  {
    id: 1,
    title: "Line moves and sharp action across NFL, NBA, and college hoops.",
    url: "https://www.espn.com",
    source: "ESPN",
  },
  {
    id: 2,
    title: "How pros manage bankroll on long losing streaks.",
    url: "https://www.actionnetwork.com",
    source: "Action Network",
  },
  {
    id: 3,
    title: "Live odds shifts after star injuries shake up futures markets.",
    url: "https://www.espn.com",
    source: "ESPN",
  },
];

function normalizeUrl(raw) {
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  // ESPN-style relative links -> make them absolute
  if (raw.startsWith("/")) {
    return `https://www.espn.com${raw}`;
  }
  return `https://${raw}`;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/news",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Bad status from ESPN");

    const data = await res.json();
    const articles = Array.isArray(data.articles) ? data.articles : [];

    const items = articles.slice(0, 20).map((article, idx) => {
      const url =
        normalizeUrl(
          article?.links?.web?.href ||
            article?.links?.api?.news?.href ||
            ""
        ) || "https://www.espn.com";

      return {
        id: article.id || idx,
        title: article.headline || article.description || "ESPN headline",
        url,
        source: "ESPN",
      };
    });

    const filtered = items.filter((i) => i.title && i.url);

    if (!filtered.length) {
      return NextResponse.json(FALLBACK_NEWS);
    }

    return NextResponse.json(filtered);
  } catch (err) {
    console.error("News API error:", err);
    return NextResponse.json(FALLBACK_NEWS);
  }
}
