/**
 * @overview: util
 * @author: txBoy
 * @created 2017-04-17
 */

import crypto from 'crypto';

function md5(str) {
    let ret = crypto.createHash('md5').update(str).digest('hex');
    return ret;
}

export {
    md5
}
