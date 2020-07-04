function setToggle(relayOn, target) {
  if (relayOn !== $(target).prop('checked')) {
    $(target).prop('checked', relayOn).change();
  }
}

function createSetToggle(target) {
  return function (relayJson) {
    setToggle(JSON.parse(relayJson).relayIsOn, target);
  }
}

function handleToggle(event) {
  if ($(event.target).prop('checked')) {
    console.log("Toggle " + event.data.id + " on");
    $.post("http://" + event.data.url + "/on", createSetToggle(event.target))
  } else {
    console.log("Toggle " + event.data.id + " off");
    $.post("http://" + event.data.url + "/off", createSetToggle(event.target))
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
      let toggle = $("<input>").attr("id", id).attr("type",
          "checkbox").appendTo(h3);
      toggle.bootstrapToggle({
        onstyle: "success"
      });


      // the initial state is fetched from the relay
      $.getJSON("http://" + url + "/status", function (relayJson) {
        setToggle(relayJson.relayIsOn, toggle);
        console.log("device: ", id, "url: ", url, "on: ", toggle.prop('checked'));

        // the checkbox change handler calls the relay API
        toggle.change({id: id, url: url}, handleToggle);
      });
    });
    dl.hide().show();
  });
}

function load() {
  setInterval(refreshStatus, 10000);
  refreshStatus();
}

window.onload = load;