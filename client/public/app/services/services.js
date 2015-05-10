angular.module('app.services', [])

.factory('Auth', function ($http, $location, $window) {

  //$scope.user = {};

  var login = function (user) {
    console.log('USER:' , user);
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

  var isAuth = function () {
    console.log("AUTH CHECK: ", !!$window.localStorage.getItem('com.app'));
    return !!$window.localStorage.getItem('com.app');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.app');
    $location.path('/login');
  };


  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})

.factory('Court', function ($http){
  var getCourtInfo = function(court) {
    return $http({
      method: 'GET',
      url: '/api/court/findCourt',
      data: court.address
    })
    .then(function(response){
      return response.data;
    });
  };

  var getCourtSchedule = function(court) {
    return $http({
      method: 'GET',
      url: '/api/'+court.id+'/rsvp',
      data: court
    })
    .then(function (response){
      return response.data;
    });
  };

  return {
    getCourtInfo: getCourtInfo,
    getCourtSchedule: getCourtSchedule
  };
})

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