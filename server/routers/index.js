/**
 * @overview	koa-router config.
 * @author		txBoy
 * @created		2017-03-21
 */

import sender from '../utils/sender';
import authVerify from '../middleware/authControl';
import user from '../controllers/user.controller';
import webIssues from '../controllers/webIssues.controller';

function appRoutes(app, router) {
    app.use(router.routes()).use(router.allowedMethods());

    router.post('/api/user/register', user.register);
    router.post('/api/user/login', user.login);
    router.get('/api/user/getUsers', authVerify, user.getList);
    router.get('/api/user/logout', user.logout);

    router.get('/api/webIssues/push', webIssues.push);
    router.post('/api/webIssues/push', webIssues.push);

}

export default appRoutes;
