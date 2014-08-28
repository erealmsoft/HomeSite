/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

'use strict';

module.exports = function(app, express) {

    app.use(function(req, res, next) {
        var logger = require('./helper/logger');
        logger.info('Request: ', req.originalUrl);
        next();
    });

    app.get('/', function(req, res){
        res.render('index');
    });
    app.get('/contact', function(req, res){
        res.render('contact');
    });
    app.get('/about', function(req, res){
        res.render('about');
    });
    app.get('/work', function(req, res){
        res.render('work');
    });
    app.get('/project', function(req, res){
        res.render('project');
    });
    //the database manage page.
    app.get('/wojiubuxinninengcaidao',function(req,res){
        res.render('mongo_manage');
    });
    app.get('/app/dbQuery',require('./api/dbQuery').queryCollection);

    //test
    app.get('/app/dbCollections',require('./api/dbCollections').readCollections);

    app.post('/app/message', require('./api/support').sendMessage);

    app.get('/app/language', require('./api/language').readMsg);

    app.get('/app/personnel',require('./api/personnel').readStaff);

    app.get('/app/projects',require('./api/projects').readProjects);
    //error handler
    app.use(require('./views/http/index').http500);
    app.use(require('./views/http/index').http404);
};