/**
 * @overview: Koa App.js
 * @author: txBoy
 * @created 2017-03-31
 */

import Koa from 'koa';
import Router from 'koa-router';
import xtpl from 'koa-xtpl';
import path from 'path';

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 9002;

app.use(xtpl({
    root: path.resolve(__dirname, '../dist'),
    extname: 'html',
    commands: {}
}))

app.use(router.routes());

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
