/**
 * Created by root on 8/27/2014.
 */
'use strict';

exports.readProjects = function(req,res){

    var db = require("../helper/dbhelper").conn_db();   //connect to the databases

    db.open(function(err,db){

        if(err){
            console.log(err);
            return false;
        }
        db.collection('projects',{safe:true},function(err,collection){
            collection.find().toArray(function(err,items){
                if(err){
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
