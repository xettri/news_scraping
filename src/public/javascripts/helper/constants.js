const option_obj = {
  Main_Feeds: [
    'Top Stories',
    'Most Recent Stories',
    'India',
    'World',
    'Business',
    'Sports',
    'Entertainment',
  ],
  Cities: [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Ahemdabad',
    'Allahabad',
    'Bhubaneswar',
    'Coimbatore',
    'Gurgaon',
    'Guwahati',
    'Hubli',
    'Kanpur',
    'Kolkata',
    'Ludhiana',
    'Mangalore',
    'Mysore',
    'Noida',
    'Pune',
    'Goa',
    'Chandigarh',
    'Lucknow',
    'Patna',
    'Jaipur',
    'Nagpur',
    'Rajkot',
    'Ranchi',
    'Surat',
    'Vadodara',
    'Varanasi',
    'Thane',
    'Thiruvananthapuram',
  ],
  World: ['US', 'NRI', 'Chaina', 'South Asia'],
};
const shareMessageIntro =
  'This%20link%20is%20shared%20by%20*NEWS%20Scraper%20App*%20%0AWhich%20devloped%20by%20BCrazydreamer%0A';
function UpDateTimeInContainer(doc) {
  var timeLive = setInterval(function () {
    var time = new Date();
    time = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
    $(doc).html(time);
  }, 1000);
}

function getImageOfWeather(type) {
  type = type.toLowerCase();
  if (type.indexOf('sunny') >= 0) {
    if (type.indexOf('partly sunny') >= 0) {
      return 'cloudy.png';
    } else {
      return 'sunny.png';
    }
  } else if (type.indexOf('rain') >= 0) {
    return 'rain.png';
  } else if (type.indexOf('strom') >= 0) {
    return 'rain.png';
  } else if (type.indexOf('snow') >= 0 || type.indexOf('cold') >= 0) {
    return 'snow.png';
  } else if (type.indexOf('cloud') >= 0) {
    if (type.indexOf('cloudy') >= 0) {
      return 'cloudy.png';
    } else {
      return 'cloud.png';
    }
  } else if (
    type.indexOf('smoke') >= 0 ||
    type.indexOf('smoke') >= 0 ||
    type.indexOf('wind') >= 0
  ) {
    return 'cloud.png';
  } else if (type.indexOf('thunder') >= 0) {
    return 'thunder.png';
  } else {
    return 'sunny.png';
  }
}
