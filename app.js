/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

'use strict';
require('newrelic');
var cluster = require('cluster'),
 express = require('express'),
 config = require('./config'),
 app = express(),
 expressValidator = require('express-validator'),
 favicon = require('serve-favicon'),
 compression = require('compression'),
 bodyParser = require('body-parser'),
 swig = require('swig');

if (process.env.SITE_USER) {
    app.use(express.basicAuth(process.env.SITE_USER, process.env.SITE_PASS));
}

//config express in all environments
app.disable('x-powered-by');

swig.setDefaults({ varControls: ['{$', '$}'] });
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', config.serverRoot + '/views');
app.use(compression({
    threshold: 512
}));
app.use(favicon(config.clientRoot + '/favicon.ico'));
app.use(express.static(config.clientRoot));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator([]));

require('./app/routes')(app, express);

app.listen(config.port, function () {
    console.log('Server running on port ' + config.port);
});


