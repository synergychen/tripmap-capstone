var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var mmWorld = "1600 Broadway, New York";
var MOMA = "11 W 53rd St, New York";
var ROCK = "30 Rockefeller Plaza, New York";
var home = "200 w 48 street, New York";

var waypts = [{location: MOMA}, {location: ROCK}];

var distances = [];

var durations = [];

$(function() {
  initialize();
  calcRoute();
  console.log("after all calc", distances);
})

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  directionsDisplay.setMap(window.map);
}

function drawAllRoutes() {
}

function calcRoute() {
  // var selectedMode = document.getElementById('mode').value;
  var selectedMode = "WALKING";

  var request = {
      origin: mmWorld,
      destination: home,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode[selectedMode]
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];

      for (var i = 0; i < route.legs.length; i++) {
        distances.push(route.legs[i].distance.text);
        durations.push(route.legs[i].duration.text);
        console.log("in loop", distances);
      }
    }
  });

  console.log("after loop", distances);
}
