/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */


'use strict';

//var config = require("../config");
var auth = require('../app/helper/auth');
var csrf = require('csurf');
var expressWinston = require('express-winston');
var config = require('./config');

module.exports = function(app, passport) {

    app.use(function(req, res, next) {
        var logger = require('../app/helper/logger');
        logger.info('Request: ', req.originalUrl);
        next();
    });

    // views
    app.get('/', function(req, res) {
        res.render('index');
    });
    app.get('/contact', function(req, res) {
        res.render('contact');
    });
    app.get('/about', function(req, res) {
        res.render('about');
    });
    app.get('/news', function(req, res) {
        res.render('blog');
    });
    app.get('/work', function(req, res) {
        res.render('work');
    });
    app.get('/projectplan', function(req, res) {
        res.render('projectPlan');
    });
    app.get('/workdetails', function(req, res) {
        res.render('workDetails');
    });

    var api = require('../app/core.server');
    // API
    app.get('/app/posts/:language', api.getPosts);
    app.get('/back/postscheck/:language', api.checkPosts);

    app.post('/app/message', api.sendMessage);
    app.post('/app/projectplan', api.sendProject);
    app.get('/app/personnel/:language', api.readStaff);
    app.get('/app/partners/:language', api.readPartner);
    app.get('/app/teamphotos', api.getTeamPhotos);
    app.get('/app/contact/:language', api.readContacts);
    app.get('/app/management/:language', api.getTeamManagement);
    app.get('/app/technology', api.getTeamTech);

    app.use(csrf());
    // This could be moved to view-helpers :-)
    app.use(function (req, res, next) {
        res.locals.csrf_token = req.csrfToken();
        next();
    });
    // admin pages
    var admin = require('../app/admin.server');
    app.route('/admin/login').get(function(req, res) {
        res.render('admin/login');
    });
    app.route('/admin/logout').get(admin.logout);
    app.route('/admin').get(auth.requiresLogin, function(req, res) {
        res.render('admin/index');
    });

    // admin API
    app.post('/app/admin/login', admin.login);
    app.post('/app/admin/changepassword',auth.requiresLogin, admin.changePassword);

    app.get('/app/admin/users',auth.needGroup('superuser'), admin.getUsers);
    app.post('/app/admin/createuser',auth.needGroup('superuser'), admin.createUser);

    app.get('/app/admin/loglist',auth.needGroup('developer'), admin.getLogList);
    app.post('/app/admin/logtext',auth.needGroup('developer'), admin.getLogText);

    app.get('/app/admin/dblist',auth.needGroup('developer'), admin.getDBList);
    app.post('/app/admin/restoredb',auth.needGroup('developer'), admin.restoreDB);
    app.get('/app/admin/backupDB',auth.needGroup('developer'), admin.backupDB);
    app.post('/app/admin/buildProject',auth.needGroup('developer'), admin.buildProject);

    app.get('/app/admin/messages',auth.needGroup('developer'), admin.getMessageList);


    //error handler
    app.use(expressWinston.errorLogger(config.errorLogger));
    app.use(require('./../app/views/http/index').http500);
    app.use(require('./../app/views/http/index').http404);
};
