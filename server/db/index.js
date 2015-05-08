var Sequelize = require('sequelize');

var orm = new Sequelize('pickupDB', 'root','', {
  dialect: 'mysql',
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
  logitude: Sequelize.DECIMAL,
  lattitude: Sequelize.DECIMAL,
  rating: Sequelize.INTEGER
});

//creates new row in RSVP Table

var RSVP = orm.define('RSVP', {
  starttime: Sequelize.DATE,
  endtime: Sequelize.DATE
})

//establish relationships between tables
Court.hasMany(RSVP);
RSVP.belongsTo(Court);
User.hasMany(RSVP);
RSVP.belongsTo(User);


//Creates the tables
User.sync();
Court.sync();
RSVP.sync();

//exports tables so other files can reference
exports.User = User;
exports.Court = Court;
exports.RSVP = RSVP;