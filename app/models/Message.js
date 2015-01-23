/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/23/15
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    message: { type: String, default: '' }
});

MessageSchema.path('name').validate(function (name) {
    return name.length;
}, 'Name cannot be blank');

MessageSchema.path('email').validate(function (email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}, 'Email cannot be blank');

MessageSchema.path('message').validate(function (message) {
    return message.length;
}, 'message cannot be blank');

module.exports = mongoose.model('message', MessageSchema,'messages');
