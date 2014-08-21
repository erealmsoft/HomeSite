/**
 * Created by root on 8/18/2014.
 */

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/erealm', function(err, db) {
    if(err) throw err;


    db.createCollection('team', function(err, collection) {
        console.log("open the table named team!");
        var member = {'name':'gavin','email':'hoveagle@gmail.com','phone':"13325387285"};
        /*
        collection.insert(member, {w:1}, function(err, result) {
            console.log("insert {name:"+result.name+",email:"+result.email+",phone:"+result.phone);
        });

         collection.update({'name':'gavin'}, {$set:{'email':'streamsea@126.com'}}, {w:1}, function(err, result) {
         console.log("update {name:"+result.name+",email:"+result.email+",phone:"+result.phone);
         });


      collection.findOne({'name':'gavin'}, function(err, item) {
         console.log("findOne {name:"+item.name+",email:"+item.email+",phone:"+item.phone);
         });
      */
         collection.find().toArray(function(err, items) {
         for (i = 0; i < items.length; i++) {
         console.log(items);
         }
         });
         /*
         collection.remove({'name':'gavin'}, {w:1}, function(err, result) {
         console.log("delete {name:"+result.name+",email:"+result.email+",phone:"+result.phone);
         });
 */
        /*
         collection.insert({a:2}, function(err, docs) {
         collection.count(function(err, count) {
         console.log(format("count = %s", count));

         });
         });
         */
        db.close();

    });



});