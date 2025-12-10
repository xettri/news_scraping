var code = `
         <div class="alert alert-danger alert-dismissible" id="error-message">
         <button type="button" class="close" data-dismiss="alert">&times;</button>
             <center>Invalid username/password</center>
         </div>
         <form id="login-form" onsubmit="return false">
         <center><label><h4>Admin Login</h4></label></center>
         <div class="form-group"><label for="username">Username</label>
              <input type="email" class="form-control" id="username" placeholder="Enter username" name="username">
         </div>
         <div class="form-group"><label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter password" name="password">
         </div>
         <button class="btn btn-primary" id="login-btn">Submit</button>
         <button class="btn btn-warning" style="float:right" id="goToHomeBtn">Home</button>
         </form>
         <div class="loading-div-login">
            <center><img src="app_pics/bg/loading3.gif" /></center>
         </div>`;

function openLoginPop() {
  $.confirm({
    title: false,
    content: code,
    draggable: false,
    buttons: {
      cancel: { btnClass: 'btn-danger blank-button' },
    },
  });
}

$('#login-form').submit(function (e) {
  e.preventDefault();
});

$(document).on('click', '#goToHomeBtn', function () {
  window.location.href = '/';
});

$(document).on('click', '#login-btn', function () {
  $('.loading-div-login').css('display', 'inline');
  $('#login-form').css('display', 'none');
  var data = {};
  data.username = $('#username').val();
  data.password = $('#password').val();
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: '/admin',
    success: function (response) {
      if (response == true) {
        window.location.href = '/admin';
      } else {
        $('.loading-div-login').css('display', 'none');
        $('#login-form').css('display', 'inline');
        $('#error-message').css('display', 'block');
      }
    },
    error: function (err) {
      $('.loading-div-login').css('display', 'none');
    },
  });
});

function loadingLogin() {
  $.confirm({
    title: ' ',
    content:
      "<center><img src='app_pics/bg/loading3.gif' class='loading-pop-img' /></center>",
    buttons: {
      blank: { btnClass: 'btn-danger testing' },
    },
  });
  $('.testing').click();
}
