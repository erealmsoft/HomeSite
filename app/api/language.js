/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by Steven on 8/19/2014.
 */
'use strict';

exports.readMsg = function(req, res) {


    var language = req.query.lang;
//    console.log("OK >>>");
//    console.log(language);

    if (language === 'en') {
        res.json(require('../../public/data/language_en'));
    } else {
        res.json(require('../../public/data/language_cn'));
    }
};
