(function() {
  $(function() {
    var newTripHeader = $(".new-trip > h3");
    var newTripBox = $(".new-trip");
    var incomingTrip = $(".incoming-trip");
    var archivedTrip = $(".archived-trip");

    initialize();
    newTripHeader.mouseover(showNewTripForm);
    incomingTrip.mouseover(hideNewTripForm);
    archivedTrip.mouseover(hideNewTripForm);
  })

  function initialize() {
    $(".new-trip-form").attr("style", "display: none;")
  }

  function showNewTripForm() {
    $(".new-trip-form").fadeIn();
  }

  function hideNewTripForm() {
    $(".new-trip-form").fadeOut();
  }
})();
