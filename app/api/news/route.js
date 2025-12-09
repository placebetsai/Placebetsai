import { NextResponse } from "next/server";

export const revalidate = 0; // no static cache

// very simple RSS item parser
function parseRSSItems(xml, sourceLabel) {
  const items = [];
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const titleRegex = /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/i;
  const linkRegex = /<link>([\s\S]*?)<\/link>/i;

  const matches = xml.match(itemRegex) || [];
  for (const raw of matches.slice(0, 10)) {
    const tMatch = raw.match(titleRegex);
    const lMatch = raw.match(linkRegex);
    const title = (tMatch && (tMatch[1] || tMatch[2] || "")).trim();
    const link = (lMatch && lMatch[1] ? lMatch[1].trim() : "").replace(/\s+/g, "");
    if (!title || !link) continue;
    items.push({
      title,
      link,
      source: sourceLabel,
    });
  }
  return items;
}

export async function GET() {
  const feeds = [
    {
      url: "https://www.espn.com/espn/rss/news",
      label: "ESPN",
    },
    {
      url: "https://www.legalsportsreport.com/feed/",
      label: "LegalSportsReport",
    },
  ];

  let allItems = [];

  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, { cache: "no-store" });
      if (!res.ok) continue;
      const xml = await res.text();
      const parsed = parseRSSItems(xml, feed.label);
      allItems = allItems.concat(parsed);
    } catch (e) {
      console.error("News feed error:", feed.url, e);
    }
  }

  // simple de-dupe by title
  const seen = new Set();
  const unique = [];
  for (const item of allItems) {
    const key = item.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }

  return NextResponse.json(unique.slice(0, 25));
}
