/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Don on 9/5/2014.
 */
'use strict';
var config = require('../../lib/config');

exports.readContacts = function(req, res) {
    var language = req.params.language;
    res.send(require('./data/contact_' + language +'.json'));
};
