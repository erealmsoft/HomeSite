/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 3/08/2014
 */
'use strict';/**
 * Created by root on 8/18/2014.
 */

var MongoClient = require('mongodb').MongoClient
, format = require('util').format;

exports.readStaff = function(req, res) {

    MongoClient.connect('mongodb://127.0.0.1:27017/erealm', function(err, db) {
        if(err) throw err;
        db.createCollection('team', function(err, collection) {
            console.log("open the table named team!");

           collection.find().toArray(function(err, items) {
                res.json(items);
              //  res.json({code: 200, success: true});
            });

 //           collection.findOne({'name':'gavin'}, function(err, item) {
 //               console.log("findOne {name:"+item.name+",email:"+item.email+",phone:"+item.phone);
 //               res.json({code: 200, success: true});
 //           });
        });
//
    });
};

