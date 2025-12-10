var fs = require('fs'),
  request = require('request');

function isObjEmpty(object) {
  //to check empty object
  if (!Object.keys(object).length) {
    return false;
  }
  for (var key in object) {
    if (object.hasOwnProperty(key)) return false;
  }
  return true;
}

var download = function (option) {
  var uri = option.url;
  var filename = option.name;
  var type = option.type;
  var location = option.path;
  location = location ? location : '';
  filename = filename ? filename : Date.now();
  try {
    return new Promise((resolve, reject) => {
      request.head(uri, async function (err, res, body) {
        if (err) {
          reject(err);
          return;
        }
        filename =
          filename +
          '.' +
          res.headers['content-type'].split('/')[1].toLowerCase();
        if (res.headers['content-type'].split('/')) {
          if (res.headers['content-type'].split('/')[0] == type) {
            await request(uri).pipe(fs.createWriteStream(location + filename));
            var fileLength = res.headers['content-length']
              ? res.headers['content-length']
              : null;
            resolve({ size: fileLength, name: filename });
            return;
          }
          reject('type is not match');
          return;
        } else {
          reject('Type is not match');
          return;
        }
      });
    })
      .then((response) => {
        return { err: null, res: response };
      })
      .catch((error) => {
        return { err: error, res: null };
      });
  } catch (err) {
    reject('Type is not match');
  }
};

var moveTheFile = function (file, callback) {
  fs.rename(file, '../public/Upload/Profile/' + file, function (err) {
    if (err) {
      callback(err);
    } else {
      fs.unlinkSync(file);
      callback(err);
    }
  });
};

module.exports = {
  isObjEmpty: isObjEmpty,
  download: download,
  moveTheFile: moveTheFile,
};
