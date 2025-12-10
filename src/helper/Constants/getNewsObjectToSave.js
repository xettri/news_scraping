var getSourceOfNews = function (title) {
  if (!title) {
    return 'unknown';
  }
  title = title.toLowerCase();
  if (title.indexOf('times of india') >= 0) {
    return 'Times of India';
  } else if (title.indexOf('ndtv') >= 0) {
    return 'NDTV';
  }
  return 'unknown';
};

var createNewsObject = (item, category, subcategory, source) => {
  var time = new Date();
  var newsOb = {};
  try {
    var imgUrl =
      item.content.match(/<img[^>]*?src="([^<]*?)"[^>]*?>/)[1] || null;
  } catch (err) {
    var imgUrl = null;
  }

  newsOb.source = getSourceOfNews(source);
  newsOb.title = item.title || null;
  item.content = item.content.replace(
    /<a[^>]*?>[^>]*?<img[^>]*?>[^>]*?<\/a>/,
    '',
  );
  newsOb.content = item.content || null;

  newsOb.contentSnippet = item.contentSnippet || null;
  newsOb.guid = item.guid || null;
  newsOb.link = item.link || null;

  newsOb.pubDate = item.pubDate || null;
  newsOb.scrapedat = item.scrapedat || null;
  newsOb.isoDate = item.isoDate || null;

  newsOb.category = category || null;
  newsOb.subcategory = subcategory || null;

  newsOb.serverdate = item.serverdate;
  if (item.fullimage) {
    newsOb.image = item.fullimage;
  } else if (item.StoryImage) {
    newsOb.image = item.StoryImage;
  } else {
    newsOb.image = imgUrl;
  }
  return newsOb;
};

module.exports = {
  createNewsObject: createNewsObject,
};
