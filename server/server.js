var express = require('express');
var sequelize = require('sequelize');

//create express server listening on PORT 3000
var app = express();

var server = app.listen(3000, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});