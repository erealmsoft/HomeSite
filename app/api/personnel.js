/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Gavin on 8/18/2014.
 */
'use strict';

var dbHelper = require('../helper/dbhelper'),
    config = require('../../config');

exports.readStaff = function(req, res) {
    var language = req.params.language;
    if (config.mock) {
        res.send(require('./data/personnel_' + language +'.json'));
    } else {
        dbHelper.findArray('personnel_' + language, function(items){
            res.json(items);
        });
    }
};
