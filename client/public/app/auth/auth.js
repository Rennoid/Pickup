angular.module('app.auth', [])

// create AuthController to handle login and signup functions 
.controller('AuthController', function ($scope, $location) {
  $scope.user = {};

  $scope.login = function () {
    // In shortly this called to an Auth service. Should we do the same? 
  };

  $scope.signup = function () {
    // In shortly this called to an Auth service. Should we do the same? 
  };
});