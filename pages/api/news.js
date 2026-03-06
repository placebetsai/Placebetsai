// pages/api/news.js
// Pulls jobs, employment, commerce, breaking, and education news from multiple RSS feeds.

const FEEDS = [
  // ── GOVERNMENT JOBS & EMPLOYMENT ─────────────────────────────────────────
  { url: "https://www.bls.gov/feed/empsit.rss",          source: "BLS Jobs Report",        tag: "jobs" },
  { url: "https://www.bls.gov/feed/jolts.rss",           source: "BLS JOLTS",              tag: "jobs" },
  { url: "https://www.dol.gov/rss/releases.xml",         source: "Dept. of Labor",         tag: "jobs" },

  // ── BREAKING / TOP NEWS ───────────────────────────────────────────────────
  { url: "https://feeds.nbcnews.com/nbcnews/public/news",         source: "NBC News",       tag: "breaking" },
  { url: "https://rss.cnn.com/rss/cnn_latest.rss",               source: "CNN",            tag: "breaking" },
  { url: "https://feeds.foxnews.com/foxnews/latest",              source: "Fox News",       tag: "breaking" },
  { url: "https://abcnews.go.com/abcnews/topstories",            source: "ABC News",       tag: "breaking" },

  // ── BUSINESS & COMMERCE ───────────────────────────────────────────────────
  { url: "https://www.cnbc.com/id/10001147/device/rss/rss.html", source: "CNBC",           tag: "business" },
  { url: "https://www.marketwatch.com/rss/topstories",           source: "MarketWatch",    tag: "business" },
  { url: "https://rss.cnn.com/rss/money_latest.rss",            source: "CNN Money",      tag: "business" },
  { url: "https://feeds.nbcnews.com/nbcnews/public/business",    source: "NBC Business",   tag: "business" },
  { url: "https://feeds.foxbusiness.com/foxbusiness/latest",     source: "Fox Business",   tag: "business" },
  { url: "https://www.cnbc.com/id/15839069/device/rss/rss.html", source: "CNBC Economy",  tag: "business" },

  // ── EMPLOYMENT / WORKFORCE ────────────────────────────────────────────────
  { url: "https://feeds.npr.org/1014/rss.xml",                  source: "NPR Economy",    tag: "jobs" },
  { url: "https://www.cnbc.com/id/10000108/device/rss/rss.html",source: "CNBC Jobs",      tag: "jobs" },

  // ── EDUCATION & STUDENT DEBT ──────────────────────────────────────────────
  { url: "https://www.insidehighered.com/rss.xml",              source: "Inside Higher Ed", tag: "education" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Education.xml", source: "NYT Education", tag: "education" },
  { url: "https://www.chronicle.com/syndication/rss/collection?id=14", source: "Chronicle Higher Ed", tag: "education" },
];

const TOTAL_ITEMS = 40;

let CACHE = { ts: 0, items: [] };
const CACHE_TTL_MS = 10 * 60 * 1000;

function stripCdata(s = "") {
  return s.replace("<![CDATA[", "").replace("]]>", "").trim();
}

function pickFirst(matchArr) {
  return matchArr && matchArr[1] ? matchArr[1].trim() : "";
}

function decodeEntities(s = "") {
  let t = String(s);
  t = t
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
  t = t.replace(/&#(\d+);/g, (_, code) => { try { return String.fromCodePoint(parseInt(code, 10)); } catch { return _; } });
  t = t.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => { try { return String.fromCodePoint(parseInt(hex, 16)); } catch { return _; } });
  return t;
}

function parseRss(xmlText, source, tag) {
  const items = [];
  const rawItems = xmlText.split(/<\/item>/i);

  for (const chunk of rawItems) {
    if (!/<item>/i.test(chunk)) continue;

    const titleRaw = pickFirst(chunk.match(/<title>([\s\S]*?)<\/title>/i));
    const linkRaw  = pickFirst(chunk.match(/<link>([\s\S]*?)<\/link>/i));
    const guidRaw  = pickFirst(chunk.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i));

    const title = decodeEntities(stripCdata(titleRaw));
    let link    = decodeEntities(stripCdata(linkRaw));
    if (!link) link = decodeEntities(stripCdata(guidRaw));

    const pubDate =
      stripCdata(pickFirst(chunk.match(/<pubDate>([\s\S]*?)<\/pubDate>/i))) ||
      stripCdata(pickFirst(chunk.match(/<dc:date>([\s\S]*?)<\/dc:date>/i))) ||
      stripCdata(pickFirst(chunk.match(/<updated>([\s\S]*?)<\/updated>/i)));

    if (!title || !link || title.length < 10) continue;

    items.push({ title, link, pubDate, source: decodeEntities(source), tag });
    if (items.length >= 30) break;
  }

  return items;
}

function parseDate(d) {
  const t = Date.parse(d || "");
  return Number.isFinite(t) ? t : 0;
}

function dedupe(items) {
  const seen = new Set();
  return items.filter((i) => {
    const k = `${i.title}||${i.link}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export default async function handler(req, res) {
  try {
    const now     = Date.now();
    const noCache = req.query?.nocache === "1";

    if (!noCache && CACHE.items.length && now - CACHE.ts < CACHE_TTL_MS) {
      res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
      return res.status(200).json({ items: CACHE.items });
    }

    const results = await Promise.allSettled(
      FEEDS.map(async ({ url, source, tag }) => {
        try {
          const r = await fetch(url, {
            signal: AbortSignal.timeout(5000),
            headers: {
              "user-agent": "Mozilla/5.0 (compatible; NewsBot/1.0)",
              accept: "application/rss+xml, application/xml, text/xml, */*;q=0.8",
            },
          });
          if (!r.ok) return [];
          const xml = await r.text();
          return parseRss(xml, source, tag);
        } catch {
          return [];
        }
      })
    );

    let all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
    all = dedupe(all).sort((a, b) => parseDate(b.pubDate) - parseDate(a.pubDate));

    const finalItems = all.slice(0, TOTAL_ITEMS);
    CACHE = { ts: now, items: finalItems.length ? finalItems : CACHE.items };

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    return res.status(200).json({
      items: finalItems.length ? finalItems : [
        { title: "Loading jobs, employment & breaking news…", link: "/news", source: "System" },
      ],
    });
  } catch {
    return res.status(200).json({
      items: [{ title: "Loading jobs, employment & breaking news…", link: "/news", source: "System" }],
    });
  }
}
