export default async function handler(req, res) {
  try {
    const response = await fetch('https://rss.app/feeds/RSS_ID'); // <-- Replace with real sports RSS feed
    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    res.status(500).send("Failed to load news");
  }
}
