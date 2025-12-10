require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var index = require('./routes/index');
var admin = require('./routes/Admin/admin');
var mongoose = require('mongoose');
var helper = require('./helper');
var flash = require('connect-flash');

var mongoConnectionString = helper.AppConstant.mongoUrl;
mongoose.connect(mongoConnectionString);

//On connect
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected');
});

//on error
mongoose.connection.on('error', function (err) {
  console.log('Error occur in mongoose ' + err);
});

//On disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

var flash = require('connect-flash');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// passport code
require('./config/passport')(passport);
app.use(session({ secret: 'qwertyuiopasdfghjkl' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// end passport code

app.use('/', index);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (_, _, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.error(err);
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.render('Error');
});

module.exports = app;
