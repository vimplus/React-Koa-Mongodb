/**
 * @overview: webIssues service - Provide webIssues related database operations services.
 * @author: txBoy
 * @created 2017-07-04
 */

import mongoose from 'mongoose';
import { config } from '../config';
import WebIssuesModel from '../models/webIssues.model';
import getIncrementId from '../models/commons/counters';

// logger
import loghelper from '../utils/loghelper';
const logger = loghelper('mongodb');

const COLLECTTION = 'cims_web_issues';
const WebIssues = mongoose.model(COLLECTTION);

var webIssuesService = {
    add: async function (info) {
        try {
            info.updateTime = Date.now();
            // console.log('-------info:', info)
            var doc = await WebIssues.findOne({title: info.title});
            if (doc) {
                info.lastCrashedTime = doc.updateTime;
                var result = await WebIssues.updateOne({title: info.title}, {$set: info});
                if (result && result.n) {
                    var updatedDoc = await WebIssues.findOne({title: info.title});
                    // console.log('-------updatedDoc:', updatedDoc)
                    return updatedDoc;
                } else {
                    return null;
                }
            } else {
                info.createdTime = Date.now();
                var logId = await getIncrementId(COLLECTTION);
                if (logId) {
                    info.logId = logId;
                    doc = await WebIssues.create(info);
                    console.log('-------doc:', doc)
                    return doc;
                }
            }
        } catch (err) {
            logger.error('---------------The webIssues add action DB-Error:', err);
            console.log('DB-Error:', err)
            return null;
        }
    }
}

export default webIssuesService;
