/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/6/15
 */

'use strict';

var cluster = require('cluster'),
    express = require('express'),
    session = require('express-session'),
    config = require('./config'),
    app = express(),
    mongoStore = require('connect-mongo')(session),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    expressValidator = require('express-validator'),
    favicon = require('serve-favicon'),
    helmet = require('helmet'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    swig = require('swig'),
    pkg = require('../package.json');

module.exports = function (app, passport) {

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

    // CookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({ secret: 'secret' }));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: pkg.name,
        store: new mongoStore({
            url: config.mongodb,
            collection : 'sessions'
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    app.use(function(req, res, next) {
        res.locals.user = req.user;
        next();
    });
};