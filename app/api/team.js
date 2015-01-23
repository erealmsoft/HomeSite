/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/23/15
 */

'use strict';

var config = require('../../lib/config');

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