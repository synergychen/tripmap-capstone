$(function() {
  $(".trip-table").find("tbody").sortable().bind('sortupdate', function(event, ui) {
    var stopId = ui.item.data("stop-id");
    var newStopOrder = getAndDisplayNewStopOrder();
    var proposedOrder = newStopOrder.indexOf(stopId) + 1;

    updateServerStopOrder(stopId, proposedOrder);
  })
})

function getAndDisplayNewStopOrder() {
  var stops = $(".location-stop-row");
  var displayOrder = $(".stop-order");

  return stops.map(function(index, stop) {
    $(displayOrder[index]).html(index + 1)
    return $(stop).data("stop-id");
  }).get()
}

function updateServerStopOrder(stopId, proposedOrder) {
  var reqUrl = "/stops/" + stopId + "/stop_orders/";

  var stopOrderUpdateRequest = $.ajax({
    url: reqUrl,
    type: "PATCH",
    data: { stop: { order: proposedOrder }}
  });
}
