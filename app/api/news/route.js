import { NextResponse } from "next/server";

export const revalidate = 0; // no cache – always fresh

// We use multiple feeds and normalize them
const FEEDS = [
  {
    url: "https://www.espn.com/espn/rss/news",
    base: "https://www.espn.com",
    source: "ESPN",
  },
  {
    url: "https://www.sportsnet.ca/feed/",
    base: "https://www.sportsnet.ca",
    source: "Sportsnet",
  },
  {
    url: "https://www.legalsportsreport.com/feed/",
    base: "https://www.legalsportsreport.com",
    source: "Legal Sports Report",
  },
];

function decodeEntities(str) {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Parse a single RSS XML string into [{title, link, source}]
function parseRss(xml, source, baseUrl) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const titleMatch = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/i);
    let rawTitle = titleMatch ? (titleMatch[1] || titleMatch[2]) : "";
    let title = decodeEntities(rawTitle.trim());

    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i);
    let rawLink = linkMatch ? linkMatch[1].trim() : "";
    let link = decodeEntities(rawLink);

    // If link is relative like "/nba/story/...", prefix with feed base
    if (link.startsWith("/") && baseUrl) {
      link = baseUrl.replace(/\/+$/, "") + link;
    }

    // Filter junk
    if (!title || !link) continue;

    items.push({
      title,
      link,
      source,
    });
  }

  return items;
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      // Force fresh on each request
      cache: "no-store",
      headers: {
        "User-Agent": "PlaceBets.ai News Fetcher",
      },
    });

    if (!res.ok) throw new Error(`Bad status: ${res.status}`);
    const xml = await res.text();
    return parseRss(xml, feed.source, feed.base);
  } catch (err) {
    console.error("News feed error:", feed.url, err.message);
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(FEEDS.map((f) => fetchFeed(f)));
  let allItems = results.flat();

  // Remove duplicates by title
  const seen = new Set();
  allItems = allItems.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Limit to top 30
  allItems = allItems.slice(0, 30);

  return NextResponse.json(allItems);
}
