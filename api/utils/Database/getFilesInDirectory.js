const fs = require('fs');
const path = require('path');
const isValidFile = require('./isValidFile');

module.exports = filePath => {
  return isValidFile(filePath).then(() => {
    return new Promise((resolve, reject) => {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          reject(err);
        }

        resolve(files);
      });
    });
  });
};

