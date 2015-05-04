var express = require('express');
var parser = require('body-parser');

//create express server listening on PORT 3000
var app = express();

//direct all route requests to router.js
var router = require('./routes.js')

//runs the server on port 3000
var server = app.listen(3000, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

//ensures that all responses be stored in the body
app.use(parser.json());


// // Serve the client files
// app.use(express.static(__dirname + "/../client"));