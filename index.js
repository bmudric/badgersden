import 'bootstrap';

let express = require("express");
let app = express();

let devices = require("./mdnsbrowser").devices;

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/devices", (req, res, next) => {
  console.log("client requesting devices: ", devices);
  res.json(devices.toJSON());
});

app.use('/', express.static('frontend'));