/**
 * @overview: user service - Provide user related database operations services.
 * @author: txBoy
 * @created 2017-04-17
 */

import mongoose from 'mongoose';

import { md5 } from '../utils/util';
import { config } from '../config';
import { common, account } from '../config/statusCode';
import UserModel from '../models/user.model';
import getIncrementId from '../models/commons/counters';

// logger
import loghelper from '../utils/loghelper';
const logger = loghelper('mongodb');

const COLLECTTION = 'cims_users';
const User = mongoose.model(COLLECTTION);

var userService = {
    register: async function (info) {
        try {
            var uid = await getIncrementId(COLLECTTION);
            if (uid) {
                info.uid = uid;
                info.updateTime = Date.now();
                var doc = await User.create(info);
                if (doc) {
                    return {
                        username: doc.username,
                        email: doc.email
                    }
                }
            } else {
                return null;
            }
        } catch (err) {
            logger.error('---------------The register action DB-Error:', err);
            console.log('---------------The register action DB-Error:', err);
            return null;
        }
    },
    login: async function (info) {
        try {
            var doc = await User.findOne({username: info.username});
            if (doc) {
                var res = null;
                if (info.password === doc.password) {
                    var data = {
                        uid: doc.uid,
                        username: doc.username,
                        email: doc.email
                    }
                    res = Object.assign({data: data}, common.success);
                } else {
                    res = Object.assign({data: null}, account.pwdError);
                }
                return res;
            } else {
                var res = Object.assign({data: null}, account.notUser);
                return res;
            }
        } catch (err) {
            logger.error('---------------The login action DB-Error:', err);
            console.log('---------------The login action DB-Error:', err);
            var res = Object.assign({data: null}, common.error);
            return res;
        }
    },
    getUsers: async function (params) {
        // 页码查询参数
		var page = Number(params && params.page) || 1;
		var size = Number(params && params.size) || 10;
		var total = 0;
        // 筛选条件组装
		var { searchValue } = params.filter;
		var filter = {};
        if (searchValue) { filter.$or = [{username: new RegExp(searchValue, 'i')}, {realName: new RegExp(searchValue, 'i')}] }		// 根据[用户名]或[姓名]模糊查询

        try {
            total = await User.count(filter);
            var userList = await User.find(filter, null, {skip: (page - 1) * size, limit: size});
            if (userList) {
                var list = [];
                for (var i = 0; i < userList.length; i++) {
                    var obj = {};
                    var user = userList[i];
                    obj.id = user._id;
                    obj.uid = user.uid;
                    obj.username = user.username;
                    obj.email = user.email;
                    obj.gender = user.gender;
                    obj.createTime = user.createTime;
                    list.push(obj);
                }
                return {
                    list: list,
                    page: page,
                    size: size,
                    total: total
                }
            }
        } catch (err) {
            logger.error('---------------The getUsers action DB-Error:', err);
            return null;
        }
    }
}

export default userService;
