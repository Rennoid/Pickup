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
      return resp.data.token;
    });
  };

  var signup = function (user) {
    console.log("USER: ", user);
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.app');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.app');
    $location.path('/login');
  };


  return {
    signin: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});