const mongoUrl =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/news_scraper';

module.exports = {
  mongoUrl: mongoUrl,
};
