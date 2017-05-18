const ApiError = require('../utils/ApiError');
const Year = require('./Year');
const Database = require('../utils/Database');
/* Model representing an Event object */

const regex = /^[a-zA-Z0-9_.-]*$/;

module.exports = class Event {
  static isValidEvent(event) {
    return regex.test(event);
  }

  static getEvent(year, event) {
    if (!year) {
      return new Promise((_, reject) => {
        throw new ApiError('You must supply a year to query by', 1);
      });
    } else if (!Year.isValidYear(year)) {
      return new Promise((_, reject) => {
        throw new ApiError('You must supply a valid year to query by', 1);
      });
    } else if (!event) {
      return new Promise((_, reject) => {
        throw new ApiError('You must supply an event to query by', 1);
      });
    } else if (!Event.isValidEvent(event)) {
      return new Promise((_, reject) => {
        throw new ApiError('You must supply a valid event to query by', 1);
      });
    }

    const path = `/${year}/${event}`;
    return Database.getDirectoryContents({
      path: path, 
    }).then(files => {
      return Promise.all(files.map(file => {
        return Database.getFileContents(`${path}/${file}`).then(contents => {
          return contents;
        });
      })).then(data => {
        return files.reduce((obj, file, index) => {
          const key = file.split('.').shift();
          return Object.assign({}, obj, {
            [key]: data[index],
          });
        }, {
          url: `/api/years/${year}/${event}`,
        });
      }).catch(err => {
        console.error(err);
        throw new ApiError('There was an unknown error; please try again later.', 1);
      });
    }).catch(err => {
      if (err.code === 2) {
        throw new ApiError('Invalid event. Please query for a valid event.', 1);
      }

      throw new ApiError('There was an unknown error; please try again later.', 1);
    });
  }
}

