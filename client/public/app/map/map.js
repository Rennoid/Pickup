angular.module('app.map', [])

.controller('mapController', ['$scope','Court', function ($scope,Court){
  // object representing the entire map
  $scope.map = {};

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
    var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.writeAddressName(userLatLng);

    var myOptions = {
      zoom: 16,
      center: userLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    var marker = new google.maps.Marker({
      map: $scope.map,
      position: userLatLng
    });

    $scope.infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService($scope.map);

    var request = {
      location: userLatLng,
      radius: 500,
      types: ['park']
    };

    service.nearbySearch(request, $scope.populateMarkers);
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
    var image = {
      url: 'assets/img/verysmallball.png',
      size: new google.maps.Size(25,25),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0,0)
    };
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: placeLoc,
      icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
      $scope.infowindow.setContent(place.name);
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
   * Uses HTML5 geolocation to start the map building process
   * via the success callback or displays an error if not available
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

  /**
   * Sets entire process to start on load
   */
  // window.onload = geolocateUser;
}]);