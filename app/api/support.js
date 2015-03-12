/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 3/08/2014
 */
'use strict';

var config = require('../../lib/config'),
    mailer = require('../helper/mailer'),
    util = require('../helper/util');



var cn = require('./data/content_cn.json');
var en = require('./data/content_en.json');

exports.sendMessage = function(req, res) {
    var name = req.body.name,
        email = req.body.email,
        message = req.body.message;
    req.checkBody('name', 'Invalid postparam').notEmpty().len(0, 20);
    req.checkBody('email', 'Invalid postparam').notEmpty().isEmail().len(0, 50);
    req.checkBody('message', 'Invalid postparam').notEmpty().len(0, 300);
    var errors = req.validationErrors();
    if (errors) {
        res.send({code: 'error_005'});
        return;
    }

    var storagekey = util.parseCookies(req).NG_TRANSLATE_LANG_KEY;
    console.log(storagekey);
    var language = '';
    if (storagekey === '"cn"') {
        language = cn;
    } else {
        language = en;
    }
    mailer.sendTemplate(name + '<' + email + '>', 'messageReciced', {
        language: language,
        fullName: name
    });
    mailer.sendTemplate(config.support, 'newContactMessage', {
        language: language,
        name: name,
        email: email,
        message: message
    });

    //save the email message into mongodb
    require('../helper/messager').saveMessage({
        name: name,
        email: email,
        message: message
    });

    res.json({code: 'success_001'});
};
