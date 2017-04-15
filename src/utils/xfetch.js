/**
 * @overview	封装fetch
 * @author		txBoy
 * @created		2017-03-14
 */

import 'es6-promise';
import 'whatwg-fetch';
import 'fetch-detector';
// import 'fetch-ie8';
// import 'formdata-emulate';
import queryString from 'querystring';

const encodeReg = /application\/x-www-form-urlencoded/;
const JSONReg = /application\/json/;

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.status = response.status;
        error.code = -500; //用-500标示http错误,非业务逻辑异常
        throw error;
    }
}

function parseJSON(res) {
    if (res.status === 200) {
        return res.json();
    } else {
        return {
            status: 'error',
            msg: '网络异常，请稍后再试！',
            code: -500
        };
    }
}

/**
 * fetch api的包装
 * @param url   请求url
 * @param options
 *          - method    请求方法
 *          - body      请求参数,get请求会将请求参数拼接到url, post请求则会放到body
 * @returns {Promise}
 */
function BaseFetch(url, options) {
    options = options || {};
    if (options.method) options.method = options.method.toUpperCase();
    if (!options.credentials) options.credentials = 'include';

    var headers = {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json"
    }
    options.headers = Object.assign(options.headers || {}, headers);

    if (options.method === 'POST') {
        if (typeof options.body === 'object' && !(options.body instanceof FormData)) {
            let type = options.headers['Content-Type'];
            if (JSONReg.test(type)) {
                options.body = JSON.stringify(options.body);
            } else if (encodeReg.test(type) || !type) {
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                options.body = queryString.stringify(options.body);
            }
        }
    } else {
         if (typeof options.body === 'object') {
             url = url + (url.indexOf('?') > 0 ? '&' : '?') + queryString.stringify(options.body);
             options.body = null;
         }
    }

    return fetch(url, options).then(checkStatus).then(parseJSON);
}

export default function xFetch(url, options) {
    return new BaseFetch(url, options)
}
