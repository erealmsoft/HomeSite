/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 3/08/2014
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    config = require('../../lib/config'),
    nodemailer = require('nodemailer');

function Mailer() {
    this.templates = {
        "messageReciced": {
            "file": "message-received.html",
            "subject": "[ eRealm Info & Tech] Message Received"
        },
        "newContactMessage": {
            "file": "new-contact-message.html",
            "subject": "[ eRealm Info & Tech] New Message from Customer"
        },
        "messagePlanReciced": {
            "file": "message-projectplan-received.html",
            "subject": "[ eRealm Info & Tech] ProjectPlan Received"
        },
        "newProjectplanMessage": {
            "file": "new-projectplan-message.html",
            "subject": "[ eRealm Info & Tech] New ProjectPlan from Customer"
        }
    };

    this.path = path.normalize(path.join(__dirname, '../templates/'));
    this.transport = nodemailer.createTransport("SMTP", _.clone(config.mail.options) || {});
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
            if (error) {
                logger.error(error);
            }
        });
    } catch (err) {
        logger.error(err);
    }
};

module.exports = new Mailer();
