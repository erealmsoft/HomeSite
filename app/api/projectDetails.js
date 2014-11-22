/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Don on 9/3/2014.
 */

'use strict';
var dbHelper = require('../helper/dbhelper');

exports.findProDetails = function(req, res) {

    dbHelper.findOne('projects_' + req.params.language, {ID: req.params.id}, function(item){
        res.json(item);
    });
};
