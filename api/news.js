// api/news.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://sports.essentiallysports.com/category/wwe/feed/');
    const xml = await response.text();

    const items = Array.from(xml.matchAll(/<item>(.*?)<\/item>/gs)).slice(0, 10);
    const news = items.map(item => {
      const title = item[1].match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || "No title";
      const link = item[1].match(/<link>(.*?)<\/link>/)?.[1] || "#";
      return { title, link };
    });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
}
