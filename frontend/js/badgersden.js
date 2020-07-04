function setToggle(relayJson) {
  let relayOn = Boolean(relayJson["relayIsOn"] === "true");
  $("#relay01").prop("checked", relayOn).change();
}

function initializeToggle(event) {
  console.log("Toggle " + event.data.id);
  if ($(event.data.id).prop('checked')) {
    $.getJSON("http://" + event.data.url + "/on", setToggle)
  } else {
    $.getJSON("http://" + event.data.url + "/off", setToggle)
  }
}

function refreshStatus() {
  return $.getJSON("http://localhost:3000/devices", function (devices) {
    let dl = $("#deviceList").empty();
    $.each(devices, function (id, url) {
      // append checkbox for relay in the list
      let li = $("<li>").attr("class", "list-group-item").appendTo(dl);
      let div = $("<div>").attr("class", "form-group").appendTo(li);
      let h3 = $("<h3>").appendTo(div);
      $("<label>").attr("for", id).text(id).appendTo(h3);
      let toggle = $("<input>").attr("id", id).attr("type", "checkbox").appendTo(h3);
      toggle.bootstrapToggle();
      toggle.change({id: id, url: url}, initializeToggle);
      console.log("device: ", id, "url: ", url);
    });
    dl.hide().show();
  });
}

function load() {
  setInterval(refreshStatus, 10000);
  refreshStatus();
}

window.onload = load;