export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.espn.com/espn/rss/news');
    const data = await response.json();

    const headlines = data.items.slice(0, 10).map(item => ({
      title: item.title,
      link: item.link
    }));

    res.status(200).json(headlines);
  } catch (error) {
    console.error("News error:", error.message);
    res.status(500).json({ error: 'Failed to load news' });
  }
}
