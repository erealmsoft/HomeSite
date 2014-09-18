/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 3/08/2014
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    config = require('../../config'),
    nodemailer = require('nodemailer');

function Mailer() {
    this.templates = {
        "messageReciced": {
            "file": "message-received.html",
            "subject": "[ Erealm Info & Tech Sdn Bhd] Message Received"
        },
        "newContactMessage": {
            "file": "new-contact-message.html",
            "subject": "[ Erealm Info & Tech Sdn Bhd] New Message from Customer"
        },
        "messagePlanReciced": {
            "file": "message-projectplan-received.html",
            "subject": "[ Erealm Info & Tech Sdn Bhd] ProjectPlan Received"
        },
        "newProjectplanMessage": {
            "file": "new-projectplan-message.html",
            "subject": "[ Erealm Info & Tech Sdn Bhd] New ProjectPlan from Customer"
        }
    };

    this.path = path.normalize(path.join(__dirname, '../templates/'));
    this.transport = nodemailer.createTransport(config.mail.transport, _.clone(config.mail.options) || {});
}

Mailer.prototype.sendTemplate = function(to, templateName, data) {
    var template = this.templates[templateName];
    if (!template){
        return;
    }
    var compiledTemplate = template.compiledTemplate;
    if (!compiledTemplate) {
        var source = fs.readFileSync(path.join(this.path, template.file), 'utf8');
        compiledTemplate = this.templates[templateName].compiledTemplate = handlebars.compile(source);
    }
    return this.send({
        subject: template.subject,
        html: compiledTemplate(data),
        to: to
    });
};

Mailer.prototype.send = function(mailOptions) {

    if (!(mailOptions && mailOptions.subject && mailOptions.html)) {
        return;
    }

    var from = (config.mail && config.mail.fromaddress),
        to = mailOptions.to;

    var logger = require('./logger');
    logger.info('Mail: ', JSON.stringify(mailOptions));

    mailOptions = _.extend(mailOptions, {
        from: from,
        to: to,
        generateTextFromHTML: true
    });

    try {
        this.transport.sendMail(mailOptions, function(error, response) {

        });
    } catch (err) {}
};

module.exports = new Mailer();
