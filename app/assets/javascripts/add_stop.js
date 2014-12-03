$(function() {
  var newStopForm = $("form.new_stop");
  newStopForm.submit(postNewStopToServer);
});

function postNewStopToServer() {
  var newStopForm = $("form.new_stop");
  var stopData = newStopForm.serialize();
  var reqUrl = newStopForm.attr("action");

  var stopAddRequest = $.ajax({
    url: reqUrl,
    type: "POST",
    data: stopData
  });

  stopAddRequest.done(addStopDataToTable);
  stopAddRequest.fail(onFailure);

  resetForm();

  return false;
};

function addStopDataToTable(stopHtml) {
  var tripTable = $(".trip-table");
  var stopRow = $(stopHtml);
  tripTable.append(stopRow);
  $(".errors").html("");
  $("body").trigger("updateMap");
};

function onFailure(ajaxObject) {
  var htmlFromServer = ajaxObject.responseText;
  $(".errors").html(htmlFromServer);
};

function resetForm() {
  var newStopForm = $("form.new_stop");
  newStopForm.find("#stop_stay_time").val(0);
  newStopForm.find("#stop_transportation_mode").val("Walking");
};
