export default async function handler(req, res) {
  try {
    const response = await fetch("https://rss.app/feeds/4iL7zWgS1x6F1yAJ.json");
    const data = await response.json();

    const headlines = data.items.slice(0, 10).map((item) => item.title);

    res.status(200).json({ headlines });
  } catch (error) {
    console.error("Failed to fetch headlines:", error);
    res.status(500).json({ error: "Failed to load news" });
  }
}
