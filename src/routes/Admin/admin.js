var express = require('express');
var router = express.Router();
var session = require('express-session');
const controllers = require('../../controller');
var bodyParser = require('body-parser');
var helper = require('../../helper');
var services = require('../../services');
var passport = require('passport');
var path = require('path');
var fs = require('fs');

router.get('/', helper.auth.isAllreadyLoggedInAdmin, function (req, res, next) {
  res.render('Admin/index', {
    title: 'Login',
    error: req.flash('loginMessage'),
  });
});

//---------------------------------------------------------------------------------

router.post(
  '/',
  passport.authenticate('local-login', { failureRedirect: '/' }),
  function (req, res) {
    if (req.session.passport.user.role == 0) {
      res.send(true);
    } else {
      req.logout();
      res.send(false);
    }
  },
);

//---------------------------------------------------------------------------------

router.get('/dashboard', helper.auth.isLoggedIn, (req, res, next) => {
  res.render('Admin/dashboard', {
    title: 'Dashboard',
    user: req.session.passport.user,
  });
});

//---------------------------------------------------------------------------------

router.get('/addrss', helper.auth.isLoggedIn, (req, res, next) => {
  res.render('Admin/addrss', {
    title: 'Add RSS',
    user: req.session.passport.user,
  });
});

//---------------------------------------------------------------------------------

router.post('/addrss', helper.auth.isLoggedIn, (req, res, next) => {
  controllers.rssManuplation.insert(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.render('Admin/addrss', {
        title: 'Add RSS',
        user: req.session.passport.user,
      });
    }
  });
});

//---------------------------------------------------------------------------------

router.post('/getrsslinks', helper.auth.isLoggedIn, (req, res, next) => {
  if (!req.body) {
    criteria = {};
  } else {
    criteria = req.body;
  }
  controllers.rssManuplation.find(criteria, {}, {}, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(response);
    }
  });
});

//---------------------------------------------------------------------------------

router.post('/removersslinks', helper.auth.isLoggedIn, (req, res, next) => {
  criteria = req.body;
  controllers.rssManuplation.remove(criteria, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(response);
    }
  });
});

//---------------------------------------------------------------------------------

router.get('/editrss', helper.auth.isLoggedIn, (req, res, next) => {
  res.render('Admin/editrss', {
    title: 'Edit RSS',
    user: req.session.passport.user,
  });
});

//---------------------------------------------------------------------------------

router.get('/refreshdb', helper.auth.isLoggedIn, (req, res, next) => {
  res.render('Admin/refreshdb', {
    title: 'Refresh DB',
    user: req.session.passport.user,
  });
});

//---------------------------------------------------------------------------------

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/admin');
});

module.exports = router;
