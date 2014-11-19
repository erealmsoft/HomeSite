/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

'use strict';
require('newrelic');
var cluster = require('cluster'),
 express = require('express'),
 hbs = require('express-hbs'),
 config = require('./config'),
 app = express(),
 expressValidator = require('express-validator'),
 favicon = require('serve-favicon'),
 compression = require('compression'),
 bodyParser = require('body-parser');

if (process.env.SITE_USER) {
    app.use(express.basicAuth(process.env.SITE_USER, process.env.SITE_PASS));
}

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


