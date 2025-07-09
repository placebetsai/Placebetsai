export default async function handler(req, res) {
  try {
    const rss = await fetch("https://www.espn.com/espn/rss/news");
    const xml = await rss.text();
    const titles = [...xml.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g)];
    const headlines = titles.map(t => t[1]).slice(1, 10); // skip feed title
    res.status(200).json({ headlines });
  } catch (err) {
    res.status(500).json({ error: "News load failed." });
  }
}
