angular.module('app.courts', [])

// create CourtController to send data from database to the view
.controller('CourtController', function ($scope, $state, $window, Court) {
  $scope.court = Court;
  $scope.state = $state;
  $scope.rsvp = {};
  //allows users to add rsvp.  prepares rsvp to be stored in table
  $scope.addRsvp = function () {
    var date = $scope.rsvp.date;
    var starttime = $scope.rsvp.starttime;
    var endtime = $scope.rsvp.endtime;
    var courtName = $scope.court.currentCourtData.name;
    var address = $scope.court.currentCourtData.address;
    var placeId = $scope.court.currentCourtData.placeId;
    var user = JSON.parse($window.localStorage.getItem('com.app'));
    var rsvp = {
      'date': date,
      'starttime': starttime,
      'endtime': endtime,
      'courtName': courtName,
      'userId': user.userId,
      'placeId': placeId,
      'address': address
    };

    $scope.reloadState = function() {
      $scope.state.reload();
    }

    Court.postRsvp(rsvp)
      .then(function (data){
        $scope.reloadState();
      });

    $scope.rsvp = null;
    $scope.court.currentCourtData = {};
  };
});
