angular.module('app.users', [])

// create UserController to send data from database to the view 
.controller('UserController', function ($scope,$window,Profile) {

  var user = JSON.parse($window.localStorage.getItem('com.app'));
  $scope.currentUser = {
    username: user.username,
    createdAt: user.createdAt
  };

  Profile.getRSVP(user.userId).then(function(userRsvps){
    console.log(userRsvps);
    $scope.currentUser.rsvps = userRsvps;
  });
});
