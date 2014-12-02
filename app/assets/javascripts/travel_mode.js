var MILE_PER_METER = 0.000621371;

var startAndEndStop = [];
var wayPoints = [];
var distanceBetweenStops = [];
var timeOnRoads = [];
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
    var stayTime = $(trip).find(".stop-stay_time");

    if ( i === 0 || i === stopNumber - 1 ) {
      startAndEndStop.push(address);
      stayTime.html("-")
    } else {
      wayPoints.push({location: address})
      stayTimeInt = parseInt(stayTime.html(), 10);
      stayTimes.push(stayTimeInt);
      stayTime.html(convertMinuteToHour(stayTimeInt))
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

      distanceBetweenStops = [];
      timeOnRoads = [];

      for (var i = 0; i < route.legs.length; i++) {
        distanceBetweenStops.push(route.legs[i].distance.value);
        timeOnRoads.push(route.legs[i].duration.value);
      }
    }
    callback();
  });
}

function displayDistanceAndDuration() {
  displayTimeAndDistanceToNextStop();
  displayTotalTime();
}

function displayTotalTime() {
  var totalTime = getTotalTime();
  $(".estimated-total-time").html(convertMinuteToHour(totalTime));
}

function displayTimeAndDistanceToNextStop() {
  $(".to-next-stop").each(function(index, toNextStopRow) {
    timeToNextStopInMinutes = secondsToMinutes(timeOnRoads[index]);
    distanceToNextStopInMeters = distanceBetweenStops[index];

    if( !isNaN(timeToNextStopInMinutes) ) {
      $(toNextStopRow).html(
        convertMinuteToHour(timeToNextStopInMinutes) + " (" +
        convertMeterToMile(distanceToNextStopInMeters) + ")"
      );
    }
  })
}

function getTotalTime() {
  var totalTimeOnRoad = eval(timeOnRoads.join("+"));
  var totalTimeOnRoadInMinutes = secondsToMinutes(totalTimeOnRoad);
  var totalStayTimeInMinutes = eval(stayTimes.join("+"));

  return totalTimeOnRoadInMinutes + totalStayTimeInMinutes;
}

function secondsToMinutes(timeInSeconds) {
  return parseInt(timeInSeconds/60, 10);
}

function convertMinuteToHour(timeInMinutes) {
  hours = parseInt(timeInMinutes/60, 10);
  minutes = timeInMinutes % 60;

  if (hours > 1) {
    return hours + " hours " + minutes + " minutes"
  } else if (hours === 1) {
    return hours + " hour " + minutes + " minutes"
  } else {
    return minutes + " minutes"
  }
}

function convertMeterToMile(distanceInMeters) {
  return (MILE_PER_METER* distanceInMeters).toFixed(2) + " miles";
}
