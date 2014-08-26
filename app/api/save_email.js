/**
 * Created by root on 8/22/2014.
 */

exports.saveMessage = function(message){

    var db = require("../helper/dbhelper").conn_db();   //connect to the databases

    <!-- save the message to db -->
    db.open(function(err,db){

        if(err){
            console.log(err);
            return false;
        }

        db.collection('email',{safe:true},function(err,collection){
            collection.insert(message, function(){

            });
            db.close();
            console.log("email has saved.the db-connection has closed.");
        });

    });

};