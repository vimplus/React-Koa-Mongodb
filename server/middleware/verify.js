import jwt from 'jsonwebtoken';
import { config } from '../config/config';

async function authVerify(ctx, next) {
    const authorization =  ctx.get('Authorization');
    if (authorization === '') {
        ctx.throw(401, 'No token detected in http header[Authorization]!');
    }

    const token = authorization.split('')[1];
    var tokenContent = null;

    try {
        tokenContent = await jwt.verify(token, config.jwt.secret);
    } catch(err) {
        if (err.name === 'TokenExpiredError') {
            ctx.throw(401, 'Token Expired!');
        }
        ctx.throw(401, 'Invalid token!');
    }
    console.log("Authentication success!");
    await next();
}

export default authVerify;
