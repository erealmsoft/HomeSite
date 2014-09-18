/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

'use strict';


var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var pkg = require(rootPath + '/package.json');

module.exports = {
    root: rootPath,
    serverRoot: rootPath + '/app',
    clientRoot: rootPath + '/public',
    port: process.env.PORT || 3000,
    app: {
        name: process.env.NODE_ENV === 'production' ? pkg.name + ' (' + pkg.version + ')' : pkg.name + ' [' + pkg.version + ']',
        version: pkg.version,
        description: pkg.description
    },
    mail: {
        enable: true,
        transport: 'SMTP',
        fromaddress: ' Erealm Info & Tech Sdn Bhd <hello@erealm.com.my>',
        options: {
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        }
    },
//    dbManage:process.env.DB_MANAGE,
    dbManage:'wojiubuxinninengcaidao',
    support: 'ken@erealm.com.my',
    projectName: 'eRealm-Home',
    copyrightName: 'eRealm'
};
