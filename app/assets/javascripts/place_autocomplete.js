var input = document.getElementById('searchTextField');
var options = {componentRestrictions: {country: 'us'}};

new google.maps.places.Autocomplete(input, options);
