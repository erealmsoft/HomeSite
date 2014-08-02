/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

'use strict';

var cluster = require('cluster');
var express = require('express');
var hbs = require('express-hbs');
var config = require('./config');
var app = express();

//config express in all environments
app.disable('x-powered-by');

// Use `.hbs` for extensions and find partials in `views/partials`.
hbs.registerHelper('angular', function(text) {
    return new hbs.SafeString(
            "{{" + text + "}}"
    );
});

app.engine('hbs', hbs.express3({
    layoutsDir: config.serverRoot + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', config.serverRoot + '/views');
app.use(express.compress());
app.use(express.favicon(config.clientRoot + '/images/favicon.ico'));
app.use(express.static(config.clientRoot));

require('./app/routes')(app, express);

app.listen(config.port, function () {
    console.log('Server running on port ' + config.port);
});