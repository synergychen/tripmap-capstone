var startAndEndStop = [];
var wayPoints = [];
var distances = [];
var durations = [];
var stayTimes = [];

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

$(function() {
  initialize();
  calcAndDrawAllRoute(displayDistanceAndDuration);

  $("#mode-select-tag").change(function(){
    calcAndDrawAllRoute(displayDistanceAndDuration);
  });
})

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  directionsDisplay.setMap(window.map);

  getStopsAndWaypoints();
}

function getStopsAndWaypoints() {
  var tripCity = $(".trip-city").find("a").html();
  var stopNumber = $(".location-stop-row").length;

  $.each($(".location-stop-row"), function(i, trip) {
    var stopAddress = $(trip).find(".location-address").html();
    var address = stopAddress + ", " + tripCity
    var stayTime = $(trip).find(".stop-stay_time").html();

    if ( i === 0 || i === stopNumber - 1 ) {
      startAndEndStop.push(address);
    } else {
      wayPoints.push({location: address})
      stayTimes.push(parseInt(stayTime, 10));
    }
  });
}

function calcAndDrawAllRoute(callback) {
  var selectedMode = $("#mode-select-tag")[0].value;

  var request = {
      origin: startAndEndStop[0],
      destination: startAndEndStop[1],
      waypoints: wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode[selectedMode]
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];

      distances = [];
      durations = [];

      for (var i = 0; i < route.legs.length; i++) {
        distances.push(route.legs[i].distance.value);
        durations.push(route.legs[i].duration.value);
      }
    }
    callback();
  });
}

function displayDistanceAndDuration() {
  var distanceSummary = $(".distance-summary");
  var durationSummary = $(".duration-summary");
  var stayTimeSummary = $(".stay_time-summary");

  distanceSummary.html(totalDistance());
  durationSummary.html(totalTimeOnRoad());
  stayTimeSummary.html(totalStayTime());
}

function totalDistance() {
  var distanceSum = 0;

  for ( var i = 0; i < distances.length; i++ ) {
    distanceSum += distances[i];
  }

  return "Total Distance: " + distanceSum + " meters";
}

function totalTimeOnRoad() {
  var durationSum = 0;

  for ( var i = 0; i < distances.length; i++ ) {
    durationSum += durations[i];
  }

  durationInMinutes = parseInt(durationSum/60, 10);

  return "Total Time On Road: " + durationInMinutes + " minutes";
}

function totalStayTime() {
  var stayTimeSum = 0;

  for ( var i = 0; i < stayTimes.length; i++ ) {
    stayTimeSum += stayTimes[i];
  }

  return "Total Stay Time: " + stayTimeSum + " minutes";
}
