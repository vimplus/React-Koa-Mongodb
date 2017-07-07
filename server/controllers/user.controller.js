/**
 * @overview: user controller - Provide user related controller.
 * @author: txBoy
 * @created 2017-04-17
 */

import jwt from 'jsonwebtoken';
import { md5 } from '../utils/util';
import { config } from '../config';
import { common } from '../config/statusCode';
import { generateToken } from '../middleware/authControl';
import userService from '../services/user.service';

var user = {
	register: async function (ctx, next) {
		var userInfo = ctx.request.body;
		var data = await userService.register(userInfo);
		if (data) {
			ctx.body = Object.assign({data: data}, common.success);
		} else {
			ctx.body = Object.assign({data: null}, common.error);
		}
	},
	login: async function (ctx, next) {
		var userInfo = ctx.request.body;
		console.log('Req:', userInfo)
		var res = await userService.login(userInfo);
		console.log('loginData:', res);

		if (res && res.data) {
			var tokenInfo = {username: res.data.username};
			var token = generateToken(tokenInfo);
			ctx.cookies.set('token', token);
			ctx.body = res;
		} else {
			ctx.body = res;
		}
	},
	logout: async function (ctx, next) {
		ctx.cookies.set('token', '');
		ctx.body = Object.assign({data: true}, common.success);
	},
	getList: async function (ctx, next) {
		var params = ctx.query;
		params.filter = data && params.filter ? JSON.parse(params.filter) : {};
		var data = await userService.getUsers(params);
		if (data) {
			ctx.body = Object.assign({data: data}, common.success);
		} else {
			ctx.body = Object.assign({data: null}, common.error);
		}
	}
}

export default user;
