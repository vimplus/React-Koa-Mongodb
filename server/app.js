/**
 * @overview: Koa App.js
 * @author: txBoy
 * @created 2017-03-31
 */

import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
//import session from 'koa-session';
import views from 'koa-views';
import path from 'path';
import log4js from 'log4js';
// import winston from 'winston';
import queryString from 'queryString';
import {config, logConfig} from './config/config.js';
// import {logConfig} from './config/winston.conf';
import sender from './utils/sender';

log4js.configure( logConfig );
const logger = log4js.getLogger('server');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 9002;

app.use(views(path.resolve(__dirname, '../dist'), {
    extension: 'html'
}))

app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

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
		code: 10000,
        content: data,
		msg: 'success'
	};
});

router.post('/info', async (ctx, next) => {
    logger.info(ctx.request.body)
    // console.log(ctx.request.body)

    var url = 'https://request.worktile.com/B1qSNnuTe';
    var res = await sender.post(url, {data: new Date()});
    var data = res && res.data;
    // console.log(data)

    ctx.response.body = {
		code: 10000,
        conntent: data,
		msg: 'success'
	};
});


app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/test')) {
        await next();
    } else {
        await ctx.render('index', {
            data: 'txBoy'
        });
    }
})

app.use(async (ctx) => {
    ctx.response.body = 'Test is here.';
})



app.listen(port, () => {
    console.log('Server started on port ' + port);
})
