/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 3/08/2014
 */

exports.sendMessage = function(req, res) {
    var name     = req.body.name,
        email    = req.body.email,
        message  = req.body.message;
    req.checkBody('name', 'Invalid postparam').notEmpty().len(0, 20);
    req.checkBody('email', 'Invalid postparam').notEmpty().isEmail().len(0,50);
    req.checkBody('message', 'Invalid postparam').notEmpty().len(0,300);
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors', 400);
        return;
    }

    res.json({code: 200, success: true});
};