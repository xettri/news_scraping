var LocalStrategy = require('passport-local').Strategy;
var Controller = require('../controller');

module.exports = function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    Controller.userController.FindOne(
      { _id: id._id },
      { username: 1, role: 1, name: 1 },
      {},
      function (err, user) {
        done(err, user);
      },
    );
  });
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        Controller.userController.FindOne(
          { username: username, password: password },
          { username: 1, role: 1, name: 1 },
          {},
          (err, user) => {
            if (err) {
              return done(err, req.flash('loginMessage', err));
            } else if (user) {
              return done(null, user);
            } else {
              return done(
                err,
                req.flash('loginMessage', 'Invalid Username/password'),
              );
            }
          },
        );
      },
    ),
  );
};
