$(function () {
  $('#relay01').change(function () {
    console.log("Toggle...")
    if ($('#relay01').prop('checked')) {
      $.getJSON("http://192.168.178.151:80/on", setToggle)
    } else {
      $.getJSON("http://192.168.178.151:80/off", setToggle)
    }
  })
});

function setToggle(relayJson) {
  let relayOn = Boolean(relayJson["relayIsOn"] === "true");
  $("#relay01").prop("checked", relayOn).change();
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

      // apply the toggle function to the added relay
      toggle.change(function () {
        console.log("Toggle " + id);
        if ($('#relay01').prop('checked')) {
          $.getJSON("http://" + url + "/on", setToggle)
        } else {
          $.getJSON("http://" + url + "/off", setToggle)
        }
      });
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