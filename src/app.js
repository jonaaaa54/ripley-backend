var path = require('path');
var vhost = require('vhost');
var express = require('express');
var mongoose = require('mongoose');
var api = require('./routes/routes');
var bodyParser = require('body-parser');
var configuration = require('./app-config');

var opts = {
  maxPoolSize: 10,
  autoIndex: false,
  loggerLevel: "error", 
  appname: "ripley-app",
  useNewUrlParser: true,
  useUnifiedTopology: true
};

var connectString = configuration.mongodb.connectionString;
mongoose.connect(connectString, opts, function (err) {
  if (err) throw err;
  console.log("==> Conexión establecida con MongoDB");
});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(vhost('api.*', api));
app.use('*', require('cors')());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(configuration.server.port, function () {
  console.log(`Listening on port ${configuration.server.port}`);
});
