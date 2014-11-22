/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Don on 9/5/2014.
 */
'use strict';
var dbHelper = require('../helper/dbhelper'),
    config = require('../../config');

exports.readcontacts = function(req, res) {
    var language = req.params.language;
    if (config.mock) {
        res.send(require('./data/contact_' + language +'.json'));
    } else {
        dbHelper.findArray('contact_' + language, function (items) {
            res.json(items);
        });
    }
};
