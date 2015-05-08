var express = require('express');
var app = express();

var PORT  = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  console.log('Example app listening at http://%s:%d', host, PORT);
});

module.exports = app;
