/**
 * @overview: user controller - Provide user related controller.
 * @author: txBoy
 * @created 2017-04-17
 */

import { md5 } from '../utils/util';
import userService from '../services/user.service';

var user = {
	register: async function (ctx, next) {
		var userInfo = ctx.request.body;
		var res = await userService.register(userInfo);
		console.log('registerData:', res);
		ctx.response.body = {
			code: res.code,
			data: res.data,
			msg: res.msg,
			status: res.status
		}
	},
	login: async function (ctx, next) {
		var userInfo = ctx.request.body;
		console.log('Req:', userInfo)
		var res = await userService.login(userInfo);
		console.log('loginData:', res);

		if (res) {
			let uid = res.data;
			//ctx.session.userInfo = {uid: res.data};
			ctx.session.userInfo = res.data;
			//加密
			//ctx.cookies.set('token', res.data && res.data.token, { maxAge: 846000, signed: true });
			console.log('-----session:', ctx.session);

			// ctx.cookies.set('token', res.data && res.data.token, { maxAge: 846000, signed: true })
			ctx.response.body = {
				code: res.code,
				data: res.data ? res.data : null,
				msg: res.msg,
				status: res.status
			}
		} else {
			ctx.response.body = {
				code: 9999,
				data: null,
				msg: 'System Error!',
				status: 'error'
			}
		}
	},
	logout: async function (ctx, next) {
		ctx.session.userInfo = null;
		ctx.body = {
			
		}
	},
	getList: async function (ctx, next) {
		var res = await userService.getUsers({});
		if (res) {
			ctx.response.body = {
				code: res.code,
				data: res.data ? res.data : null,
				msg: res.msg,
				status: res.status
			}

		}

	}
}

export default user;
