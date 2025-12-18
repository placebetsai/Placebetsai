import Parser from 'rss-parser';

export default async function handler(req, res) {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://www.espn.com/espn/rss/news'); // Real live feed

    // Simplified arb detection – expand with more feeds if needed
    const games = feed.items.slice(0, 10).map(item => ({
      title: item.title || 'Game',
      oddsA: 1.9, // Mocked – in real use parse odds from feed or add Odds API later
      oddsB: 2.1,
    }));

    const arbs = games
      .filter(game => (1 / game.oddsA) + (1 / game.oddsB) < 1.0)
      .map(game => ({
        game: game.title,
        profit: ((1 - ((1/game.oddsA) + (1/game.oddsB))) * 100).toFixed(2),
      }));

    res.status(200).json({ arbs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scan' });
  }
}
