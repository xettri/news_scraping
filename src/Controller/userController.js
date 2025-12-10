var services = require('../services');
var mongoose = require('mongoose');

var FindOne = function (criteria, projection, option, callback) {
  if (criteria._id) {
    criteria._id = mongoose.Types.ObjectId(criteria._id);
  }
  services.userService.findOne(criteria, projection, option, (err, users) => {
    if (err) {
      callback(err);
      return;
    } else {
      callback(err, users);
    }
  });
};

var insert = function (criteria, callback) {
  if (criteria) {
    if (!(criteria.username && criteria.password && criteria.fullname)) {
      callback('All fields are required');
      return;
    }
  }
  services.userService.findOne(
    { username: criteria.username },
    {},
    {},
    (err1, users1) => {
      if (err1) {
        callback(err1);
        return;
      } else {
        if (users1) {
          callback('User with this Username is alreday exist');
          return;
        }
        criteria.role = '1';
        services.userService.insert(criteria, (err, users) => {
          if (err) {
            callback(err);
            return;
          } else {
            callback(err, users);
            return;
          }
        });
      }
    },
  );
};

var saveNewsInUser = function (criteria, callback) {
  if (!criteria.newsId) {
    callback('Something went wrong please try again later');
    return;
  }
  var data = {};
  data._id = mongoose.Types.ObjectId(criteria.newsId);
  services.newsService.find(data, {}, {}, async (err, newsData) => {
    if (err) {
      callback(err);
      return;
    } else {
      if (newsData) {
        if (newsData.length) {
          var detailToSaveInUser = newsData[0];
          var savedNews = await services.savedNewsService.asyncFindOne(
            { _id: detailToSaveInUser._id },
            {},
            {},
          );
          if (savedNews) {
            return callback(null, savedNews);
          }
          detailToSaveInUser.savedby = criteria.user;
          detailToSaveInUser.serverdate = new Date().getTime();
          services.savedNewsService.insert(
            detailToSaveInUser,
            (err, response) => {
              if (err) {
                console.log(err, '----Saved News Error');
                callback('Unable to save please try after some time');
                return;
              } else {
                callback(null, response);
                return;
              }
            },
          );
        } else {
          callback(
            'Unable to find this new right now may be deleted by devlopers',
          );
          return;
        }
      }
    }
  });
};

var getSavedNews = function (user, projection, option, callback) {
  if (!user) {
    callback(
      'Something went wrong may be you are not loggedin or may be not authorised',
    );
    return;
  }
  var data = {};
  data.savedby = mongoose.Types.ObjectId(user.savedby);
  services.savedNewsService.find(data, {}, {}, (err, response) => {
    if (err) {
      callback('Unable to save please try after some time');
      return;
    } else {
      callback(null, response);
      return;
    }
  });
};

module.exports = {
  FindOne: FindOne,
  insert: insert,
  saveNewsInUser: saveNewsInUser,
  getSavedNews: getSavedNews,
};
