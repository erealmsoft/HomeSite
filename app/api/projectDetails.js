/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by Don on 9/3/2014.
 */

'use strict';

exports.findProDetails = function(req, res) {
    var db = require("../helper/dbhelper").conn_db(); //connect to the databases

    var id = req.params.id;
    var language = req.params.language;

    db.open(function(err, db) {

        if (err) {
            console.log(err);
            return false;
        }
        var collectionName = 'projects_' + language;
        db.collection(collectionName, {
            safe: true
        }, function(err, collection) {
            collection.findOne({
                ID: id
            }, function(err, items) {
                if (err) {
                    console.log(err);
                    return false;
                }
                res.json(items);
                db.close();
                console.log("the db-connection is closed.");
            });
        });

    });

};
