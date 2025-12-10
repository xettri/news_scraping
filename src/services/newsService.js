var helper = require('../helper');
const models = require('../models');
var mongoose = require('mongoose');
var mongourl = helper.AppConstant.mongoUrl;
mongoose.connect(mongourl);

var insert = function (criteria, callback) {
  let newsInstance = new models.newsDataModel(criteria);
  newsInstance.save(criteria, function (err, response) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
};

//--------------------------------------------------------------------------------------------------------
var update = function (criteria, details, options, callback) {
  models.newsDataModel.update(criteria, details, options, callback);
};
//--------------------------------------------------------------------------------------------------------
var findOne = function (criteria, projections, options, callback) {
  options.lean = true;
  models.newsDataModel.findOne(criteria, projections, options, callback);
};
//--------------------------------------------------------------------------------------------------------
var findByIdAndRemove = function (criteria, callback) {
  models.newsDataModel.findByIdAndRemove(criteria, callback);
};
//--------------------------------------------------------------------------------------------------------
var find = function (criteria, projections, options, callback) {
  options.lean = true;
  models.newsDataModel.find(criteria, projections, options, callback);
};
var remove = function (criteria, callback) {
  models.newsDataModel.remove(criteria, callback);
};
//------------------------------------------------------------------------------------------------
var aggregation = function (query, callback) {
  models.newsDataModel.aggregate([query], callback);
};

var asyncUpdate = function (criteria, details, options) {
  return models.newsDataModel.findOneAndUpdate(criteria, details, {
    ...options,
    new: true,
  });
};

var asyncFindOne = function (criteria, projections, options) {
  options.lean = true;
  return models.newsDataModel.findOne(criteria, projections, options);
};

var asyncFindByIdAndRemove = function (criteria) {
  return models.newsDataModel.findByIdAndRemove(criteria);
};

var asyncFind = function (criteria, projections, options) {
  options.lean = true;
  return models.newsDataModel.find(criteria, projections, options);
};

var asyncRemove = function (criteria, projections, options) {
  return models.newsDataModel.remove(criteria, projections, options);
};

var asyncAggregation = function (query) {
  return models.newsDataModel.aggregate([query]);
};

module.exports = {
  insert: insert,
  find: find,
  findOne: findOne,
  update: update,
  remove: remove,
  aggregation: aggregation,
  asyncUpdate: asyncUpdate,
  asyncFindOne: asyncFindOne,
  asyncFindByIdAndRemove: asyncFindByIdAndRemove,
  asyncFind: asyncFind,
  asyncAggregation: asyncAggregation,
  asyncRemove: asyncRemove,
};
