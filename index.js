let express = require("express");
let app = express();

require('map.prototype.tojson');
let devices = new Map();

const mdns = require('mdns');
let sequence = [
  mdns.rst.DNSServiceResolve()
  , mdns.rst.getaddrinfo({families: [4] })
];
const mdnsBrowser = mdns.createBrowser(mdns.tcp('relayAPI'),{resolverSequence: sequence});
mdnsBrowser.on('serviceUp', function(service) {
  devices.set(service.name, service.addresses[0] + ":" +  service.port);
  console.log("service up: ", service.name, "@", devices.get(service.name));
  console.log("devices: ", devices.toJSON());
});
mdnsBrowser.on('serviceDown', function(service) {
  console.log("service down: ", "@", service.name, devices.get(service.name));
  devices.delete(service.name);
  console.log("devices: ", devices.toJSON());
});
mdnsBrowser.start();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/devices", (req, res, next) => {
  console.log("client requesting devices: ", devices);
  res.json(devices.toJSON());
});
