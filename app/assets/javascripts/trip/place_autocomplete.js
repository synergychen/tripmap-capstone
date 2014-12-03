$(function() {
  var input = document.getElementById('location_address');
  var options = {componentRestrictions: {country: 'us'}};

  new google.maps.places.Autocomplete(input, options);
})

