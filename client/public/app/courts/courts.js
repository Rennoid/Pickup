angular.module('app.courts', [])

// create CourtController to send data from database to the view 
.controller('CourtController', function ($scope, Court) {
  $scope.court = Court;
});
