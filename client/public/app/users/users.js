angular.module('app.users', [])

// create UserController to send data from database to the view 
.controller('UserController', function ($scope) {
  // to be completed... 
  $scope.currentUser = {
    username: "MWBENNETT",
    createdAt: "12/15/2015",
    rsvps: {
      '1': {
        court: 'Oakland Park',
        starttime: '5:00pm',
        endtime: '7:00pm',
        date: '12/5/2015'
      },
      '2': {
        court: 'Metro Park',
        starttime: '5:00pm',
        endtime: '7:00pm',
        date: '12/6/2015'
      },
      '3': {
        court: 'Syntax Park',
        starttime: '4:00pm',
        endtime: '5:00pm',
        date: '12/2/2015'
      }
    }
  }
});