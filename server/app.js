/**
 * @overview: Koa App.js
 * @author: txBoy
 * @created 2017-03-31
 */
"use strict";
import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import session from 'koa-session';
import views from 'koa-views';
import path from 'path';
import log4js from 'log4js';
// import winston from 'winston';
import queryString from 'querystring';
import {config, logConfig} from './config/config.js';
// import {logConfig} from './config/winston.conf';
import sender from './utils/sender';
import appRoutes from './routes';
import mongo from './config/mongoose';
import checkOrigin from './middleware/checkOrigin';

log4js.configure( logConfig );
const logger = log4js.getLogger('server');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 8000;

app.keys = ['secret', 'key'];
app.use(views(path.resolve(__dirname, '../dist'), {
    extension: 'html'
}))

app.use(koaBody());

var db = mongo();
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});



const CONFIG = {
  key: 'skey', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};
app.use(session(CONFIG, app));

appRoutes(app, router);     // app routes config.

app.use(async (ctx, next) => {
    // console.log('==========ctx:', ctx);
    if (ctx.session.userInfo) {
        console.log('-------------userInfo:', ctx.session.userInfo);
        await next();
    } else if (!ctx.path.startsWith('/login')) {
        console.log('------origin:',ctx.headers.origin)
        var origin = ctx.headers.origin;
        if (checkOrigin(origin)) {
            ctx.set('Access-Control-Allow-Origin', origin);
			ctx.set('Access-Control-Allow-Credentials', true);
			ctx.set('Access-Control-Allow-Headers', 'x-requested-with,content-type');
            ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            // ctx.set('Access-Control-Max-Age', 1728000);
        }
        ctx.body = {
            error: 'xxx'
        };
    } else {
        await next();
    }
    console.log('-----here-----')
})

app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/test')) {
        console.log('-----test-----')
        await next();
    } else if (!ctx.path.startsWith('/api')) {
        console.log('-----index-----')
        await ctx.render('index', {
            data: 'txBoy',
            userInfo: ctx.session.userInfo
        });
    }
})



app.use(async (ctx) => {
    ctx.response.body = 'Test is here.';
})



app.listen(port, () => {
    console.log('Server started on port ' + port);
})
