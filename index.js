let express = require("express");
let app = express();

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/', express.static('frontend'));

let devices = require("./mdnsbrowser").devices;
app.use("/devices", (req, res, next) => {
  console.log("client requesting devices: ", devices);
  res.json(devices.toJSON());
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});