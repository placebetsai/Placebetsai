import Parser from 'rss-parser';
const parser = new Parser();

export default async function handler(req, res) {
  const feeds = [
    'https://www.espn.com/espn/rss/news',
    'https://news.yahoo.com/rss/sports',
    'https://www.wwe.com/rss/feed.xml'
  ];

  try {
    const headlines = [];

    for (const feed of feeds) {
      const parsed = await parser.parseURL(feed);
      parsed.items.slice(0, 5).forEach(item => {
        headlines.push({ title: item.title });
      });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(headlines.slice(0, 15));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch headlines', details: err.message });
  }
}
