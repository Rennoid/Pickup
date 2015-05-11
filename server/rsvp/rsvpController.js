var db = require('../db');

var findCourt = function(req, res, next){
  var starttime = req.body.starttime,
    endtime = req.body.endtime,
    courtName = req.body.courtName,
    userId = req.body.userId;
  db.Court.findOne({courtname: courtName})
    .then(function(err, court){
      if(!court) {
        addCourt(req, res, next);
      }
      // line 20 is executing whether or not a 
      // court already exists in the database,
      // so it throws an error when the court 
      // isn't in the database and needs to be added; 
      // not sure how to get access to the courtId 
      // from the `addCourt` function in order to 
      // return the id in all cases. 
      var courtID = db.Court.court.id;
      return courtID;
      });
};

var addRsvp = function(req, res, next){
  var starttime = req.body.starttime,
    endtime = req.body.endtime,
    courtName = req.body.courtName,
    userId = req.body.userId;

  var courtId = findCourt(req, res, next);

  // should we add a date column to the 
  // rsvp db table? date isn't being captured right 
  // now 
  db.RSVP.create({
    starttime: starttime,
    endtime: endtime,
    court_id: courtId,
    user_id: userId
  }).complete(function(err, results){
    results.sendStatus(201);
  });
};

var findRsvp = function(req, res, next){
  var userId = req.params.userId;

  db.RSVP.findAll({where:{UserId: userId}, include:[db.Court]})
    .then(function (results){
      res.json(results);
    })
    .catch(function(error){
      next(new Error('Cant find RSVPs for this player: ', error));
    });
};

var allRsvp = function(req, res, next){
  db.RSVP.findAll({court: courtId})
  .then(function(results){
    if(!results){
      next(new Error('courtID not found'));
    } else{
      res.json(results);
    }
  })
  .catch(function(error){
    next(new Error('unable to find court ID: ', error));
  });
};

var addCourt = function(req, res, next){
  db.Court.create({
    name: req.body.courtName,
    address:req.body.address,
    longitude: req.body.longitude,
    lattitude:req.body.lattitude,
    rating: req.body.rating
  }).then(function(err, results){
    return results;
  });
};

module.exports = {
  findCourt: findCourt,
  addRsvp: addRsvp,
  findRsvp: findRsvp,
  allRsvp: allRsvp,
  addCourt: addCourt
};
