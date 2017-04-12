/**
 * @overview	封装util
 * @author		txBoy
 * @created		2017-03-23
 */

import crypto from 'crypto';

/**
 * 验证手机号码的方法
 */
function isPhone(phoneNo) {
    var reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
    if (!res.test(phoneNo)) {
        return false;
    }
    return true;
}


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

export {
  isPhone,
  md5,
  md5Pay
}
