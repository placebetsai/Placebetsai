import Parser from 'rss-parser';
const parser = new Parser();

export default async function handler(req, res) {
  const urls = [
    'https://www.espn.com/espn/rss/news',
    'https://www.f4wonline.com/rss-feed',
    'https://www.mmafighting.com/rss/current'
  ];

  try {
    const allItems = [];

    for (const url of urls) {
      const feed = await parser.parseURL(url);
      allItems.push(...feed.items.slice(0, 3));
    }

    const formatted = allItems.map(item => ({
      title: item.title,
      link: item.link
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error('RSS ERROR:', err);
    res.status(500).json({ error: 'Failed to load news' });
  }
}
