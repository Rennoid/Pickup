angular.module('app.courts', [])

// create CourtController to send data from database to the view 
.controller('CourtController', function ($scope) {
  // to be completed... 

  // THOUGHTS: click event that determines which court data we will want to display happens on the main view -
  // i.e. in index.html. So the click event will need to trigger some type of controller action, which will then talk
  // to the server side so that the data for that specific court can be fetched from the database and then ultimately sent 
  // here to be rendered by the view... 
});