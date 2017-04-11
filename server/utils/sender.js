/**
 * @overview: sender
 * @author: txBoy
 * @created 2017-04-07
 */

import axios from 'axios';
// import xRequest from './xRequest';


var sender = {};


sender.get = function (url, options) {
    options.method = 'GET';
    options.params = options.data || null;
    return this.request(url, options);
}


sender.post = function (url, options) {
    options.method = 'POST';
    return this.request(url, options);
}

sender.request = function (url, options) {
    var options = Object.assign({}, options);
    options.url = url;
    return xRequest(options);
}

function xRequest(options) {
    return axios(options);
}

export default sender;
