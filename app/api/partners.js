/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Don on 8/18/2014.
 */
'use strict';

var mhelper = require('../helper/dbhelper');

exports.readPartner = function(req, res) {

    var language = req.params.language;
    mhelper.conn_db().open(function(err, db) {
        db.createCollection('partners_' + language, function(err, collection) {
            if (err) {
                console.log("error during creating or openniing the partner table!");
                db.close();
                throw err;
            }

            collection.find().toArray(function(err, items) {
                //         mhelper.queryArray(err, items, db, res);
                if (err) {
                    console.log("error during finding the partner table!");
                    db.close();
                    throw err;
                }
                items.sort(function(va, vb) {
                    return va.number - vb.number;
                });
                res.json(items);
                db.close();
            });
        });
    });
};
