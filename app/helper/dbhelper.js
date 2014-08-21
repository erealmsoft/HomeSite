/**
 * Created by root on 8/19/2014.
 */

'use strict';

var config = require("../../config"),  //配置文件
    mongodb = require('mongodb');

exports.conn_db = function(){

    var server = new mongodb.Server(config.mongodb.hostaddress,config.mongodb.port,{auto_reconnect:true});
    var tdb=new mongodb.Db(config.mongodb.dbname,server,{safe:false});
    return tdb;
};







