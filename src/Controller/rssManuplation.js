var services = require('../services');
var mongoose = require('mongoose');

var insert = function (payload, callback) {
  payload.time = Date.now();
  services.rssService.findOne(
    { subcategory: payload.subcategory },
    {},
    {},
    (error, response) => {
      if (error) {
        callback(error);
      } else {
        if (response) {
          callback('This RSS is already exist');
        } else {
          services.rssService.insert(payload, (err, rss) => {
            if (err) {
              callback(err);
              return;
            } else {
              callback(err, rss);
            }
          });
        }
      }
    },
  );
};

var FindOne = function (criteria, projection, option, callback) {
  if (criteria._id) {
    criteria._id = mongoose.Types.ObjectId(criteria._id);
  }
  services.rssService.FindOne(criteria, projection, option, (err, rss) => {
    if (err) {
      callback(err);
      return;
    } else {
      callback(err, rss);
    }
  });
};

var find = function (criteria, projection, option, callback) {
  if (criteria._id) {
    criteria._id = mongoose.Types.ObjectId(criteria._id);
  }
  services.rssService.find(criteria, projection, option, (err, rss) => {
    if (err) {
      callback(err);
      return;
    } else {
      callback(err, rss);
    }
  });
};

var remove = function (criteria, callback) {
  if (criteria._id) {
    criteria._id = mongoose.Types.ObjectId(criteria._id);
  }
  services.rssService.remove(criteria, (err, rss) => {
    if (err) {
      callback(err);
      return;
    } else {
      callback(err, rss);
    }
  });
};

var update = function (criteria, projection, option, callback) {
  services.rssService.update(criteria, projection, option, (err, rss) => {
    if (err) {
      callback(err);
      return;
    } else {
      callback(err, rss);
    }
  });
};

module.exports = {
  insert: insert,
  find: find,
  FindOne: FindOne,
  update: update,
  remove: remove,
};
