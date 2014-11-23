/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Gavin on 8/19/2014.
 */

'use strict';

var config = require("../../config"), //request the config files.
    mongodb = require('mongodb'); //connect to the mongodb driver.

var conn_db = function() {

    var server = new mongodb.Server(config.mongodb.hostaddress, config.mongodb.port, {
        auto_reconnect: true
    });
    var tdb = new mongodb.Db(config.mongodb.dbname, server, {
        safe: false
    });
    return tdb;
};

exports.findArray = function(collectionName, callback) {
    conn_db().open(function(err, db) {
        if (err) {
            console.log("error during creating or opening the table!");
            throw err;
        }

        db.createCollection(collectionName, function(err, collection) {
            if (err) {
                console.log("error during creating or opening the table!");
                db.close();
                throw err;
            }

            collection.find().toArray(function(err, items) {
                if (err) {
                    console.log("error during finding the table!");
                    db.close();
                    throw err;
                }

                callback(items);
                //res.json(items);
                db.close();
            });
        });
    });
};
exports.findOne = function(collectionName, options, callback){
    conn_db().open(function(err, db) {
        if (err) {
            console.log("error during creating or opening the table!");
            db.close();
            throw err;
        }

        db.collection(collectionName, {
            safe: true
        }, function(err, collection) {
            collection.findOne(options, function(err, item) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                callback(item);
                //res.json(items);
                db.close();
                console.log("the db-connection is closed.");
            });
        });

    });
};