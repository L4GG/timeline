const fs = require('fs');
const ApiError = require('../ApiError');

const config = require('./config');
const isValidFile = require('./isValidFile');
const getFilesInDirectory = require('./getFilesInDirectory');
const getFileContents = require('./getFileContents');
const getFilePath = require('./getFilePath');

module.exports = class Database {
  static getDirectoryContents(params) {
    return new Promise((resolve, reject) => {
      if (!params) { params = {}; }
      const filePath = getFilePath(params.path);
      getFilesInDirectory(filePath).then(files => {
        resolve(files.filter(file => {
          return config.BLACKLISTED_FILES.indexOf(file) === -1;
        }));
      }).catch(reject);
    });
  }

  static getFileContents(filePath) {
    return new Promise((resolve, reject) => {
      if (!filePath) {
        reject(ApiError('Invalid path supplied', 2));
      }

      getFileContents(getFilePath(filePath)).then(contents => {
        resolve(contents.toString());
      }).catch(reject);
    });
  }
};
