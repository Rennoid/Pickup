var db = require('../db');

module.exports = {

  getCourtRSVP: function (req, res ,next) {
    var courtId = req.params.courtId;

    db.Court.find({where:{id:courtId},include:[db.RSVP]})
      .then(function(results){
        res.json(results);
      })
      .catch(function(error){
        next(new Error('Cant find RSVPs for this player: ', error));
      });
  },

  findCourt: function(req, res, next){
    var address = req.body.data.address;

    db.Court.findOne({address: address})
      .then(function(results){
        // if(!court) {
        //   addCourt(courtname);
        // }
        // var courtID = db.Court.court.id;
        //   return courtID;
        // });
        res.json(results);
      })
      .catch(function(error){
        next(new Error('Couldnt find that court: ', error));
      });
  },

  addCourt: function(req, res, next){
    db.Court.create({
      name: req.body.name,
      address:req.body.address,
      longitude: req.body.longitude,
      lattitude:req.body.lattitude,
      rating: req.body.rating
    })
    .then(function(results){
      res.json(results);
    })
    .catch(function(error){
      next(new Error('Couldnt add that court: ', error));
    });
  }
};
