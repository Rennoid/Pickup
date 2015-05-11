var db = require('../db');

// var addCourt = function(req, res, next){
//   db.Court.create({
//     name: req.body.courtName,
//     address:req.body.address,
//     // longitude: req.body.longitude,
//     // lattitude:req.body.lattitude,
//     // rating: req.body.rating
//   }).then(function(results){
//     return results;
//   });
// };

// var findCourt = function(req, res, next){
//   var courtName = req.body.courtName;
//   console.log("LINE 17 COURTNAME: ", courtName);
//   db.Court.find({where: {courtname: courtName }})
//     .then(function(court){
//       console.log("LINE 20 COURT: ", court);
//       if(!court) {
//         addCourt(req, res, next)
//           .then(function(result) {
//             console.log('LINE 24 RESULT: ', result);
//             var courtID = result.id;
//             next(courtID);
//           });
//       }
//       var courtID = db.Court.court.id;
//       next(courtID);
//       })
//     .catch(function(error){
//       next(new Error('Unable to find court ID: ', error));
//     });
// };

var addRsvp = function (req, res, next){
  var starttime = req.body.starttime,
    endtime = req.body.endtime,
    courtName = req.body.courtName,
    placeId = req.body.placeId,
    address = req.body.address,
    userId = req.body.userId;

  db.Court.findOrCreate( { 
    where: { placeId: placeId }, 
    defaults: {
      name: courtName,
      address: address
    }
  })
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

var findRsvp = function(req, res, next){
  var userId = req.params.userId;

  db.RSVP.findAll({where:{UserId: userId}, include:[db.Court]})
    .then(function (results){
      console.log("RESULTS: ", results);
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

module.exports = {
  // findCourt: findCourt,
  addRsvp: addRsvp,
  findRsvp: findRsvp,
  allRsvp: allRsvp
  // addCourt: addCourt
};
