let Parser = require('rss-parser');
var services = require('../services');
var helper = require('../helper');
var axios = require('axios');

let parser = new Parser({
  customFields: {
    item: ['StoryImage', 'fullimage'],
  },
});

async function getUrlThatNotInDb(payload, html) {
  payload = payload
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
  var reg = new RegExp(
    '<a[^>]* href="([^"]*)" id[^>]*>' + payload + '</a>',
    'g',
  );
  ans = html.match(reg);
  var resultUrl;
  if (ans) {
    try {
      resultUrl = ans[0].match(/<a[^>]*?href="([^<]*?)"[^>]*?>/)[1] || null;
    } catch (err) {
      resultUrl = null;
    }
  }
  return resultUrl;
}

var hourAlphaCode = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
  9: 'i',
  10: 'j',
  11: 'k',
  12: 'l',
  13: 'm',
  14: 'n',
  15: 'o',
  16: 'p',
  17: 'q',
  18: 'r',
  19: 's',
  20: 't',
  21: 'u',
  22: 'v',
  23: 'w',
  24: 'x',
  0: 'y',
};

var readRssAndSave = async (payload, callback) => {
  var newsDataInDb = [];
  // result give rss from db
  let result = await services.rssService.asyncFindOne(
    { subcategory: payload },
    {},
    {},
  );
  if (result) {
    //to check todays news
    var timeF = new Date();
    var dateStringF =
      timeF.toLocaleString('en-US', { day: 'numeric' }) +
      timeF.toLocaleString('en-US', { month: 'numeric' }) +
      timeF.toLocaleString('en-US', { year: 'numeric' }) +
      hourAlphaCode[timeF.getHours()];
    try {
      newsDataInDb = await services.newsService.asyncFind(
        { subcategory: payload, serverdate: dateStringF },
        {},
        {},
      );
    } catch (err) {
      newsDataInDb = [];
    }
    if (newsDataInDb.length) {
      callback(null, newsDataInDb);
      return;
    } else {
      try {
        var removeOldDateIfAny = await services.newsService.asyncRemove({
          subcategory: payload,
        });
      } catch (err) {
        removeOldDateIfAny = null;
      }
      let feed = await parser.parseURL(result.rssurl);
      var time = new Date();
      var result4callback = [];
      for (var i = 0; i < feed.items.length; i++) {
        var dateString =
          time.toLocaleString('en-US', { day: 'numeric' }) +
          time.toLocaleString('en-US', { month: 'numeric' }) +
          time.toLocaleString('en-US', { year: 'numeric' }) +
          hourAlphaCode[time.getHours()];
        feed.items[i].serverdate = dateString;
        category = helper.feedUrls.getCategory[payload];
        feed.items[i].scrapedat = Date.now();
        var detailToSave = helper.getNewsObjectToSave.createNewsObject(
          feed.items[i],
          category,
          payload,
          feed.title,
        );
        var saveResult = await services.newsService.asyncUpdate(
          { title: feed.items[i].title },
          detailToSave,
          { upsert: true },
        );
        console.log('saved-1');
        result4callback.push(detailToSave);
      }
      callback(null, result4callback);
    }
  } else {
    axios
      .get('https://timesofindia.indiatimes.com/rss.cms')
      .then(async function (response) {
        var dataUrl = getUrlThatNotInDb(payload, response.data);
        if (!dataUrl) {
          callback('Not found', null);
          return;
        }
        dataUrl
          .then(
            async (url) => {
              let feed = await parser.parseURL(url);
              var time = new Date();
              var result4callback = [];
              for (var i = 0; i < feed.items.length; i++) {
                var dateString =
                  time.toLocaleString('en-US', { day: 'numeric' }) +
                  time.toLocaleString('en-US', { month: 'numeric' }) +
                  time.toLocaleString('en-US', { year: 'numeric' }) +
                  hourAlphaCode[time.getHours()];
                feed.items[i].serverdate = dateString;
                category = helper.feedUrls.getCategory[payload];
                feed.items[i].scrapedat = Date.now();
                var detailToSave = helper.getNewsObjectToSave.createNewsObject(
                  feed.items[i],
                  category,
                  payload,
                  feed.title,
                );
                var saveResult = await services.newsService.asyncUpdate(
                  { title: feed.items[i].title },
                  detailToSave,
                  { upsert: true },
                );
                result4callback.push(detailToSave);
              }
              callback(null, result4callback);
              return;
            },
            (err) => {
              callback(err, null);
              return;
            },
          )
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function (error) {
        callback(null, null);
      });
  }
};

module.exports = {
  readRssAndSave: readRssAndSave,
};
