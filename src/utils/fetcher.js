/**
 * @overview	封装fetch
 * @author		txBoy
 * @created		2017-03-14
 */

import xFetch from './xfetch.js';

var fetcher = {};

/**
 * 项目fetch请求方法的封装,涉及到API请求的地方都走这里, 便于统一处理
 * @param url
 * @param options
 */
fetcher.request = (function () {
    var memCache = {};
    return function (url, options) {
        if (options.memCache) {
            var key = url + JSON.stringify(options.data);
            var cache = memCache[key];
        }
        if (cache) {
            return new Promise(function (resolve) {
                setTimeout(resolve.bind(null, cache), 0);
            })
        } else {
            const headers = {};
            headers['Content-Type'] = options.contentType || 'application/json';
            options.headers = Object.assign((options && options.headers) || {}, headers);

            let data = options && options.data || {};
            // 公司业务需要的统一参数，如不需要可删除
            /*data.source = data.source || 'web';
            data.sv = data.sv || '1.0';
            data.version = data.version || '1.0';
            data.macId = data.macId || 'WEB';*/

            options.body = data;
            delete options.data;
            delete options.memCache;

            return xFetch(url, options).then( (res) => {
                if (res.status === 'success' && options.memCache) {
                    memCache[key] = res;
                }
                if (typeof options.success === 'function') {
                    options.success(res);
                }
                return res;
            });
        }
    }
})();

/**
 * fetcher get 方法封装
 * @param url
 * @param options  //特殊接口需要headers可通过options传递
 * @param callback //可省略，如果省略则通过then获取回调，推荐使用通过Promise.then方式获取回调
 * @returns Promise
 * @example fetcher.get('/api/getList', {data: {page:1, size:10} }).then(res => {cosnole.log(res)})
 */
fetcher.get = function (url, options, success) {
    return this.request(url, {
        method: 'GET',
        headers: options && options.headers,
        contentType: options && options.contentType,
        data: options && options.data,
        success: success
    });
}

/**
 * fetcher post 方法封装
 * @param url
 * @param params
 * @param callback //可省略，如果省略则通过then获取回调，推荐使用通过Promise.then方式获取回调
 * @returns Promise
 * @example fetcher.post('/api/edit', {data: {name:'txBoy'} }).then(res => {cosnole.log(res)})
 */
fetcher.post = function (url, options, success) {
    return this.request(url, {
        method: 'POST',
        headers: options && options.headers,
        contentType: options && options.contentType,
        data: options && options.data,
        success: success
    });
}

fetcher.all = function (urls, options) {
    var options = options || {};
    var method = options.method || 'GET';
    var data = options.data;

    if (method === 'POST') {
        return Promise.all(urls.map(url => {
            return fetcher.post(url, data);
        }))
    } else {
        return Promise.all(urls.map(url => {
            return fetcher.get(url, data);
        }));
    }
}


export default fetcher;
