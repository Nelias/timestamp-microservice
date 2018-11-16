// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var PORT = 8080;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", function (req, res) {
  res.json({"unix": new Date().getTime(), "utc": new Date().toUTCString()});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  console.log(typeof req.params.date_string)
  if (new Date(req.params.date_string).toUTCString() === "Invalid Date") {
    res.json({"error": "Invalid Date" });
  } else {
    res.json({"unix": new Date(req.params.date_string).getTime(), "utc": new Date(req.params.date_string).toUTCString()});
  }
});

var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});