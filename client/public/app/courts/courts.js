angular.module('app.courts', [])

// create CourtController to send data from database to the view
.controller('CourtController', function ($scope, $window, Court) {
  $scope.court = Court;
  $scope.rsvp = {};

  //allows users to add rsvp.  prepares resvp to be stored in table
  $scope.addRsvp = function () {
    var date = $scope.rsvp.date;
    var starttime = $scope.rsvp.starttime;
    var endtime = $scope.rsvp.endtime;
    var courtName = $scope.court.currentCourtData.name;
    var user = JSON.parse($window.localStorage.getItem('com.app'));
    var rsvp = {
      'date': date,
      'starttime': starttime,
      'endtime': endtime,
      'courtName': courtName,
      'userId': user.userId
    };
    //sends rsvp to rsvp table
    Court.postRsvp(rsvp);
  };
});
