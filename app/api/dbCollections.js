/**
 * Created by root on 8/27/2014.
 */
'use strict';

exports.readCollections = function(req,res){

    var db = require("../helper/dbhelper").conn_db();   //connect to the databases

    db.open(function(err,db){

        if(err){
            console.log(err);
            return false;
        }

        db.collections(function(err, collections) {
            if(err){
                console.log(err);
            }
//            console.log("--------------------------------------------");
//            console.log(collections);
//            console.log("--------------------------------------------");
            console.log(collections.length);

            var collectionNames = [];
            for(var i=0; i<collections.length; i++){
                //the first collection is the system default collection named "system.indexes"
                if(i !== 0)
                    collectionNames.push({"name":collections[i].collectionName});
            }
            res.send(collectionNames);

            db.close();
            console.log("the db-connection is closed.");
        });

//        //the other implements
//        db.collectionNames(function(err, collections) {
//            if(err){
//                console.log(err);
//            }
//            res.send(collections);
//            db.close();
//            console.log("the db-connection is closed.");
//        });
    });
};


