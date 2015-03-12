/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 3/12/15
 */

'use strict';

exports.parseCookies = function(request) {
    var list = {},
        rc = request.headers.cookie;

    rc.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
};