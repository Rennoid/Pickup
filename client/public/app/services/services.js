angular.module('app.services', [])

.factory('Auth', function ($http, $location, $window) {

  //submits post request to backend to login.
  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    })
    .then(function (resp) {
      // return resp.data.token;
      return resp.data;
    });
  };

  //submits post request to backend to signup
  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  //checks to see if user has token
  var isAuth = function () {
    return !!$window.localStorage.getItem('com.app');
  };

  //signouts out users
  //redirects user to login page
  var signout = function () {
    $window.localStorage.removeItem('com.app');
    $location.path('/login');
  };

  //allows functions to be referenced
  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})

.service('Court', function ($http){
  // Sets initial data for courts partial
  // Can possibly be removed now
  this.currentCourtData = {};

  // Attempts to find if an object returned
  // by Google Places API is in our database
  this.getCourtInfo = function(court) {
    return $http({
      method: 'GET',
      url: '/api/court/findCourt',
      params: court
    })
    .then(function(response){
      return response.data;
    });
  };

  // Called in the map Controller
  // Sets up the court partial with initial data
  // when a marker is clicked on and if it exists
  // in our database, returns all applicable RSVP's.
  this.getCourtSchedule = function(court) {
    var that = this;
    this.getCourtInfo(court).then(function(results){
      //console.log(results);
      that.currentCourtData.name = results.name;
      that.currentCourtData.address = results.address;
      that.currentCourtData.schedule = [];
      that.currentCourtData.id = results.id;
      that.currentCourtData.placeId = results.placeId;
      if(results.id){
        $http({
          method: 'GET',
          url: '/api/court/'+results.id+'/rsvp'
        })
        .then(function (response){
          var rsvps = response.data;
          var rsvpsByTime = {};

          //going through all rsvps returned back for a given court
          for(var i = 0; i < rsvps.length; i ++){
            if(!rsvpsByTime[rsvps[i]["starttime"]]) {
              rsvpsByTime[rsvps[i]["starttime"]]= 1;
            } else {
              rsvpsByTime[rsvps[i]["starttime"]]= rsvpsByTime[rsvps[i]["starttime"]]+1;
            }
          }
          //blankArray turns the object back into an Array with
          // objects inside with different start times
          var blankArray = [];
          for(var key in rsvpsByTime){
            var starttime = key;
            var endtime = key + 1
            blankArray.push({starttime: starttime, count: rsvpsByTime[key]})
          }
          that.currentCourtData.schedule = blankArray;
        })
        .catch(function(error){
          return new Error('An error occurred while looking up the schedule: ',error);
        });
      }
    })
    .catch(function(error){
      return new Error('An error occurred while looking up the schedule: ',error);
    });
  };

  this.postRsvp = function (rsvp) {
    return $http({
      method: 'POST',
      url: '/api/rsvp/addRsvp',
      data: rsvp
    })
    .then(function (resp) {
      // return resp.data.token;
      return resp.data;
    });
  };
})

/**
 * Retrieves RSVP's for user so it can be rendered in
 * user profile partial
 */
.service('Profile', ['$http', function ($http){
  this.getRSVP = function(userId){
    return $http({
      method: 'GET',
      url: '/api/rsvp/'+userId,
    })
    .then(function (response){
      return response.data;
    });
  };
}]);