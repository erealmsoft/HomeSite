/**
 * Created by root on 9/3/2014.
 */

exports.findProDetails = function(req,res){
    var db = require("../helper/dbhelper").conn_db();   //connect to the databases

    var id =req.params.id;

    db.open(function(err,db){

        if(err){
            console.log(err);
            return false;
        }
        db.collection('projects',{safe:true},function(err,collection){
            collection.findOne({ID:id},function(err,items){
                if(err){
                    console.log(err);
                    return false;
                }
                res.json(items);
                db.close();   //close the connection.
                console.log("the db-connection is closed.");
            });
        });

    });

};