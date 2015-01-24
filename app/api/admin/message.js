/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/24/15
 */

'use strict';

var mongoose = require('mongoose');
var Message = mongoose.model('message');

exports.getMessageList = function(req, res, next) {
    Message.find({},'name email message' , function (err, messages) {
        if (err) {
            return res.status(401).send();
        } else {
            return res.send(messages);
        }
    });
};