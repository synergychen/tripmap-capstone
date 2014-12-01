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
};

function onFailure(ajaxObject) {
  var htmlFromServer = ajaxObject.responseText;
  $(".errors").html(htmlFromServer);
};

function resetForm() {
  var newTaskForm = $("form#new_task");
  newTaskForm.find("#task_title, #task_description").val("");
  newTaskForm.find("#task_title").focus();
};
