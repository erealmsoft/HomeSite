/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

'use strict';


var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var pkg = require(rootPath + '/package.json');
var winston = require('winston');

module.exports = {
    root: rootPath,
    serverRoot: rootPath + '/app',
    clientRoot: rootPath + '/public',
    port: process.env.PORT || 3000,
    mock: false,
    mongodb: 'mongodb://dangjian:dangjian@ds045107.mongolab.com:45107/homesite',
    blog: {
        API_KEY: process.env.BLOG_KEY
    },
    app: {
        name: process.env.NODE_ENV === 'production' ? pkg.name + ' (' + pkg.version + ')' : pkg.name + ' [' + pkg.version + ']',
        version: pkg.version,
        description: pkg.description
    },
    mail: {
        enable: true,
        fromaddress: 'eRealm Info & Tech',
        options: {
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        }
    },
    logger: {
        transports: [
            new winston.transports.Console({
                colorize: true
            })
        ]
    },
    errorLogger: {
        transports: [
            new winston.transports.Console({
                colorize: true
            })
        ]
    },
    support: 'hello@erealm.cn',
    projectName: 'eRealm-Home',
    copyrightName: 'eRealm'
};
