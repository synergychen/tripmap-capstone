(function() {
  $(function() {
    locationStopBoxTitle = $(".all-locations-stops > h3");
    addStopLink = $(".all-locations-stops > p");
    addLocationStopTitle = $(".new-location-stop > h3");

    locationStopBoxTitle.on("click", function() {
      scrollTableToTop(addStopLink);
    });

    addStopLink.on("click", function() {
      scrollTableToTop(addLocationStopTitle);
    });
  })

  function scrollTableToTop(element) {
    $("body").animate({
      scrollTop: element.offset().top
    }, 1000);
  }
})()
