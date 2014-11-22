/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Steven on 8/18/2014.
 */
'use strict';

var dbHelper = require('../helper/dbhelper');

function projectsInfo(items){
    for (var iii = 0; iii < items.length; iii++) {
        var json = items[iii];
        var key = "details";
        delete json[key];
    }
    return items;
}

exports.readProjects = function(req, res) {

    var projects = req.params.projects; // wholePro: the whole projects   top5Pro:the top 5 projects

    dbHelper.findArray('projects_' + req.params.language, function(items){
        var projectsNumber = items.length;
        var topProjects = [];
        var projectsData = projectsInfo(items);


        if (projects === 'wholePro') {
            res.json(projectsData);
        } else if (projects === 'top5Pro') {
            if (projectsNumber <= 5) {
                res.json(projectsData);
            } else {
                for (var iii = 0; iii < 5; iii++) {
                    topProjects[iii] = projectsData[iii];
                }
                res.json(topProjects);
            }
        }
    });
};
