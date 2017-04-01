
var register = require('babel-register');

require('babel-polyfill');
require('./app.js');
global.navigator = { userAgent: 'all' }
