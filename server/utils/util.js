
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

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
 * aes 加密
 */
function encryptByAES(key, iv, data) {
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');
    return crypted;
}

/**
 * aes 解密
 */
function decryptByAES(key, iv, crypted) {
    crypted = new Buffer(crypted, 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(crypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
}

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
 * 对象升序排序
 * @desc 对象按参数名称(key)进行升序排序
 * @param {Object}
 * @return {Object}
 */
function sortObj(obj) {
    var keys = Object.keys(obj);
    keys.sort();
    var res = {};
    for (var i = 0; i < keys.length; i++) {
        var _key = keys[i];
        res[_key] = obj[_key];
    }
    return res;
}

/**
 * 分转元
 */
function pennyToYuan(penny) {
    return (parseInt(penny) / 100).toFixed(2);
};

/**
 * 金额格式化
 * @desc 将数值四舍五入(保留2位小数)后格式化成金额形式
 * @param sum 数值(Number或者String)
 * @return {String} 金额格式的字符串,如'1,234,567.45'
 */
function formatCurrency(sum) {
    if (!sum) return 0;
    var num = pennyToYuan(sum);
    num = num.toString().replace(/\$|\,/g, '');
    if(isNaN(num)) {
        num = "0";
    }
    var sign = (num == (num = Math.abs(num)) );
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();

    cents = cents < 10 ? '0' + cents : cents;

    for (var i = 0; i < Math.floor( (num.length-(1+i)) / 3 ); i++) {
        num = num.substring(0, num.length-(4*i+3)) + ',' + num.substring(num.length - (4 * i + 3) );
    }
    return ( ( (sign) ? '' : '-' ) + num + '.' + cents);
}

/**
 * 金额转大写
 * @desc 将数字金额转为中文大写
 * @param {Number}
 * @return {String}
 * @example digitUppercase(7682.01);  // 柒仟陆佰捌拾贰元壹分
 *          digitUppercase(7682);     //柒仟陆佰捌拾贰元整
 *          digitUppercase(951434677682.00); //玖仟伍佰壹拾肆亿叁仟肆佰陆拾柒万柒仟陆佰捌拾贰元整
 */
function digitUppercase(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};

/**
 * 处理模板
 * @desc 将模板文件替换为实际数据
 * @param temp字符串
 * @param data 实际数据
 * @return 返回已替换为真实数据的字符串
 * @example handleTemplate('张三的手机号是${phoneNo}', {phoneNo: '17712345678'});  // 张三的手机号是17712345678
 */
function handleTemplate(temp, data) {
    for (var key in data) {
		var reg = new RegExp("\\$\\{" + key + "\\}", "g");
		temp = temp.replace(reg, data[key]);
	}
    return temp;
}


export {
    md5,
    md5Pay,
    encryptByAES,
    decryptByAES,
    formatTimestamp,
    sortObj,
    pennyToYuan,
    formatCurrency,
    digitUppercase,
    handleTemplate
}
// module.exports = util;
