const fetch = require('node-fetch');
const cache = require('memory-cache');

module.exports = async function (context, req) {
  const cacheKey = 'odds_data';
  const cached = cache.get(cacheKey);
  if (cached) return context.res.json(cached);

  let odds = [];
  const sixDaysFromNow = new Date();
  sixDaysFromNow.setDate(sixDaysFromNow.getDate() + 6);

  try {
    const apiResponse = await fetch(
      `https://api.the-odds-api.com/v4/sports/upcoming/odds?apiKey=${process.env.ODDS_API_KEY}&regions=us&markets=h2h&dateFormat=iso`
    );
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      odds = data.filter(event => new Date(event.commence_time) <= sixDaysFromNow && event.bookmakers.length > 0).map(event => ({
        event: event.home_team + ' vs ' + event.away_team,
        date: event.commence_time,
        odds: event.bookmakers[0].markets[0].outcomes.map(o => ({ source: event.bookmakers[0].title, value: o.price })),
        bookiePrediction: getBookiePrediction(event.home_team, event.away_team),
      }));
    } else {
      throw new Error(`API error: ${apiResponse.status} - ${await apiResponse.text()}`);
    }
  } catch (error) {
    console.error("API fetch failed, using fallback data:", error);
    odds = [
      { event: "Yankees vs Mariners", date: "2025-07-10", odds: [{ source: "FanDuel", value: "-109" }], bookiePrediction: "Mariners will crush, you clown!" },
      { event: "Dodgers vs Giants", date: "2025-07-11", odds: [{ source: "Bet365", value: "+120" }], bookiePrediction: "Dodgers edge it, loser!" },
    ];
  }

  cache.put(cacheKey, odds, 5 * 60 * 1000); // Cache for 5 minutes
  context.res.json(odds);
};

function getBookiePrediction(home, away) {
  const predictions = [
    `${home} will crush ${away}, you betting clown!`,
    `${away}’s got this—${home}’s odds are a joke!`,
    `Toss a coin, but ${home} might edge it, loser!`,
  ];
  return predictions[Math.floor(Math.random() * predictions.length)];
}
