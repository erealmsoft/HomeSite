/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Steven on 8/22/2014.
 */
'use strict';
var config = require("../../config");
exports.saveMessage = function(message) {
    if (!config.mock) {
        return false;
    }
    var db = require("dbhelper").conn_db(); //connect to the databases

    db.open(function(err, db) {

        if (err) {
            console.log(err);
            return false;
        }

        db.collection('email', {
            safe: true
        }, function(err, collection) {
            collection.insert(message, function() {

            });
            db.close();
            console.log("email has saved.the db-connection has closed.");
        });

    });

};
