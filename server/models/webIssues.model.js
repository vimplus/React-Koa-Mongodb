/**
 * @overview: Web-issues model. - Provide Web-issues related data Schema.
 * @author: txBoy
 * @created 2017-07-04
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const COLLECTTION = 'cims_web_issues';

// 定义数据模型。
var issuesSchema = new Schema({
    logId: Number,
    title: String,
    category: String,
    browserType: String,
    osType: String,
    environments: Object,
    userInfo: Object,
    stack: String,
    targetUrl: String,
    status: Number,
    crashCount: Number,
    createdTime: Number,
    updateTime: Number,
    lastCrashedTime: Number
});

// 根据Schema创建一个Model
var issuesModel = mongoose.model(COLLECTTION, issuesSchema);

export default issuesModel;
