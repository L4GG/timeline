const fs = require('fs');
const path = require('path');

const rootDir = '../../content/events';
const BLACKLISTED_FILES = [
  '.DS_Store',
  'index.js',
];

const getFiles = (params) => new Promise((resolve, reject) => {
  if (!params) { params = {}; }
  const filePath = path.join(__dirname, rootDir, params.path);
  fs.lstat(filePath, (statErr, stats) => {
    if (statErr) {
      if (statErr.errno === -2) {
        return reject({ code: 2, error: `No file exists at ${filePath}` });
      } else {
        console.error('Unknown stat err', statErr);
        return reject(statErr);
      }
    } else {
      return fs.readdir(filePath, (err, files) => {
        if (err) {
          return reject(err);
        }

        return resolve(files.filter(file => BLACKLISTED_FILES.indexOf(file) === -1));
      });
    }
  });
});

module.exports = getFiles;
