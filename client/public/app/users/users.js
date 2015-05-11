angular.module('app.users', [])

// create UserController to send data from database to the view
.controller('UserController', function ($scope, $window, Profile, Auth) {

  // Puts relevant from the user token into scope to be rendered
  var user = JSON.parse($window.localStorage.getItem('com.app'));
  $scope.currentUser = {
    username: user.username,
    createdAt: user.createdAt
  };

  // Uses the the stored token's userId to get user's current rsvps
  // and puts them on the scope to be rendered by the partial
  Profile.getRSVP(user.userId).then(function(userRsvps){
    $scope.currentUser.rsvps = userRsvps;
  });

  //signs user out of logged in status
  //redirects user to login page
  $scope.signout = function(){
    Auth.signout();
  };



});
