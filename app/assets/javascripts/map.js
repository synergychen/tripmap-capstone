$(function() {
  initializeMap();
  drawMap();
})

function initializeMap(){
  var mapOptions = {
    zoom: 12,
  };

  window.map = new google.maps.Map($("#map-canvas")[0], mapOptions);
  window.mapBound = new google.maps.LatLngBounds();
}

function drawMap() {
  var tripCity = $(".trip-city").find("a").html();

  $.each($(".location-stop-row"), function(i, trip) {
    var stopOrder = $(trip).find(".stop-order").html();
    var stopAddress = $(trip).find(".location-address").html();
    var locationName= $(trip).find(".location-name").html();
    var address = stopAddress + ", " + tripCity

    codeAddress(address, function(geocodeAddress){
      marker = addMarker(i+1, geocodeAddress);

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

function addInfoWindow(title) {
  return new google.maps.InfoWindow({
    content: title
  });
}

function setBounds(latlng) {
  window.mapBound.extend(latlng);
  window.map.fitBounds(window.mapBound)
}
