/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

'use strict';

module.exports = function(app, express) {
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

    app.post('/app/message', require('./api/support').sendMessage);


    //error handler
    app.use(require('./views/http/index').http500);
    app.use(require('./views/http/index').http404);
};