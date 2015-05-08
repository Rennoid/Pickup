var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');

module.exports = function (app, express) {

  var userRouter = express.Router();
  var rsvpRouter = express.Router();
  var courtRouter = express.Router();

  //logs all requests
  app.use(morgan('dev'));

//takes the data from the url and puts it into the body
  app.use(bodyParser.urlencoded({extended: true}));

  //ensures that all responses be stored in the body
  app.use(bodyParser.json());

  // Serve the client files
  app.use(express.static("client/public"));

  app.use('/api/user', userRouter);
  // app.use('/api/rsvp', rsvpRouter);
  // app.use('/api/court', courtRouter);

  require('../users/userRoutes.js')(userRouter);
  // require('../rsvp/rsvpRoutes.js')(rsvpRouter);
  // require('../courts/courtRoutes.js')(courtRouter);

};