angular.module('app.courts', [])

// create CourtController to send data from database to the view 
.controller('CourtController', function ($scope, Court) {

  // this is dummy data, just to show something on the page. 
  $scope.data = {
    name: 'Oakland Park Court',
    address: '499 Market Street, San Francisco, CA 94111',
    schedule: {
      '1': {
        hour: '5:00pm',
        rsvps: 10
      },
      '2': {
        hour: '6:00pm',
        rsvps: 7
      }
    }
  };

  // function to fetch data for a single court from the database. 
  // this should be triggered by a click method on the google map.  
  $scope.getCourtInfo = function() {
    Court.getCourtInfo()
      .then(function(court){
        $scope.data.court = court.data;
      })
      .catch(function(error){
        console.log(error);
      });
  };
});
