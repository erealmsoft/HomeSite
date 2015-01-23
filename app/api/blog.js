/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 10/1/14
 */
'use strict';

var config = require('../../lib/config'),
    tumblr = require('tumblr.js');
var client = tumblr.createClient({
    consumer_key: config.blog.API_KEY
});
exports.getPosts = function(req, res) {
    var language = req.params.language;
    if (config.mock) {
        res.send(require('./data/blog_' + language +'.json'));
    } else {
        client.posts("erealm", {tag: language}, function(err, resp) {
            res.send(resp.posts);
        });
    }
};