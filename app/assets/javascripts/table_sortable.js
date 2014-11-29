$(function() {
  $(".trip-table").find("tbody").sortable().bind('sortupdate', function() {
    getNewOrder();
  })
})

function getNewOrder() {
  var stopsOrder = [];
  var stops = $(".stop-id");
  var stopNumber = stops.length;
  var displayOrder = $(".stop-order");

  console.log(stopNumber);

  for ( var i = 0; i < stopNumber; i++) {
    stopsOrder.push($(stops[i]).html());
    $(displayOrder[i]).html( i + 1 );
  }

  console.log(stopsOrder);
}
