$(function() {
  $("body").on("click", ".stop-stay_time", editStayTime);
  $("body").on("keydown", ".stop-stay_time", submitOnEnter);
});

var editStayTime = function() {
  var stopStayTime = $(this);
  stopStayTime.attr("contenteditable", true).focus();
};

function submitOnEnter(){
  var stopStayTime = $(this);
  var enterKeyCode = 13;

  if (event.keyCode === enterKeyCode) {
    var newStayTime = stopStayTime.text();
    var locationStop = stopStayTime.parent(".location-stop-row");
    var tripId = locationStop.data("trip-id");
    var stopId = locationStop.data("stop-id");
    var reqUrl = "/trips/" + tripId + "/stops/" + stopId;

    var stopUpdateRequest= $.ajax({
      url: reqUrl,
      type: "PATCH",
      data: { stop: { stay_time: newStayTime }}
    });

    stopUpdateRequest.done(function(){
      stopStayTime.removeAttr("contenteditable");
    });

    return false;
  }
}
