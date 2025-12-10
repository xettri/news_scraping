var mongoose = require('mongoose');
var rssModel = mongoose.Schema({
  rssurl: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    default: 'News',
  },
  subcategory: {
    type: String,
    trim: true,
    default: 'News Category',
  },
});
module.exports = mongoose.model('rss_link', rssModel);
