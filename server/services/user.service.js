/**
 * @overview: user service - Provide user related database operations services.
 * @author: txBoy
 * @created 2017-04-17
 */

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { md5 } from '../utils/util';
import { config } from '../config/config';
import { common, account } from '../config/statusCode';
import UserModel from '../models/user.model';

const COLLECTTION = 'cims_users';
const User = mongoose.model(COLLECTTION);
/*const IdsModel = mongoose.model('ids', {uid: Number, user: String});
const Ids = mongoose.model('ids');*/

var userService = {
    register: async function (info) {

        try {
            /*var ids = new IdsModel();
            var userDoc = await Ids.findOneAndUpdate({update: {$inc: {'uid': 1}}, query: {'name': 'user'}, new: true });
            console.log(userDoc.uid)
            info.uid = userDoc.uid;*/
            var user = new UserModel(info);

            var doc = await user.save();
            if (doc) {
                var data = {
                    username: doc.username,
                    email: doc.email
                }
                var res = common.success;
                res.data = data;
                return res;
            }
        } catch (err) {
            console.log('DB-Error:', err)
            var res = common.error;
            return res;
        }
    },
    login: async function (info) {
        try {
            var doc = await User.findOne({username: info.username});
            console.log('Doc', doc)
            if (doc) {
                if (info.password === doc.password) {
                    var token = jwt.sign( {username: doc.username}, config.jwt.secret);
                    console.log('Login Success!')
                    var data = {
                        username: doc.username,
                        email: doc.email,
                        token: token
                    }
                    var res = common.success;
                    res.data = data;
                    return res;
                } else {
                    var res = account.pwdError;
                    return res;
                }
            } else {
                var res = account.notUser;
                return res;
            }
        } catch (err) {
            console.log('DB-Error:', err)
            var res = common.error;
            return res;
        }
    },
    getUsers: async function (info) {
        try {
            var userList = await User.find({});
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
                var data = {
                    list: list,
                    page: 1,
                    size: 10,
                    total: list.length
                };
                var res = common.success;
                res.data = data;
                return res;
            }
        } catch (err) {
            var res = common.error;
            return res;
        }
    }
}

export default userService;
