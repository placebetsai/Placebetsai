export default async function handler(req, res) {
  const apiKey = process.env.ODDS_API_KEY;
  const region = 'us';
  const market = 'h2h';
  const sport = 'upcoming';

  const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${region}&markets=${market}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const events = data.slice(0, 10).map(game => {
      const bookmaker = game.bookmakers[0];
      const outcomes = bookmaker?.markets[0]?.outcomes || [];

      return {
        match: `${game.home_team} vs ${game.away_team}`,
        date: new Date(game.commence_time).toLocaleDateString(),
        time: new Date(game.commence_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        team1: game.home_team,
        team2: game.away_team,
        odds1: formatOdds(outcomes.find(o => o.name === game.home_team)?.price),
        odds2: formatOdds(outcomes.find(o => o.name === game.away_team)?.price),
        trash: ""
      };
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch odds', details: err.message });
  }

  function formatOdds(decimal) {
    if (!decimal) return '?';
    return decimal >= 2
      ? `+${Math.round((decimal - 1) * 100)}`
      : `-${Math.round(100 / (decimal - 1))}`;
  }
}
