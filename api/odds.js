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
      `https://api.the-odds-api.com/v4/sports/upcoming?apiKey=${process.env.ODDS_API_KEY}®ions=us&daysFrom=6`
    );
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      odds = data.filter(event => new Date(event.commence_time) <= sixDaysFromNow && event.bookmakers.length > 0).map(event => ({
        home_team: event.home_team,
        away_team: event.away_team,
        bookmakers: event.bookmakers
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
          home_team: teams.split(' vs ')[0],
          away_team: teams.split(' vs ')[1],
          bookmakers: [{ title: 'Covers', markets: [{ key: 'h2h', outcomes: [{ name: teams.split(' vs ')[0], price: oddsText.split(' | ')[0] }, { name: teams.split(' vs ')[1], price: oddsText.split(' | ')[1] } ] }] }]
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  cache.put(cacheKey, odds, 5 * 60 * 1000); // Cache for 5 minutes
  context.res.json(odds);
};
