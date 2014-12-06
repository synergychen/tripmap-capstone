(function() {
  $(function() {
    placeAutocomplete();

    $("form.new_location").submit(postNewLocationToServer);
  })

  function postNewLocationToServer() {
    var newLocationForm = $("form.new_location");
    var locationData = newLocationForm.serialize();
    var reqUrl = newLocationForm.attr("action");

    var locationAddRequest = $.ajax({
      url: reqUrl,
        type: "POST",
        data: locationData
    });

    locationAddRequest.done(function() {
      resetForm();
    });

    locationAddRequest.fail(onFailure);

    return false;
  };

  function onFailure(ajaxObject) {
    var htmlFromServer = ajaxObject.responseText;
    $(".location-errors").html(htmlFromServer);
  };

  function resetForm() {
    locationName = $("#location_name")
    locationAddress = $("#location_address");
    locationName.val("");
    locationAddress.blur();
    locationAddress.val("");
  };

  function placeAutocomplete() {
    var input = document.getElementById('location_address');
    var options = {componentRestrictions: {country: 'us'}};

    new google.maps.places.Autocomplete(input, options);
  }
})();
