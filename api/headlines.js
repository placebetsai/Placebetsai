const fetch = require('node-fetch');
const cache = require('memory-cache');

module.exports = async function (context, req) {
  const cacheKey = 'headlines_data';
  const cached = cache.get(cacheKey);
  if (cached) return context.res.json(cached);

  let headlines = [];
  try {
    const res = await fetch("https://corsproxy.io/?" + encodeURIComponent("https://sports.yahoo.com/rss/"));
    if (!res.ok) throw new Error(`Proxy error: ${res.status} - ${await res.text()}`);
    const text = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");
    for (let i = 0; i < Math.min(5, items.length); i++) {
      const item = items[i];
      headlines.push({
        title: item.getElementsByTagName("title")[0].textContent,
        link: item.getElementsByTagName("link")[0].textContent,
        source: "Yahoo Sports"
      });
    }
    if (headlines.length === 0) throw new Error("No items from RSS");
  } catch (error) {
    console.error("RSS fetch failed, using fallback data:", error);
    headlines = [
      { title: "Yankees Beat Mariners", link: "https://sports.yahoo.com/news/", source: "Yahoo Sports" },
      { title: "Wrestling PPV Preview", link: "https://www.espn.com/wwe/", source: "ESPN" },
    ];
  }

  cache.put(cacheKey, headlines, 15 * 60 * 1000); // Cache for 15 minutes
  context.res.json(headlines);
};
