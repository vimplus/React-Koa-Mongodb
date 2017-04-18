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
import appRoutes from './routes';
import mongo from './config/mongoose';

log4js.configure( logConfig );
const logger = log4js.getLogger('server');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 9002;

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

appRoutes(app, router);     // app routes config.

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
