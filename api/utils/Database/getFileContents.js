const fs = require('fs');
const path = require('path');
const isValidFile = require('./isValidFile');

module.exports = filePath => {
  return new Promise((resolve, reject) => {
    return isValidFile(filePath).then(() => {
      fs.readFile(filePath, (err, contents) => {
        if (err) {
          reject(err);
        }

        resolve(contents);
      });
    }).catch(reject);
  });
};
