/**
 * @overview: webIssues service - Provide webIssues related database operations services.
 * @author: txBoy
 * @created 2017-07-04
 */

import mongoose from 'mongoose';

import { config } from '../config/config';
import WebIssuesModel from '../models/webIssues.model';
import getIncrementId from '../models/commons/counters';

const COLLECTTION = 'cims_web_issues';
const WebIssues = mongoose.model(COLLECTTION);

var webIssuesService = {
    add: async function (info) {
        try {
            info.createdTime = Date.now();
            info.updateTime = Date.now();
            // var webIssuesEntity = new WebIssuesModel(info);
            // console.log('-------info:', info)
            var doc = await WebIssues.findOne({title: info.title});
            if (doc) {
                var result = await WebIssues.updateOne({title: info.title}, {$set: info});
                if (result && result.n) {
                    var updatedDoc = await WebIssues.findOne({title: info.title});
                    console.log('-------updatedDoc:', updatedDoc)
                    return updatedDoc;
                } else {
                    return null;
                }
            } else {
                var logId = await getIncrementId(COLLECTTION);
                if (logId) info.logId = logId;

                doc = await WebIssues.create(info);
                console.log('-------doc:', doc)
                return doc;
            }
        } catch (err) {
            console.log('DB-Error:', err)
            return null;
        }
    }
}

export default webIssuesService;
