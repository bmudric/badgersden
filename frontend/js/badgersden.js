$(function() {
  $('#relay01').change(function() {
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
    $.each(devices, function (id, url) {
      console.log("device: ", id, "url: ", url);
    })
  });
}

function load() {
  setInterval(refreshStatus, 10000);
  refreshStatus();
}

window.onload = load;