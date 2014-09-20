/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Steven on 8/18/2014.
 */
'use strict';

var mhelper = require('../helper/dbhelper');

function projectsInfo(items){
    for (var iii = 0; iii < items.length; iii++) {
        var json = items[iii];
        var key = "details";
        delete json[key];
    }
    return items;
}

exports.readProjects = function(req, res) {

    var language = req.params.language;
    var projects = req.params.projects; // wholePro: the whole projects   top5Pro:the top 5 projects

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
                    return va.number - vb.number;
                });
                var projectsNumber = items.length;
                var topProjects = [];
                var projectsData = projectsInfo(items);


                if (projects === 'wholePro') {
                    res.json(projectsData);
                    db.close();
                } else if (projects === 'top5Pro') {
                    if (projectsNumber <= 5) {
                        res.json(projectsData);
                        db.close();
                    } else {
                        for (var iii = 0; iii < 5; iii++) {
                            topProjects[iii] = projectsData[iii];
                        }
                        res.json(topProjects);
                        db.close();
                    }
                }
            });
        });
    });
};
