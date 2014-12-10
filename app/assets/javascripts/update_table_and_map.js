(function() {
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

    $("#mode-select-tag").change(function() {
      calcAndDrawAllRoute(displayDistanceAndDuration);
    });

    $("body").on("updateTableAndMap", function() {
      $("body").trigger("redrawMap");
      calcAndDrawAllRoute(displayDistanceAndDuration);
    });
  })

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsDisplay.setMap(window.map);
  }

  function calcAndDrawAllRoute(callback) {
    resetTimeAndDistance();
    getStopsAndWaypoints();

    var selectedMode = $("#mode-select-tag")[0].value;

    var request = {
      origin: startAndEndStop[0],
      destination: startAndEndStop[1],
      waypoints: wayPoints,
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

  function resetTimeAndDistance() {
    startAndEndStop = [];
    wayPoints = [];
    distanceBetweenStops = [];
    timeOnRoads = [];
    stayTimes = [];
  }

  function getStopsAndWaypoints() {
    var tripCity = $(".trip-city").find("a").html();
    var stopNumber = $(".location-stop-row").length;

    $(".location-stop-row").each(function(i, trip) {
      var stopAddress = $(trip).find(".location-address").html();
      var address = stopAddress + ", " + tripCity
      var stayTime = $(trip).find(".stop-stay_time");

      if ( i === 0 || i === stopNumber - 1 ) {
        startAndEndStop.push(address);
        stayTime.html("-")
      } else {
        wayPoints.push({location: address})
        stayTimeInt = parseInt(stayTime.attr("val"), 10);
        stayTimes.push(stayTimeInt);
        stayTime.html(convertMinuteToHour(stayTimeInt));
      }
    });
  }

  function displayDistanceAndDuration() {
    displayTimeAndDistanceToNextStop();
    displayTotalTime();
  }

  function displayTotalTime() {
    var totalTime = getTotalTime();
    var startsAtTimeArr = $(".starts_at").html().split(":");
    var startsAtHours = parseInt(startsAtTimeArr[0]);
    var startsAtMinutes = parseInt(startsAtTimeArr[1]);
    var finishHours = startsAtHours + parseInt(totalTime/60, 10);
    var finishMinutes = startsAtMinutes + totalTime % 60;
    var reformatedFinishHours =
      finishHours < 10 ? ("0" + finishHours) : finishHours;
    var reformatedFinishMinutes =
      finishMinutes < 10 ? ("0" + finishMinutes) : finishMinutes;
    var finishTime = reformatedFinishHours + " : " + reformatedFinishMinutes +
      " ( " + convertMinuteToHour(totalTime) + " )";
    $(".estimated-total-time").html(finishTime);
  }

  function displayTimeAndDistanceToNextStop() {
    stopNumber = $(".to-next-stop").length;
    $(".to-next-stop").each(function(index, toNextStopRow) {
      if (index === stopNumber - 1) {
        $(toNextStopRow).html("-");
      } else {
        timeToNextStopInMinutes = secondsToMinutes(timeOnRoads[index]);
        distanceToNextStopInMeters = distanceBetweenStops[index];

        if( !isNaN(timeToNextStopInMinutes) ) {
          $(toNextStopRow).html(
            convertMinuteToHour(timeToNextStopInMinutes) + " (" +
            convertMeterToMile(distanceToNextStopInMeters) + ")"
            );
        }
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

    if (hours >= 1) {
      return hours + " hr " + minutes + " min"
    } else {
      return minutes + " min"
    }
  }

  function convertMeterToMile(distanceInMeters) {
    return (MILE_PER_METER* distanceInMeters).toFixed(2) + " mi";
  }
})();
