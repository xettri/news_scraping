var loginForm = $.confirm({
  closeIcon: true,
  lazyOpen: true,
  title: false,
  content: `
      <center><img src="app_pics/bg/login.png" style="height:70px" /></center>
      <form id="login-form-user" onsubmit="return false">
      <div class="form-group">
        <label for="email">Username</label>
        <input type="email" class="form-control" id="login-username-input" placeholder="Enter Username" required>
      </div>
      <div class="form-group">
        <label for="pwd">Password</label>
        <input type="password" class="form-control" id="login-password-input" placeholder="Enter Password" required>
      </div>
      <button type="submit" class="btn btn-default" id="log-in-post-btn">Login</button>
    </form>`,
  type: 'dark',
  typeAnimated: true,
  draggable: false,
  buttons: {
    specialKey: {
      isHidden: true,
      keys: ['esc'],
      action: function () {
        loginForm.close();
      },
    },
  },
});

var signupForm = $.confirm({
  closeIcon: true,
  lazyOpen: true,
  title: false,
  content: `
      <center><img src="app_pics/bg/signup.png" style="height:70px" /></center>
      <div style="padding-top:10px">
          <form id="signup-form-user" onsubmit="return false">
          <div class="form-group">
            <input type="text" class="form-control" id="signup-fullname-input" placeholder="Enter Full Name" required>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" id="signup-username-input" placeholder="Enter Username" required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="signup-password-input" placeholder="Enter Password" required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="signup-confirm-password-input" placeholder="Confirm Password" required>
          </div>
          <button type="submit" class="btn btn-default" id="sign-up-post-btn">Sign Up</button>
        </form>
      </div>`,
  type: 'dark',
  typeAnimated: true,
  draggable: false,
  buttons: {
    blank: {
      isHidden: true,
      action: function () {},
    },
  },
});

$('#login-form-user').submit(function (e) {
  e.preventDefault();
});

$('#signup-form-user').submit(function (e) {
  e.preventDefault();
});

$('body').click(function () {
  $('.jconfirm-row').removeClass('dark-background-for-password');
  $('.jconfirm-light').removeClass('dark-background-for-password');
});

$('.jconfirm-type-dark').click(function (event) {
  event.stopPropagation();
});

$('#login-form-user').submit(function (e) {
  e.preventDefault();
});

$(document).on('click', '#sign-in-btn', () => {
  loginForm.open();
});

$(document).on('click', '#sign-up-btn', () => {
  signupForm.open();
});

$(document).on('focusin', '#login-password-input', () => {
  $('.jconfirm-row').addClass('dark-background-for-password');
});

$(document).on('focusin', '#signup-password-input', () => {
  $('.jconfirm-light').addClass('dark-background-for-password');
});

$(document).on('focusin', '#signup-confirm-password-input', () => {
  $('.jconfirm-light').addClass('dark-background-for-password');
});

$(document).on('blur', '#signup-confirm-password-input', () => {
  $('.jconfirm-light').removeClass('dark-background-for-password');
});

$(document).on('blur', '#login-password-input', () => {
  $('.jconfirm-row').removeClass('dark-background-for-password');
});

$(document).on('click', '#log-in-post-btn', function () {
  var data = {};
  data.username = $('#login-username-input').val();
  data.password = $('#login-password-input').val();
  if (data.username.length && data.password.length) {
    $('.jconfirm-row').waitMe({
      bg: 'rgba(12, 16, 33,0.6)',
      color: '#fff',
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/login',
      success: function (response) {
        if (response != 1) {
          if (response.role == 0) {
            window.location.href = '/admin';
          } else if (response.role == 1) {
            window.location.href = '/';
          } else {
            $('.jconfirm-row').waitMe('hide');
            notie.alert({ type: 3, text: 'Invalid Login Details', time: 2 });
          }
        } else {
          $('.jconfirm-row').waitMe('hide');
          notie.alert({ type: 3, text: 'Invalid Login Details', time: 2 });
        }
      },
      error: function (err) {
        $('.jconfirm-row').waitMe('hide');
        notie.alert({
          type: 3,
          text: 'Something went wrong please try after some time',
          time: 2,
        });
      },
    });
  }
});

$(document).on('click', '#sign-up-post-btn', function () {
  var data = {};
  data.fullname = $('#signup-fullname-input').val();
  data.username = $('#signup-username-input').val().toLowerCase();
  data.password = $('#signup-password-input').val();
  if (data.password == $('#signup-confirm-password-input').val())
    if (data.fullname.length && data.username.length && data.password.length) {
      $('.jconfirm-row').waitMe({
        bg: 'rgba(12, 16, 33,0.6)',
        color: '#fff',
      });
      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/signup',
        success: function (response) {
          if (response.status) {
            $('.jconfirm-row').waitMe('hide');
            signupForm.close();
            loginForm.open();
            notie.alert({
              type: 1,
              text: 'successfully signup you can login now',
              time: 2,
            });
          } else {
            $('.jconfirm-row').waitMe('hide');
            notie.alert({ type: 3, text: 'Invalid Login Details', time: 2 });
          }
        },
        error: function (err) {
          $('.jconfirm-row').waitMe('hide');
          notie.alert({ type: 3, text: err.responseText, time: 2 });
        },
      });
    }
});
$(document).on('click', '#save-for-later', () => {
  if (vali.existDecument($('#logoutbtnpresent'))) {
    window.location.href = '/getsavednews';
  } else {
    loginForm.open();
  }
});

function saveNewsInUser(newsId) {
  if (!vali.existDecument($('#logoutbtnpresent'))) {
    loginForm.open();
  } else {
    var data = {};
    data.newsId = newsId;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/saved',
      success: function (response) {
        notie.alert({ type: 1, text: 'Saved', time: 2 });
      },
      error: function (err) {
        notie.alert({ type: 3, text: err.responseText, time: 2 });
      },
    });
  }
}
function removeNewsInUser(id) {
  // pending right now
}
$(document).on('click', '#sign-in-mobile', () => {
  loginForm.open();
});

$(document).on('click', '#sign-up-mobile', () => {
  signupForm.open();
});
