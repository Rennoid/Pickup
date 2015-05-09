angular.module('app.courts', [])

// create CourtController to send data from database to the view 
.controller('CourtController', function ($scope) {
  // to be completed... 

  $scope.data = {
    // this is dummy data, just to show something on the page. 
    // still need to work out how data will be received from the db 
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
  }
  // THOUGHTS: click event that determines which court data we will want to display happens on the main view -
  // i.e. in index.html. So the click event will need to trigger some type of controller action, which will then talk
  // to the server side so that the data for that specific court can be fetched from the database and then ultimately sent 
  // here to be rendered by the view... 
});