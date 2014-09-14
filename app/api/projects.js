/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by root on 8/18/2014.
 */
'use strict';

var mhelper = require('../helper/dbhelper');

exports.readProjects = function(req, res) {

    var language = req.params.language;
    var flag = req.params.flag; //flag represents the projects . 1:whole projects  2:the top 5 projects

    mhelper.conn_db().open(function(err, db) {
        db.createCollection('projects_' + language, function(err, collection) {
            if (err) {
                console.log("error during creating or openniing the team table!");
                db.close();
                throw err;
            }

            collection.find().toArray(function(err, items) {
                if (err) {
                    console.log("error during finding the team table!");
                    db.close();
                    throw err;
                }
                items.sort(function(va, vb) {
                    return va.number - vb.number
                });
                var projectsNumber = items.length;
                var topProjects = [];

                if (flag == '1') {
                    res.json(items);
                    db.close();
                } else if (flag == '2') {
                    if (projectsNumber <= 5) {
                        res.json(items);
                        db.close();
                    } else {
                        for (var iii = 0; iii < 5; iii++) {
                            topProjects[iii] = items[iii];
                        }
                        res.json(topProjects);
                        db.close();
                    }
                }
            });
        });
    });
};
