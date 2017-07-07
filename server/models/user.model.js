/**
 * @overview: user model. - Provide user related data Schema.
 * @author: txBoy
 * @created 2017-04-17
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// 定义数据库中的集合名称（相当于 MySQL 数据库中的表名），如果有则保存到该集合，如果没有则创建名为 cims_users 的集合后保存数据。
const COLLECTTION = 'cims_users';

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 1 }
});
var Counter = mongoose.model('counters', CounterSchema);

// 定义user的数据模型。
var UserSchema = new Schema({
    uid: { type: Number },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        index: true
    },
    name: String,
    nickname: String,
    email: {
        type: String,
        validate: {
            validator: function(email) {
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ["single", "inlove"]
    },
    gender: {
        type: Number,
        enum: [1, 2, 3],
        default: 3
    },
    phoneNo: String,
    accessToken: String,
    avatar: String,
    location: String,
    url: String,
    signature: String,
    createTime: {
        type: Number,
        default: Date.now()
    },
    updateTime: Number
});

UserSchema.set('autoIndex', true);

// 根据Schema创建一个Model
var UserModel = mongoose.model(COLLECTTION, UserSchema);

export default UserModel;
