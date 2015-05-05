var db = require('../db');
var bluebird = require('bluebird');

module.exports = {
  users: {
    get:  function(req, res) {
      db.User.findAll()
      .complete(function(err, results){
        res.json(results);
      });
    },
    post: function(req, res) {
      db.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      }).complete(function(err, results){
        res.sendStatus(201);
      })
    }
  },
  courts: {
    get: function(req, res) {
      db.Court.findAll()
      .complete(function(err, results){
        res.json(results);
      })
    },
    post: function(req, res) {
      db.Court.create({
        name: req.body.name,
        address:req.body.address,
        longitude: req.body.longitude,
        lattitude:req.body.lattitude,
        rating: req.body.rating
      }).complete(function(err, results){
        res.sendStatus(201)
      })
    }
  },
  RSVP: {
    get: function(req, res) {
      db.RSVP.findAll()
      .complete(function(err, results){
        res.json(results);
      });
    },
    post: function(req, res) {
      db.RSVP.create({
        starttime: req.body.starttime,
        endtime: req.body.endtime
      }).complete(function(err, results){
        res.sendStatus(201);
      })
    }
  }
};
