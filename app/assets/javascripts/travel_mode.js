var startAndEndStop = [];
var waypts = [];
var distances = [];
var durations = [];

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

$(function() {
  initialize();
  calcAndDrawAllRoute();
  $("#mode-select-tag").change(calcAndDrawAllRoute);
})

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  directionsDisplay.setMap(window.map);

  getStopsAndWaypoints();
}

function getStopsAndWaypoints() {
  var tripCity = $(".trip-city").find("a").html();
  var stopNumber = $(".trip-table-row").length;

  $.each($(".trip-table-row"), function(i, trip) {
    var stopAddress = $(trip).find(".location-address").html();
    var address = stopAddress + ", " + tripCity

    if ( i === 0 || i === stopNumber - 1 ) {
      startAndEndStop.push(address);
    } else {
      waypts.push({location: address});
    }
  });
}

function calcAndDrawAllRoute() {
  var selectedMode = $("#mode-select-tag")[0].value;

  var request = {
      origin: startAndEndStop[0],
      destination: startAndEndStop[1],
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
      }
    }
  });
}
