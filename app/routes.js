/**
 *Copyright 2014 Erealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

'use strict';

var config = require("../config");

module.exports = function(app, express) {

    app.use(function(req, res, next) {
        var logger = require('./helper/logger');
        logger.info('Request: ', req.originalUrl);
        next();
    });

    app.get('/', function(req, res) {
        res.render('index');
    });
    app.get('/contact', function(req, res) {
        res.render('contact');
    });
    app.get('/about', function(req, res) {
        res.render('about');
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
    //    app.get('/project', function(req, res){  //Temporarily useless
    //        res.render('project');
    //    });

    app.post('/app/message', require('./api/support').sendMessage);

    app.post('/app/projectplan', require('./api/projectplan').sendProject);

    app.get('/app/language', require('./api/language').readMsg);

    app.get('/app/personnel/:language', require('./api/personnel').readStaff);

    app.get('/app/partners/:language', require('./api/partners').readPartner);

    app.get('/app/projects/:language/:flag', require('./api/projects').readProjects);

    app.get('/app/projectDetails/:id/:language', require('./api/projectDetails').findProDetails);

    app.get('/app/contact/:language', require('./api/contacts').readcontacts);


    //the database manage page.
    app.get('/' + config.dbManage, function(req, res) {
        res.render('mongo_manage');
    });

    app.get('/app/dbCollections', require('./api/dbCollections').readCollections);
    app.get('/app/dbQuery/:collectionName', require('./api/dbQuery').queryCollection);
    app.post('/app/dbSave', require('./api/dbSave').saveCollection);


    //error handler
    app.use(require('./views/http/index').http500);
    app.use(require('./views/http/index').http404);
};
