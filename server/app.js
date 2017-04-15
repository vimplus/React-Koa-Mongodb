/**
 * @overview: Koa App.js
 * @author: Andy
 * @created 2017-04-10
 */

import Seneca from 'seneca';
import SenecaWeb from 'seneca-web';

import Koa from 'koa';
import Router from 'koa-router';
import bodyBody from 'koa-body';
import views from 'koa-views';
import path from 'path';
import log4js from 'log4js';
import {config, logConfig} from './config/config.js';

log4js.configure( logConfig );
const logger = log4js.getLogger('server');

const app = new Koa();
const router = new Router();
const seneca = Seneca();

const port = process.env.PORT || 9002;


let senecaWebConfig = {
    context: router,
    adapter: require('seneca-web-adapter-koa2'),
    // options: {parseBody: false}
}

// Serve static.
app
    .use(views(path.resolve(__dirname, '../dist'), { extension: 'html' }))
    // Let seneca do the body parse
    // .use(bodyBody())
    .use(async (ctx, next) => {
        // Route api request
        if (ctx.path.startsWith('/api')) {
            await next();
        } else {
            await ctx.render('index', {
                data: 'txBoy'
            });
        }
    });


seneca
    // Provides a simple data abstraction layer.
    .use('entity')
    // Integration between Seneca and Koa happens here.
    .use(SenecaWeb, senecaWebConfig)
    // Import service entry.
    .use( require('./services/index.js') )
    // Config mongodb connection
    .use('mongo-store', {
        name: config.dbName,
        host: config.dbAddr,
        port: config.dbPort
    })
    // Start server.
    .ready(() => {
        app
            // Provides the current context.
            .use( seneca.export('web/context')().routes() )
            // Listen on port.
            .listen( port, () => {
                console.log('Server started on port ' + port);
            } )
        // Demo: Invoke action manually.
        seneca.act('role:math,cmd:sum,left:1,right:2', (err, res) => {
            console.log('\n##########################################');
            console.log( 'Pattern: role:math,cmd:sum,left:1,right:2' )
            console.log( 'Result: ', res )
            console.log('##########################################\n');
        });
    });
