
var register = require('babel-register');

register();
require('babel-polyfill');
require('./app.js');
global.navigator = { userAgent: 'all' }
