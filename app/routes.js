/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

module.exports = function(app, express) {
    app.get('/', function(req, res){
        res.render('index');
    });


    //error handler
    app.use(require('./views/http/index').http500);
    app.use(require('./views/http/index').http404);
};