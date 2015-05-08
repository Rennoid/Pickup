var rsvpRoutes = require('./rsvpRoutes.js');

module.exports = function (app) {

  app.post('/addCourt', rsvpRoutes.addCourt);
  app.get('/', rsvpRoutes.allRsvp);

};