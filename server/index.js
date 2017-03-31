
var register = require('babel-register');

register({
	presets: ['stage-0']
});

require('babel-polyfill');
require('./app.js');
global.navigator = { userAgent: 'all' }
