const fs = require('fs');
const path = require('path');

module.exports = filePath => {
  return new Promise((resolve, reject) => {
    fs.lstat(filePath, (statErr, stats) => {
      if (statErr) {
        if (statErr.errno === -2) {
          return reject({ code: 2, error: `No file exists at ${filePath}` });
        } else {
          console.error('Unknown stat err', statErr);
          return reject(statErr);
        }
      } else {
        resolve();
      }
    });
  });
};
