(function() {
  var markers = [];

  $(function() {
    initializeMap();
    drawMap();

    $("body").on("redrawMap", function(){
      drawMap();
    });
  })

  function initializeMap(){
    var mapOptions = {
      zoom: 12,
    };

    window.map = new google.maps.Map($("#map-canvas")[0], mapOptions);
    window.mapBound = new google.maps.LatLngBounds();
  }

  function drawMap() {
    removeAllMarkers();

    $(".location-stop-row").each(function(i, trip) {
      var stopAddress = $(trip).find(".location-address").html();
      var locationName= $(trip).find(".location-name").html();

      codeAddress(stopAddress, function(geocodeAddress){
        marker = addMarker(i+1, geocodeAddress);
        markers.push(marker);

        infowindow = addInfoWindow(locationName);
        infowindow.open(map, marker);

        setBounds(geocodeAddress)
      });
    });
  };

  function codeAddress(address, callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var geoPosition = results[0].geometry.location;
        callback(geoPosition);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  function addMarker(index, geocodeAddress) {
    return new google.maps.Marker({
      map: window.map,
           position: geocodeAddress,
           icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+ index +'|FF776B|000000',
    });
  }

  function removeAllMarkers(){
    for(var i = 0; i < markers.length; i++){
      var marker = markers[i];
      marker.setMap(null);
    }
  }

  function addInfoWindow(title) {
    return new google.maps.InfoWindow({
      content: title
    });
  }

  function setBounds(latlng) {
    window.mapBound.extend(latlng);
    window.map.fitBounds(window.mapBound)
  }
})();
