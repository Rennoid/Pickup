var db = require('../db');

module.exports = {
  users: {
    //gets all users from the users db.
    get: function(callback){
      var queryStr = "select * from users"
      db.query(queryStr, function(err, results){
        callback(err, results);
      })
    },
    post: function(params, callback){
      var queryStr = 'insert into users(username, password, email) values (?)';
      db.query(queryStr, function(err, results){
        callback(err, results);
      })
    }
  },

  courts: {
    //gets all courts from the courts db
    get: function(callback) {
      var queryStr = "select * from courts"
      db.query(queryStr, function(err, results){
        callback(err, results);
      })
    },
    post: function(params, callback){
      var queryStr = "insert into courts(name, address, longitude, lattitude, rating) values (?)"
      db.query(queryStr, params, function(err, results){
        callback(err, results);
      })
    }
  },

  RSVPs: {
    //gets all RSVPs from the RSVP db
    get: function(callback) {
      var queryStr = "select * from RSVP"
      db.query(queryStr, function(err, results){
        callback(err, results);
      })
    },
    post: function(params, callback){
      var queryStr = "insert into RSVP(starttime, endtime, courtid, userid) values (?, ? , (select id from courts where courtname = ? limit 1), (select id from users where username = ?)"
      db.query(queryStr, params, function(err, results){
        callback(err, results)
      })
    }
  }
}
