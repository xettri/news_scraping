function getMongoUrl() {
  const mongoUrl =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/news_scraper';
  const parts = mongoUrl.split('?');
  return [`${parts[0].replace(/\/$/, '')}/news_scraper`, `${parts[1] || ''}`]
    .filter(Boolean)
    .join('?');
}

module.exports = {
  mongoUrl: getMongoUrl(),
};
