/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 10/1/14
 */
'use strict';

var config = require('../../config'),
    tumblr = require('tumblr.js');
var client = tumblr.createClient({
    consumer_key: config.blog.API_KEY,
    consumer_secret: config.blog.SECRET_KEY
});
exports.getPosts = function(req, res) {
    client.posts("erealm", function(err, resp) {
        res.send(resp.posts);
    });
};