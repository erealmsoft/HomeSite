/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

'use strict';

var winston = require('winston'),
    config = require('../../lib/config');

module.exports = new(winston.Logger)(config.logger);
