/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

'use strict';


var _ = require('lodash');


// default is production environment
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Load app configuration
module.exports = _.extend(
    require(__dirname + '/all.js'),
    require(__dirname + '/' + process.env.NODE_ENV + '.js') || {});
