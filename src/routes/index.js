var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var helper = require('../helper');
const controllers = require('../Controller');
// var multer                = require('multer');
var path = require('path');
var fs = require('fs');
var weather = require('weather-js');
var mongoose = require('mongoose');

router.get('/', helper.auth.isAllreadyLoggedInUser, function (req, res, next) {
  res.render('index', { title: 'Home', news_data: '', user: '' });
});

router.post(
  '/login',
  passport.authenticate('local-login', { failureRedirect: '/' }),
  function (req, res) {
    if (req.session.passport.user.role == 0) {
      res.send({ role: req.session.passport.user.role });
    } else if (req.session.passport.user.role == 1) {
      res.send({ role: req.session.passport.user.role });
    } else {
      req.logout();
      res.send({ role: null });
    }
  },
);

router.post('/signup', function (req, res, next) {
  var data = {};
  data.username = req.username;
  data.password = req.password;
  data.fullname = req.fullname;
  controllers.userController.insert(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send({ status: true });
    }
  });
});

router.get('/user', helper.auth.isLoggedInUser, function (req, res, next) {
  res.render('index', {
    title: 'Home',
    news_data: '',
    user: req.session.passport.user,
  });
});

router.get(
  '/getsavednews',
  helper.auth.isLoggedInUser,
  function (req, res, next) {
    res.redirect(
      '/saved?mode=user&username=' +
        req.session.passport.user.username +
        '&timestamp' +
        Date.now() +
        '&status=loggedin',
    );
  },
);

router.get('/saved', helper.auth.isLoggedInUser, function (req, res, next) {
  res.render('savednews', {
    title: 'Saved News',
    news_data: '',
    user: req.session.passport.user,
  });
});

router.get(
  '/getsavednewsRequest',
  helper.auth.isLoggedInUser,
  function (req, res, next) {
    controllers.userController.getSavedNews(
      { savedby: req.session.passport.user._id },
      {},
      {},
      (err, response) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.send(response);
        }
      },
    );
  },
);

router.post('/saved', helper.auth.isLoggedInUser, function (req, res, next) {
  var data = {};
  data.newsId = mongoose.Types.ObjectId(req.body.newsId);
  data.user = mongoose.Types.ObjectId(req.session.passport.user._id);
  controllers.userController.saveNewsInUser(data, (err, response) => {
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      res.send(response);
    }
  });
});

router.get('/getNews/:id', function (req, res, next) {
  var data = req.params.id;
  data = data.replace(/_|-/g, ' ');
  controllers.newsDataManipulation.readRssAndSave(data, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send('Something went wrong');
    } else {
      res.send(response);
    }
  });
});

function getWeather(loc, cb) {
  weather.find({ search: loc, degreeType: 'C' }, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
}

router.post('/api/weatherInfo', function (req, res, next) {
  if (!req.body.location) {
    loc = 'Delhi';
  } else {
    loc = req.body.location;
  }
  console.log('Location Detail--------------->', req.body);
  if (typeof loc === 'string' && loc.trim().length > 0) {
    loc = req.body.location;
  } else {
    loc = 'Delhi';
  }
  getWeather(loc, function (_er, _rs) {
    if (_er) {
      getWeather('Delhi', function (_er_2, _rs_2) {
        if (_er_2) {
          return res.status(200).send([]);
        } else {
          return res.status(200).send(_rs_2);
        }
      });
    } else {
      try {
        if (_rs.length == 0) {
          getWeather('Delhi', function (_er_2, _rs_2) {
            if (_er_2) {
              return res.status(200).send([]);
            } else {
              return res.status(200).send(_rs_2);
            }
          });
        } else {
          return res.status(200).send(_rs);
        }
      } catch (err) {
        return res.status(200).send([]);
      }
    }
  });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/googlec2ef99614e6df793.html', function (req, res, next) {
  res.render('Admin/seogoogle');
});

router.get('/robots.txt', function (req, res, next) {
  res.sendFile('SEO/robot.txt', { root: './public' });
});

router.get('/robot.txt', function (req, res, next) {
  res.sendFile('SEO/robot.txt', { root: './public' });
});

module.exports = router;
