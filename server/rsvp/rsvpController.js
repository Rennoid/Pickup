var db = require('../db')

module.exports = {

  addRsvp: function(req, res, next){
    var starttime = req.body.starttime,
      endtime = req.body.endtime,
      courtname = req.body.courtname,
      user = req.body.username

    var courtID = findCourt(courname);

    db.RSVP.create({
      starttime: req.body.starttime,
      endtime: req.body.endtime,
      court_id: courtID
    }).complete(function(err, results){
      res.sendStatus(201);
    })
  },

  allRsvp: function(req, res, next){
    db.RSVP.findAll({court: courtID})
    .then(function(err, results){
      if(!results){
        next(new Error('courtID not found'))
      } else{
        res.json(results)
      }
    })
    .fail(function(error){
      next(new Error('unable to find court ID'))
    })
  },

  findCourt: function(req, res, next){
    db.Court.findOne({courtname: courtname})
      .then(function(err, court){
        if(!court) {
          addCourt(courtname);
        }
        var courtID = db.Court.court.id;
        return courtID
        })
  },

  addCourt: function(req, res, next){
    db.Court.create({
      name: req.body.name,
      address:req.body.address,
      longitude: req.body.longitude,
      lattitude:req.body.lattitude,
      rating: req.body.rating
    }).then(function(err, results){
      return results;
    })
  }
};
