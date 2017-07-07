import log4js from 'log4js';
import sender from '../utils/sender';
import { logConfig } from '../config';
import authVerify from '../middleware/authControl';

import user from '../controllers/user.controller';
import webIssues from '../controllers/webIssues.controller';

log4js.configure( logConfig );
const logger = log4js.getLogger('server');

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
