/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Steven on 8/28/2014.
 */
'use strict';

exports.saveCollection = function(req, res) {

    var db = require("../helper/dbhelper").conn_db();

    var collectionName = req.body.collectionName;
    var collectionContent = req.body.collectionContent;

    //    console.log(collectionName);
    //    console.log(collectionContent);

    db.open(function(err, db) {

        if (err) {
            console.log(err);
            return false;
        }

        db.collection(collectionName, {
            safe: true
        }, function(err, collection) {
            collection.remove(function(err, numberOfRemovedDocs) {
                console.log("numberOfRemovedDocs: " + numberOfRemovedDocs);
            });
            collection.insert(collectionContent, {
                safe: true
            }, function(err, result) {
                console.log("insertResult: ");
                console.log(result);
            });
        });
    });

    res.json({
        code: 200,
        success: true
    });
};
