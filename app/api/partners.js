/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Don on 8/18/2014.
 */
'use strict';

var dbHelper = require('../helper/dbhelper'),
    config = require('../../config');

exports.readPartner = function(req, res) {
    var language = req.params.language;
    if (config.mock) {
        res.send(require('./data/partners_' + language +'.json'));
    } else {
        dbHelper.findArray('partners_' + language, function(items){
            res.json(items);
        });
    }
};
