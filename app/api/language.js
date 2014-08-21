/**
 * Created by root on 8/19/2014.
 */


exports.readMsg = function(req,res){

    var db = require("../helper/dbhelper").conn_db();   //connect to the databases

    var language = req.params.language;

    <!--query the content of collection -->
    db.open(function(err,db){

        if(err){
            console.log(err);
            return false;
        }

        if(language == 'en'){
            db.collection('language_en',{safe:true},function(err,collection){
                collection.find().toArray(function(err,items){
                    if(err){
                        console.log(err);
                        return false;
                    }
                    res.json(items);
                    db.close();   //close the connection.
                    console.log("the db-connection is closed.");
                });
            });
        }else if(language == 'cn'){
            db.collection('language_cn',{safe:true},function(err,collection){
                collection.find().toArray(function(err,items){
                    if(err){
                        console.log(err);
                        return false;
                    }
                    res.json(items);
                    db.close();   //close the connection.
                    console.log("the db-connection is closed.");
                });
            });
        }

    });

};