/**
 * @overview: Authentication - Verify user token.
 * @author: txBoy
 * @created 2017-04-17
 */

import jwt from 'jsonwebtoken';
import { config } from '../config';
import { common } from '../config/statusCode';

// logger
import loghelper from '../utils/loghelper';
const logger = loghelper('server');

const expiredTime = 60 * 30;    // 30min
const sKeys = config.jwt.secret;

function generateToken(data) {
    var token = jwt.sign(data, sKeys, {expiresIn: expiredTime});
    return token;
}

function handleTokenError(ctx, msg) {
    ctx.cookies.set('token', '');
    switch (msg) {
        case 'jwt expired':
            ctx.body = Object.assign({data: null}, common.notLogin);
            break;
        case 'invalid token':
            ctx.body = Object.assign({data: null}, common.invalidToken);
            break;
        case 'jwt malformed':
            ctx.body = Object.assign({data: null}, common.errorToken);
            break;
        default:
            ctx.body = Object.assign({data: null}, common.errorToken);
    }
}

async function authVerify(ctx, next) {
    const token =  ctx.cookies.get('token');
    if (!token) {
        ctx.body = Object.assign({data: null}, common.notLogin);
        return;
    }
    try {
        var tokenContent = await jwt.verify(token, sKeys);
        console.log('----------verify tokenContent:', tokenContent);
        console.log("Authentication success!");
        await next();

    } catch(err) {
        logger.error('---------------Verify Error:', err);
        if (err && err.message) {
            handleTokenError(ctx, err.message);
        } else {
            ctx.body = Object.assign({data: null}, common.error);
        }
    }
}


async function refreshToken(ctx, next) {
    var token = ctx.cookies.get('token');
    if (token) {
        try {
            var tokenContent = await jwt.verify(token, sKeys);
            delete tokenContent.iat;
            delete tokenContent.exp;

            var newToken = jwt.sign(tokenContent, sKeys, {expiresIn: expiredTime});
            ctx.cookies.set('token', newToken);     // 更新token, 延长过期时间

            await next();
        } catch (err) {
            logger.error('---------------RefreshToken Error:', err);
            if (err && err.message) {
                handleTokenError(ctx, err.message);
            } else {
                ctx.body = Object.assign({data: null}, common.error);
            }
        }
    } else {
        await next();
    }
}

export default authVerify;

export {
    generateToken,
    authVerify,
    refreshToken
};
