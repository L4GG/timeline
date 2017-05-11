const routes = require('./routes');
const API_ROOT= '/api';

const handleError = res => error => {
  console.error('Route error', error);
  res.json({
    error: error.message || 'There was an unknown error',
  });
};

const handleSuccess = res => data => res.json(data);

const responseHandler = fn => (req, res) => {
  // allow routes to return raw data,
  // or a promise
  const result = fn(req);

  if (result.then) {
    return result.then(handleSuccess(res)).catch(handleError(res));
  } 

  return res.json(result);
};

const routeHandler = app => route => {
  const method = route.method || 'get';
  app[method](`${API_ROOT}${route.path}`, responseHandler(route.fn));
};

module.exports = app => {
  routes.map(routeHandler(app));
};
