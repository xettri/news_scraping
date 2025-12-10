var mongoose = require('mongoose');
var userModel = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    // bycrypt will be used not used now bcz of testing
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: Number,
    default: '1',
  },
  userDp: {
    type: String,
    default: 'defaultuser.png',
  },
});
module.exports = mongoose.model('user', userModel);
