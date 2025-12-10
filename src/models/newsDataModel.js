var mongoose = require('mongoose');
var newsModel = mongoose.Schema({
  source: {
    type: String,
    trim: true,
    default: 'unknown',
  },
  title: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
    default: null,
  },
  pubDate: {
    type: String,
    trim: true,
    default: null,
  },
  content: {
    type: String,
    trim: true,
    default: null,
  },
  contentSnippet: {
    type: String,
    trim: true,
    default: null,
  },

  guid: {
    type: String,
    trim: true,
    default: null,
  },

  isoDate: {
    type: String,
    trim: true,
    default: null,
  },
  serverdate: {
    type: String,
    default: 0,
  },
  subcategory: {
    type: String,
    trim: true,
    default: null,
  },
  scrapedat: {
    type: String,
    trim: true,
    default: null,
  },
  image: {
    type: String,
    trim: true,
    default: null,
  },
  video: {
    type: String,
    trim: true,
    default: null,
  },
});
module.exports = mongoose.model('news_data', newsModel);
