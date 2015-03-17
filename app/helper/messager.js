/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Steven on 8/22/2014.
 */
'use strict';
var config = require('../../lib/config'),
    mongoose = require('mongoose'),
    Message = mongoose.model('message');

exports.saveMessage = function(message) {
    if (config.mock) {
        return false;
    }
    (new Message(message)).save(function (err) {
    });
};
