(function() {
  $(function() {
    var newLocationStopHeader = $(".new-location-stop > h3");
    var newLocationStopBox = $(".new-location-stop");

    initialize();
    newLocationStopHeader.mouseover(showNewLocationStopForm);
  })

  function initialize() {
    $(".new-location-stop-form").attr("style", "display: none;")
  }

  function showNewLocationStopForm() {
    $(".new-location-stop-form").fadeIn();
  }
})();
