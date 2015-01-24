/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/24/15
 */

'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('user');
var passport = require('passport');

exports.login = function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {

        if (err) {
            return next(err);
        }
        // if user is not found due to wrong username or password
        if (!user) {
            //return res.render('login', {});
            return res.json({code: 'error_001'});
        }//(!user)
        //passport.js has a logIn user method

        req.logIn(user, function(err) {

            if (err) { return next(err); }
            return res.render('admin', {});
        }); //req.logIn
    })(req, res, next);

    //var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
    //delete req.session.returnTo;
    //res.redirect(redirectTo);
};
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/admin/login');
};
exports.create = function (req, res, next) {
    var user = new User(req.body);
    user.provider = 'local';
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        return res.send({code: '200'});
    });
};
exports.getUsers = function (req, res, next) {
    User.find({},'name username email group',{sort: 'group'} , function (err, users) {
        if (err) {
            return res.status(401).send();
        } else {
            return res.send(users);
        }
    });
};

exports.changePassword = function(req, res, next){
    User.load({ criteria: { username: req.user.username },select: 'name username email hashed_password salt' }, function (err, user) {
        if (err) {
            return res.status(401).send();
        } else {
            var oldPass = req.body.password;
            var newPass = req.body.newPassword;
            var newPassConfirm = req.body.newPasswordConfirm;

            if (!oldPass || !newPass || oldPass === newPass || newPass.length < 6) {
                return res.send({code: 'error_002'});
            }
            if (newPassConfirm !== newPass) {
                return res.send({code: 'error_004'});
            }
            var isAuth = user.authenticate(req.body.password);
            if (isAuth) {
                user.set('password', req.body.newPassword);
                user.provider = 'local';
                user.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.send({code: '200'});
                });
            } else {
                return res.send({code: 'error_003'});
            }
        }
    });
};
