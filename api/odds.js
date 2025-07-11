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
      throw new Error('API limit hit, falling back to scraping');
    }
  } catch (error) {
    console.error(error);
  }

  if (odds.length === 0) {
    try {
      const scrapeResponse = await fetch('https://www.covers.com/sport/football/nfl/matchups');
      const html = await scrapeResponse.text();
      const $ = require('cheerio').load(html);
      $('[data-covers-event-coupon]').each((i, el) => {
        const teams = $(el).find('.team-name').text().trim();
        const oddsText = $(el).find('.odds-value').text().trim();
        if (teams && oddsText) odds.push({
          event: teams,
          date: new Date().toISOString(),
          odds: [{ source: 'Covers', value: oddsText }],
          bookiePrediction: getBookiePrediction(teams.split(' vs ')[0], teams.split(' vs ')[1]),
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Add upcoming wrestling events with speculative odds and guesses
  odds.push({
    event: "Jon Moxley vs Hangman Adam Page (AEW All In Texas, Texas Death Match)",
    date: "2025-07-12",
    odds: [{ source: "Speculative", value: "-130" }],
    bookiePrediction: "Moxley goes over—Hangman's getting buried in Texas, you mark! (Based on Moxley's heel push and death match specialty)"
  });
  odds.push({
    event: "Mercedes Mone vs Britt Baker (AEW Women's World Championship, AEW All In Texas)",
    date: "2025-07-12",
    odds: [{ source: "Speculative", value: "-190" }],
    bookiePrediction: "Mone retains—Baker's good, but Mone's the boss, bitch! (Storyline favors Mone's reign continuation)"
  });
  odds.push({
    event: "Kenny Omega vs Kazuchika Okada (AEW International & Continental Championship, AEW All In Texas)",
    date: "2025-07-12",
    odds: [{ source: "Speculative", value: "-160" }],
    bookiePrediction: "Omega goes over—Okada's dream run ends, you weeb! (AEW pushing Omega for home crowd pop)"
  });

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
