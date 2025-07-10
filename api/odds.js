export default async function handler(req, res) {
  const apiKey = process.env.ODDS_API_KEY;
  const url = `https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=${apiKey}&regions=us&markets=h2h`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Bad response from Odds API");

    const data = await response.json();
    const parsed = data.slice(0, 10).map(event => ({
      sport_title: event.sport_title,
      commence_time: new Date(event.commence_time).toLocaleString(),
      teams: event.bookmakers[0]?.markets[0]?.outcomes.map(o => o.name) || [],
      odds: event.bookmakers[0]?.markets[0]?.outcomes.map(o => o.price) || []
    }));

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Odds error:", err.message);
    res.status(500).json({ error: "Failed to fetch odds." });
  }
}
