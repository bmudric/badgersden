let express = require("express");
let cors = require('cors');
let morgan = require('morgan');
let app = express();

app.use(morgan('combined'));
app.use(cors());

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap4-toggle/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap4-toggle/css'));
app.use('/', express.static('frontend'));

let devices = require("./mdnsbrowser").devices;
app.use("/devices", (req, res, next) => {
  console.log("client requesting devices: ", devices);
  res.json(devices.toJSON());
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log("Server running on port " + app.get('port'));
});