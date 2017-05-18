const Year = require('../models/Year');

module.exports.getYears = () => Year.getYears().then(years => {
  return years.map(year => ({
    year: year,
    path: `/api/years/${year}`,
  }));
});

module.exports.getYear = req => {
  const year = req.params.year;
  return Year.getYear(year).then(events => {
    return events.map(event => ({
      event: event,
      path: `/api/years/${year}/${event}`,
    }));
  });
};
