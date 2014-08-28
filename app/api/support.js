/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 3/08/2014
 */
'use strict';

var config      = require('../../config'),
    mailer      = require('../helper/mailer');

exports.sendMessage = function(req, res) {
    var name     = req.body.name,
        email    = req.body.email,
        message  = req.body.message;
    req.checkBody('name', 'Invalid postparam').notEmpty().len(0, 20);
    req.checkBody('email', 'Invalid postparam').notEmpty().isEmail().len(0,50);
    req.checkBody('message', 'Invalid postparam').notEmpty().len(0,300);
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors', 400);
        return;
    }

    var storage = window.localStorage;
    var storagekey = storage.getItem("NG_TRANSLATE_LANG_KEY");
    if(storagekey =='en') {
        mailer.sendTemplate(name + '<' + email + '>', 'messageReciced', {fullName: name});
        mailer.sendTemplate(config.support, 'newContactMessage', {name: name, email: email, message: message});
    }
    else if(storagekey == 'cn'){
        mailer.sendTemplate(name + '<' + email + '>', 'messageReciced_cn', {fullName: name});
        mailer.sendTemplate(config.support, 'newContactMessage_cn', {name: name, email: email, message: message});
    }
    //save the email message into mongodb
    require('./save_email').saveMessage({name: name, email: email, message: message});

    res.json({code: 200, success: true});
};