import { NextResponse } from "next/server";

export const revalidate = 0; // no static cache

// Basic game-type images (external, no /public required)
const GAME_IMAGES = {
  poker:
    "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80",
  slots:
    "https://images.unsplash.com/photo-1518131678677-bc1a4dca4ccb?auto=format&fit=crop&w=1200&q=80",
  blackjack:
    "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=80",
  baccarat:
    "https://images.unsplash.com/photo-1518131678677-bc1a4dca4ccb?auto=format&fit=crop&w=1200&q=80",
};

// Updated fallback tournaments (real-ish 2026 events, multi-game)
const FALLBACK_TOURNAMENTS = [
  {
    id: 1,
    name: "WSOP Circuit - Planet Hollywood",
    date: "2026-01-01",
    location: "Las Vegas, NV",
    casino: "Planet Hollywood",
    buyin: "$400+",
    guarantee: "Multi-ring events",
    gameType: "poker",
    link: "https://www.wsop.com/schedule",
    description:
      "Kickoff to the 2026 WSOP Circuit with ring events and a main event in Vegas.",
  },
  {
    id: 2,
    name: "WSOP Circuit - Choctaw Durant",
    date: "2026-01-08",
    location: "Durant, OK",
    casino: "Choctaw Casino",
    buyin: "$400+",
    guarantee: "$1,000,000+ GTD Main",
    gameType: "poker",
    link: "https://www.wsop.com/",
    description: "Major stop with massive guarantees and deep-stack action.",
  },
  {
    id: 3,
    name: "MGM Resorts Slot Series Finale",
    date: "2026-01-16",
    location: "Las Vegas, NV",
    casino: "MGM Resorts",
    buyin: "Qualifier-based",
    guarantee: "$200,000 CASH",
    gameType: "slots",
    link: "https://www.mgmresorts.com/en/casino/slots/mgm-resorts-slot-series.html",
    description: "High-stakes slot finale with big cash prizes for qualifiers.",
  },
  {
    id: 4,
    name: "$1.5 Million Slot Tournament",
    date: "2026-01-22",
    location: "Las Vegas, NV",
    casino: "Resorts World Las Vegas",
    buyin: "500,000+ Points",
    guarantee: "$1,500,000 in Prizes",
    gameType: "slots",
    link: "https://www.rwlasvegas.com/gaming/casino-events/1-5million-slot-tournament/",
    description: "Elite slot event for high earners with massive prize pool.",
  },
  {
    id: 5,
    name: "$202,026 Blackjack Tournament",
    date: "2026-01-03",
    location: "Highland, CA",
    casino: "Yaamava' Resort & Casino",
    buyin: "$1,000+",
    guarantee: "$202,026 in Cash/Chips",
    gameType: "blackjack",
    link: "https://www.yaamava.com/promotion/202026-blackjack-tournament",
    description: "First major blackjack tourney of 2026 with huge payouts.",
  },
  {
    id: 6,
    name: "Paragon 2-Day $25,000 Blackjack Tournament",
    date: "2026-03-06",
    location: "Marksville, LA",
    casino: "Paragon Casino Resort",
    buyin: "$200+",
    guarantee: "$25,000 Prize Pool",
    gameType: "blackjack",
    link: "https://bjtusa.com/event/paragon-2-day-25000-blackjack-tournament/",
    description: "Two-day blackjack battle with splits and big prizes.",
  },
  {
    id: 7,
    name: "Turbo Baccarat Tournament",
    date: "2026-01-01",
    location: "Cordova, CA",
    casino: "Parkwest Casino Cordova",
    buyin: "$100+",
    guarantee: "Monthly Prizes",
    gameType: "baccarat",
    link: "https://parkwestcasinocordova.com/en/all-promotions/",
    description: "Fast-paced baccarat series continuing into 2026.",
  },
  {
    id: 8,
    name: "WSOP Circuit - Harrah's Pompano Beach",
    date: "2026-01-29",
    location: "Pompano Beach, FL",
    casino: "Harrah's Pompano Beach",
    buyin: "$400+",
    guarantee: "Ring Events",
    gameType: "poker",
    link: "https://www.wsop.com/",
    description: "Florida stop with sunny vibes and competitive fields.",
  },
  {
    id: 9,
    name: "Rudies Weekend Lucky '26 Slot Tournament",
    date: "2026-02-01",
    location: "Las Vegas, NV",
    casino: "Various",
    buyin: "$100+",
    guarantee: "$5,000 Free Play",
    gameType: "slots",
    link: "https://www.bcslots.com/rudiesweekend.html",
    description: "Fan-favorite slot event with group play and prizes.",
  },
  {
    id: 10,
    name: "CES Mission Media & VSiN Blackjack Tournament",
    date: "2026-01-07",
    location: "Las Vegas, NV",
    casino: "Circa Resort & Casino",
    buyin: "$200+",
    guarantee: "Prizes TBA",
    gameType: "blackjack",
    link: "https://www.eventbrite.com/",
    description: "Tech-meets-gaming blackjack mixer during CES.",
  },
];

// naive scrape from CardPlayer poker tournaments
async function tryScrape() {
  try {
    const res = await fetch("https://www.cardplayer.com/poker-tournaments", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Bad status");
    const html = await res.text();

    const rows = html.split("<tr").slice(1);
    const scraped = [];
    let id = 100;

    for (const row of rows) {
      const nameMatch = row.match(
        /<a href="\/poker-tournaments\/[^"]*">([^<]+)<\/a>/i
      );
      if (!nameMatch) continue;

      const locMatch = row.match(/<td[^>]*>([^<]+)<\/td>/i);

      const dateMatch = row.match(
        /([A-Za-z]{3} \d{1,2}, '\d{2} - [A-Za-z]{3} \d{1,2}, '\d{2})/i
      );

      let normalizedDate = "TBA";
      if (dateMatch) {
        const txt = dateMatch[1].trim();
        // very rough normalization – this is just to have something
        normalizedDate = txt.replace(/'\d{2}/g, (m) => "20" + m.slice(1));
      }

      scraped.push({
        id: id++,
        name: nameMatch[1].trim(),
        date: normalizedDate,
        location: locMatch ? locMatch[1].trim() : "TBA",
        casino: "TBA",
        buyin: "TBA",
        guarantee: "Prize Pool TBA",
        gameType: "poker",
        link: "https://www.cardplayer.com/poker-tournaments",
        description:
          "Auto-detected live poker tournament. Always confirm dates & details on the official site.",
      });
    }

    return scraped;
  } catch (err) {
    console.error("Tournament scrape failed:", err.message);
    return [];
  }
}

export async function GET() {
  const scraped = await tryScrape();
  const combined =
    scraped.length > 0 ? [...scraped, ...FALLBACK_TOURNAMENTS] : FALLBACK_TOURNAMENTS;

  const withImages = combined.map((t) => ({
    ...t,
    image: t.image || GAME_IMAGES[t.gameType] || GAME_IMAGES.poker,
  }));

  // sort by date ascending where possible
  withImages.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    if (isNaN(da) || isNaN(db)) return 0;
    return da - db;
  });

  return NextResponse.json(withImages);
  }
