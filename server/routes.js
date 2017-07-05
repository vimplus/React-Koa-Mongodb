import log4js from 'log4js';
import {logConfig} from './config/config.js';
import sender from './utils/sender';

import user from './controllers/user.controller';
import webIssues from './controllers/webIssues.controller';

log4js.configure( logConfig );
const logger = log4js.getLogger('server');

function appRoutes(app, router) {
    app.use(router.routes()).use(router.allowedMethods());

    router.post('/api/user/register', user.register);
    router.post('/api/user/login', user.login);
    router.get('/api/user/getUsers', user.getList);
    router.get('/api/user/logout', user.logout);

    router.post('/api/webIssues/push', webIssues.push);

    router.get('/getList', async (ctx, next) => {
        //console.log(ctx.request.query)
        // winston.log('info', ctx.query)
        logger.info(ctx.query)
        var params = {
    		keyfrom: 'ThinkDict',
    		key: '1310088104',
    		type: 'data',
    		doctype: 'json',
    		version: '1.1',
    		q: 'think'
    	}
    	var url = 'http://fanyi.youdao.com/openapi.do?';
        var res = await sender.get(url, {data: params});
        var data = res && res.data;
        //console.log(data)
        ctx.response.body = {
    		code: 1000,
            data: data,
    		msg: 'success'
    	};
    });

    router.post('/info', async (ctx, next) => {
        logger.info(ctx.request.body)
        console.log(ctx.request.headers)
        console.log(ctx.request.body)

        var url = 'https://request.worktile.com/B1qSNnuTe';
        var res = await sender.post(url, {data: new Date()});
        var data = res && res.data;
        // console.log(data)

        ctx.response.body = {
    		code: 1000,
            data: data,
    		msg: 'success'
    	};
    });

}

export default appRoutes;
