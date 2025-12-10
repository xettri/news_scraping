function createSuperContent(news) {
  date = news.pubDate.substring(0, 16);
  var imageHtml = '';
  var title =
    '<a class="news-title" href="' +
    news.link +
    '" target="_blank">' +
    news.title +
    '</a><p class="news-publish-date">' +
    date +
    '&nbsp;&nbsp<strong>' +
    news.source +
    '</strong></p>';
  if (news.source.indexOf('Times of India') >= 0) {
    logo = 'logo-sm.png';
  } else if (news.source.indexOf('NDTV') >= 0) {
    logo = 'logo-ndtv.png';
  }
  imageHtml = news.image
    ? '<a><img src="' +
      news.image +
      '" class="news-image" hspace="10" align="left" onerror="this.onerror=null;this.src=\'app_pics/bg/' +
      logo +
      '\';" /></a>'
    : '';
  if (!news.content) {
    news.content = '';
  }
  if (imageHtml.length == 0 && news.content.length == 0) {
    imageHtml =
      '<a><img src="app_pics/bg/' +
      logo +
      '" class="news-image" hspace="10" align="left" /></a>';
  }
  return imageHtml + title + news.content;
}

function createNewsDiv(news) {
  var code = '';
  console.log(news._id);
  try {
    code += '<div class="col-sm-12 news-main-div allSidesSoft">';
    code += ' <div class="col-sm-12 news_description">';
    code += '   <div class="col-sm-12">';
    code += createSuperContent(news);
    code += '   </div>';
    code += '<div class="col-sm-12 share-icon-div">';
    code += '<div class="dropdown">';
    code +=
      '          <a data-toggle="dropdown"><i class="fas fa-share-alt share-icon-pop-btn"></i></a>';
    code += '          <ul class="dropdown-menu">';
    if (vali.isMobile()) {
      whatsappShareLink =
        'whatsapp://send?text=' + shareMessageIntro + news.link;
      code +=
        '            <li><a href="' +
        whatsappShareLink +
        '" class="share-icon" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a></li>';
    }
    gplusShareLink = 'https://plus.google.com/share?url=' + news.link;
    code +=
      '            <li><a href="' +
      gplusShareLink +
      '" class="share-icon" target="_blank"><i class="fas fa-envelope"></i> Google+</a></li>';
    fbShareLink = 'https://facebook.com/sharer/sharer.php?u=' + news.link;
    code +=
      '            <li><a href="' +
      fbShareLink +
      '" class="share-icon" target="_blank"><i class="fab fa-facebook-f"></i> facebook</a></li>';
    code += '          </ul>';
    code +=
      '  <a style="margin-left:10px" class"bookmark-main-page" onclick="saveNewsInUser(\'' +
      news._id +
      '\')">';
    code += '    <i class="far fa-bookmark share-icon-pop-btn"></i>';
    code += '  </a>';
    code += ' </div>';
    code += '</div>';
    code += '</div>';
  } catch (err) {
    console.log(err);
    code = '';
  }
  return code;
}

$(document).on('click', '.feed-link', (e) => {
  var route = $(e.target).attr('data-id');
  var heading = route
    .substring(route.lastIndexOf('/') + 1)
    .replace(/_|-/g, ' ');
  $('body').waitMe({
    bg: 'rgba(12, 16, 33,0.6)',
    color: '#fff',
  });
  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: route,
    success: function (response) {
      $('body').waitMe('hide');
      $('.news-main-div').remove();
      try {
        if (!response.length) {
          notie.alert({
            type: 3,
            text: 'No any NEWS on this category',
            time: 2,
          });
        } else {
          $('.main-heading').text(heading);
          for (var i = 0; i < response.length; i++) {
            var codeHtml = createNewsDiv(response[i]);
            $('.news-main-container').append(codeHtml);
          }
        }
      } catch (err) {
        notie.alert({ type: 3, text: 'No any NEWS on this category', time: 2 });
      }
    },
    error: function (err) {
      $('body').waitMe('hide');
      $('.news-main-div').remove();
      notie.alert({ type: 3, text: err.responseText, time: 2 });
    },
  });
});

function initDefaultPage() {
  $('body').waitMe({
    bg: 'rgba(12, 16, 33,0.6)',
    color: '#fff',
  });
  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: '/getNews/Top_Stories',
    success: function (response) {
      $('body').waitMe('hide');
      for (var i = 0; i < response.length; i++) {
        var codeHtml = createNewsDiv(response[i]);
        $('.news-main-container').append(codeHtml);
      }
      initweatherInfo();
    },
    error: function (err) {
      $('body').waitMe('hide');
      initweatherInfo();
      notie.alert({ type: 3, text: err.responseText, time: 2 });
    },
  });
}

function fillWeatherInfoOnScreen(resp) {
  try {
    $('.weather-location').text(resp[0].current.observationpoint);
    $('.wether-outside').text(resp[0].current.skytext);
    $('.temprature-info').text(resp[0].current.temperature + '° c');
    $('.current-weather-icon').attr(
      'src',
      '/app_pics/weather/' + getImageOfWeather(resp[0].current.skytext),
    );
    var code = '';
    code += '<div class="row" style="padding:0;margin:0">';
    for (var i = 0; i < resp[0].forecast.length; i++) {
      if (!vali.isMobile()) {
        if (i == 2 || i == 3) {
          code += '<div class="col-sm-1 col-xs-1"></div>';
        }
      }
      code += '<div class="col-sm-2 col-xs-4" style="padding-top:20px;">';
      code += '<center>';
      if (i == 0) {
        code += '  <p class="forecast-date-day">Today</p>';
      } else {
        code +=
          '  <p class="forecast-date-day">' +
          resp[0].forecast[i].shortday +
          '</p>';
      }
      code +=
        '  <img src="/app_pics/weather/' +
        getImageOfWeather(resp[0].forecast[i].skytextday) +
        '" class="forecast-weather-icon">';
      code +=
        '  <p class="temprature-info-forecast-hight">' +
        resp[0].forecast[i].high +
        '° c</p>';
      code +=
        '  <p class="temprature-info-forecast-low">' +
        resp[0].forecast[i].low +
        '° c</p>';
      code += '</center>';
      code += '</div>';
    }
    code += '</div>';
    code += '&nbsp;';
    $('#weather-forecast-div').append(code);
  } catch (err) {
    console.log('Unable to get weather forecast', resp);
  }
}
function initweatherInfo() {
  var data = {};
  $.get(
    'https://ipinfo.io',
    function (response) {
      if (response) {
        if (response.city) {
          data.location = response.city;
        } else {
          data.location = 'Delhi';
        }
      } else {
        data.location = 'Delhi';
      }
      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/api/weatherInfo',
        success: function (response) {
          fillWeatherInfoOnScreen(response);
        },
        error: function (err) {
          notie.alert({ type: 3, text: err.responseText, time: 2 });
        },
      });
    },
    'jsonp',
  );
}
