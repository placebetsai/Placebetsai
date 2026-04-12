"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SportsbookCTA from "../../components/SportsbookCTA";

/* Major 2026 tournaments — hardcoded so page always has real content */
const MAJOR_EVENTS = [
  {
    id: "wsop-2026",
    name: "2026 World Series of Poker (WSOP)",
    date: "2026-05-27",
    endDate: "2026-07-16",
    dateDisplay: "May 27 - Jul 16, 2026",
    location: "Las Vegas, NV",
    venue: "Paris / Horseshoe Las Vegas",
    type: "poker",
    buyin: "$500 - $250,000",
    prize: "$15M+ GTD Main Event",
    description: "The biggest poker festival on earth. 90+ bracelet events culminating in the $10K Main Event.",
    link: "https://www.wsop.com/",
    featured: true,
  },
  {
    id: "fifa-wc-2026",
    name: "FIFA World Cup 2026",
    date: "2026-06-11",
    endDate: "2026-07-19",
    dateDisplay: "Jun 11 - Jul 19, 2026",
    location: "USA, Canada, Mexico",
    venue: "16 Host Cities",
    type: "sports",
    buyin: "N/A",
    prize: "48 Nations Competing",
    description: "First 48-team World Cup. Hosted across North America. The most-bet sporting event on the planet.",
    link: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26",
    featured: true,
  },
  {
    id: "nba-finals-2026",
    name: "2026 NBA Finals",
    date: "2026-06-04",
    endDate: "2026-06-22",
    dateDisplay: "Jun 4 - Jun 22, 2026",
    location: "TBD",
    venue: "Best-of-7 Series",
    type: "sports",
    buyin: "N/A",
    prize: "Championship",
    description: "The NBA championship series. Massive prediction market volume on series winner, MVP, and game props.",
    link: "https://www.nba.com/playoffs",
    featured: true,
  },
  {
    id: "nhl-playoffs-2026",
    name: "2026 Stanley Cup Finals",
    date: "2026-06-02",
    endDate: "2026-06-20",
    dateDisplay: "Jun 2 - Jun 20, 2026",
    location: "TBD",
    venue: "Best-of-7 Series",
    type: "sports",
    buyin: "N/A",
    prize: "Stanley Cup",
    description: "NHL championship. Sharp bettors watch for series price inefficiencies after Game 1.",
    link: "https://www.nhl.com/stanley-cup-playoffs",
    featured: false,
  },
  {
    id: "mlb-ws-2026",
    name: "2026 World Series",
    date: "2026-10-20",
    endDate: "2026-11-01",
    dateDisplay: "Oct 20 - Nov 1, 2026",
    location: "TBD",
    venue: "Best-of-7 Series",
    type: "sports",
    buyin: "N/A",
    prize: "Championship",
    description: "MLB's championship series. Prediction markets get active during October baseball.",
    link: "https://www.mlb.com/postseason",
    featured: false,
  },
  {
    id: "valorant-champs-2026",
    name: "Valorant Champions 2026",
    date: "2026-08-02",
    endDate: "2026-08-24",
    dateDisplay: "Aug 2 - Aug 24, 2026",
    location: "TBD",
    venue: "LAN Finals",
    type: "esports",
    buyin: "N/A",
    prize: "$2M+ Prize Pool",
    description: "The pinnacle of competitive Valorant. Esports betting volumes continue to grow year over year.",
    link: "https://valorantesports.com",
    featured: false,
  },
  {
    id: "lol-worlds-2026",
    name: "League of Legends Worlds 2026",
    date: "2026-09-25",
    endDate: "2026-11-02",
    dateDisplay: "Sep 25 - Nov 2, 2026",
    location: "TBD",
    venue: "Multi-stage LAN",
    type: "esports",
    buyin: "N/A",
    prize: "$2.5M+ Prize Pool",
    description: "The biggest esports event globally by viewership. Korean and Chinese teams dominate the odds.",
    link: "https://lolesports.com",
    featured: false,
  },
  {
    id: "ti-2026",
    name: "The International 2026 (Dota 2)",
    date: "2026-10-15",
    endDate: "2026-10-27",
    dateDisplay: "Oct 15 - Oct 27, 2026",
    location: "TBD",
    venue: "LAN Finals",
    type: "esports",
    buyin: "N/A",
    prize: "$15M+ Crowd-funded",
    description: "Dota 2's premier tournament with the largest crowd-funded prize pool in esports history.",
    link: "https://www.dota2.com/esports",
    featured: false,
  },
  {
    id: "us-open-tennis-2026",
    name: "US Open 2026 (Tennis)",
    date: "2026-08-24",
    endDate: "2026-09-07",
    dateDisplay: "Aug 24 - Sep 7, 2026",
    location: "Flushing, NY",
    venue: "USTA Billie Jean King NTC",
    type: "sports",
    buyin: "N/A",
    prize: "$65M+ Total Purse",
    description: "Grand Slam tennis in New York. Match winner and set betting markets are highly liquid.",
    link: "https://www.usopen.org",
    featured: false,
  },
  {
    id: "pga-masters-2026",
    name: "The Masters 2026",
    date: "2026-04-09",
    endDate: "2026-04-12",
    dateDisplay: "Apr 9 - Apr 12, 2026",
    location: "Augusta, GA",
    venue: "Augusta National Golf Club",
    type: "sports",
    buyin: "N/A",
    prize: "$20M+ Purse",
    description: "Golf's most prestigious major. Outright winner and top-5 markets are extremely popular.",
    link: "https://www.masters.com",
    featured: false,
  },
  {
    id: "ufc-300-series",
    name: "UFC 310-315 (Major PPV Cards)",
    date: "2026-06-01",
    endDate: "2026-12-31",
    dateDisplay: "Throughout 2026",
    location: "Various",
    venue: "Multiple Venues",
    type: "sports",
    buyin: "N/A",
    prize: "Title Fights",
    description: "Major UFC pay-per-view events through 2026. MMA prediction markets growing fastest of any sport.",
    link: "https://www.ufc.com/events",
    featured: false,
  },
  {
    id: "wpt-2026",
    name: "WPT World Championship 2026",
    date: "2026-12-01",
    endDate: "2026-12-17",
    dateDisplay: "Dec 1 - Dec 17, 2026",
    location: "Las Vegas, NV",
    venue: "Wynn Las Vegas",
    type: "poker",
    buyin: "$10,400",
    prize: "$40M GTD",
    description: "The richest WPT event ever returns. Massive guaranteed prize pool attracts the best in poker.",
    link: "https://www.worldpokertour.com",
    featured: false,
  },
];

const TYPE_LABELS = {
  poker: { label: "Poker", class: "badge-poker" },
  sports: { label: "Sports", class: "badge-sports" },
  esports: { label: "Esports", class: "badge-esports" },
};

export default function TournamentsPage() {
  const [apiTournaments, setApiTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/tournaments");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setApiTournaments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load API tournaments:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const allEvents = useMemo(() => {
    /* Merge major events with any API data, dedupe by id */
    const merged = [...MAJOR_EVENTS];
    const ids = new Set(merged.map((e) => e.id));
    for (const t of apiTournaments) {
      if (!ids.has(t.id)) {
        merged.push({
          id: t.id,
          name: t.name,
          date: t.date,
          dateDisplay: t.date || "TBD",
          location: t.location || "TBD",
          venue: t.casino || "",
          type: t.gameType === "poker" ? "poker" : "sports",
          buyin: t.buyin || "N/A",
          prize: t.guarantee || "TBD",
          description: t.description || "",
          link: t.link || "#",
          featured: false,
        });
      }
    }
    return merged;
  }, [apiTournaments]);

  const filtered = useMemo(() => {
    let list = [...allEvents];

    if (typeFilter !== "all") {
      list = list.filter((e) => e.type === typeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          (e.location || "").toLowerCase().includes(q) ||
          (e.venue || "").toLowerCase().includes(q) ||
          (e.type || "").toLowerCase().includes(q)
      );
    }

    /* Sort: featured first, then by date */
    list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const da = new Date(a.date);
      const db = new Date(b.date);
      if (isNaN(da) || isNaN(db)) return 0;
      return da - db;
    });

    return list;
  }, [allEvents, search, typeFilter]);

  const featuredEvents = filtered.filter((e) => e.featured);
  const regularEvents = filtered.filter((e) => !e.featured);

  return (
    <div className="page-wrap">
      {/* Hero */}
      <section className="tournaments-hero">
        <div className="hero-badge">2026 CALENDAR</div>
        <h1>
          Global Tournament
          <br />
          <span className="highlight">& Event Tracker</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', fontSize: '1.05rem' }}>
          Poker, sports, and esports events worth watching and trading.
          Major tournaments drive the biggest prediction market volumes of the year.
        </p>
      </section>

      {/* Filters */}
      <section style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '28px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-main)',
            outline: 'none',
          }}
        />
        {["all", "poker", "sports", "esports"].map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`btn ${typeFilter === t ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '10px 20px', fontSize: '0.8rem', textTransform: 'capitalize' }}
          >
            {t === 'all' ? 'All Events' : t}
          </button>
        ))}
      </section>

      {loading && (
        <p style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>
          Checking for additional tournaments...
        </p>
      )}

      {/* Featured events — large cards */}
      {featuredEvents.length > 0 && (
        <section style={{ marginBottom: '36px' }}>
          <div className="section-header">
            <div className="section-title">
              <span className="dot" style={{ background: '#fbbf24', boxShadow: '0 0 8px rgba(251,191,36,0.3)' }}></span>
              Featured Events
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {featuredEvents.map((ev) => {
              const typeInfo = TYPE_LABELS[ev.type] || TYPE_LABELS.sports;
              return (
                <a
                  key={ev.id}
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tournament-full-card"
                  style={{ borderColor: 'rgba(251, 191, 36, 0.2)' }}
                >
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--border)',
                    background: 'rgba(251, 191, 36, 0.03)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className={`tournament-badge ${typeInfo.class}`}>{typeInfo.label}</span>
                      <span className="tournament-badge badge-live">FEATURED</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tournament-date">{ev.dateDisplay}</div>
                    <div className="tournament-name" style={{ fontSize: '1.15rem' }}>{ev.name}</div>
                    <div className="tournament-meta">
                      {ev.location} {ev.venue ? ` \u00b7 ${ev.venue}` : ''}
                    </div>
                    <div className="tournament-prize" style={{ fontSize: '1rem' }}>{ev.prize}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      {ev.description}
                    </p>
                    {ev.buyin !== "N/A" && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        Buy-in: {ev.buyin}
                      </div>
                    )}
                    <div className="market-cta" style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '4px' }}>
                      Official Schedule &rarr;
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* All events grid */}
      <section>
        <div className="section-header">
          <div className="section-title">
            <span className="dot"></span>
            {typeFilter === 'all' ? 'All Events' : `${typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)} Events`}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            {filtered.length} events
          </span>
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: 'var(--text-dim)', padding: '40px 0', textAlign: 'center' }}>
            No events match your search. Try a different filter.
          </p>
        ) : (
          <div className="tournaments-grid">
            {regularEvents.map((ev) => {
              const typeInfo = TYPE_LABELS[ev.type] || TYPE_LABELS.sports;
              return (
                <a
                  key={ev.id}
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tournament-full-card"
                >
                  <div className="card-body">
                    <div className="card-header">
                      <span className="tournament-date">{ev.dateDisplay}</span>
                      <span className={`tournament-badge ${typeInfo.class}`}>{typeInfo.label}</span>
                    </div>
                    <div className="tournament-name">{ev.name}</div>
                    <div className="tournament-meta">
                      {ev.location}{ev.venue ? ` \u00b7 ${ev.venue}` : ''}
                    </div>
                    <div className="tournament-prize">{ev.prize}</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {ev.description}
                    </p>
                    {ev.buyin !== "N/A" && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        Buy-in: {ev.buyin}
                      </div>
                    )}
                    <div className="market-cta" style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                      View Details &rarr;
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* Sportsbook Affiliate CTA */}
      <SportsbookCTA />

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <h2>Trade the Biggest Events on Kalshi</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
          Major tournaments drive massive prediction market volume.
          Get in early before the lines sharpen.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://kalshi.com/sign-up/?utm_source=placebetsai&referral=PENDING" target="_blank" rel="noopener noreferrer" data-affiliate="pending" className="btn btn-primary btn-lg">
            Open Kalshi Markets
          </a>
          <Link href="/" className="btn btn-ghost btn-lg">
            View Live Prices
          </Link>
        </div>
      </section>
    </div>
  );
}
