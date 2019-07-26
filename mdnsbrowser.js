require('map.prototype.tojson');
let devices = new Map();

const mdns = require('mdns');
let sequence = [
  mdns.rst.DNSServiceResolve()
  , mdns.rst.getaddrinfo({families: [4] })
];
const mdnsBrowser = mdns.createBrowser(mdns.tcp('relayAPI'),{resolverSequence: sequence});
mdnsBrowser.on('serviceUp', function(service) {
  let serviceUrl = service.addresses[0] + ":" +  service.port;
  devices.set(service.name, serviceUrl);
  console.log("service up: ", service.name, "@", devices.get(service.name));
  // console.log("devices: ", devices.toJSON());
});
mdnsBrowser.on('serviceDown', function(service) {
  console.log("service down: ", service.name, "@", devices.get(service.name));
  devices.delete(service.name);
  // console.log("devices: ", devices.toJSON());
});
mdnsBrowser.start();

exports.devices = devices;