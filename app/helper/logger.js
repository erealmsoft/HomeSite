/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 8/08/2014
 */

'use strict';

var     path        = require('path'),
    winston         = require('winston');

module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            colorize: true
        }),
        new (winston.transports.DailyRotateFile)({
            level: 'silly',
            filename: path.join(__dirname, '../../logs/access-'),
            datePattern: 'yyyy-MM-dd.log',
            maxsize: 5242880 /* 5MB */
        })
    ]
});