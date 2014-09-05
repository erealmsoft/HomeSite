/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by root on 9/5/2014.
 */
'use strict';
var mhelper=require('../helper/dbhelper');

exports.readcontacts = function(req, res) {

    var language =req.params.language;
    console.log(language);

    var collectionName = 'contact_' + language;
    console.log(collectionName);
    mhelper.conn_db().open(function(err, db){
        db.createCollection(collectionName, function(err, collection) {
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
                items.sort(function(va,vb){return va.number - vb.number});
                res.json(items);
                db.close();
            });
        });
    });
};

