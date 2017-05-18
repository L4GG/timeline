const ApiError = require('../utils/ApiError');
const Database = require('../utils/Database');
/* Model representing a Year object */

const regex = /^[0-9]*$/;

module.exports = class Year {
  static isValidYear(year) {
    return regex.test(year);
  }

  static getYears() {
    return Database.getDirectoryContents({
      path: '/',
    });
  }

  static getYear(year) {
    if (!year) {
      return new Promise((_, reject) => {
        throw new ApiError('You must supply a year to query by', 1);
      });
    } else if (!Year.isValidYear(year)) {
      return new Promise((_, reject) => {
        throw new ApiError('You must supply a valid year to query by', 1);
      });
    }
    return Database.getDirectoryContents({
      path: `/${year}`,
    }).catch(err => {
      if (err.code === 2) {
        throw new ApiError('Invalid year. Please query for a valid year.', 1);
      }

      throw new ApiError('There was an unknown error; please try again later.', 1);
    });
  }
}
