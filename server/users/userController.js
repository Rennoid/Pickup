var db = require('../db');

module.exports = {
  login: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    db.User.findOne({username: username})
      .then(function (err, user) {
        if (!user) {
          next(new Error ('invalid user'));
        } else{
            if (password === user.password) {
              res.json("valid")
            } else {
              next(new Error ('invalid password'));
            } 
        }
      })
      .catch(function (error) {
        next(new Error('unable to look up User'));
      });
  },

  signup: function (req, res, next) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }).then(function(err, results){
      res.sendStatus(201);
    });
  }

};
