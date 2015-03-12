/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 10/1/14
 */
'use strict';

var config = require('../../lib/config'),
    tumblr = require('tumblr.js'),
    util = require('../helper/util');

var client = tumblr.createClient({
    consumer_key: config.blog.API_KEY
});
exports.getPosts = function(req, res) {
    var language = req.params.language;
    if (config.mock) {
        res.send(require('./data/blog_' + language +'.json'));
    } else {
        client.posts("erealm", {tag: language}, function(err, resp) {
            res.cookie('BLOGS_CHECK', resp.posts[0].id);
            res.send(resp.posts);
        });
    }
};

exports.checkPosts = function(req, res) {
    var language = req.params.language;
    var currentId = util.parseCookies(req).BLOGS_CHECK;

    if (config.mock) {
        var current = require('./data/blog_' + language +'.json')[0];
        res.send({result: current.id == currentId? 0:1})
    } else {
        client.posts("erealm", {tag: language}, function(err, resp) {
            var count = Math.min(resp.posts.length, 5);
            if (currentId) {
                for(var i= 0,len = resp.posts.length;i<len;i++) {
                    if (currentId == resp.posts[i].id) {
                        count = i;
                        break;
                    }
                }
            }

            res.send({result: count})
        });
    }
};