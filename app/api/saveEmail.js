/**
 *Copyright 2014 Erealm Info & Tech.
 *
 * Created by Steven on 8/22/2014.
 */
'use strict';

exports.saveMessage = function(message) {

    var db = require("../helper/dbhelper").conn_db(); //connect to the databases

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
