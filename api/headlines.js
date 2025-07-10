const Parser = require('rss-parser');
const cache = require('memory-cache');

const parser = new Parser();
const feeds = [
  'https://www.espn.com/espn/rss/news',
  'https://bleacherreport.com/articles/feed',
  'https://www.wrestlinginc.com/feed/',
  'https://www.cagesideseats.com/rss',
  'http://feeds.bbci.co.uk/sport/rss.xml',
];

module.exports = async function (context, req) {
  const cacheKey = 'headlines_data';
  const cached = cache.get(cacheKey);
  if (cached) return context.res.json(cached);

  let headlines = [];
  try {
    for (const feedUrl of feeds) {
      const feed = await parser.parseURL(feedUrl);
      headlines.push(...feed.items.slice(0, 5).map(item => ({
        title: item.title,
        link: item.link,
        source: feed.title,
      })));
    }
    headlines.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  } catch (error) {
    console.error(error);
  }

  cache.put(cacheKey, headlines, 15 * 60 * 1000); // Cache for 15 minutes
  context.res.json(headlines);
};
