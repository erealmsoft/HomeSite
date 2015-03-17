/**
 * Created by root on 11/14/2014.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    username: { type: String, default: '' },
    group: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' }
});

/**
 * Virtuals
 */

UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() { return this._password;});

var validatePresenceOf = function (value) {
    return value && value.length;
};

UserSchema.path('name').validate(function (name) {
    return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
    var User = mongoose.model('user');

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function (err, users) {
            fn(!err && users.length === 0);
        });
    } else{
        fn(true);
    }
}, 'Email already exists');

UserSchema.path('username').validate(function (username) {
    return username.length;
}, 'Username cannot be blank');

UserSchema.path('group').validate(function (group) {
    return ['developer', 'customer'].indexOf(group) >= 0;
}, 'group cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
    return hashed_password.length;
}, 'Password cannot be blank');

UserSchema.pre('save', function(next) {
    if (!this.isNew) {
        return next();
    }

    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

UserSchema.methods = {

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    encryptPassword: function (password) {
        if (!password) {
            return '';
        }
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

UserSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    load: function (options, cb) {
        options.select = options.select || 'name username group';
        this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
};

module.exports = mongoose.model('user', UserSchema,'users');
