export default async function handler(req, res) {
  try {
    const [espn, wrestling] = await Promise.all([
      fetch("https://www.espn.com/espn/rss/news"),
      fetch("https://www.wrestlinginc.com/rss/news.xml")
    ]);

    const [espnText, wrestlingText] = await Promise.all([
      espn.text(),
      wrestling.text()
    ]);

    const parse = text => {
      const items = [...text.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g)];
      return items.slice(1, 6).map(m => m[1]);
    };

    const sportsHeadlines = parse(espnText);
    const wrestlingHeadlines = parse(wrestlingText);

    res.status(200).json([...sportsHeadlines, ...wrestlingHeadlines]);
  } catch (err) {
    res.status(500).json(["Failed to load news"]);
  }
}
