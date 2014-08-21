/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by root on 8/18/2014.
 */
'use strict';

var mhelper=require('../helper/dbhelper');

exports.readStaff = function(req, res) {

     mhelper.conn_db().open(function(err, db){
            db.createCollection('team', function(err, collection) {
                if (err) {
                    console.log("error during creating or openniing the team table!");
                    db.close();
                    throw err;
                }

                collection.find().toArray(function (err, items) {
         //         mhelper.queryArray(err, items, db, res);
                    if(err) {
                        console.log("error during finding the team table!");
                        db.close();
                        throw err;
                    }
                    res.json(items);
                    db.close();
                });
            });
    });
};

