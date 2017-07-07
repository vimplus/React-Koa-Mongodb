/**
 * @overview: webIssues controller - Provide webIssues related controller.
 * @author: txBoy
 * @created 2017-07-04
 */

import { common } from '../config/statusCode';
import webIssuesService from '../services/webIssues.service';
import checkOrigin from '../middleware/checkOrigin';

var webIssues = {
	push: async function (ctx, next) {
		var data = ctx.request.body;
		// var data = ctx.query;
		console.log('------data--------', data)
		var doc = await webIssuesService.add(data);
		var origin = ctx.headers.origin;
		console.log('------origin:',origin);

		if (checkOrigin(origin)) {
			ctx.set('Access-Control-Allow-Origin', origin);
			ctx.set('Access-Control-Allow-Credentials', true);
			ctx.set('Access-Control-Allow-Headers', 'x-requested-with,content-type');
		}

        if (doc) {
            var res = Object.assign({data: null}, common.success);
            res.data = doc;
    		ctx.response.body = res;
        } else {
            var res = Object.assign({data: null}, common.error);
    		ctx.response.body = res;
        }
	}
}

export default webIssues;
