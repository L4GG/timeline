const Event = require('../models/Event');

module.exports.getEvent = req => {
  return Event.getEvent(req.params.year, req.params.event).then(event => {
    return event;
  });
};

