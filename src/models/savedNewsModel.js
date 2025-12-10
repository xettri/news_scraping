var mongoose = require('mongoose');
var savedNewsModel = mongoose.Schema({
  savedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  savedOn: {
    type: Date,
    default: Date.now,
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
    type: Number,
    default: -1,
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
});
module.exports = mongoose.model('saved_news_data', savedNewsModel);
