/**
 * @overview: Koa App.js
 * @author: txBoy
 * @created 2017-03-31
 */
"use strict";
import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import views from 'koa-views';
import path from 'path';
import queryString from 'querystring';
import {config, logConfig} from './config';
import sender from './utils/sender';
import appRoutes from './routers';
import mongo from './config/mongoose';
import checkOrigin from './middleware/checkOrigin';
import { refreshToken } from './middleware/authControl';

// logger
import loghelper from './utils/loghelper';
const logger = loghelper('server');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 8000;

app.use(views(path.resolve(__dirname, '../dist'), {
    extension: 'html'
}))

app.use(koaBody());

var db = mongo();
db.connection.on("error", function (error) {
    console.log("------数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

app.use(async (ctx, next) => {
    var path = ctx.path;
    if (path.startsWith('/api')) {
        console.log('-----api-----')
        await refreshToken(ctx, next)
    } else {
        console.log('-----index-----')
        await ctx.render('index', {
            data: 'txBoy'
        });
    }
})

appRoutes(app, router);     // app routes config.

app.listen(port, () => {
    console.log('Server started on port ' + port);
})
