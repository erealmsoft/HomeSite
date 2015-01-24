/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

'use strict';


var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var customSettingsFile = path.join(__dirname, '../config/custom.js');


// Load app configuration
if (fs.existsSync(customSettingsFile)) {
    module.exports = _.extend(
        require(path.join(__dirname, '../config/all.js')),
        require(customSettingsFile) || {});
} else {
    module.exports = require(path.join(__dirname, '../config/all.js'));
}