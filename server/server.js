var morgan = require('morgan') // used for logging incoming request
var express = require('express');

var morgan = require('morgan');
//create express server listening on PORT 3000
var app = express();

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;

});



