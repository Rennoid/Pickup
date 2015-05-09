angular.module('app.services', [])

.factory('Auth', function ($http, $location, $window) {

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

.factory('Court', function ($http, $location, $window){
  var getCourtInfo = function() {
    return $http({
      method: 'GET',
      url: '/api/rsvp/findCourt'
    })
    .success(function(data, status, headers, config) {
      return data;
    })
    .error(function(data, status, headers, config) {
      return data;
    });
  };

  return {
    getCourtInfo: getCourtInfo
  };
});
