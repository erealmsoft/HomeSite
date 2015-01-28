/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 12/22/14
 */

'use strict';

var logger = require('../../helper/logger');

var fs = require("fs"),
    path = require("path");

function run_cmd(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) {
        resp += buffer.toString();
    });
    child.stdout.on('end', function() { callBack (resp) });
}

exports.buildProject = function(req,res){
    run_cmd( "./build.sh", ['restart'], function(text) {
        logger.info(text);
    });
    res.send({code: "success"});
};
exports.getDBList = function(req,res, next){
    var p = path.join(__dirname, '../../../build/');
    fs.readdir(p, function (err, files) {
        if (err) {
            next(err);
            return;
        }

        var result = [];
        files.forEach(function (file) {
            result.push(file);
        });
        res.json(result);
    });
};
exports.restoreDB = function(req, res, next) {
    run_cmd( "./DBInstall.sh", [req.body.db], function(text) {
        logger.info(text);
        res.send({code: "success"})
    });
};

exports.backupDB = function(req, res, next) {
    run_cmd( "./DBBackup.sh", [], function(text) {
        logger.info(text);
        res.send({code: "success"})
    });
};

