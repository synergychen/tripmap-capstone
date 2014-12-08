(function() {
  $(function() {
    var newLocationStopHeader = $(".new-location-stop > h3");
    var newLocationStopBox = $(".new-location-stop");
    var allLocationStopBox = $(".all-locations-stops");

    initialize();
    newLocationStopHeader.mouseover(showNewLocationStopForm);
    allLocationStopBox.mouseover(hideNewLocationStopForm);
  })

  function initialize() {
    $(".new-location-stop-form").attr("style", "display: none;")
  }

  function showNewLocationStopForm() {
    $(".new-location-stop-form").fadeIn();
  }

  function hideNewLocationStopForm() {
    $(".new-location-stop-form").fadeOut();
  }
})();
