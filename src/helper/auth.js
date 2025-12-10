function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin');
}

function isAllreadyLoggedInAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.session.passport.user.role == 0) {
      res.redirect(
        '/admin/dashboard?mode=admin&username=' +
          req.session.passport.user.username +
          '&timestamp' +
          Date.now() +
          '&status=loggedin',
      );
      return;
    } else if (req.session.passport.user.role == 0) {
      res.redirect('/');
      return;
    }
    return;
  }
  return next();
}

function isLoggedInUser(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.session.passport.user.role == 0) {
      res.redirect('/admin');
    } else {
      return next();
    }
  }
  res.redirect('/');
}

function isAllreadyLoggedInUser(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.session.passport.user.role == 0) {
      res.redirect('/admin');
      return;
    } else {
      res.redirect(
        '/user?mode=user&username=' +
          req.session.passport.user.username +
          '&timestamp' +
          Date.now() +
          '&status=loggedin',
      );
      return;
    }
  }
  return next();
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isAllreadyLoggedInAdmin: isAllreadyLoggedInAdmin,
  isLoggedInUser: isLoggedInUser,
  isAllreadyLoggedInUser: isAllreadyLoggedInUser,
};
