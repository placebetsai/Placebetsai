export default async function handler(req, res) {
  const apiKey = process.env.ODDS_API_KEY;

  const url = `https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=${apiKey}&regions=us&markets=h2h,spreads&oddsFormat=american`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch odds' });
  }
}
