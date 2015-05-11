var Sequelize = require('sequelize');

var orm = new Sequelize('pickupDB', 'root','', {
  dialect: 'mysql'
});

//creates new row in User Table
var User = orm.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

//creates new row in Court Table
var Court = orm.define('Court', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  longitude: Sequelize.DECIMAL,
  latitude: Sequelize.DECIMAL,
  rating: Sequelize.INTEGER,
  placeId: Sequelize.STRING
});

//creates new row in RSVP Table

var RSVP = orm.define('RSVP', {
  starttime: Sequelize.DATE,
  endtime: Sequelize.DATE
});

//establish relationships between tables
Court.hasMany(RSVP);
RSVP.belongsTo(Court);
User.hasMany(RSVP);
RSVP.belongsTo(User);


//Creates the tables

//inputting in table prefilled with data
orm.sync({force:true}).then(function(){
  User.bulkCreate([
    { username: 'kurt',password:'kurt', email:'kurt@kurt.com' },
    { username: 'vivek',password:'vivek', email:'vivek@vivek.com' },
    { username: 'mark',password:'mark', email:'mark@mark.com' },
    { username: 'steven',password:'steven', email:'steven@steven.com' }
  ]);

  Court.bulkCreate([
    { name: 'Venice Beach', address:'1800 Ocean Front Walk Venice, CA 90291', longitude:-118.47277, latitude: 33.98561, rating: 5, placeId: 'ChIJQ80ljrm6woAR70e2byLAbKk'},
    { name: 'Mosswood Park', address:'397 W MacArthur Blvd Oakland, CA 94611', longitude:-122.26121, latitude: 37.82464, rating: 5, placeId: 'EiwzOTcgVyBNYWNBcnRodXIgQmx2ZCwgT2FrbGFuZCwgQ0EgOTQ2MDksIFVTQQ'},
    { name: 'Potrero Hill Recreation Center', address:'801 Arkansas St. San Francisco, CA 94107', longitude:-122.39756, latitude: 37.75696, rating: 4, placeId: 'ChIJdUEEFLR_j4ARHo6_zTIvyuY'},
    { name: 'Aptos Park', address:'San Francisco, CA 94127, United States', longitude:-122.46670, latitude: 37.72850, rating: 2, placeId: 'ChIJqfFWfch9j4ARt0Ip6Y5y1Ow'},
    { name: 'Tenderloin Childrens Playground', address:'San Francisco, CA 94109, United States', longitude:0, latitude: 0, rating: 2, placeId: 'ChIJQVAHV5CAhYARVTo8Y2Aoqvs'}
  ]);

  RSVP.bulkCreate([
    { starttime: new Date('December 17, 2015 13:00:00'), endtime: new Date('December 17, 2015 14:00:00'), CourtId: 1, UserId:1 },
    { starttime: new Date('December 20, 2015 13:00:00'), endtime: new Date('December 20, 2015 14:00:00'), CourtId: 1, UserId:1 },
    { starttime: new Date('December 18, 2015 11:00:00'), endtime: new Date('December 18, 2015 12:00:00'), CourtId: 2, UserId:2 },
    { starttime: new Date('December 19, 2015 15:00:00'), endtime: new Date('December 19, 2015 16:00:00'), CourtId: 3, UserId:3 },
    { starttime: new Date('December 21, 2015 15:00:00'), endtime: new Date('December 21, 2015 16:00:00'), CourtId: 4, UserId:1 },
    { starttime: new Date('December 21, 2015 15:00:00'), endtime: new Date('December 21, 2015 16:00:00'), CourtId: 4, UserId:2 },
    { starttime: new Date('December 21, 2015 17:00:00'), endtime: new Date('December 21, 2015 18:00:00'), CourtId: 3, UserId:3 },
    { starttime: new Date('December 21, 2015 17:00:00'), endtime: new Date('December 21, 2015 18:00:00'), CourtId: 5, UserId:1 },
    { starttime: new Date('December 21, 2015 17:00:00'), endtime: new Date('December 21, 2015 18:00:00'), CourtId: 5, UserId:4 },
    { starttime: new Date('December 21, 2015 18:00:00'), endtime: new Date('December 21, 2015 18:00:00'), CourtId: 5, UserId:2 }
  ]);
});

//orm.sync();

// User.sync();
// Court.sync();
// RSVP.sync();

//exports tables so other files can reference
exports.User = User;
exports.Court = Court;
exports.RSVP = RSVP;

