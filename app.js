/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

'use strict';
//require('newrelic');
var cluster = require('cluster'),
 express = require('express'),
 config = require('./lib/config'),
 app = express(),
 mongoose = require('mongoose'),
 passport = require('passport'),
 fs = require('fs'),
 path = require('path'),
 expressValidator = require('express-validator'),
 favicon = require('serve-favicon'),
 compression = require('compression'),
 bodyParser = require('body-parser'),
 swig = require('swig');

// Connect to mongodb
var connect = function () {
 var options = { server: { socketOptions: { keepAlive: 1 } } };
 mongoose.connect(config.mongodb, options);
};
connect();

mongoose.connection.on('error', console.log);
//mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(path.join(__dirname, './app/models')).forEach(function (file) {
 if (~file.indexOf('.js')) require(path.join(__dirname, './app/models/') + file);
});

// Bootstrap passport config
require('./lib/passport')(passport, config);

// Bootstrap application settings
require('./lib/express')(app, passport);

// Bootstrap routes
require('./lib/routes')(app, passport);

app.listen(config.port, function () {
    console.log('Server running on port ' + config.port);
});


