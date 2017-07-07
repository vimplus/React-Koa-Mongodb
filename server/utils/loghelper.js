/****************************************************************
 * Purpose: handle log4js.
 *
 * @author: Tower.
 * @time: 2017-05-23.
 */

import { logConfig } from '../config';
import log4js from 'log4js';
log4js.configure(logConfig);

let loggersMap = {};
const CATEGORY = 'category';
const APPENDERS = 'appenders';

function isEmptyObject(o) {
    for (let k in o) return false;
    return true;
};

if (isEmptyObject(loggersMap)) {
    logConfig && logConfig[APPENDERS].forEach(function(appender) {
        if (appender.hasOwnProperty(CATEGORY)) {
            loggersMap[appender[CATEGORY]] = log4js.getLogger(appender[CATEGORY]);
        }
    });
}

/*
    Purpose: logger public module
    @param {Object} category
    @return {Object} logger
    @example
        const logger = require('xx/utils/loghelper')('yourCategory');
        logger.error('log error');
        logger.info('log info');
*/
export default function(category) {
    if (!category || category.trim() == '') {
        let stack = new Error().stack;
        let callLocation = stack.split('at')[2].split('/')[stack.split('at')[2].split('/').length-1].replace(/\)/g, '');
        console.error(`Missing loghelper init params: category, at: ${callLocation}`);
        loggersMap['server'] && loggersMap['server'].error(new Error('Missing loghelper init params: category'));
    }
    if (!loggersMap.hasOwnProperty(category)) {
        console.error(`Can't find logger instance: ${category}`);
        loggersMap['server'] && loggersMap['server'].error(new Error(`Can't find logger instance: ${category}`));
    }

    return loggersMap[category];
};
