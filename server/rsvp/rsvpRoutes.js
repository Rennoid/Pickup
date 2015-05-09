var rsvpController = require('./rsvpController.js');

module.exports = function (app) {

  app.post('/addCourt', rsvpController.addCourt);
  app.get('/findCourt', rsvpController.findCourt);
  app.get('/', rsvpController.allRsvp);
};
