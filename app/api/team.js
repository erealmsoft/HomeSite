/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/23/15
 */

'use strict';

exports.readPartner = function(req, res) {
    var language = req.params.language;
    res.send(require('./data/partners_' + language +'.json'));
};

exports.readStaff = function(req, res) {
    var language = req.params.language;
    res.send(require('./data/personnel_' + language +'.json'));
};

exports.getTeamManagement = function(req, res) {
    var language = req.params.language;
    res.send(require('./data/management_' + language +'.json'));
};

exports.getTeamTech = function(req, res) {
    res.send(require('./data/technology.json'));
};

exports.getTeamPhotos = function(req, res) {
    //var options = {
    //    host: 'http://api.flickr.com',
    //    path: 'services/feeds/groups_pool.gne?id=2678732@N20&lang=en-us&format=json',
    //    method: 'GET',
    //    headers: {
    //    }
    //};
    //
    //http.request(options, function(request, response) {
    //    console.log(request.url);
    //
    //    request.pipe(res);
    //}).end();
    //request.get('http://api.flickr.com/services/feeds/groups_pool.gne?id=2678732@N20&lang=en-us&format=json').pipe(res);

    res.send(require('./data/flickr.json')); // FUCK GFW.
};