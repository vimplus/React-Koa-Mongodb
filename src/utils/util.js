/**
 * @overview	封装util
 * @author		txBoy
 * @created		2017-03-23
 */

import crypto from 'crypto';

/***
 * 去除字符串两侧空格
 * @param str String 字符串
 */
function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, '');
};

/**
 * md5正常字符串加密
 */
function md5(str) {
    var ret = crypto.createHash('md5').update(str.toString()).digest('hex');
    return ret;
}

/**
 * md5中文字符串加密
 * @desc 解决中文加密不同的问题
 */
function md5Pay(str) {
    str = (new Buffer(str)).toString("binary");
　　var ret = crypto.createHash('md5').update(str).digest("hex");
　　return ret;
}

/**
* 验证手机号码的方法
* @param phoneNo 传入号码
* @return Boolean
*/
function isPhone(phoneNo) {
    var reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
    if (!res.test(phoneNo)) {
        return false;
    }
    return true;
}

/**
 * 获取日期字符串
 * @param {addDayCount) 获取AddDayCount天后的日期
 * @return String 格式为：YYYY-MM-DD
 * @example getDateStr(0) //今天  getDateStr(-1)  //昨天
 */
function getDateStr(addDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + addDayCount);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    return y + "-" + m + "-" + d;
};

/**
 * 格式化时间戳  - 时间毫秒数转化为固定格式的时间字符串
 * @param timestamp
 * @param dateFormate
 * @description 其中dateFormate是有YYYY MM DD hh mm ss组成,可以是YYYY-MM-DD 也可以是YYYY-MM-DD hh:mm:ss
 * 如果不传的话,默认为: YYYY-MM-DD hh:mm:ss
 * @example formatTimestamp(1464314911403);
 *          formatTimestamp(1464314911403, 'yyyyMMddhhmmss');
 *          formatTimestamp(1464314911403,'YYYY-MM-DD');
 */
function formatTimestamp(timestamp, dateFormate) {
    var datemills = parseInt(timestamp);
    if (isNaN(datemills)) {
        console.error("Wrong timestamp, must be a number!");
        return;
    }
    if (dateFormate == undefined) {
        dateFormate = "YYYY-MM-DD hh:mm:ss";
    }
    var date = new Date(datemills);
    var year = "" + date.getFullYear();
    var month = (date.getMonth() > 8 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1));
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    var hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    var minute = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
    var second = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
    var datestr = dateFormate.replace(/yyyy/gi, year).replace('MM', month).replace(/dd/gi, day)
        .replace("hh", hour).replace("mm", minute).replace("ss", second);
    return datestr;
}


/**
 * 格式化卡号
 * @param {cardNo) 卡号
 * @return {String}
 * @example formatCardNo(201622512580888818)  //2016 2251 2580 8888 18
 */
function formatCardNo(cardNo) {
    if (cardNo) {
        return cardNo.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{2})/, '$1-$2-$3-$4-$5');
    }
    return '未知卡号';
};

/**
 * 格式化手机号码
 * @param {phoneNo) 手机号
 * @return {String}
 * @example formatCardNo(17722512580)  //177 2251 2580
 */
function formatTelPhone(phone) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
};

/**
 * 数组去重
 */
function arrayUnique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
};

/**
 * 移除数组中指定元素，改变原数组
 * @param {arr} 需要处理的数组
 * @param {item} 该数组中要移除的元素
 */
function removeWithoutCopy(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

/**
 * 格式化性别
 */
function formatGender(type) {
    switch (type) {
        case 0:
            return '保密';
            break;
        case 1:
            return '男';
            break;
        case 2:
            return '女';
            break;
        case 3:
            return '保密';
            break;
        default :
            return '未知'
    }
}

/**
 * URL参数转JSON
 * @param {url}
 * @return {JSONString}
 * @example var url = "http://www.example.com/user/getInfo?username&sid=12580&t";
 *          getJSONByURL(url)  // {"username":"txboy","sid":"12580", "t": undefined}
 */
function getJSONByURL(url) {
    if(url == ''){
        url = window.location.href;
    }
    var index = url.indexOf('?');
    var str = url.substr(index + 1);
    var arr = str.split('&');
    var json = '{';
    for (var i = 0; i < arr.length; i++){
        var s = arr[i].indexOf('=');
        if(s == -1){
            json += ',"' + arr[i] + '":"undefined"';
            continue;
        }
        var key = arr[i].substr(0, s);
        var val = arr[i].substr(s+1);
        var comma = ',';
        if(i == 0) {
            comma = '';
        }
        json += comma + '\"' + key + '\":' + '\"' + val + '\"';
    }
    return json += '}';
}

export {
    trim,
    md5,
    md5Pay,
    isPhone,
    getDateStr,
    formatTimestamp,
    formatCardNo,
    formatTelPhone,
    arrayUnique,
    removeWithoutCopy,
    formatGender,
    getJSONByURL
}
