const path = require('path');
const config = require('./config');

module.exports = function(filePath) {
  return path.join(__dirname, config.rootDir, filePath);
};
