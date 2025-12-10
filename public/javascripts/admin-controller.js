$(document).on('click', '#rsssubmitbtn', function () {
  $('#rsssubmitbtn').attr('disabled', 'true');
  $('#rsssubmitbtn').html('<i class="fas fa-spinner infinite-rotation"></i>');
  var data = {};
  data.rssurl = $('#rssurl').val();
  data.category = $('#category').val();
  data.subcategory = $('#sub_category').val();
  if (vali.ValidURL(data.rssurl)) {
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/admin/addrss',
      success: function (response) {
        $('#rsssubmitbtn').html('Submit');
        $('#rsssubmitbtn').removeAttr('disabled');
        $('#rssurl').val('');
        notie.alert({ type: 1, text: 'Successfully Saved', time: 2 });
      },
      error: function (err) {
        $('#rsssubmitbtn').html('Submit');
        $('#rsssubmitbtn').removeAttr('disabled');
        $('#rssurl').val('');
        notie.alert({ type: 3, text: err.responseText, time: 2 });
      },
    });
  } else {
    notie.alert({ type: 3, text: 'invalid', time: 2 });
  }
});
