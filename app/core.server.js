/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/20/15
 */

'use strict';

exports.getPosts = require('./api/blog').getPosts;
exports.checkPosts = require('./api/blog').checkPosts;
exports.sendMessage = require('./api/support').sendMessage;
exports.sendProject = require('./api/projectplan').sendProject;

exports.readStaff = require('./api/team').readStaff;
exports.readPartner = require('./api/team').readPartner;
exports.getTeamManagement = require('./api/team').getTeamManagement;
exports.getTeamTech = require('./api/team').getTeamTech;
exports.getTeamPhotos = require('./api/team').getTeamPhotos;


exports.readContacts = require('./api/contacts').readContacts;
