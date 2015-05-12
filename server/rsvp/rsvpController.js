var db = require('../db');

/**
 * Uses court data to either find an existing
 * court or create a new court and then return
 * the court id, which will be leveraged with 
 * the form data passed from the court partial
 * to create a new rsvp for the user
 */
var addRsvp = function (req, res, next){
  var starttime = req.body.starttime,
    endtime = req.body.endtime,
    courtName = req.body.courtName,
    placeId = req.body.placeId,
    address = req.body.address,
    userId = req.body.userId;

  // finds the court in the database with the google place id
  // or creates it
  db.Court.findOrCreate( { 
    where: { placeId: placeId }, 
    defaults: {
      name: courtName,
      address: address
    }
  })
    // spread is very similar to function.apply
    .spread(function (instance, created) {
      db.RSVP.create({
        starttime: starttime,
        endtime: endtime,
        CourtId: instance.dataValues.id,
        UserId: userId
      })
      .then(function (results){
        res.json(results);
      })
      .catch(function (error){
        next(new Error('Couldnt create new rsvp: ', error));
      });
    });
};

//finds all rsvps for a spcfic user
var findRsvp = function(req, res, next){
  var userId = req.params.userId;

  //checks rsvp table for the UserId and include the Court where
  //the user is rsvped to
  db.RSVP.findAll({where:{UserId: userId}, include:[db.Court]})
    .then(function (results){
      res.json(results);
    })
    .catch(function(error){
      next(new Error('Cant find RSVPs for this player: ', error));
    });
};

//finds all rsvps for a specific court based off the court ID
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

module.exports = {
  addRsvp: addRsvp,
  findRsvp: findRsvp,
  allRsvp: allRsvp
};
