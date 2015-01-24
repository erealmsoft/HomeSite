/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 12/13/14
 */

'use strict';

var fs = require("fs"),
    path = require("path");

exports.getLogList = function(req, res, next) {
    var p = path.join(__dirname, '../../../logs/');
    fs.readdir(p, function (err, files) {
        if (err) {
            next(err);
        }

        var result = [];
        files.forEach(function (file) {
            result.push(file);
        });
        res.json(result);
    });
};

exports.getLogText = function(req, res, next) {
    var file = path.join(__dirname, '../../../logs/') + req.body.log;
    fs.readFile(file,"utf8",function (err, data) {
        if (err) {
            next(err);
        }
        res.send(data.replace(/"/g, "'").replace(/\n/g, "<br>"));
    });
};
