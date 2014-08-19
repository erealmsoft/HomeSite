/**
 * Created by root on 8/19/2014.
 */

'use strict';

var config = require("../../config"),  //配置文件
    mongodb = require('mongodb');

exports.conn_db = function(){
   // var config = require("../../config");   //配置文件

   // var mongodb = require("mongodb");   //连接mongodb驱动

    var server = new mongodb.Server(config.mongodb.hostaddress,config.mongodb.port,{auto_reconnect:true});
    var tdb=new mongodb.Db(config.mongodb.dbname,server,{safe:false});
    return tdb;
};


exports.queryArray= function(err, items, db, res){
    if(err) {
        console.log("error during find the team table!");
        db.close();
        throw err;
    }
    res.json(items);
    db.close();
    console.log("close the connection!");
};

exports.queryOne= function(err, item, db, res){
    if(err) {
        console.log("error during find the team table!");
        db.close();
        throw err;
    }
    res.json(item);
    db.close();
    console.log("close the connection!");
};

exports.addOne= function(err, result, db, res){
    if(err) {
        console.log("error during find the team table!");
        db.close();
        throw err;
    }
    res.json(result);
    db.close();
    console.log("close the connection!");
};

exports.renewOne= function(err, result, db, res){
    if(err) {
        console.log("error during find the team table!");
        db.close();
        throw err;
    }
    res.json(result);
    db.close();
    console.log("close the connection!");
};

exports.deleteEle= function(err, docs, db, res){
    if(err) {
        console.log("error during find the team table!");
        db.close();
        throw err;
    }
    res.json(docs);
    db.close();
    console.log("close the connection!");
};








