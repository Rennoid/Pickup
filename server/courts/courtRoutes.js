var courtController = require('./courtController.js');

module.exports = function (app) {

  app.post('/addCourt', courtController.addCourt);
  app.get('/findCourt', courtController.findCourt);
  app.get('/:courtId/rsvp', courtController.getCourtRSVP);
  //app.get('/', courtController.allRsvp);
};