angular.module('app.auth', [])

// create AuthController to handle login and signup functions 
.controller('AuthController', function ($scope, $location, $window, Auth) {
  $scope.user = {};

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (credentials) {
        var user = {
          userId: credentials.id,
          username: credentials.username,
          createdAt: credentials.createdAt
        };
        $window.localStorage.setItem('com.app', JSON.stringify(user));
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (credentials) {
        var user = {
          userId: credentials.id,
          username: credentials.username,
          createdAt: credentials.createdAt
        };
        $window.localStorage.setItem('com.app', JSON.stringify(user));
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
