angular.module('app.map', [])

.controller('mapController', ['$scope','Court', function ($scope,Court){
  // object representing the entire map
  $scope.map = {};

  $scope.service = {};

  // object used to display information on a marker when clicked
  $scope.infowindow = {};

  /**
   * Uses Google Maps API Geocoding service to
   * write the address when provided with a latitude and longitude
   * @param  {[Object]} latLng [Google Maps API LatLng Object]
   */
  $scope.writeAddressName = function (latLng) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      "location": latLng
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK)
        document.getElementById("address").innerHTML = results[0].formatted_address;
      else
        document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
    });
  };

  /**
   * Builds and populates the map if the user
   * has a way to geolocate themselves
   * @param  {[Object]} position [HTML5 Geolocation Object]
   */
  $scope.geolocationSuccess = function (position) {
    // Creates a google maps latitude and longitude object from HTML geo coords
    var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    // Uses the Geocode service to change your coordinates to an address
    $scope.writeAddressName(userLatLng);

    // Sets how far you are initially zoomed in, where it's centered, and the type of map
    var myOptions = {
      zoom: 16,
      center: userLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Creates the map object at the dom element passed with the declared options
    $scope.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    // Creates a marker on the map. Just the act of declaring it puts it on, so you
    // don't need variable, but it seems odd to just use  new google.maps.Marker
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: userLatLng
    });

    // Creates a popup window object
    $scope.infowindow = new google.maps.InfoWindow();

    // Declares the Google Places object (wrapper on top of the Google Maps object)
    $scope.service = new google.maps.places.PlacesService($scope.map);

    // Sets the specifications for the Google Places search
    var request = {
      location: userLatLng,
      radius: 1000,
      types: ['park']
    };

    // Uses one of the types of search Google Places has to offer (nearbySearch)
    // The second parameter is a success callback to handle the results
    $scope.service.nearbySearch(request, $scope.populateMarkers);
  };

  /**
   * Creates markers based on the results from a 
   * Google Places API call
   * @param  {[Array]} results [Result from Google Places query]
   * @param  {[Object]} status  [Status object to determine if query is successful]
   */
  $scope.populateMarkers = function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        $scope.createMarker(results[i]);
      }
    }
  };

  /**
   * Uses a set image to create markers on the map and add an onclick
   * handler to each of them
   * @param  {[Object]} place [Google Places Object representing a point of interest]
   */
  $scope.createMarker = function (place) {

    // sets the basketball image to be used. This can also be a vector graphic. (one exists in assets/img)
    var image = {
      url: 'assets/img/verysmallball.png',
      size: new google.maps.Size(25,25),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0,0)
    };

    // Creates the marker for the current google place location
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: place.geometry.location,
      icon: image
    });

    // Adds a click listener on the created marker that
    // gets additional details from Google Places ($scope.service)
    google.maps.event.addListener(marker, 'click', function() {
      $scope.service.getDetails({ placeId: place.place_id }, function(thisplace,status){
        if(status === google.maps.places.PlacesServiceStatus.OK){
          // If successful, this will use the court service to retrieve the
          // list of rsvp's for the court if it exists and set current court data
          // in the Court service
          Court.getCourtSchedule({
            name: thisplace.name,
            address: thisplace.formatted_address,
            placeId: thisplace.place_id
          });
        }
      });

      // Sets the content for this marker's popup window
      $scope.infowindow.setContent(place.name);
      // Opens the popup window for this marker
      $scope.infowindow.open($scope.map, this);
    });
  };

  /**
   * Displays an error message if HTML5 geolocation fails
   * @param  {[Object]} positionError [Error Object]
   */
  $scope.geolocationError = function (positionError) {
    document.getElementById("error").innerHTML += "Error: " + positionError.message + "<br />";
  };

  /**
   * Conditionally provides HTML5 geolocation settings and on success, begins the process of finding Google Places locations
   * If not, provides an error to the user
   */
  $scope.geolocateUser = function() {
    if (navigator.geolocation) {
      var positionOptions = {
        enableHighAccuracy: true,
        timeout: 10 * 1000
      };
      navigator.geolocation.getCurrentPosition($scope.geolocationSuccess, $scope.geolocationError, positionOptions);
    } else {
      document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
    }
  };
}]);