// A route receives req as a parameter
const routes = [{
  path: '/',
  fn: req => {
    return { msg: 'not sure what goes here' };
  },
}, {
  path: '/years',
  fn: require('./controllers/years').getYears,
}, {
  path: '/years/:year',
  fn: require('./controllers/years').getYear,
}, {
  path: '/years/:year/:event',
  fn: require('./controllers/events').getEvent,
}];

module.exports = routes;
