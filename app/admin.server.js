/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/20/15
 */

'use strict';

exports.login = require('./api/admin/users').login;
exports.logout = require('./api/admin/users').logout;
exports.createUser = require('./api/admin/users').create;
exports.getUsers = require('./api/admin/users').getUsers;
exports.changePassword = require('./api/admin/users').changePassword;

exports.getLogList = require('./api/admin/logs').getLogList;
exports.getLogText = require('./api/admin/logs').getLogText;

exports.getDBList = require('./api/admin/development').getDBList;
exports.restoreDB = require('./api/admin/development').restoreDB;
exports.backupDB = require('./api/admin/development').backupDB;

exports.buildProject = require('./api/admin/development').buildProject;
exports.getMessageList = require('./api/admin/message').getMessageList;