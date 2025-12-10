var helper = require('../helper');
var MongoClient = require('mongodb').MongoClient;
const models = require('../models');
var mongoose = require('mongoose');
var mongourl = helper.AppConstant.mongoUrl;
mongoose.connect(mongourl);

var insert = function (criteria, callback) {
  let userInstance = new models.userModel(criteria);
  userInstance.save(criteria, function (err, response) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
};

//--------------------------------------------------------------------------------------------------------
var update = function (criteria, details, options, callback) {
  models.userModel.updateOne(criteria, details, options, callback);
};
//--------------------------------------------------------------------------------------------------------
var findOne = function (criteria, projections, options, callback) {
  options.lean = true;
  models.userModel.findOne(criteria, projections, options, callback);
};
//--------------------------------------------------------------------------------------------------------
var findByIdAndRemove = function (criteria, callback) {
  models.userModel.findByIdAndRemove(criteria, callback);
};
//--------------------------------------------------------------------------------------------------------
var find = function (criteria, projections, options, callback) {
  options.lean = true;
  models.userModel.find(criteria, projections, options, callback);
};
var remove = function (criteria, callback) {
  models.userModel.remove(criteria, callback);
};
//------------------------------------------------------------------------------------------------
var aggregation = function (query, callback) {
  models.userModel.aggregate([query], callback);
};

var asyncUpdate = function (criteria, details, options) {
  return models.newsDataModel.update(criteria, details, options);
};

var asyncFindOne = function (criteria, projections, options) {
  options.lean = true;
  return models.userModel.findOne(criteria, projections, options);
};

var asyncFindByIdAndRemove = function (criteria) {
  return models.userModel.findByIdAndRemove(criteria);
};

var asyncFind = function (criteria, projections, options) {
  options.lean = true;
  return models.userModel.find(criteria, projections, options);
};

var asyncRemove = function (criteria) {
  return models.userModel.remove(criteria);
};

var asyncAggregation = function (query) {
  return models.userModel.aggregate([query]);
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
