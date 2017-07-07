/**
 * @overview: Auto increment id. - Provide Auto increment id for mongodb.
 * @author: txBoy
 * @created 2017-07-05
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var CounterSchema = Schema({
    tableName: {type: String, required: true},
    seq: { type: Number, default: 1 }
});
var Counter = mongoose.model('cims_counters', CounterSchema);

async function getIncrementId(tableName) {
    try {
        var counter = await Counter.findOneAndUpdate({tableName: tableName}, {$inc: { seq: 1} });
        if (counter) {
            return counter && counter.seq;
        }
    } catch (err) {
        throw err;
        return null;
    }
}

export default getIncrementId;
